import { NumberInput, Paper, PasswordInput, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { FormEvent, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { IParents } from "../../../interface/parents";
import { API_BASE_URL } from "../../../config/api";
import { useLanguage } from "../../../providers/LanguageProvider/context";
import Button from "../../../components/Button";

export const RegisterParent = () => {
  const { POST } = useFetch<IParents>(API_BASE_URL);
  const { texts } = useLanguage();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(1);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [buildingNumber, setBuildingNumber] = useState(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const address = { city, street, buildingNumber };

    POST("parents", {
      name,
      amount,
      address,
      phone,
      email,
      password,
    });

    setName("");
    setAmount(1);
    setPhone("");
    setEmail("");
    setPassword("");
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} p="xl" radius="md" shadow="xs" withBorder>
      <Stack>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              id="name"
              label={texts.name}
              placeholder={texts.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <NumberInput
              id="amount"
              label={texts.amount}
              placeholder={texts.amountPlaceholder}
              value={amount}
              onChange={(value) => setAmount(Number(value) || 1)}
              required
            />
            <TextInput
              id="city"
              label={texts.city}
              placeholder={texts.cityPlaceholder}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <TextInput
              id="street"
              label={texts.street}
              placeholder={texts.streetPlaceholder}
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
            <NumberInput
              id="buildingNumber"
              label={texts.buildingNumber}
              placeholder={texts.buildingNumberPlaceholder}
              value={buildingNumber}
              onChange={(value) => setBuildingNumber(Number(value) || 0)}
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
            <PasswordInput
              id="password"
              label={texts.password}
              placeholder={texts.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </SimpleGrid>
        <Button type="submit">{texts.registerParentSubmit}</Button>
      </Stack>
    </Paper>
  );
};
