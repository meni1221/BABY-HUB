import { FormEvent, useContext, useState } from "react";
import { API_BASE_URL } from "../../config/api";
import IBabysitter from "../../interface/BabySitter";
import IOrder from "../../interface/orderType";
import useFetch from "../useFetch";
import { AuthContext } from "../../providers/AuthProvider/context";
import { useLanguage } from "../../providers/LanguageProvider/context";
import { useNotification } from "../../providers/NotificationProvider/context";

export const useOrderRequest = (babysitters: IBabysitter[]) => {
  const { user } = useContext(AuthContext) ?? {};
  const { texts } = useLanguage();
  const { notify } = useNotification();
  const { POST } = useFetch<IOrder>(API_BASE_URL);
  const [expectations, setExpectations] = useState("");
  const [numberWorking, setNumberWorking] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBabysitter, setSelectedBabysitter] =
    useState<IBabysitter | null>(null);

  const openDialog = (id?: string) => {
    if (!id) return;

    const selected = babysitters.find((babysitter) => babysitter._id === id);
    if (!selected) return;

    setSelectedBabysitter(selected);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user?._id || !selectedBabysitter?._id) return;

    try {
      await POST("orders", {
        parent_id: user._id,
        babysitter_id: selectedBabysitter._id,
        number_working: numberWorking,
        expectations,
      });

      setNumberWorking(1);
      setExpectations("");
      closeDialog();
      notify({
        message: texts.feedbackOrderRequestSuccessMessage,
        title: texts.feedbackOrderRequestSuccessTitle,
        tone: "success",
      });
    } catch (error) {
      notify({
        message:
          error instanceof Error
            ? error.message
            : texts.feedbackGenericErrorMessage,
        title: texts.feedbackOrderRequestErrorTitle,
        tone: "error",
      });
    }
  };

  return {
    closeDialog,
    expectations,
    handleSubmit,
    isDialogOpen,
    numberWorking,
    openDialog,
    selectedBabysitter,
    setExpectations,
    setNumberWorking,
  };
};
