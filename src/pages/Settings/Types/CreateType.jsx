import React from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { App, Button, Flex, Form, Input } from "antd";
import { PageHeader } from "@components/PageHeader";
import { useMutation } from "@tanstack/react-query";
import { createType } from "@http/typeApi";
import { useNavigate } from "react-router-dom";
import { routes } from "@consts";

export const CreateType = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleCreateType = async ({ name }) => {
    await createType(null, name);
  };

  const mutation = useMutation({
    mutationFn: handleCreateType,
    mutationKey: ["getTypes"],
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Тип успішно створений!");
      navigate(routes.ADMIN_TYPES);
    },
  });

  return (
    <MainLayout>
      <PageHeader size={"large"} title={"Створити тип"} />
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
                message: "Введіть назву типу",
              },
            ]}
          >
            <Input placeholder="Введіть назву типу" className="shadow" />
          </Form.Item>

          <Button
            type="primary"
            block
            htmlType="submit"
            disabled={mutation.isPending}
            loading={mutation.isPending}
            className="shadow my-8"
          >
            Створити
          </Button>
        </Flex>
      </Form>
    </MainLayout>
  );
};
