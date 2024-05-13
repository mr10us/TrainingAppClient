import BackButton from "./UI/BackButton";

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
}) => {
  const renderTitle = () => {
    const sizeKey = size?.toUpperCase();

    if (sizeKey && sizes[sizeKey]) return sizes[sizeKey](title);
    return sizes.MEDIUM(title);
  };

  return (
    <div className="h-16 relative">
      <div
        className="grid fixed grid-cols-3 w-full h-16 items-center gap-4 shadow-sm"
        style={{
          background: "linear-gradient(to bottom, #ffc04b, #ffba43)",
          zIndex: 999,
          gridTemplateColumns: ".2fr 1fr .2fr",
        }}
      >
        {!noBackBtn && (
          <div className="flex items-center justify-center">
            <BackButton
              withIcon
              withText={false}
              withBG={false}
              withPadding={false}
            />
          </div>
        )}

        <div className="text-center">{renderTitle()}</div>

        {extra && (
          <div className="flex items-center justify-center drop-shadow-md pr-4">{extra}</div>
        )}
      </div>
    </div>
  );
};
