import { ConfigProvider, Spin } from "antd";

export const Loader = () => {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#f3f4f6" } }}>
      <div className="w-full h-1/2 flex justify-center items-center rounded-l">
        <Spin spinning size="large" />
      </div>
    </ConfigProvider>
  );
};
