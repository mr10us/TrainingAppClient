import { Link } from "react-router-dom";

export const MenuButton = (props) => {
  return (
    <button
      {...props}
      className="p-4 flex justify-center items-center flex-col bg-orange-300 rounded-lg shadow-md text-center w-full"
      style={{ ...(props.style && props.style), height: "150px" }}
    >
      {props.icon}
      <div className="text-lg mt-2 text-wrap text-gray-100 font-bold">
        {props.text}
      </div>
    </button>
  );
};

MenuButton.Link = (props) => {
  return (
    <Link
      to={props.to}
      className={
        props.className
          ? `${props.className} p-4 flex justify-center items-center flex-col bg-orange-300 rounded-lg shadow-md text-center w-full`
          : "p-4 flex justify-center items-center flex-col bg-orange-300 rounded-lg shadow-md text-center w-full"
      }
      style={{ ...(props.style && props.style), height: "150px" }}
    >
      {props.icon}
      <div className="text-lg mt-2 text-wrap text-gray-100 font-bold">
        {props.text}
      </div>
    </Link>
  );
};
