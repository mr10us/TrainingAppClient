import { MainLayout } from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { genders, levels, routes } from "@consts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTrainings } from "@http/trainingApi";
import { useMemo } from "react";
import { PageHeader } from "@components/PageHeader";
import { Filter } from "@components/Filter";
import { Loader } from "@components/UI/Loader";
import { Badge, List } from "antd";
import VirtualList from "rc-virtual-list";
import { Rating } from "@components/UI/Rating";

const containerHeight = window.innerHeight - 128;

export const ChooseTrainingType = () => {
  const query = "";

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getTrainings", query],
    queryFn: ({ pageParam = 1, signal }) =>
      getTrainings(pageParam, query, signal),
    initialPageParam: 1,
    getNextPageParam: ({ totalPages, currentPage }) => {
      if (totalPages !== currentPage) return currentPage + 1;
      return null;
    },
  });

  const trainings = useMemo(() => {
    return isSuccess ? data.pages.map((result) => result.trainings).flat() : [];
  }, [isSuccess, data]);

  const onScroll = (e) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          containerHeight
      ) <= 1 &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  };

  return (
    <MainLayout>
      <PageHeader title={"Тренування"} size={"medium"} />
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          <List className="m-4">
            <VirtualList
              data={trainings}
              height={containerHeight}
              itemKey="id"
              onScroll={onScroll}
            >
              {(item) => (
                <Link
                  to={routes.TRAININGS_LIST + item.id}
                  className="my-3 px-4 bg-yellow-50 rounded-lg shadow-md"
                >
                  <Badge.Ribbon text={genders[item.gender]}>
                    <List.Item className="flex items-center justify-between w-full">
                      <div className="basis-2/3 text-gray-950">
                        <h2 className="font-bold text-lg">{item.title}</h2>
                        <p>
                          Час виконання: <i>{item.exec_time}</i>
                        </p>
                        <p>Тип: {levels[item.level]}</p>
                        <div className="mt-1">
                          <Rating rating={item.rating} />
                        </div>
                      </div>
                      <div className="basis-1/3 flex justify-center">
                        <img
                          className="rounded-md h-24 object-contain"
                          src={item.image}
                          alt="training image"
                          onError={(e) => (e.target.src = "/img/logo-bird.png")}
                        />
                      </div>
                    </List.Item>
                  </Badge.Ribbon>
                </Link>
              )}
            </VirtualList>
          </List>
          <Filter />
        </>
      )}
    </MainLayout>
  );
};
