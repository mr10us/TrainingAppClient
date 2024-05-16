import { BigPlayButton, ControlBar, Player } from "video-react";

export const CustomPlayer = ({src}) => {
  return (
    <Player src={src}>
      <ControlBar disableCompletely />
      <BigPlayButton position="center" />
    </Player>
  );
};
