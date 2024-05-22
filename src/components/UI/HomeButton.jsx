import { routes } from "@consts";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const HomeButton = () => {
  return (
    <Link to={routes.HOME}>
      <IoMdArrowRoundBack
        size={30}
        className="text-gray-100"
      />
    </Link>
  );
};
