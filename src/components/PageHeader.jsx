import BackButton from "./UI/BackButton";
import { motion } from "framer-motion";

const sizes = {
  LARGE: (title) => (
    <h1 className="text-gray-100 font-bold text-3xl drop-shadow-xl">{title}</h1>
  ),
  MEDIUM: (title) => (
    <h2 className="text-gray-100 font-bold text-2xl drop-shadow-xl">{title}</h2>
  ),
  SMALL: (title) => (
    <h3 className="text-gray-100 font-bold text-xl drop-shadow-xl">{title}</h3>
  ),
};

export const PageHeader = ({
  size,
  title,
  extra = null,
  noBackBtn = false,
  customBack = null,
}) => {
  const renderTitle = () => {
    const sizeKey = size?.toUpperCase();

    if (sizeKey && sizes[sizeKey]) return sizes[sizeKey](title);
    return sizes.MEDIUM(title);
  };

  const headerAnim = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 15,
      },
    },
    hidden: {
      y: -50,
      opacity: 0,
    },
  };

  return (
    <motion.div className="relative h-20" variants={headerAnim} initial="hidden" animate="visible">
      <div
        className="grid fixed grid-cols-3 w-full h-20 items-center gap-4 shadow-sm"
        style={{
          background: "linear-gradient(to bottom, #ffc04b, #ffba43)",
          zIndex: 999,
          gridTemplateColumns: ".2fr 1fr .2fr",
        }}
      >
        {!noBackBtn && (
          <div className="flex items-center justify-center">
            {customBack ? (
              customBack
            ) : (
              <BackButton
                withIcon
                withText={false}
                withBG={false}
                withPadding={false}
              />
            )}
          </div>
        )}

        <div className="text-center">{renderTitle()}</div>

        {extra && (
          <div className="flex items-center justify-center drop-shadow-md pr-4">
            {extra}
          </div>
        )}
      </div>
    </motion.div>
  );
};
