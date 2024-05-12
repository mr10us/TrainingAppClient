import { Navigate } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import BackButton from "@components/UI/BackButton";
import { useTelegram } from "@hooks/useTelegram";
import { useQuery } from "@tanstack/react-query";
import { AdminSettings } from "./AdminSettings";

export const Settings = () => {
  const { user } = useTelegram();

  // useQuery();

  return (
    <MainLayout>
      <AdminSettings />
    </MainLayout>
  );
};
