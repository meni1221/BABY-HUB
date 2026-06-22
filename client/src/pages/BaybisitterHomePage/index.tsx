import { Avatar, Card, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { NavLink } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useLanguage } from "../../providers/LanguageProvider/context";
import { TbEdit, TbRefresh } from "react-icons/tb";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import PageSection from "../../components/PageSection";
import { useBabysitterOrders } from "../../hooks/useBabysitterOrders";

export const BaybisitterHomePage = () => {
  const { texts } = useLanguage();
  const { assignedOrders, babysitter, updateStatus } = useBabysitterOrders();

  return (
    <>
      <PageHeader
        title={`${texts.welcomeUser}, ${
          babysitter?.name || texts.babysitter
        }`}
        subtitle={texts.dashboardSubtitle}
      />

      <Stack gap={48}>
        <PageSection
          id="babysitter-profile"
          title={texts.editProfile}
          subtitle={texts.dashboardSubtitle}
        >
          <Card p="xl" radius="lg" shadow="xs" withBorder>
            <Stack align="center">
              <Avatar
                src={babysitter?.image || "/default-avatar.png"}
                alt={babysitter?.name || ""}
                radius="xl"
                size={116}
              />
              <Title order={3} size="h3">
                {babysitter?.name}
              </Title>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm" w="100%">
                {[
                  [texts.age, babysitter?.age],
                  [texts.address, babysitter?.address],
                  [texts.phone, babysitter?.phone],
                  [texts.email, babysitter?.email],
                  [texts.preferences, babysitter?.preferences],
                  [texts.experience, babysitter?.experience],
                  [texts.about, babysitter?.about],
                  [texts.price, babysitter?.price],
                  [texts.likes, babysitter?.likes],
                ].map(([label, value]) => (
                  <Card key={String(label)} p="sm" radius="md" withBorder>
                    <Text c="dimmed" fw={700} size="sm">{label}</Text>
                    <Text>{value}</Text>
                  </Card>
                ))}
              </SimpleGrid>
              {babysitter?._id && (
                <NavLink to={`/edit/${babysitter._id}`}>
                  <Button>
                    <TbEdit />
                    {texts.editProfile}
                  </Button>
                </NavLink>
              )}
            </Stack>
          </Card>
        </PageSection>

        <PageSection
          id="babysitter-orders"
          title={texts.ordersTitle}
          subtitle={texts.ordersSubtitle}
        >
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            {assignedOrders.length > 0 ? (
              assignedOrders.map((order) => (
                <Card component="article" key={order._id || order.parent_id} p="lg" radius="lg" shadow="xs" withBorder>
                  <Title order={3} size="h4">{texts.orderDetails}</Title>
                  <Stack gap={4} mt="sm">
                    <Text>{texts.status}: {order.status}</Text>
                    <Text>{texts.babysitterId}: {order.babysitter_id}</Text>
                    <Text>{texts.parentId}: {order.parent_id}</Text>
                    <Text>{texts.workingHours}: {order.number_working}</Text>
                  </Stack>
                  <Button
                    onClick={() => order._id && updateStatus(order._id, order.status)}
                    color={
                      order.status === "approved"
                        ? "green"
                        : order.status === "Done"
                          ? "blue"
                          : order.status === "rejected"
                            ? "red"
                            : "yellow"
                    }
                    mt="md"
                  >
                    <TbRefresh />
                    {texts.updateStatus}
                  </Button>
                </Card>
              ))
            ) : (
              <EmptyState
                title={texts.noOrdersTitle}
                message={texts.noOrdersSubtitle}
              />
            )}
          </SimpleGrid>
        </PageSection>
      </Stack>
    </>
  );
};

export default BaybisitterHomePage;
