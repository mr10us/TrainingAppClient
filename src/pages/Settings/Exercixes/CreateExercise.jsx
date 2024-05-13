import React, { useState } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { App, Button, Flex, Form, Input, Upload } from "antd";
import { FaPlus } from "react-icons/fa";
import { BigPlayButton, ControlBar, Player } from "video-react";
import { PageHeader } from "@components/PageHeader";
import { useMutation } from "@tanstack/react-query";
import { createExercise } from "@http/exerciseApi";

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

  const handleCreateExercise = async ({ title, content }) => {
    if (!video) return message.error("Завантажте відео");
    
    await createExercise(null, title, content, video.file);
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
    }
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
              <Player src={video.url}>
                <ControlBar disableCompletely />
                <BigPlayButton position="center" />
              </Player>
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
        <Button type="primary" block htmlType="submit" className="shadow my-8">
          Створити
        </Button>
      </Form>
    </MainLayout>
  );
};
