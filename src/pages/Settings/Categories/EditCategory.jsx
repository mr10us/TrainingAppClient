import React, { useEffect } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { App, Button, Flex, Form, Input, Space } from "antd";
import { PageHeader } from "@components/PageHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, editCategory, getCategory } from "@http/categoryApi";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@components/UI/Loader";
import { routes } from "@consts";

export const EditCategory = () => {
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [categoryID] = pathname.split("/").filter(Number);

  const handleEditCategory = async ({ name }) => {
    await editCategory(null, categoryID, name);
  };
  const { isLoading, isSuccess, data, isError, error } = useQuery({
    queryKey: ["getCategory"],
    queryFn: ({ signal }) => getCategory(signal, categoryID),
  });

  const handleDeleteCategory = async () => {
    await deleteCategory(null, categoryID);
  };

  const editCategoryMutation = useMutation({
    mutationFn: handleEditCategory,
    mutationKey: ["getCategories"],
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Категорію успішно оновлено!");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: handleDeleteCategory,
    mutationKey: ["getCategories"],
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Категорію успішно видалено!");
      navigate(routes.ADMIN_CATEGORIES)
    },
  });

  const handleDelete = () => {
    modal.confirm({
      title: "Підтвердіть видалення",
      content: `Ви впевнені, що бажаєте видалити категорію "${data.name}"?`,
      okText: "Так",
      cancelText: "Скасувати",
      onOk: () => deleteCategoryMutation.mutate(),
    });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["getCategory"], exact: true });
    };
  }, []);

  return (
    <MainLayout>
      <PageHeader size={"large"} title={"Редагувати категорію"} />
      {isLoading && <Loader />}
      {isSuccess && (
        <Form
          size="large"
          layout="vertical"
          className="m-8"
          style={{ height: "calc(100vh - 124px)" }}
          labelCol={{ push: 1 }}
          requiredMark={false}
          initialValues={{ name: data.name }}
          onFinish={editCategoryMutation.mutate}
          form={form}
          preserve
        >
          <Flex
            justify="space-between"
            vertical
            style={{ height: "calc(100vh - 124px)" }}
          >
            <Form.Item
              name="name"
              label="Назва"
              rules={[
                {
                  required: true,
                  message: "Введіть назву категорії",
                },
              ]}
            >
              <Input placeholder="Введіть назву категорії" className="shadow" />
            </Form.Item>

            <Flex vertical gap={"middle"}>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={editCategoryMutation.isLoading}
                className="shadow"
              >
                Редагувати
              </Button>
              <Button block type="primary" danger onClick={handleDelete}>
                Видалити
              </Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </MainLayout>
  );
};
