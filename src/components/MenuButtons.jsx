import { routes } from "@consts";
import { MenuButton } from "./UI/MenuButton";
import { FaDumbbell, FaCalculator, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useTelegram } from "@hooks/useTelegram";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const MenuButtons = () => {
  const { onClose } = useTelegram();

  const springTransition = (delay) => ({
    type: "spring",
    stiffness: 300,
    damping: 20,
    delay,
  });

  const variant = (delay) => ({
    visible: {
      opacity: 1,
      scale: 1,
      transition: springTransition(delay),
    },
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
  });

  return (
    <motion.div className="flex flex-wrap gap-6 w-fit p-8">
      {/* TEMPORARY */}
      <motion.div
        variants={variant(0)}
        initial="hidden"
        animate="visible"
        className="flex-1, w-full"
      >
        <Link
          to={routes.TRAININGS_LIST}
          className="p-4 flex justify-center items-center flex-col bg-orange-300 rounded-lg shadow-md text-center"
        >
          <FaDumbbell size={50} className="text-yellow-300" />
          <div className="text-lg mt-2 text-wrap text-gray-100 font-bold">
            Обрати тренування
          </div>
        </Link>
      </motion.div>
      {/* <MenuButton.Link
        to={routes.TRAININGS_LIST}
        text="Обрати тренування"
        icon={<FaDumbbell size={50} className="text-yellow-300" />}
      /> */}
      <motion.div
        variants={variant(0.1)}
        initial="hidden"
        animate="visible"
        style={{ width: "calc(50% - 12px)", flex: 1 }}
      >
        <MenuButton.Link
          to={routes.SETTINGS}
          text="Налаштування"
          icon={<FaCog size={50} className="text-yellow-300" />}
        />
      </motion.div>
      <motion.div
        variants={variant(0.2)}
        initial="hidden"
        animate="visible"
        style={{ width: "calc(50% - 12px)", flex: 1 }}
      >
        <MenuButton
          onClick={() => onClose()}
          text="Вийти"
          icon={<FaSignOutAlt size={50} className="text-yellow-300" />}
        />
      </motion.div>
    </motion.div>
  );
};
