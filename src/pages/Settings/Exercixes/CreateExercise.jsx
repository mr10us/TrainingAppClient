import React, { useEffect, useMemo, useState } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { App, Button, Flex, Form, Input, Select, Upload } from "antd";
import { FaPlus } from "react-icons/fa";
import { BigPlayButton, ControlBar, Player } from "video-react";
import { PageHeader } from "@components/PageHeader";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { createExercise } from "@http/exerciseApi";
import { getTypes } from "@http/typeApi";
import { getCategories } from "@http/categoryApi";
import { Tag } from "@components/UI/Tag";
import { CustomPlayer } from "@components/UI/CustomPlayer";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const CreateExercise = () => {
  const [video, setVideo] = useState(null);

  const { message } = App.useApp();
  const [form] = Form.useForm();

  const handleFetchVideo = ({ file, onSuccess, onError }) => {
    if (file.type.startsWith("video/")) {
      onSuccess();
      setVideo({ file: file, url: URL.createObjectURL(file) });
    } else {
      onError();
      message.error("Для завантаження доступні тільки відео");
    }
  };

  const handleCreateExercise = async ({title, content, types, categories}) => {
    if (!video) return message.error("Завантажте відео");
    await createExercise(null, title, content, video.file, types, categories);
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
    const newTags = selectedTypes.filter((tag) => tag !== removedTag);
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
    const newTags = selectedCategories.filter((tag) => tag !== removedTag);
    form.setFieldsValue({ categories: newTags });
  };

  const mutation = useMutation({
    mutationFn: handleCreateExercise,
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Вправа успішно створена!");
      setVideo(null);
      form.resetFields();
    },
  });

  return (
    <MainLayout>
      <PageHeader size={"large"} title={"Створити вправу"} />
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
              <div className="w-full">
                <CustomPlayer src={video.url} />
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
                  <p className="text-gray-100 drop-shadow">завантажити відео</p>
                </button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item name="types" label="Типи">
            <Select
              mode="multiple"
              placeholder="Оберіть тип вправи"
              allowClear
              maxTagCount="responsive"
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
                <Select.Option key={type.id}>{type.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Flex gap={"small"} wrap="wrap">
            {selectedTypes
              ? selectedTypes.map((typeID) => {
                  const { name: typeName } = types.find(
                    (type) => type.id == typeID
                  );
                  return (
                    <Tag
                      key={typeID}
                      tagID={typeID}
                      handleClose={handleCloseTypeTag}
                    >
                      {typeName}
                    </Tag>
                  );
                })
              : null}
          </Flex>
          <Form.Item name="categories" label="Категорії">
            <Select
              loading={isLoadingCategories}
              mode="multiple"
              placeholder="Оберіть категорію вправи"
              allowClear
              maxTagCount="responsive"
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
                <Select.Option key={category.id}>{category.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Flex gap={"small"} wrap="wrap">
            {selectedCategories
              ? selectedCategories.map((categoryID) => {
                  const { name: categoryName } = categories.find(
                    (category) => category.id == categoryID
                  );
                  return (
                    <Tag
                      key={categoryID}
                      tagID={categoryID}
                      handleClose={handleCloseCategoryTag}
                    >
                      {categoryName}
                    </Tag>
                  );
                })
              : null}
          </Flex>
          <Button
            type="primary"
            block
            htmlType="submit"
            loading={mutation.isLoading}
            className="shadow my-8"
          >
            Створити
          </Button>
        </Flex>
      </Form>
    </MainLayout>
  );
};
