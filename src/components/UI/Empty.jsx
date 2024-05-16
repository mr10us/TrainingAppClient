import React from "react";
import { Empty as AntEmpty } from "antd";

export const Empty = ({ description }) => {
  return (
    <div className="m-8 font-bold p-10 bg-white bg-opacity-10 rounded-xl">
      <AntEmpty description={<p className="text-2xl mt-4 text-gray-200">{description}</p>}/>
    </div>
  );
};
