import { Button } from "@components/UI/Button";
import { MainLayout } from "../layouts/MainLayout";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Rating } from "@components/UI/Rating";
import { routes } from "@consts";

export const TrainingPreview = () => {
  return (
    <MainLayout>
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="">
          <img
            className="rounded-3xl shadow-lg"
            src="/img/testTraining.jpg"
            alt="training image"
          />
          <h2 className="text-4xl text-gray-100 font-bold my-4 drop-shadow-lg">
            Тренування ніг
          </h2>
          <p className="text-gray-100 my-4 drop-shadow">
            Час виконання: 12 хвилин
          </p>
          <p className="text-gray-100 my-4 drop-shadow">Тип: Новачок</p>
          <p className="text-gray-100 my-4 drop-shadow">
            Опис: Це тренування призначене для початківців, які хочуть почати
            зміцнювати свої ноги та підвищити силу та стійкість.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to={routes.TRAININGS_LIST}
            className="text-lg font-bold text-gray-100 bg-brand py-2 px-4 rounded-xl w-fit shadow-lg"
          >
            <FaArrowLeft size={"1.5rem"} />
          </Link>
          <Button className="shadow-lg">Почати</Button>
        </div>
      </div>
    </MainLayout>
  );
};
