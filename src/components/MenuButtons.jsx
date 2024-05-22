import { routes } from "@consts";
import { MenuButton } from "./UI/MenuButton";
import { FaDumbbell, FaCalculator, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useTelegram } from "@hooks/useTelegram";
import { Link } from "react-router-dom";

export const MenuButtons = () => {
  const { onClose } = useTelegram();

  return (
    <div className="flex flex-wrap gap-6 w-fit p-8">
      {/* TEMPORARY */}
      <Link
        to={routes.TRAININGS_LIST}
        className="p-4 flex justify-center items-center flex-col bg-orange-300 rounded-lg shadow-md text-center"
        style={{
          width: "100%",
          height: "150px",
        }}
      >
        <FaDumbbell size={50} className="text-yellow-300" />
        <div className="text-lg mt-2 text-wrap text-gray-100 font-bold">
          Обрати тренування
        </div>
      </Link>
      {/* <MenuButton.Link
        to={routes.TRAININGS_LIST}
        text="Обрати тренування"
        icon={<FaDumbbell size={50} className="text-yellow-300" />}
      /> */}

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
