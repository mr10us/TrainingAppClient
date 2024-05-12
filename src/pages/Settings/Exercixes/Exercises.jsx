import { routes } from "@consts"
import { MainLayout } from "../../../layouts/MainLayout";
import { Link } from "react-router-dom"
import { PageHeader } from "@components/PageHeader";

export const Exercises = () => {
  return (
    <MainLayout>
      <PageHeader title="Вправи"/>
      <Link to={routes.CREATE_EXERCISE}>Створити вправу</Link>
    </MainLayout>
  )
}