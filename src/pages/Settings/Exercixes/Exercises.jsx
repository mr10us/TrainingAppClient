import { routes } from "@consts";
import { MainLayout } from "../../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { PageHeader } from "@components/PageHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getExercises } from "@http/exerciseApi";
import { useMemo } from "react";
import { List } from "antd";
import { Empty } from "@components/UI/Empty";
import { IoAdd } from "react-icons/io5";
import VirtualList from "rc-virtual-list";
import { Filter } from "@components/Filter";
import { Loader } from "@components/UI/Loader";

const containerHeight = window.innerHeight - 128;

export const Exercises = () => {
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
    queryKey: ["getExercises", query],
    queryFn: ({ pageParam = 1, signal }) =>
      getExercises(pageParam, query, signal),
    initialPageParam: 1,
    getNextPageParam: ({ totalPages, currentPage }, pages) => {
      if (totalPages !== currentPage) return currentPage + 1;
      return null;
    },
  });

  const exercises = useMemo(() => {
    return isSuccess
      ? data.pages.map((result) => result.exercises).flat()
      : null;
  }, [isSuccess, data]);

  const onScroll = (e) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          containerHeight
      ) <= 1
    ) {
      fetchNextPage();
    }
  };

  const filterOptions = [{ key: "" }];

  return (
    <MainLayout>
      <PageHeader
        title="Вправи"
        extra={
          <Link to={routes.CREATE_EXERCISE}>
            <IoAdd size={40} className="text-gray-100" />
          </Link>
        }
      />
      {isLoading && <Loader />}
      {isSuccess && exercises.length > 0 ? (
        <List className="m-4">
          <VirtualList
            data={exercises}
            height={containerHeight}
            itemKey="id"
            onScroll={onScroll}
          >
            {(item) => (
              <Link
                to={routes.ADMIN_EXERCISES + item.id}
                key={item.id}
                className="my-3"
              >
                <List.Item style={{ padding: 0 }}>
                  <div className="p-4 w-full bg-yellow-50 flex items-center justify-between rounded-lg shadow-md h-32 overflow-hidden">
                    <div className="basis-2/3">
                      <p className="font-bold text-xl">{item.title}</p>
                    </div>
                    <div className="basis-1/3 flex items-center justify-center">
                      <img
                        className="rounded-md h-24 object-contain"
                        src={item.preview}
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
      {isSuccess && exercises.length === 0 && (
        <Empty description={"Вправ поки що немає"} />
      )}
      <Filter />
    </MainLayout>
  );
};
