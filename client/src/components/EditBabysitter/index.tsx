import { Group, NumberInput, Paper, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../config/api";
import useFetch from "../../hooks/useFetch";
import IBabysitter from "../../interface/BabySitter";
import { AuthContext } from "../../providers/AuthProvider/context";
import { useLanguage } from "../../providers/LanguageProvider/context";
import { useNotification } from "../../providers/NotificationProvider/context";
import Button from "../Button";
import PageHeader from "../PageHeader";

export const EditBabysitter = () => {
  const { user } = useContext(AuthContext) ?? {};
  const { PATCH } = useFetch<IBabysitter>(apiUrl("babysitter"));
  const { texts } = useLanguage();
  const { notify } = useNotification();
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState([""]);
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState(0);

  const userBabysitter = user as IBabysitter;

  useEffect(() => {
    if (!userBabysitter) return;

    setName(userBabysitter.name || "");
    setAge(userBabysitter.age || 0);
    setImage(userBabysitter.image || "");
    setAddress(userBabysitter.address || "");
    setPhone(userBabysitter.phone || "");
    setEmail(userBabysitter.email || "");
    setPreferences(userBabysitter.preferences || [""]);
    setExperience(userBabysitter.experience || "");
    setAbout(userBabysitter.about || "");
    setPrice(userBabysitter.price || 0);
  }, [userBabysitter]);

  const addPreferences = (newPreference: string) => {
    if (preferences.length >= 3) return;
    setPreferences([...preferences, newPreference]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;

    try {
      await PATCH(id, {
        name,
        age,
        image,
        address,
        phone,
        email,
        preferences,
        experience,
        about,
        price,
      });

      notify({
        message: texts.feedbackProfileUpdateSuccessMessage,
        title: texts.feedbackProfileUpdateSuccessTitle,
        tone: "success",
      });
      navigate("/babysitter");
    } catch (error) {
      notify({
        message:
          error instanceof Error
            ? error.message
            : texts.feedbackGenericErrorMessage,
        title: texts.feedbackProfileUpdateErrorTitle,
        tone: "error",
      });
    }
  };

  return (
    <>
      <PageHeader title={texts.editTitle} subtitle={texts.editSubtitle} />
      <Paper component="form" onSubmit={handleSubmit} p="xl" radius="md" shadow="xs" withBorder>
        <Stack>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            id="name"
            label={texts.name}
            placeholder={texts.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <NumberInput
            id="age"
            label={texts.age}
            placeholder={texts.agePlaceholder}
            value={age}
            onChange={(value) => setAge(Number(value) || 0)}
            required
          />
          <TextInput
            id="image"
            label={texts.image}
            placeholder={texts.imagePlaceholder}
            value={image}
            onChange={(event) => setImage(event.target.value)}
            required
          />
          <TextInput
            id="address"
            label={texts.address}
            placeholder={texts.addressPlaceholder}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
          <TextInput
            id="phone"
            label={texts.phone}
            placeholder={texts.phonePlaceholder}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
          <TextInput
            id="email"
            label={texts.email}
            type="email"
            placeholder={texts.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Select
            id="preferences"
            label={texts.preferences}
            value={preferences[0]}
            onChange={(value) => value && addPreferences(value)}
            data={[
              { value: "infancy", label: texts.preferenceInfancy },
              { value: "special education", label: texts.preferenceSpecialEducation },
              { value: "Age 5 and up", label: texts.preferenceAgeFive },
              { value: "Rewards", label: texts.preferenceRewards },
              { value: "without food", label: texts.preferenceWithoutFood },
              { value: "no homework", label: texts.preferenceNoHomework },
            ]}
          />
          <TextInput
            id="experience"
            label={texts.experience}
            placeholder={texts.experiencePlaceholder}
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            required
          />
          <Textarea
            id="about"
            label={texts.about}
            placeholder={texts.aboutPlaceholder}
            value={about}
            onChange={(event) => setAbout(event.target.value)}
            required
          />
          <NumberInput
            id="price"
            label={texts.price}
            placeholder={texts.pricePlaceholder}
            value={price}
            onChange={(value) => setPrice(Number(value) || 0)}
            required
          />
        </SimpleGrid>

        <Group justify="flex-end">
        <Button type="submit">{texts.editSubmit}</Button>
        <Button component={Link} to="/babysitter" type="button" variant="ghost">
          {texts.back}
        </Button>
        </Group>
        </Stack>
      </Paper>
    </>
  );
};
