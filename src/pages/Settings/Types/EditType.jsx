import React, { useEffect } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { App, Button, Flex, Form, Input, Space } from "antd";
import { PageHeader } from "@components/PageHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteType, editType, getType } from "@http/typeApi";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "@components/UI/Loader";
import { routes } from "@consts";

export const EditType = () => {
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [typeID] = pathname.split("/").filter(Number);

  const handleEditType = async ({ name }) => {
    await editType(null, typeID, name);
  };
  const { isLoading, isSuccess, data, isError, error } = useQuery({
    queryKey: ["getType"],
    queryFn: ({ signal }) => getType(signal, typeID),
  });

  const handleDeleteType = async () => {
    await deleteType(null, typeID);
  };

  const editTypeMutation = useMutation({
    mutationFn: handleEditType,
    mutationKey: ["getTypes"],
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Тип успішно оновлено!");
    },
  });

  const deleteTypeMutation = useMutation({
    mutationFn: handleDeleteType,
    mutationKey: ["getTypes"],
    onError: (error) => {
      message.error(error.message);
    },
    onSuccess: () => {
      message.success("Тип успішно видалено!");
      navigate(routes.ADMIN_TYPES);
    },
  });

  const handleDelete = () => {
    modal.confirm({
      title: "Підтвердіть видалення",
      content: `Ви впевнені, що бажаєте видалити тип "${data.name}"?`,
      okText: "Так",
      cancelText: "Скасувати",
      onOk: () => deleteTypeMutation.mutate(),
    });
  };

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["getType"], exact: true });
    };
  }, []);

  return (
    <MainLayout>
      <PageHeader size={"large"} title={"Редагувати тип"} />
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
          onFinish={editTypeMutation.mutate}
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

            <Flex vertical gap={"middle"}>
              <Button
                type="primary"
                block
                htmlType="submit"
                disabled={editTypeMutation.isPending}
                loading={editTypeMutation.isPending}
                className="shadow"
              >
                Редагувати
              </Button>
              <Button
                block
                type="primary"
                danger
                onClick={handleDelete}
                loading={deleteTypeMutation.isPending}
                disabled={deleteTypeMutation.isPending}
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
