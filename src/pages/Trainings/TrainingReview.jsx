import { PageHeader } from "@components/PageHeader";
import { MainLayout } from "../../layouts/MainLayout";
import { App, Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Rating } from "@components/UI/Rating";
import { useMutation } from "@tanstack/react-query";
import { routes } from "@consts";
import { addReview } from "@http/trainingApi";
import { useNavigate } from "react-router-dom";
import { handleErrors } from "@utils/handlers/http";
import { NotFound } from "@components/NotFound";
import { HomeButton } from "@components/UI/HomeButton";

export const TrainingReview = () => {
  const [rating, setRating] = useState(null);

  const training = JSON.parse(localStorage.getItem("training"));
  const { message } = App.useApp();
  const navigate = useNavigate();

  if (!training)
    return (
      <NotFound desc={"Тренування не знайдено"} to={routes.TRAININGS_LIST} />
    );

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("training");
    };
  }, []);

  const handleFinishTraining = async ({ review }) => {
    if (!review && !rating) {
      message.error("Неможливо створити відгук без коментарю чи оцінки.");
    } else {
      const userID = localStorage.getItem("userID");

      await addReview(null, training.id, review, rating, userID);
    }
  };

  const mutation = useMutation({
    mutationFn: handleFinishTraining,
    mutationKey: ["writeReview"],
    onError: (error) => {
      message.error(handleErrors.front(error));
    },
    onSuccess: () => {
      message.success("Дякую за Ваш відгук!");
      navigate(routes.HOME);
    },
  });

  useEffect(() => {
    return () => {message.success("Тренування завершене")};
  }, []);

  return (
    <MainLayout>
      <PageHeader
        title={training.name}
        size={"small"}
        customBack={<HomeButton />}
      />
      <div className="m-4" style={{ height: "calc(100% - 128px)" }}>
        <Form onFinish={mutation.mutate} className="h-full w-full">
          <div className="flex flex-col justify-between gap-4 text-gray-100 h-full">
            <div className="flex justify-between gap-4 flex-col">
              <h2 className="text-5xl font-bold text-center">Вітаю!</h2>
              <h3 className="text-2xl font-bold">
                Ви завершили тренування {training.name}!
              </h3>
              <p className="text-lg">
                Ми будемо щиро вдячні, якщо Ви залишите відгук :)
              </p>
              <Form.Item name="review">
                <Input.TextArea rows={5} placeholder="Введіть свій відгук..." />
              </Form.Item>
              <div className="flex gap-2 items-center">
                <p className="text-lg">Оцінка: </p>
                <Rating allowHalf onChange={handleRatingChange} />
              </div>
            </div>
            <Button type="primary" htmlType="submit">
              Завершити тренування
            </Button>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
};
