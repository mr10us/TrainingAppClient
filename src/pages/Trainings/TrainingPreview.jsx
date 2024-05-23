import { Button } from "@components/UI/Button";
import { MainLayout } from "../../layouts/MainLayout";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Rating } from "@components/UI/Rating";
import { levels, routes } from "@consts";
import { useQuery } from "@tanstack/react-query";
import { getTraining } from "@http/trainingApi";
import { Loader } from "@components/UI/Loader";
import { Tag } from "@components/UI/Tag";
import { motion } from "framer-motion";

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
      current: 0,
    };
    localStorage.setItem("training", JSON.stringify(training));

    navigate({
      pathname: routes.TRAININGS_LIST + trainingID + "/",
      search: `?id=${data.id}&current=0`,
    });
  };

  const navAnim = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
    },
  };

  const itemsAnim = (delay = 0) => ({
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 15,
        delay: delay,
      },
    },
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
  });

  return (
    <MainLayout>
      {isLoading && <Loader />}
      {isSuccess && (
        <div className="p-6 flex flex-col justify-between">
          <div className="w-full flex flex-col gap-4 mb-10">
            <motion.img
              className="object-contain rounded-2xl shadow-lg w-full mx-auto"
              src={data.image}
              alt="training image"
              onError={(e) => (e.target.src = "/img/logo-bird.png")}
              variants={itemsAnim(0.1)}
              initial="hidden"
              animate="visible"
            />
            <motion.h2
              className="text-4xl text-gray-100 font-bold drop-shadow-lg"
              variants={itemsAnim(0.1)}
              initial="hidden"
              animate="visible"
            >
              {data.title}
            </motion.h2>
            <motion.p
              className="text-gray-100 drop-shadow"
              variants={itemsAnim(0.2)}
              initial="hidden"
              animate="visible"
            >
              Час виконання: <i>{data.exec_time}</i>
            </motion.p>
            <motion.p
              className="text-gray-100 drop-shadow"
              variants={itemsAnim(0.3)}
              initial="hidden"
              animate="visible"
            >
              Тип: {levels[data.level]}
            </motion.p>
            <motion.p
              className="text-gray-100 drop-shadow"
              variants={itemsAnim(0.4)}
              initial="hidden"
              animate="visible"
            >
              Опис: {data.content}
            </motion.p>
            <motion.div
              className="flex gap-2"
              variants={itemsAnim(0.5)}
              initial="hidden"
              animate="visible"
            >
              <p className="text-gray-100 drop-shadow">Оцінка: </p>
              <Rating rating={data.rating} readOnly allowHalf />
            </motion.div>
            {data.types ? (
              <div className="flex gap-2">
                <div className="flex gap-2 flex-wrap">
                  <motion.p
                    className="text-gray-100 mb-2 drop-shadow mr-2"
                    variants={itemsAnim(0.6)}
                    initial="hidden"
                    animate="visible"
                  >
                    Типи:
                  </motion.p>
                  {data.types.map((type, idx) => {
                    const delay =
                      (idx + 1) % 10 === 0 ? 1.6 : ((idx + 1) % 10) * 0.1 + 0.6;
                    return (
                      <motion.span
                        key={type.id}
                        variants={itemsAnim(delay)}
                        initial="hidden"
                        animate="visible"
                      >
                        <Tag tagID={type.id}>{type.name}</Tag>
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            ) : null}
            {data.categories ? (
              <div className="flex gap-2">
                <div className="flex flex-wrap">
                  <motion.p
                    className="text-gray-100 mb-2 drop-shadow mr-4"
                    variants={itemsAnim(0.6)}
                    initial="hidden"
                    animate="visible"
                  >
                    Категорії:
                  </motion.p>
                  {data.categories.map((category, idx) => {
                    const delay =
                      (idx + 1) % 10 === 0 ? 1.6 : ((idx + 1) % 10) * 0.1 + 0.6;
                    return (
                      <motion.span
                        key={category.id}
                        variants={itemsAnim(delay)}
                        initial="hidden"
                        animate="visible"
                      >
                        <Tag tagID={category.id}>{category.name}</Tag>
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <div className="fixed bottom-4 w-11/12 left-1/2 -translate-x-1/2">
            <motion.div
              className="flex gap-3"
              variants={navAnim}
              initial="hidden"
              animate="visible"
            >
              <Link
                to={routes.TRAININGS_LIST}
                className="text-lg font-bold text-gray-100 bg-brand py-2 px-4 rounded-xl w-fit shadow-lg"
              >
                <FaArrowLeft size={"1.5rem"} />
              </Link>
              <Button
                onClick={handleStartTraining}
                type="primary"
                block
                className="shadow-lg"
              >
                Почати
              </Button>
            </motion.div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
