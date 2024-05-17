import { Button } from "@components/UI/Button";
import { MainLayout } from "../layouts/MainLayout";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Rating } from "@components/UI/Rating";
import { levels, routes } from "@consts";
import { useQuery } from "@tanstack/react-query";
import { getTraining } from "@http/trainingApi";
import { useCurrentPage } from "@hooks/useCurrentPage";
import { Loader } from "@components/UI/Loader";
import { App } from "antd";

export const TrainingPreview = () => {
  const trainingID = useCurrentPage();
  const {message} = App.useApp();

  const { isLoading, isSuccess, data, isError, error } = useQuery({
    queryKey: ["getTraining"],
    queryFn: ({ signal }) => getTraining(signal, trainingID),
  });

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="p-6 flex flex-col justify-between h-full">
          <div className="w-full max-h-80">
            <img
              className="object-contain rounded-2xl shadow-lg h-full mx-auto"
              src={data.image}
              alt="training image"
              onError={(e) => (e.target.src = "/img/logo-bird.png")}
            />
            <h2 className="text-4xl text-gray-100 font-bold my-4 drop-shadow-lg">
              {data.title}
            </h2>
            <p className="text-gray-100 my-4 drop-shadow">
              Час виконання: <i>{data.exec_time}</i>
            </p>
            <p className="text-gray-100 my-4 drop-shadow">Тип: {levels[data.level]}</p>
            <p className="text-gray-100 my-4 drop-shadow">Опис: {data.content}</p>
          </div>
          <div className="flex gap-3">
            <Link
              to={routes.TRAININGS_LIST}
              className="text-lg font-bold text-gray-100 bg-brand py-2 px-4 rounded-xl w-fit shadow-lg"
            >
              <FaArrowLeft size={"1.5rem"} />
            </Link>
            <Button className="shadow-lg" onClick={() => message.info("Поки що не доступно")}>Почати</Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
