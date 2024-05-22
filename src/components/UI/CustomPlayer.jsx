import { useState } from "react";
import { BigPlayButton, ControlBar, Player } from "video-react";

export const CustomPlayer = ({ src }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="">
      {hasError ? (
        <div className="rounded-md flex items-center justify-center h-80 bg-gray-800 text-white">
          <p>Відео не доступне</p>
        </div>
      ) : (
        <div className="drop-shadow-xl rounded-xl overflow-hidden">
          <Player src={src} onError={handleError}>
            <ControlBar disableCompletely />
            <BigPlayButton position="center" />
          </Player>
        </div>
      )}
    </div>
  );
};
