import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Collapse,
  ConfigProvider,
  DatePicker,
  Drawer,
  Flex,
  Radio,
  Space,
} from "antd";
import { Navigation } from "./UI/Navigation";
import { FaArrowsRotate } from "react-icons/fa6";
import { colors } from "@consts";
import { filterHelper } from "@utils/filterHelper";

const { RangePicker } = DatePicker;

export const Filter = ({ filterItems, sortItems, query, setQuery }) => {
  const [openDrawer, setOpenDrawer] = useState({ sort: false, filter: false });
  const [filterValues, setFilterValues] = useState({});
  const [sortValues, setSortValues] = useState({});

  const filterValuesExist = Object.keys(filterValues).length > 0;
  const sortValuesExist = Object.keys(sortValues).length > 0;

  const handleOpenSortDrawer = () => {
    setOpenDrawer((prev) => ({ ...prev, sort: true }));
  };
  const handleCloseSortDrawer = () => {
    setOpenDrawer((prev) => ({ ...prev, sort: false }));
  };

  const handleOpenFilterDrawer = () => {
    setOpenDrawer((prev) => ({ ...prev, filter: true }));
  };
  const handleCloseFilterDrawer = () => {
    setOpenDrawer((prev) => ({ ...prev, filter: false }));
  };

  const handleFilterChange = (type, value) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [type]: value,
    }));
  };

  const handleSortChange = (type, value) => {
    setSortValues((prevValues) => ({
      ...prevValues,
      [type]: value,
    }));
  };

  const resetFilter = () => {
    const newQuery = filterHelper.objToQuery(filterValues);

    setFilterValues({});
    handleCloseFilterDrawer();

    setTimeout(() => {
      setQuery((prev) => prev.replace(newQuery, ""));
    }, 500);
  };

  const applyFilter = () => {
    const query = filterHelper.objToQuery(filterValues);
    handleCloseFilterDrawer();

    setTimeout(() => {
      setQuery(query);
    }, 500);
  };

  const resetSort = () => {
    const newQuery = filterHelper.objToQuery(sortValues);

    setSortValues({});
    handleCloseSortDrawer();

    setTimeout(() => {
      setQuery((prev) => prev.replace(newQuery, ""));
    }, 500);
  };

  const applySort = () => {
    const query = filterHelper.objToQuery(sortValues);
    handleCloseSortDrawer();

    setTimeout(() => {
      setQuery(query);
    }, 500);
  };

  useEffect(() => {
    const values = filterHelper.queryToObj(query);

    setFilterValues(values);
  }, []);

  return (
    <Navigation>
      {filterItems?.length > 0 ? (
        <Navigation.Item>
          <Badge
            count={
              filterValuesExist ? (
                <div className="rounded-full size-2 bg-red-600" />
              ) : null
            }
          >
            <p
              className="text-gray-100 w-full inline-block font-bold text-xl"
              onClick={handleOpenFilterDrawer}
            >
              Фільтрувати
            </p>
          </Badge>
          <Drawer
            placement="bottom"
            closeIcon={null}
            open={openDrawer.filter}
            style={{ backgroundColor: colors.brand, overflowY: "scroll" }}
            onClose={handleCloseFilterDrawer}
            height={"calc()"}
          >
            <ConfigProvider theme={{ token: { colorText: "#333" } }}>
              <Collapse
                accordion
                style={{ cursor: "pointer" }}
                ghost
                expandIconPosition="end"
                className="text-xl text-gray-100 bg-brand-light drop-shadow-md"
                items={filterItems.map((item) => {
                  const { type, children, ...rest } = item;
                  return {
                    ...rest,
                    children: React.cloneElement(children, {
                      onChange: (value) => handleFilterChange(type, value),
                      value: filterValues[type],
                    }),
                  };
                })}
              />
            </ConfigProvider>
            <Flex className="mt-4" gap={"middle"}>
              <Button
                size="large"
                type="primary"
                block
                onClick={applyFilter}
                className="drop-shadow-md"
              >
                Фільтрувати
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={resetFilter}
                danger
                className="block drop-shadow-md"
                style={{ width: "25%" }}
                icon={<FaArrowsRotate size={15} />}
              />
            </Flex>
          </Drawer>
        </Navigation.Item>
      ) : null}
      {sortItems?.length > 0 ? (
        <Navigation.Item>
          <Badge
            count={
              sortValuesExist ? (
                <div className="rounded-full size-2 bg-red-600" />
              ) : null
            }
          >
            <p
              className="text-gray-100 w-full inline-block font-bold text-xl"
              onClick={handleOpenSortDrawer}
            >
              Сортувати
            </p>
          </Badge>
          <Drawer
            placement="bottom"
            closeIcon={null}
            open={openDrawer.sort}
            style={{ backgroundColor: colors.brand, overflowY: "scroll" }}
            onClose={handleCloseSortDrawer}
            height={"calc()"}
          >
            <ConfigProvider theme={{ token: { colorText: "#333" } }}>
              <Collapse
                accordion
                style={{ cursor: "pointer" }}
                ghost
                expandIconPosition="end"
                className="text-xl text-gray-100 bg-brand-light drop-shadow-md"
                items={sortItems.map((item) => {
                  const { type, children, ...rest } = item;
                  return {
                    ...rest,
                    children: React.cloneElement(children, {
                      onChange: (value) => handleSortChange(type, value),
                      value: sortValues[type],
                    }),
                  };
                })}
              />
            </ConfigProvider>
            <Flex className="mt-4" gap={"middle"}>
              <Button
                size="large"
                type="primary"
                block
                onClick={applySort}
                className="drop-shadow-md"
              >
                Сортувати
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={resetSort}
                danger
                className="block drop-shadow-md"
                style={{ width: "25%" }}
                icon={<FaArrowsRotate size={15} />}
              />
            </Flex>
          </Drawer>
        </Navigation.Item>
      ) : null}
    </Navigation>
  );
};

Filter.Radio = ({ buttons, onChange, value }) => {
  return (
    <Radio.Group onChange={(e) => onChange(e.target.value)} value={value}>
      <Space direction="vertical">
        {buttons.map((button, idx) => (
          <Radio key={idx} value={button.value}>
            {button.children}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};
Filter.Checkbox = ({ buttons, onChange, value }) => {
  return (
    <Checkbox.Group onChange={(values) => onChange(values)} value={value}>
      <Space direction="vertical">
        {buttons.map((button, idx) => (
          <Checkbox
            key={idx}
            value={
              typeof button.value === "boolean"
                ? button.value
                : String(button.value)
            }
          >
            {button.children}
          </Checkbox>
        ))}
      </Space>
    </Checkbox.Group>
  );
};
Filter.DateRange = ({ onChange, value, cellRender }) => {
  return (
    <RangePicker
      cellRender={cellRender || null}
      onChange={(dates) => onChange(dates)}
      value={value}
      style={{ width: "100%" }}
    />
  );
};
