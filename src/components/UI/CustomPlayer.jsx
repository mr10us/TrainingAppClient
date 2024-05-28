import { useState } from "react";
import { BigPlayButton, ControlBar, Player } from "video-react";

export const CustomPlayer = ({ src, autoPlay = false, poster = null }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div>
      {hasError ? (
        <div className="rounded-md flex items-center justify-center h-80 bg-gray-800 text-white">
          <p>Відео не доступне</p>
        </div>
      ) : (
        <div className="drop-shadow-xl rounded-xl overflow-hidden">
          <Player
            src={src}
            onError={handleError}
            autoPlay={autoPlay}
            poster={poster}
            muted
          >
            <ControlBar disableCompletely />
            <BigPlayButton position="center" />
          </Player>
        </div>
      )}
    </div>
  );
};
