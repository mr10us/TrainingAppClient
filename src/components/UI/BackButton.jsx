import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({
  block,
  withIcon = false,
  withText = true,
  withBG = true,
  withPadding = true,
}) => {
  const c = block ? "text-center block w-full" : "inline-block";
  const bg = withBG
    ? "rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-600"
    : "drop-shadow";
  const pad = withPadding ? "px-4 py-2" : null;
  return (
    <Link to={-1} className={`${c} ${pad} text-gray-100 ${bg}`}>
      {withIcon ? (
        <IoMdArrowRoundBack size={30} className="text-gray-100" />
      ) : null}
      {withText ? "Назад" : null}
    </Link>
  );
};

export default BackButton;
