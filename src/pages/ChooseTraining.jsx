import { MainLayout } from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { genders, levels, routes } from "@consts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getTrainings } from "@http/trainingApi";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@components/PageHeader";
import { Filter } from "@components/Filter";
import { Loader } from "@components/UI/Loader";
import { Badge, List } from "antd";
import VirtualList from "rc-virtual-list";
import { Rating } from "@components/UI/Rating";
import { getTypes } from "@http/typeApi";
import { getCategories } from "@http/categoryApi";
import { motion } from "framer-motion";
import { Empty } from "@components/UI/Empty";

const containerHeight = window.innerHeight - 128;

export const ChooseTraining = () => {
  const [query, setQuery] = useState("");

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

  const {
    data: typesData,
    isLoading: isLoadingTypes,
    isSuccess: isSuccessTypes,
    isError: isErrorTypes,
    error: errorTypes,
    fetchNextPage: fetchNextTypes,
    hasNextPage: hasNextTypes,
  } = useInfiniteQuery({
    queryKey: ["getTypes"],
    queryFn: ({ pageParam = 1, signal }) => getTypes(pageParam, "", signal),
    initialPageParam: 1,
    getNextPageParam: ({ totalPages, currentPage }) => {
      if (totalPages !== currentPage) return currentPage + 1;
      return null;
    },
  });

  useEffect(() => {
    if (hasNextTypes) fetchNextTypes();
  }, [typesData, hasNextTypes]);

  const types = useMemo(
    () =>
      isSuccessTypes ? typesData.pages.map((page) => page.types).flat() : [],
    [isSuccessTypes, typesData]
  );

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
    isError: isErrorCategories,
    error: errorCategories,
    fetchNextPage: fetchNextCategories,
    hasNextPage: hasNextCategories,
  } = useInfiniteQuery({
    queryKey: ["getCategories"],
    queryFn: ({ pageParam = 1, signal }) =>
      getCategories(pageParam, "", signal),
    initialPageParam: 1,
    getNextPageParam: ({ totalPages, currentPage }) => {
      if (totalPages !== currentPage) return currentPage + 1;
      return null;
    },
  });

  useEffect(() => {
    if (hasNextCategories) fetchNextCategories();
  }, [categoriesData, hasNextCategories]);

  const categories = useMemo(
    () =>
      isSuccessCategories
        ? categoriesData.pages.map((page) => page.categories).flat()
        : [],
    [isSuccessCategories, categoriesData]
  );

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

  const springTransition = (delay) => ({
    type: "spring",
    stiffness: 300,
    damping: 20,
    delay,
  });

  const items = (delay) => ({
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: springTransition(delay),
    },
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.5,
    },
  });

  const filterItems = useMemo(
    () => [
      {
        key: "level",
        label: "Рівень",
        type: "level",
        children: (
          <Filter.Checkbox
            buttons={Object.entries(levels).map(([key, value]) => ({
              value: key,
              children: <p>{value}</p>,
            }))}
          />
        ),
      },
      {
        key: "gender",
        label: "Стать",
        type: "gender",
        children: (
          <Filter.Checkbox
            buttons={Object.entries(genders).map(([key, value]) => ({
              value: key,
              children: <p>{value}</p>,
            }))}
          />
        ),
      },
      {
        key: "rating",
        label: "Рейтинг",
        type: "rating",
        children: (
          <Filter.Radio
            buttons={[
              { value: "high", children: <p>Високий</p> },
              { value: "middle", children: <p>Середній</p> },
              { value: "low", children: <p>Низький</p> },
            ]}
          />
        ),
      },
      {
        key: "categories",
        label: "Категорії",
        type: "categories",
        children: (
          <Filter.Checkbox
            buttons={categories.map((category) => ({
              value: category.id,
              children: <p>{category.name}</p>,
            }))}
          />
        ),
      },
      {
        key: "types",
        label: "Типи",
        type: "types",
        children: (
          <Filter.Checkbox
            buttons={types.map((type) => ({
              value: type.id,
              children: <p>{type.name}</p>,
            }))}
          />
        ),
      },
    ],
    [types, categories]
  );

  return (
    <MainLayout>
      <PageHeader title={"Тренування"} size={"medium"} />
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          {trainings?.length > 0 ?
            <List className="m-4">
              <VirtualList
                data={trainings}
                height={containerHeight}
                itemKey="id"
                onScroll={onScroll}
              >
                {(item, idx) => {
                  const delay =
                    (idx + 1) % 10 === 0 ? 1 : ((idx + 1 + 1) % 10) * 0.1;
                  return (
                    <motion.span
                      className="my-2 px-4 bg-yellow-50 rounded-lg shadow-md"
                      variants={items(delay)}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link to={routes.TRAININGS_LIST + item.id + "/preview/"}>
                        <Badge.Ribbon text={genders[item.gender]}>
                          <List.Item className="flex items-center justify-between w-full">
                            <div className="basis-2/3 text-gray-950">
                              <h2 className="font-bold text-lg">
                                {item.title}
                              </h2>
                              <p>
                                Час виконання: <i>{item.exec_time}</i>
                              </p>
                              <p>Тип: {levels[item.level]}</p>
                              <div className="mt-1">
                                <Rating
                                  rating={item.rating}
                                  readOnly
                                  allowHalf
                                />
                              </div>
                            </div>
                            <div className="basis-1/3 flex justify-center">
                              <img
                                className="rounded-md h-24 object-contain"
                                src={item.image}
                                alt="training image"
                                onError={(e) =>
                                  (e.target.src = import.meta.env.VITE_DEFAULT_PIC)
                                }
                              />
                            </div>
                          </List.Item>
                        </Badge.Ribbon>
                      </Link>
                    </motion.span>
                  );
                }}
              </VirtualList>
            </List>
          : <Empty description={"Пусто"}/>}
          <Filter filterItems={filterItems} query={query} setQuery={setQuery} />
        </>
      )}
    </MainLayout>
  );
};
