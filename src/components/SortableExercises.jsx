import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { App, Button, Collapse, ConfigProvider } from "antd";
import { IoMdClose } from "react-icons/io";
import { MdDragIndicator } from "react-icons/md";
import { CustomPlayer } from "./UI/CustomPlayer";
import { Tag } from "./UI/Tag";

export const SortableExercises = ({ items, children }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerBg: "#fff",
          },
        },
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </ConfigProvider>
  );
};
SortableExercises.Exercise = ({
  id,
  ordinalNum,
  title,
  content,
  video,
  categories,
  types,
  onRemove,
}) => {
  const { attributes, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const collapseItems = [
    {
      key: id,
      label: (
        <SortableExercises.Title
          id={id}
          ordinalNum={ordinalNum}
          title={title}
          onRemove={onRemove}
        />
      ),
      children: (
        <SortableExercises.Content
          title={title}
          content={content}
          video={video}
          categories={categories}
          types={types}
        />
      ),
    },
  ];

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="touch-none my-4"
    >
      <Collapse items={collapseItems} destroyInactivePanel/>
    </div>
  );
};
SortableExercises.Content = ({ title, content, video, categories, types }) => {
  return (
    <div className="rounded-xl bg-white p-3 my-2 flex justify-between flex-col gap-4">
      <CustomPlayer src={video} />
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-xl">{title}</h3>
        <p>{content}</p>
        {categories?.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            <p>Категорії: </p>
            {categories.map((category) => (
              <Tag tagID={category.id}>{category.name}</Tag>
            ))}
          </div>
        ) : null}
        {types?.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            <p>Типи: </p>
            {types.map((type) => (
              <Tag tagID={type.id}>{type.name}</Tag>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
SortableExercises.Title = ({ id, ordinalNum, title, onRemove }) => {
  const { listeners } = useSortable({ id });

  const { modal } = App.useApp();

  const handleRemoveExercise = () => {
    modal.confirm({
      title: "Виключити вправу",
      content: "Ви впевнені, що бажаєте виключити вправу зі списку?",
      okText: "Так",
      cancelText: "Скасувати",
      onOk: () => onRemove(id),
    });
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <h3 className="font-bold ">
        {ordinalNum}. {title}
      </h3>
      <div className="flex gap-4 align-middle">
        <div {...listeners} className="flex align-middle touch-none">
          <MdDragIndicator size={40} />
        </div>
        <Button
          danger
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveExercise();
          }}
        >
          <IoMdClose size={20} className="text-gray-100" />
        </Button>
      </div>
    </div>
  );
};
