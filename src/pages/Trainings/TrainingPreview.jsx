import { Button } from "@components/UI/Button";
import { MainLayout } from "../../layouts/MainLayout";
import { FaArrowLeft } from "react-icons/fa";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Rating } from "@components/UI/Rating";
import { levels, routes } from "@consts";
import { useQuery } from "@tanstack/react-query";
import { getTraining } from "@http/trainingApi";
import { Loader } from "@components/UI/Loader";
import { Tag } from "@components/UI/Tag";

export const TrainingPreview = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [trainingID] = pathname.split("/").filter(Number);

  const { isLoading, isSuccess, data, isError, error } = useQuery({
    queryKey: ["getTraining"],
    queryFn: ({ signal }) => getTraining(signal, trainingID),
  });

  const handleStartTraining = () => {
    const training = {
      id: data.id,
      name: data.title,
      rating: data.rating,
      exercises: data.exercises,
      current: 0
    };
    localStorage.setItem("training", JSON.stringify(training));

    navigate({
      pathname: routes.TRAININGS_LIST + trainingID + "/",
      search: `?id=${data.id}&current=0`,
    });
  };

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="p-6 flex flex-col justify-between">
          <div className="w-full flex flex-col gap-4 mb-10">
            <img
              className="object-contain rounded-2xl shadow-lg w-full mx-auto"
              src={data.image}
              alt="training image"
              onError={(e) => (e.target.src = "/img/logo-bird.png")}
            />
            <h2 className="text-4xl text-gray-100 font-bold drop-shadow-lg">
              {data.title}
            </h2>
            <p className="text-gray-100 drop-shadow">
              Час виконання: <i>{data.exec_time}</i>
            </p>
            <p className="text-gray-100 drop-shadow">
              Тип: {levels[data.level]}
            </p>
            <p className="text-gray-100 drop-shadow">Опис: {data.content}</p>
            <div className="flex gap-2">
              <p className="text-gray-100 drop-shadow">Оцінка: </p>
              <Rating rating={data.rating} readOnly allowHalf />
            </div>
            {data.types ? (
              <div className="flex gap-2">
                <p className="text-gray-100 mb-2 drop-shadow">Типи: </p>
                <div className="flex gap-2 flex-wrap">
                  {data.types.map((type) => (
                    <Tag key={type.id} tagID={type.id}>
                      {type.name}
                    </Tag>
                  ))}
                </div>
              </div>
            ) : null}
            {data.categories ? (
              <div className="flex gap-2">
                <p className="text-gray-100 mb-2 drop-shadow">Категорії: </p>
                <div className="flex flex-wrap">
                  {data.categories.map((category) => (
                    <Tag key={category.id} tagID={category.id}>
                      {category.name}
                    </Tag>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex gap-3">
            <Link
              to={routes.TRAININGS_LIST}
              className="text-lg font-bold text-gray-100 bg-brand py-2 px-4 rounded-xl w-fit shadow-lg"
            >
              <FaArrowLeft size={"1.5rem"} />
            </Link>
            <Button onClick={handleStartTraining} type="primary">
              Почати
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
