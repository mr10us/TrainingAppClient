import React, { useEffect, useMemo, useState } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { App, Button, Flex, Form, Input, Select, Upload } from "antd";
import { FaPlus } from "react-icons/fa";
import { BigPlayButton, ControlBar, Player } from "video-react";
import { PageHeader } from "@components/PageHeader";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteExercise, editExercise, getExercise } from "@http/exerciseApi";
import { getTypes } from "@http/typeApi";
import { getCategories } from "@http/categoryApi";
import { Tag } from "@components/UI/Tag";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "@consts";
import { Loader } from "@components/UI/Loader";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteVideo } from "@http/mediaApi";
import { CustomPlayer } from "@components/UI/CustomPlayer";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const EditExercise = () => {
  const [video, setVideo] = useState(null);

  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [exerciseID] = pathname.split("/").filter(Number);

  const handleFetchVideo = ({ file, onSuccess, onError }) => {
    if (file.type.startsWith("video/")) {
      setVideo((prev) => ({
        ...prev,
        file: file,
        url: URL.createObjectURL(file),
      }));
      onSuccess();
    } else {
      onError();
      message.error("Для завантаження доступні тільки відео");
    }
  };
  const handleDeleteVideo = () => {
    modal.confirm({
      title: "Підтвердіть видалення",
      content: `Ви впевнені, що бажаєте видалити відео?`,
      okText: "Так",
      cancelText: "Скасувати",
      onOk: () => {
        if (video.url.startsWith("blob"))
          setVideo((prev) => ({
            ...prev,
            url: null,
            file: null,
            isNew: true,
            old: prev.old,
          }));
        else
          setVideo((prev) => ({
            ...prev,
            url: null,
            file: null,
            isNew: true,
            old: prev.url,
          }));
      },
    });
  };

  const { isLoading, isSuccess, data, isError, error } = useQuery({
    queryKey: ["getExercise"],
    queryFn: ({ signal }) => getExercise(signal, exerciseID),
  });
  useMemo(() => {
    isSuccess &&
      (form.setFieldsValue({
        title: data.title,
        content: data.content,
        types: data?.types
          ? data.types.map((type) => ({ label: type.name, value: type.id }))
          : [],
        categories: data?.categories
          ? data.categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))
          : [],
      }),
      setVideo({ file: null, url: data.video }));
  }, [isSuccess, data]);

  const handleEditExercise = async ({ title, content, types, categories }) => {
    const typeIds = types.map((type) => type.value);
    const categoryIds = categories.map((category) => category.value);

    if (!video.file && video.isNew) {
      throw Error("Завантажте відео");
    } else
      await editExercise(
        null,
        exerciseID,
        title,
        content,
        video.file,
        typeIds,
        categoryIds
      );
  };

  const {
    isLoading: isLoadingTypes,
    isSuccess: isSuccessTypes,
    data: typesData,
    hasNextPage: hasNextTypes,
    fetchNextPage: fetchNextTypes,
  } = useInfiniteQuery({
    queryKey: ["getTypes"],
    queryFn: ({ pageParam = 1, signal }) => getTypes(pageParam, null, signal),
    initialPageParam: 1,
    getNextPageParam: ({ totalPages, currentPage }) => {
      if (totalPages !== currentPage) return currentPage + 1;
      return null;
    },
  });

  useEffect(() => {
    if (hasNextTypes) fetchNextTypes();
  }, [hasNextTypes]);

  const types = useMemo(
    () =>
      isSuccessTypes
        ? typesData.pages.map((response) => response.types).flat()
        : [],
    [isSuccessTypes, typesData]
  );

  const selectedTypes = Form.useWatch("types", form);

  const handleCloseTypeTag = (removedTag) => {
    const newTags = selectedTypes.filter(
      ({ value: tag }) => tag !== removedTag
    );
    form.setFieldsValue({ types: newTags });
  };

  const {
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
    data: categoriesData,
    hasNextPage: hasNextCategories,
    fetchNextPage: fetchNextCategories,
  } = useInfiniteQuery({
    queryKey: ["getCategories"],
    queryFn: ({ pageParam = 1, signal }) =>
      getCategories(pageParam, null, signal),
    initialPageParam: 1,
    getNextPageParam: ({ totalPages, currentPage }) => {
      if (totalPages !== currentPage) return currentPage + 1;
      return null;
    },
  });

  useEffect(() => {
    if (hasNextCategories) fetchNextCategories();
  }, [hasNextCategories]);

  const categories = useMemo(
    () =>
      isSuccessCategories
        ? categoriesData.pages.map((response) => response.categories).flat()
        : [],
    [isSuccessCategories, categoriesData]
  );

  const selectedCategories = Form.useWatch("categories", form);

  const handleCloseCategoryTag = (removedTag) => {
    const newTags = selectedCategories.filter(
      ({ value: tag }) => tag !== removedTag
    );

    form.setFieldsValue({ categories: newTags });
  };

  const mutation = useMutation({
    mutationFn: handleEditExercise,
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Вправа успішно оновлена!");
      navigate(routes.ADMIN_EXERCISES);
    },
  });

  const handleDeleteExercise = async () => {
    await deleteExercise(null, exerciseID);
  };

  const deleteExerciseMutation = useMutation({
    mutationFn: handleDeleteExercise,
    mutationKey: ["getExercises"],
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Вправу успішно видалено!");
      navigate(routes.ADMIN_EXERCISES);
    },
  });

  const handleDelete = () => {
    modal.confirm({
      title: "Підтвердіть видалення",
      content: `Ви впевнені, що бажаєте видалити вправу "${data.title}"?`,
      okText: "Так",
      cancelText: "Скасувати",
      onOk: () => deleteExerciseMutation.mutate(),
    });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["getExercise"], exact: true });
    };
  }, []);

  useEffect(() => {
    return () => {
      video?.isNew && video?.file && deleteVideo(null, video.old);
    };
  }, [video]);

  return (
    <MainLayout>
      <PageHeader size={"medium"} title={"Редагувати вправу"} />
      {isLoading && <Loader />}
      {isSuccess && (
        <Form
          size="large"
          layout="vertical"
          className="m-8"
          labelCol={{ push: 1 }}
          requiredMark={false}
          onFinish={mutation.mutate}
          form={form}
          preserve
        >
          <Flex justify="space-between" vertical>
            <Form.Item
              name="title"
              label="Назва"
              rules={[
                {
                  required: true,
                  message: "Введіть назву вправи",
                },
              ]}
            >
              <Input placeholder="Введіть назву вправи" className="shadow" />
            </Form.Item>
            <Form.Item
              name="content"
              label="Опис"
              rules={[
                {
                  required: true,
                  message: "Введіть опис вправи",
                },
              ]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Опис вправи"
                className="shadow"
              />
            </Form.Item>
            <Form.Item
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label="Відео"
            >
              {video?.url ? (
                <div className="w-full relative">
                  <CustomPlayer src={video.url} />
                  <div
                    className="absolute top-5 right-5"
                    onClick={handleDeleteVideo}
                  >
                    <RiDeleteBin2Line size={50} className="text-gray-200 cursor-pointer" />
                  </div>
                </div>
              ) : (
                <Upload
                  customRequest={handleFetchVideo}
                  accept="video/*"
                  showUploadList={false}
                  multiple={false}
                  listType="picture-card"
                >
                  <button
                    className="flex flex-col items-center gap-2"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FaPlus size={30} className="text-yellow-300 drop-shadow" />
                    <p className="text-gray-100 drop-shadow">
                      завантажити відео
                    </p>
                  </button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item name="types" label="Типи">
              <Select
                mode="multiple"
                maxTagTextLength={5}
                placeholder="Оберіть тип вправи"
                allowClear
                labelInValue
                maxTagCount="responsive"
                placement="topLeft"
                loading={isLoadingTypes}
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.children ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.children ?? "").toLowerCase())
                }
              >
                {types.map((type) => (
                  <Select.Option key={type.id} value={type.id}>
                    {type.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Flex gap={"small"} wrap="wrap" style={{ marginBottom: "2rem" }}>
              {selectedTypes
                ? selectedTypes.map((type) => (
                    <Tag
                      key={type.value}
                      tagID={type.value}
                      handleClose={handleCloseTypeTag}
                    >
                      {type.label}
                    </Tag>
                  ))
                : null}
            </Flex>
            <Form.Item name="categories" label="Категорії">
              <Select
                loading={isLoadingCategories}
                mode="multiple"
                labelInValue
                maxTagTextLength={5}
                placeholder="Оберіть категорію вправи"
                allowClear
                maxTagCount="responsive"
                placement="topLeft"
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.children ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.children ?? "").toLowerCase())
                }
              >
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Flex gap={"small"} wrap="wrap" style={{ marginBottom: "2rem" }}>
              {selectedCategories
                ? selectedCategories.map((category) => (
                    <Tag
                      key={category.value}
                      tagID={category.value}
                      handleClose={handleCloseCategoryTag}
                    >
                      {category.label}
                    </Tag>
                  ))
                : null}
            </Flex>
            <Flex vertical gap={"middle"}>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={mutation.isPending}
                disabled={mutation.isPending}
                className="shadow"
              >
                Редагувати
              </Button>
              <Button
                type="primary"
                block
                danger
                loading={deleteExerciseMutation.isPending}
                disabled={deleteExerciseMutation.isPending}
                className="shadow mb-8"
                onClick={handleDelete}
              >
                Видалити
              </Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </MainLayout>
  );
};
