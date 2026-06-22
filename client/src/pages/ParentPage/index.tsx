import { Box, Group, Modal, NumberInput, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../providers/LanguageProvider/context";
import BabysitterCard from "../../components/BabysitterCard";
import Button from "../../components/Button";
import EmptyState from "../../components/EmptyState";
import PageHeader from "../../components/PageHeader";
import PageSection from "../../components/PageSection";
import { useBabysitters } from "../../hooks/useBabysitters";
import { useOrderRequest } from "../../hooks/useOrderRequest";

const ParentPage = () => {
  const { texts } = useLanguage();
  const navigate = useNavigate();
  const { babysitters, hasBabysitters } = useBabysitters();
  const {
    closeDialog,
    expectations,
    handleSubmit,
    isDialogOpen,
    numberWorking,
    openDialog,
    selectedBabysitter,
    setExpectations,
    setNumberWorking,
  } = useOrderRequest(babysitters);

  return (
    <>
      <PageHeader title={texts.parentDashboardTitle} subtitle={texts.parentDashboardSubtitle} />

      <PageSection
        id="parent-page-title"
        title={texts.availableBabysitters}
        subtitle={texts.parentDashboardHelper}
      >
        {hasBabysitters ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {babysitters.map((babysitter) => (
              <BabysitterCard
                babysitter={babysitter}
                key={babysitter._id || babysitter.email}
                labels={{
                  age: texts.age,
                  contact: texts.contact,
                  location: texts.location,
                  moreDetails: texts.moreDetails,
                }}
                onContact={openDialog}
                onDetails={(id) => navigate(`/display/${id}`)}
              />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState title={texts.noBabysitters} message={texts.noBabysittersHelper} />
        )}
      </PageSection>

      <Modal
        opened={isDialogOpen}
        onClose={closeDialog}
        title={`${texts.contact} ${selectedBabysitter?.name || ""}`}
        centered
      >
        <Stack component="form" onSubmit={handleSubmit}>
          <Box
            component="img"
            src={selectedBabysitter?.image || "/default-avatar.jpg"}
            alt={selectedBabysitter?.name || ""}
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              objectFit: "cover",
              marginInline: "auto",
            }}
          />
          <NumberInput
            id="number_working"
            label={texts.numberOfHours}
            min={1}
            max={24}
            value={numberWorking}
            onChange={(value) => setNumberWorking(Number(value) || 1)}
          />

          <TextInput
            id="expectations"
            label={texts.expectations}
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
          />

          <Group justify="flex-end">
            <Button type="button" onClick={closeDialog} variant="ghost">
              {texts.cancel}
            </Button>
            <Button type="submit">
              {texts.sendOrder}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default ParentPage;
