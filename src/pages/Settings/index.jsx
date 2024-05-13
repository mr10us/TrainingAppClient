import { useRole } from "@hooks/useRole";
import { MainLayout } from "../../layouts/MainLayout";
import { AdminSettings } from "./AdminSettings";
import { CustomerSettings } from "./CustomerSettings";

export const Settings = () => {
  const role = useRole();

  return (
    <MainLayout>
      {role === "ADMIN" && <AdminSettings />}
      {role === "USER" && <CustomerSettings />}
      {!role && <p>{localStorage.getItem("role")}</p>}
    </MainLayout>
  );
};
