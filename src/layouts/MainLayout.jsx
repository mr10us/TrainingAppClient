export const MainLayout = (props) => {
  return (
    <div {...props} style={{ minHeight: "100svh" }}>
      {props.children}
    </div>
  );
};
