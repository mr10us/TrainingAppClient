import { levels, routes } from "@consts";
import { MainLayout } from "../../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { PageHeader } from "@components/PageHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { List } from "antd";
import { Empty } from "@components/UI/Empty";
import { IoAdd } from "react-icons/io5";
import VirtualList from "rc-virtual-list";
import { Filter } from "@components/Filter";
import { Loader } from "@components/UI/Loader";
import { getTrainings } from "@http/trainingApi";

const containerHeight = window.innerHeight - 128;

export const Trainings = () => {
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
    return isSuccess
      ? data.pages.map((result) => result.trainings).flat()
      : null;
  }, [isSuccess, data]);

  const onScroll = (e) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          containerHeight
      ) <= 1 && hasNextPage
    ) {
      fetchNextPage();
    }
  };

  const filterOptions = [{ key: "" }];

  return (
    <MainLayout>
      <PageHeader
        title="Тренування"
        extra={
          <Link to={routes.CREATE_TRAINING}>
            <IoAdd size={40} className="text-gray-100" />
          </Link>
        }
      />
      {isLoading && <Loader />}
      {isSuccess && trainings.length > 0 ? (
        <List className="m-4">
          <VirtualList
            data={trainings}
            height={containerHeight}
            itemKey="id"
            onScroll={onScroll}
          >
            {(item) => (
              <Link
                to={routes.ADMIN_TRAININGS + item.id}
                key={item.id}
                className="my-3"
              >
                <List.Item style={{ padding: 0 }}>
                  <div className="p-4 w-full bg-yellow-50 flex items-center justify-between rounded-lg shadow-md h-32 overflow-hidden">
                    <div className="basis-2/3">
                      <h2 className="font-bold text-xl">{item.title}</h2>
                      <p className="font-bold ">Рівень: {levels[item.level]}</p>
                    </div>
                    <div className="basis-1/3 flex items-center justify-center rounded-md overflow-hidden">
                      <img
                        className="h-24 object-contain"
                        src={item.image}
                        alt="exercise image"
                        onError={(e) => (e.target.src = "/img/logo-bird.png")}
                      />
                    </div>
                  </div>
                </List.Item>
              </Link>
            )}
          </VirtualList>
        </List>
      ) : null}
      {isSuccess && trainings.length === 0 && (
        <Empty description={"Тренувань поки що немає"} />
      )}
      <Filter />
    </MainLayout>
  );
};
