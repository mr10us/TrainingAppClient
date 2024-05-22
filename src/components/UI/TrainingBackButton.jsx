import { routes } from "@consts";
import { App } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const TrainingBackButton = () => {
  const { modal } = App.useApp();
  const navigate = useNavigate();

  const handleGoBack = () => {
    modal.confirm({
      title: "Завершити тренування",
      content: (
        <div>
          <p>Ви впевнені, що бажаєте вийти?</p>
          <p>Тренування ще не завершено.</p>
        </div>
      ),
      okText: "Так",
      cancelText: "Скасувати",
      onOk: () => {
        navigate(routes.TRAININGS_LIST);
      },
    });
  };
  return (
    <IoMdArrowRoundBack
      size={30}
      className="text-gray-100 cursor-pointer"
      onClick={handleGoBack}
    />
  );
};
