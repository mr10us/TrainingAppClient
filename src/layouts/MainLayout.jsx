export const MainLayout = (props) => {
  const [height, setHeight] = useState("100svh");

  window.Telegram.WebApp.onEvent("viewport_changed", function () {
    const viewport = window.Telegram.WebApp.viewport;

    setHeight(viewport.height + "px");
  });

  window.Telegram.WebApp.viewportChanged();

  return (
    <div {...props} style={{ height: height }}>
      {props.children}
    </div>
  );
};
