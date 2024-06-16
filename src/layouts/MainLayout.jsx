import { useEffect, useRef } from "react";

export const MainLayout = (props) => {
  const scrollableElementRef = useRef(null);

  useEffect(() => {
    const ensureDocumentIsScrollable = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      if (!isScrollable) {
        document.documentElement.style.setProperty(
          "height",
          "calc(100vh + 1px)",
          "important"
        );
      }
    };

    const preventCollapse = () => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
      }
    };

    // Call ensureDocumentIsScrollable when the entire page has loaded.
    window.addEventListener("load", ensureDocumentIsScrollable);

    // Attach the preventCollapse function to the touchstart event handler.
    const scrollableElement = scrollableElementRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("touchstart", preventCollapse);
    }

    // Cleanup function to remove event listeners when the component unmounts.
    return () => {
      window.removeEventListener("load", ensureDocumentIsScrollable);
      if (scrollableElement) {
        scrollableElement.removeEventListener("touchstart", preventCollapse);
      }
    };
  }, []);

  return (
    <div {...props} style={{ height: "100%" }}>
      {props.children}
    </div>
  );
};
