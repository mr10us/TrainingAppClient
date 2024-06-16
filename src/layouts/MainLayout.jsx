export const MainLayout = (props) => {
  return (
    <div {...props} style={{ height: "100%" }}>
      {props.children}
    </div>
  );
};
