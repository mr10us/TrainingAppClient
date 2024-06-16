export const MainLayout = (props) => {
  return (
    <div {...props} style={{ overflowY: "auto", scrollBehavior: "smooth" }}>
      {props.children}
    </div>
  );
};
