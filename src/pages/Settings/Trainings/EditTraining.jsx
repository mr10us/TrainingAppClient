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
import { genders, levels, routes } from "@consts";
import { getExercises } from "@http/exerciseApi";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
import { useNavigate } from "react-router-dom";
import { getExecTime } from "@utils/getExecutionTime";
import { deleteTraining, editTraining, getTraining } from "@http/trainingApi";
import { useCurrentPage } from "@hooks/useCurrentPage";
import dayjs from "dayjs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteImage } from "@http/mediaApi";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const EditTraining = () => {
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
  const { message, modal } = App.useApp();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const trainingID = useCurrentPage();
  const queryClient = useQueryClient();

  const handleFetchPhoto = ({ file, onSuccess, onError }) => {
    if (file.type.startsWith("image/")) {
      setPhoto((prev) => ({
        ...prev,
        file: file,
        url: URL.createObjectURL(file),
      }));
      onSuccess();
    } else {
      onError();
      message.error("Для завантаження доступні тільки зображення");
    }
  };

  const handleDeletePhoto = () => {
    modal.confirm({
      title: "Підтвердіть видалення",
      content: `Ви впевнені, що бажаєте видалити фото?`,
      okText: "Так",
      cancelText: "Скасувати",
      onOk: () => {
        if (photo.url.startsWith("blob"))
          setPhoto((prev) => ({
            ...prev,
            url: null,
            file: null,
            isNew: true,
            old: prev.old,
          }));
        else
          setPhoto((prev) => ({
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
    queryKey: ["getTraining"],
    queryFn: ({ signal }) => getTraining(signal, trainingID),
  });

  useMemo(() => {
    if (isSuccess) {
      form.setFieldsValue({
        gender: { label: genders[data.gender], value: data.gender },
        level: { label: levels[data.level], value: data.level },
        exec_time: dayjs(data.exec_time, "HH:mm:ss"),
        exercises: data.exercises.map((exercise) => ({
          label: exercise.title,
          value: exercise.id,
        })),
        title: data.title,
        content: data.content,
      });
      setSelectedExercises(data.exercises);
      setPhoto({ file: null, url: data.image });
    }
  }, [isSuccess, data]);

  const {
    data: exercisesData,
    isLoading: isLoadingExercises,
    isSuccess: isSuccessExercises,
    isError: isErrorExercises,
    error: errorExercises,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["getExercises", query],
    queryFn: ({ pageParam = 1, signal }) =>
      getExercises(pageParam, query, signal),
    initialPageParam: 1,
    getNextPageParam: ({ totalPages, currentPage }) => {
      if (totalPages !== currentPage) return currentPage + 1;
      return null;
    },
  });

  useEffect(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, exercisesData]);

  const exercises = useMemo(() => {
    return isSuccessExercises
      ? exercisesData.pages.map((result) => result.exercises).flat()
      : [];
  }, [isSuccessExercises, exercisesData]);

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

  const handleDelete = () => {
    modal.confirm({
      title: "Підтвердіть видалення",
      content: `Ви впевнені, що бажаєте видалити тренування "${data.title}"?`,
      okText: "Так",
      cancelText: "Скасувати",
      onOk: () => deleteTrainingMutation.mutate(),
    });
  };

  const handleDeleteTraining = async () => {
    await deleteTraining(null, trainingID);
  }

  const deleteTrainingMutation = useMutation({
    mutationFn: handleDeleteTraining,
    mutationKey: ["getTrainings"],
    onSuccess: () => {
      message.success("Тренування оновлено видалено!");
      navigate(routes.ADMIN_TRAININGS);
    },
    onError: (error) => {
      message.error(error.message);
    },
  })

  const handleEditTraining = async (values) => {
    const title = values.title;
    const content = values.content;
    const execTime = getExecTime(values.exec_time);
    const gender = values.gender.value;
    const level = values.level.value;
    const exercises = selectedExercises.map((exercise, index) => ({
      id: exercise.id,
      ordinal_number: index,
    }));

    if (!photo.file && photo.isNew) {
      throw Error("Завантажте зображення");
    } else
      await editTraining(
        null,
        trainingID,
        title,
        content,
        execTime,
        gender,
        level,
        photo.file,
        exercises
      );
  };

  const mutation = useMutation({
    mutationFn: handleEditTraining,
    mutationKey: ["getTrainings"],
    onSuccess: () => {
      message.success("Тренування оновлено успішно!");
      navigate(routes.ADMIN_TRAININGS);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["getTraining"], exact: true });
    };
  }, []);

  useEffect(() => {
    return () => {
      photo?.isNew && photo?.file && deleteImage(null, photo.old);
    };
  }, [photo]);

  return (
    <MainLayout>
      <PageHeader size={"medium"} title={"Редагувати тренування"} />
      {isLoading && <Loader />}
      {isSuccess && (
        <Form
          form={form}
          size="large"
          layout="vertical"
          className="m-8"
          labelCol={{ push: 1 }}
          onFinish={mutation.mutate}
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
                <div className="w-full relative">
                  <img
                    src={photo?.url}
                    className="w-full object-cover rounded-xl"
                    alt="training preview"
                    onError={(e) => {
                      e.target.src = "/img/logo-bird.png";
                    }}
                  />
                  <div
                    className="absolute top-5 right-5"
                    onClick={handleDeletePhoto}
                  >
                    <RiDeleteBin2Line
                      size={50}
                      className="text-gray-200 cursor-pointer"
                    />
                  </div>
                </div>
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
                placement="topLeft"
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
                placement="topLeft"
              >
                {Object.entries(genders).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="exec_time" label="Час на виконання">
              <TimePicker
                minuteStep={5}
                secondStep={10}
                hourStep={1}
                className="w-full"
                showNow={false}
                placement="topLeft"
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
            <Flex vertical gap={"middle"}>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={mutation.isPending}
                disabled={mutation.isPending}
                className="shadow mb-4"
              >
                Редагувати
              </Button>
              <Button
                type="primary"
                block
                danger
                loading={deleteTrainingMutation.isPending}
                disabled={deleteTrainingMutation.isPending}
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
