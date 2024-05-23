import { routes } from "@consts";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Navigation = ({ children }) => {
  const navAnim = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 15,
        delay: .4
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-12">
      <motion.div
        className="bg-brand w-full flex justify-center items-center rounded-2xl"
        variants={navAnim}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </div>
  );
};

Navigation.Home = () => {
  return (
    <Link
      to={routes.HOME}
      className="m-2 flex justify-center items-center h-full"
    >
      <FaHome size={"1.5rem"} className="text-yellow-200" />
    </Link>
  );
};
Navigation.Back = () => {
  return (
    <Link to={-1} className="m-2 flex justify-center items-center h-full">
      <FaArrowLeft size={"1.5rem"} className="text-yellow-200" />
    </Link>
  );
};
Navigation.Item = ({ children }) => {
  return (
    <div className="m-2 flex justify-center items-center cursor-pointer w-full text-center">
      {children}
    </div>
  );
};
