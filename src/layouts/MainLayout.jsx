export const MainLayout = (props) => {  

  return (
    <div {...props} style={{ overflow: "auto", scrollBehavior: "smooth" }}>
      {props.children}
    </div>
  );
};
