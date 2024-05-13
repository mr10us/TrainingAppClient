import { routes } from "@consts";
import { MainLayout } from "../../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { PageHeader } from "@components/PageHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { List } from "antd";
import { IoAdd } from "react-icons/io5";
import VirtualList from "rc-virtual-list";
import { Filter } from "@components/Filter";
import { getCategories } from "@http/categoryApi";

const containerHeight = window.innerHeight - 128;

export const Categories = () => {
  const query = "";

  const { data, isLoading, isSuccess, isError, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["getCategories", query],
      queryFn: ({ pageParam = 1, signal }) =>
        getCategories(pageParam, query, signal),
      initialPageParam: 1,
      getNextPageParam: ({ totalPages, currentPage }, pages) => {
        if (totalPages !== currentPage) return currentPage + 1;
        return null;
      },
    });

  const categories = useMemo(() => {
    return isSuccess ? data.pages.map((result) => result.categories).flat() : null;
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
        title="Типи"
        extra={
          <Link to={routes.CREATE_CATEGORIES}>
            <IoAdd size={40} className="text-gray-100" />
          </Link>
        }
      />
      <List loading={isLoading} className="m-4">
        <VirtualList
          data={categories}
          height={containerHeight}
          itemKey="id"
          onScroll={onScroll}
        >
          {(item) => (
            <Link
              to={routes.ADMIN_CATEGORIES + item.id}
              key={item.id}
              className="my-3"
            >
              <List.Item style={{ padding: 0 }}>
                <div className="p-4 w-full bg-yellow-50 flex items-center justify-between rounded-lg shadow-md overflow-hidden">
                  <p className="font-bold text-xl">{item.name}</p>
                </div>
              </List.Item>
            </Link>
          )}
        </VirtualList>
      </List>
      <Filter />
    </MainLayout>
  );
};
