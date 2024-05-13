import React from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { App, Button, Flex, Form, Input } from "antd";
import { PageHeader } from "@components/PageHeader";
import { useMutation } from "@tanstack/react-query";
import { createCategory } from "@http/categoryApi";
import { useNavigate } from "react-router-dom";
import { routes } from "@consts";

export const CreateCategory = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleCreateCategory = async ({ name }) => {
    await createCategory(null, name);
  };

  const mutation = useMutation({
    mutationFn: handleCreateCategory,
    mutationKey: ["getCategories"],
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Категорія успішно створена!");
      navigate(routes.ADMIN_CATEGORIES);
    },
  });

  return (
    <MainLayout>
      <PageHeader size={"large"} title={"Створити категорію"} />
      <Form
        size="large"
        layout="vertical"
        className="m-8"
        labelCol={{ push: 1 }}
        style={{ height: "calc(100vh - 124px)" }}
        requiredMark={false}
        onFinish={mutation.mutate}
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

          <Button
            type="primary"
            block
            htmlType="submit"
            className="shadow my-8"
          >
            Створити
          </Button>
        </Flex>
      </Form>
    </MainLayout>
  );
};
