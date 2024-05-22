import { CustomPlayer } from "@components/UI/CustomPlayer";
import { Button, Flex } from "antd";
import { MainLayout } from "../../layouts/MainLayout";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";
import { routes } from "@consts";
import { NotFound } from "@components/NotFound";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PageHeader } from "@components/PageHeader";
import { TrainingBackButton } from "@components/UI/TrainingBackButton";

const variant = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.8 },
  exit: { opacity: 0 },
};

export const TrainingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [exercise, setExercise] = useState();
  const [visible, setVisible] = useState(true);

  const training = JSON.parse(localStorage.getItem("training"));
  const trainingID = Number(searchParams.get("id"));
  const currentExercise = Number(searchParams.get("current"));
  const isPrevUnavailable = currentExercise === 0;
  const isNextUnavailable = currentExercise + 1 === training.exercises.length;

  const changeExercise = (newExerciseIndex) => {
    setVisible(false);
    setTimeout(() => {
      setExercise(training.exercises[newExerciseIndex]);
      setVisible(true);
      const newTraining = JSON.stringify({
        ...training,
        current: newExerciseIndex,
      });
      localStorage.setItem("training", newTraining);
      setSearchParams({ id: trainingID, current: newExerciseIndex });
    }, 500);
  };

  const moveToPrevExercise = () => {
    !isPrevUnavailable && changeExercise(currentExercise - 1);
  };

  const moveToNextExercise = () => {
    !isNextUnavailable && changeExercise(currentExercise + 1);
  };

  useEffect(() => {
    if (training) {
      const current =
        training.current != null ? training.current : currentExercise;
      setExercise(training.exercises[current]);
    }
  }, []);

  if (!training) {
    return (
      <NotFound
        to={routes.TRAININGS_LIST}
        desc={"Вибачте, тренування не знайдено"}
      />
    );
  }

  return (
    <MainLayout>
      <PageHeader title={training.name} size="small" customBack={<TrainingBackButton />} />
      {exercise && (
        <div
          className="m-4 flex flex-col justify-between"
          style={{ height: "calc(100% - 128px)" }}
        >
          <AnimatePresence>
            {visible && (
              <motion.div
                key={exercise.id}
                className="mb-4"
                variants={variant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="w-72 mx-auto mb-4">
                  <CustomPlayer src={exercise.video} />
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold text-gray-100">
                    {exercise.title}
                  </h2>
                  <p className="text-gray-100 text-lg">{exercise.content}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="py-6 h-10">
            <div className="flex gap-4 justify-between fixed bottom-4 left-0 w-full px-4">
              <Button
                onClick={moveToPrevExercise}
                size="large"
                block
                className="border-none"
                type="primary"
                disabled={isPrevUnavailable}
              >
                <Flex justify="center" align="center" gap={5}>
                  <IoIosArrowBack />
                  Назад
                </Flex>
              </Button>
              {!isNextUnavailable ? (
                <Button
                  onClick={moveToNextExercise}
                  block
                  type="primary"
                  className="border-none"
                  size="large"
                >
                  <Flex justify="center" align="center" gap={5}>
                    Далі
                    <IoIosArrowForward />
                  </Flex>
                </Button>
              ) : (
                <Link
                  to={routes.TRAININGS_LIST + trainingID + "/review"}
                  className="block text-gray-100 text-nowrap px-4 py-2 bg-green-400 rounded-lg"
                >
                  <div className="flex items-center justify-center">
                    Завершити тренування
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
