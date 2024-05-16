import { Drawer } from "antd";
import { Navigation } from "./UI/Navigation";
import { useState } from "react";
import { colors } from "@consts";

export const Filter = ({ query, setQuery }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <Navigation>
      <Navigation.Item>
        <p className="text-gray-100 font-bold text-xl" onClick={toggleDrawer}>
          Фільтрувати
        </p>
        <Drawer
          placement="bottom"
          closeIcon={null}
          open={openDrawer}
          style={{backgroundColor: colors.brand}}
          onClose={toggleDrawer}
          height={window.innerHeight - 128}
        >
          
        </Drawer>
      </Navigation.Item>
    </Navigation>
  );
};
