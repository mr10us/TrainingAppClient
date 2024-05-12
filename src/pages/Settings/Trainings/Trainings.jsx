import React from "react";
import { PageHeader } from "@components/PageHeader";
import { MainLayout } from "../../../layouts/MainLayout";
import { List } from "antd";
import { Link } from "react-router-dom";
import { routes } from "@consts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTrainings } from "@http/trainingApi";

export const Trainings = () => {
  const dataToSend = {
    level: 0,
    gender: 0,
    type: [1, 2, 3],
    category: [1, 2],
    exercise: [
      { id: 1, ordinal_number: 0 },
      { id: 2, ordinal_number: 1 },
      { id: 3, ordinal_number: 2 },
      { id: 4, ordinal_number: 3 },
    ],
    title: "Тренування на груди",
    content: "lorem ipsum dolor",
    exec_time: "00:45:00",
  };

  const query = "";

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    remove,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getTrainings", query],
    queryFn: ({ pageParam = 1 }) => getTrainings(pageParam, query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  console.log(data)

  const trainings = [
    {
      id: 1,
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      id: 2,
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      id: 3,
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      id: 4,
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      id: 5,
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
    {
      id: 6,
      title: "Тренування ніг",
      time: "12 хв",
      rate: 4.3,
      type: "Новачок",
      img: "/img/testTraining.jpg",
    },
  ];

  return (
    <MainLayout style={{ overflowX: "scroll" }}>
      <PageHeader text={"Тренування"} size={"medium"} />
      <div className="mx-4" style={{ maxHeight: 600, overflowY: "scroll" }}>
        <List
          size="large"
          dataSource={trainings}
          renderItem={(item) => (
            <Link to={`${routes.ADMIN_TRAININGS}${item.id}`}>
              <div className="p-4 my-4 bg-yellow-50 flex items-center justify-between rounded-lg shadow-md">
                <div className="basis-2/3">
                  <h2>{item.title}</h2>
                  <p>Тип: {item.type}</p>
                </div>
                <div className="basis-1/3">
                  <img
                    className="rounded-md"
                    src={item.img}
                    alt="training image"
                  />
                </div>
              </div>
            </Link>
          )}
        />
      </div>
    </MainLayout>
  );
};
