import { MainLayout } from "../layouts/MainLayout";
import { Navigation } from "@components/UI/Navigation";
import { TrainingTypeList } from "@components/TrainingTypeList";
import { FaArrowLeft, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import { routes } from "@consts";

export const ChooseTrainingType = () => {
  const trainings = [
    {
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
  ];
  return (
    <MainLayout>
      <div className="flex justify-between m-6 items-center">
        <div>
          <Link to={routes.HOME}>
            <FaArrowLeft size={"1.5rem"} className="text-yellow-200" />
          </Link>
        </div>
        <div>
          <p className="text-brand-dark font-bold text-4xl">GRIFF</p>
        </div>
        <div>
          <FaSort size={"1.5rem"} className="text-yellow-200" />
        </div>
      </div>
      <div className="h-5/6">
        <TrainingTypeList items={trainings}/>
      </div>
      <div className="h-1/6">
        <Navigation>
          <Navigation.Item>
            <p className="text-gray-100 font-bold text-xl">Фільтрувати</p>
          </Navigation.Item>
        </Navigation>
      </div>
    </MainLayout>
  );
};
