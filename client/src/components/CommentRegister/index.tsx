import { Alert, Group, Paper, Rating, Stack, TextInput, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider/context";
import useFetch from "../../hooks/useFetch";
import { apiUrl } from "../../config/api";
import IBabysitter from "../../interface/BabySitter";
import { useLanguage } from "../../providers/LanguageProvider/context";
import { TbMessageCircle, TbSend } from "react-icons/tb";
import Button from "../Button";

interface Props {
  id: string;
}

const CommentRegister = ({ id }: Props) => {
  const { GETOne, addComment, data } = useFetch<IBabysitter>(
    apiUrl("babysitter")
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [babysitter, setBabysitter] = useState<IBabysitter | null>(null);
  const { user } = useContext(AuthContext) ?? {};
  const { texts } = useLanguage();

  useEffect(() => {
    GETOne(id);
  }, [id, GETOne]);

  useEffect(() => {
    if (data) setBabysitter(data);
  }, [data]);

  const handleSubmit = async () => {
    if (rating > 0 && comment.trim() !== "") {
      await addComment({
        id,
        review: {
          userId: user!._id!,
          rating,
          comment,
        },
      });
      setComment("");
      setRating(0);
    } else {
      alert(texts.commentValidation);
    }
  };

  return user ? (
    <Paper component="section" mt="xl" p="lg" radius="md" shadow="xs" withBorder>
      <Stack>
      <Title order={2} size="h3">
        <TbMessageCircle />
        {texts.addCommentTo} {babysitter?.name || texts.fallbackBabysitter}
      </Title>
      <TextInput
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        placeholder={texts.commentPlaceholder}
      />
      <Rating value={rating} onChange={setRating} size="lg" />
      <Group justify="flex-end">
      <Button type="button" onClick={() => handleSubmit()}>
        <TbSend />
        {texts.submit}
      </Button>
      </Group>
      </Stack>
    </Paper>
  ) : (
    <Alert color="yellow" mt="xl">{texts.loginRequiredComment}</Alert>
  );
};

export default CommentRegister;
