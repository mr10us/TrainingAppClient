import { routes } from "@consts";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Navigation = ({ children }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-brand w-3/4 h-12 flex justify-center items-center rounded-2xl">
      {children}
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
