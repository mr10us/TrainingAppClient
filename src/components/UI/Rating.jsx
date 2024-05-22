import { Rate } from "antd";
import React from "react";

export const Rating = ({ rating, readOnly, allowHalf=true, onChange }) => {
  return (
    <Rate
      className="drop-shadow-sm"
      count={5}
      allowHalf={allowHalf}
      value={rating}
      disabled={readOnly}
      onChange={onChange}
    />
  );
};
