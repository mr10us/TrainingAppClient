import { Link, useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { routes } from "@consts";

const BackButton = ({
  block,
  withIcon = false,
  withText = true,
  withBG = true,
  withPadding = true,
}) => {
  const {pathname} = useLocation();

  const path = pathname.split("/").filter(Boolean).slice(0, -1);
  const backPath = path.length === 0 ? routes.HOME : "/" + path.join("/");

  const c = block ? "text-center block w-full" : "inline-block";
  const bg = withBG
    ? "rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-600"
    : "drop-shadow";
  const pad = withPadding ? "px-4 py-2" : null;
  return (
    <Link to={backPath} className={`${c} ${pad} text-gray-100 ${bg}`}>
      {withIcon ? (
        <IoMdArrowRoundBack size={30} className="text-gray-100" />
      ) : null}
      {withText ? "Назад" : null}
    </Link>
  );
};

export default BackButton;
