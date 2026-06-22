import { NumberInput, Paper, PasswordInput, Select, SimpleGrid, Stack, Textarea, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import IBabysitter from "../../../interface/BabySitter";
import { API_BASE_URL } from "../../../config/api";
import { useLanguage } from "../../../providers/LanguageProvider/context";
import { useNotification } from "../../../providers/NotificationProvider/context";
import Button from "../../../components/Button";

export const RegisterBaybisitter = () => {
  const { POST } = useFetch<IBabysitter>(API_BASE_URL);
  const { texts } = useLanguage();
  const { notify } = useNotification();

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
  const [password, setPassword] = useState("");

  const addpreferences = (newPpreferences: string) => {
    if (preferences.length >= 3) return;
    setPreferences([...preferences, newPpreferences]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await POST("babysitter", {
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
        password,
      });

      setName("");
      setAge(0);
      setImage("");
      setAddress("");
      setPhone("");
      setEmail("");
      setPreferences([""]);
      setExperience("");
      setAbout("");
      setPrice(0);
      setPassword("");
      notify({
        message: texts.feedbackRegisterBabysitterSuccessMessage,
        title: texts.feedbackRegisterSuccessTitle,
        tone: "success",
      });
    } catch (error) {
      notify({
        message:
          error instanceof Error
            ? error.message
            : texts.feedbackGenericErrorMessage,
        title: texts.feedbackRegisterErrorTitle,
        tone: "error",
      });
    }
  };
  return (
    <Paper component="form" onSubmit={handleSubmit} p="xl" radius="md" shadow="xs" withBorder>
      <Stack>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            id="name"
            label={texts.name}
            placeholder={texts.fullNamePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <TextInput
            id="address"
            label={texts.address}
            placeholder={texts.addressPlaceholder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextInput
            id="phone"
            label={texts.phone}
            placeholder={texts.phonePlaceholder}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextInput
            id="email"
            label={texts.email}
            type="email"
            placeholder={texts.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Select
            id="preferences"
            label={texts.preferences}
            value={preferences[0]}
            onChange={(value) => value && addpreferences(value)}
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
            onChange={(e) => setExperience(e.target.value)}
            required
          />
          <Textarea
            id="about"
            label={texts.about}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
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
          <PasswordInput
            id="password"
            label={texts.password}
            placeholder={texts.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </SimpleGrid>
        <Button type="submit">{texts.registerBabysitterSubmit}</Button>
      </Stack>
    </Paper>
  );
};
