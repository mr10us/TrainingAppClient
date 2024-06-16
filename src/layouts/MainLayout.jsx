export const MainLayout = (props) => {
  return (
    <div {...props} style={{ height: "100vh", overflowY: "hidden" }}>
      {props.children}
    </div>
  );
};
