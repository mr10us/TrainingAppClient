import React from "react";
import { Button, Result } from "antd";
import { routes } from "@consts";
import { Link } from "react-router-dom";

export const NotFound = ({ desc, to }) => (
  <div className="m-4 rounded-xl p-6 bg-gray-100">
    <Result
      status="404"
      title="404"
      subTitle={desc}
      extra={
        <Link
          to={to || routes.HOME}
          className="rounded bg-brand text-xl font-bold text-gray-100 p-4 py-2 block w-full active:bg-brand-dark text-gray-100:hover"
        >
          Назад
        </Link>
      }
    />
  </div>
);
