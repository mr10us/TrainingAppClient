import React, { useEffect, useMemo, useState } from "react";
import { MainLayout } from "../../../layouts/MainLayout";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  App,
  Button,
  Flex,
  Form,
  Input,
  Select,
  TimePicker,
  Upload,
} from "antd";
import { FaPlus } from "react-icons/fa";
import { PageHeader } from "@components/PageHeader";
import { genders, levels } from "@consts";
import { getExercises } from "@http/exerciseApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader } from "@components/UI/Loader";
import {
  DndContext,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { SortableExercises } from "@components/SortableExercises";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const CreateTraining = () => {
  const [photo, setPhoto] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const query = "";
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const handleFetchPhoto = ({ file, onSuccess, onError }) => {
    if (file.type.startsWith("image/")) {
      setPhoto({ file: file, url: URL.createObjectURL(file) });
      onSuccess();
    } else {
      onError();
      message.error("Для завантаження доступні тільки зображення");
    }
  };

  const handleCreateTraining = () => {
    console.log("done");
  };

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getExercises", query],
    queryFn: ({ pageParam = 1, signal }) =>
      getExercises(pageParam, query, signal),
    initialPageParam: 1,
    getNextPageParam: ({ totalPages, currentPage }, pages) => {
      if (totalPages !== currentPage) return currentPage + 1;
      return null;
    },
  });

  useEffect(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, data]);

  const exercises = useMemo(() => {
    return isSuccess
      ? data.pages.map((result) => result.exercises).flat()
      : null;
  }, [isSuccess, data]);

  const handleExerciseSelect = ({ value }) => {
    const selectedExercise = exercises.find(
      (exercise) => exercise.id === value
    );
    setSelectedExercises((prevState) => [...prevState, selectedExercise]);
  };

  const getExerciseId = (id) =>
    selectedExercises.findIndex((exercise) => exercise.id === id);

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setSelectedExercises((prev) => {
        const originalPos = getExerciseId(active.id);
        const newPos = getExerciseId(over.id);

        return arrayMove(prev, originalPos, newPos);
      });
    }
  };

  const handleExerciseRemove = (exerciseId) => {
    const filteredExercises = selectedExercises.filter(
      (exercise) => exercise.id !== exerciseId
    );
    setSelectedExercises(filteredExercises);

    const formExerciseValues = filteredExercises.map((exercise) => ({
      label: exercise.title,
      value: exercise.id,
    }));
    form.setFieldValue("exercises", formExerciseValues);
  };

  return (
    <MainLayout>
      <PageHeader size={"medium"} title={"Створити тренування"} />
      {isLoading && <Loader />}
      {isSuccess && (
        <Form
          form={form}
          size="large"
          layout="vertical"
          className="m-8"
          labelCol={{ push: 1 }}
          onFinish={handleCreateTraining}
          preserve
        >
          <Flex vertical justify="space-between">
            <Form.Item name="title" label="Назва тренування">
              <Input placeholder={"Введіть назву тренування"} />
            </Form.Item>
            <Form.Item name="content" label="Опис тренування">
              <Input.TextArea
                rows={3}
                placeholder={"Введіть опис тренування"}
              />
            </Form.Item>
            <Form.Item
              valuePropName="fileList"
              getValueFromEvent={normFile}
              label="Превʼю"
            >
              {photo?.url ? (
                <img
                  src={photo?.url}
                  className="w-full object-cover"
                  alt="training preview"
                />
              ) : (
                <Upload
                  customRequest={handleFetchPhoto}
                  accept="image/*"
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
                      завантажити превʼю
                    </p>
                  </button>
                </Upload>
              )}
            </Form.Item>
            <Form.Item name="level" label="Рівень">
              <Select
                placeholder={"Оберіть рівень для тренування"}
                labelInValue
                allowClear
              >
                {Object.entries(levels).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="gender" label="Гендер">
              <Select
                placeholder={"Оберіть гендер тренування"}
                labelInValue
                allowClear
              >
                {Object.entries(genders).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="execTime" label="Час на виконання">
              <TimePicker
                minuteStep={5}
                secondStep={10}
                hourStep={1}
                className="w-full"
                showNow={false}
              />
            </Form.Item>
            <Form.Item name="exercises" label="Вправи">
              <Select
                mode="multiple"
                maxTagCount="responsive"
                placeholder="Оберіть вправи"
                labelInValue
                allowClear
                showSearch
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
                onSelect={handleExerciseSelect}
                onDeselect={({ value }) => handleExerciseRemove(value)}
              >
                {exercises.map((exercise) => (
                  <Select.Option key={exercise.id} value={exercise.id}>
                    {exercise.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {selectedExercises.length > 0 ? (
              <div className="mb-8">
                <DndContext
                  modifiers={[restrictToVerticalAxis]}
                  sensors={sensors}
                  collisionDetection={closestCorners}
                  onDragEnd={handleDragEnd}
                >
                  <SortableExercises items={selectedExercises}>
                    {selectedExercises.map((exercise, index) => (
                      <SortableExercises.Exercise
                        key={exercise.id}
                        id={exercise.id}
                        ordinalNum={index + 1}
                        title={exercise.title}
                        content={exercise.content}
                        video={exercise.video}
                        categories={exercise.categories}
                        types={exercise.types}
                        onRemove={handleExerciseRemove}
                      />
                    ))}
                  </SortableExercises>
                </DndContext>
              </div>
            ) : null}
            <Button
              type="primary"
              block
              htmlType="submit"
              className="shadow mb-4"
            >
              Створити
            </Button>
          </Flex>
        </Form>
      )}
    </MainLayout>
  );
};
