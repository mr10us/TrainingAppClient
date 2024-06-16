export const MainLayout = (props) => {
  return (
    <div {...props} style={{ overflowY: "hidden" }}>
      {props.children}
    </div>
  );
};
