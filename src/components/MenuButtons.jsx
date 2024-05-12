import { routes } from "@consts";
import { MenuButton } from "./UI/MenuButton";
import { FaDumbbell, FaCalculator, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useTelegram } from "@hooks/useTelegram";

export const MenuButtons = () => {
  const { onClose } = useTelegram();

  return (
    <div className="flex flex-wrap gap-6 w-fit p-8">
      <MenuButton.Link
        to={routes.TRAININGS_LIST}
        text="Обрати тренування"
        icon={<FaDumbbell size={50} className="text-yellow-300" />}
      />
      <MenuButton.Link
        to={routes.BMI}
        text="BMI Калькулятор"
        icon={<FaCalculator size={50} className="text-yellow-300" />}
      />
      <MenuButton.Link
        to={routes.SETTINGS}
        text="Налаштування"
        icon={<FaCog size={50} className="text-yellow-300" />}
      />
      <MenuButton
        onClick={() => onClose()}
        text="Вийти"
        icon={<FaSignOutAlt size={50} className="text-yellow-300" />}
      />
    </div>
  );
};
