import React, { useState } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { App, Button, Flex, Form, Input, Upload } from "antd";
import { FaPlus } from "react-icons/fa";
import { BigPlayButton, ControlBar } from "video-react";
import { PageHeader } from "@components/PageHeader";
import BackButton from "@components/UI/BackButton";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const CreateTraining = () => {
  const [video, setVideo] = useState(null);

  const { message } = App.useApp();
  const createExerciseForm = Form.useForm();

  const handleSaveVideo = (info) => {
    if (info.file.status !== "uploading") {
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const handleFetchVideo = ({ file, onSuccess, onError }) => {
    if (file.type.startsWith("video/")) {
      onSuccess();
      setVideo({ file: file, url: URL.createObjectURL(file) });
    } else {
      onError();
      message.error("Для завантаження доступні тільки відео");
    }
  };

  const handleCreateExercise = () => {
    console.log("done");
  };

  return (
    <MainLayout style={{ overflowX: "scroll" }}>
      <Flex justify="space-around" vertical style={{ height: "100%" }}>
        <Flex align="center">
          <div className="ml-4 px-4">
            <BackButton
              withIcon
              withText={false}
              withBG={false}
              withPadding={false}
            />
          </div>
          <PageHeader size={"large"} text={"Створити тренування"} />
        </Flex>
        <Form
          size="large"
          layout="vertical"
          className="m-8"
          labelCol={{ push: 1 }}
          onFinish={handleCreateExercise}
          preserve
        >
          <Form.Item name="title" label="Назва">
            <Input placeholder="Введіть назву вправи" className="shadow" />
          </Form.Item>
          <Form.Item name="content" label="Опис">
            <Input placeholder="Опис вправи" className="shadow" />
          </Form.Item>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            label="Відео"
          >
            {video?.url ? (
              <Player src={video.url}>
                <ControlBar disableCompletely />
                <BigPlayButton position="center" />
              </Player>
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
          <Button type="primary" block htmlType="submit" className="shadow">
            Створити
          </Button>
        </Form>
      </Flex>
    </MainLayout>
  );
};
