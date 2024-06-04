import { useTelegram } from "@hooks/useTelegram";
import { MainLayout } from "../layouts/MainLayout";
import React, { useEffect } from "react";
import { MenuButtons } from "@components/MenuButtons";
import { motion } from "framer-motion";
import { App, Button, Space } from "antd";
import { GiFinishLine } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { routes } from "@consts";
import { MdOutlineDeleteForever } from "react-icons/md";

export const Home = () => {
  const { user } = useTelegram();
  const image = user?.photo_url || null;
  const name = user ? user?.first_name || user?.username : "друже";

  const { notification, message } = App.useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const handleContinueTraining = (trainingData) => {
      navigate(
        `${routes.TRAININGS_LIST}${trainingData.id}/?id=${trainingData.id}&current=${trainingData.current}`
      );
      notification.destroy("unfinishedTrainingNotification");
    };

    const handleFinishTraining = () => {
      localStorage.removeItem("training");
      message.success("Тренування завершене")

      notification.destroy("unfinishedTrainingNotification");
    }

    const training = localStorage.getItem("training");
    if (training) {
      const trainingData = JSON.parse(training);
      notification.info({
        key: "unfinishedTrainingNotification",
        icon: <GiFinishLine />,
        message: trainingData.name,
        description:
          "Схоже Ви не закінчили минуле тренування. Бажаєте продовжити?",
        duration: 7.5,
        className: "drop-shadow",
        placement: "top",
        btn: (
          <Space size={"middle"}>
          <Button
            type="primary"
            onClick={() => handleContinueTraining(trainingData)}
            block
          >
            Продовжити тренування
          </Button>
          <Button
            type="primary"
            danger
            icon={<MdOutlineDeleteForever />}
            onClick={handleFinishTraining}
          />
          
          </Space>
        ),
        showProgress: true,
      });
    }
  }, []);

  const nameAnim = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 },
    },
    hidden: { opacity: 0, x: -200 },
  };
  const photoAnim = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.3 },
    },
    hidden: { opacity: 0, x: 200 },
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-between h-screen">
        <div className="pt-8 px-4 flex flex-row-reverse justify-between">
          {image ? (
            <motion.img
              className="size-16 object-contain"
              src={image}
              alt="user image"
              variants={photoAnim}
              initial="hidden"
              animate="visible"
            />
          ) : (
            <motion.div
              className="bg-brand-dark flex justify-center items-center rounded-full size-16 mb-3"
              variants={photoAnim}
              initial="hidden"
              animate="visible"
            >
              <p className="text-gray-100 text-2xl font-bold">
                {name[0].toUpperCase()}
              </p>
            </motion.div>
          )}
          <motion.p
            className="text-gray-100 py font-bold text-3xl mt-4 w-min"
            variants={nameAnim}
            initial="hidden"
            animate="visible"
          >
            Привіт, <br />
            <span className="text-5xl text-yellow-300 ml-4">{name}</span>!
          </motion.p>
        </div>
        <MenuButtons />
      </div>
    </MainLayout>
  );
};
