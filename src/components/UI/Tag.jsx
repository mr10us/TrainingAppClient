import { Tag as AntTag } from "antd";

export const Tag = ({ tagID, handleClose, children }) => {
  return (
    <span className="inline-block drop-shadow-md">
      <AntTag
        closable
        bordered={false}
        color="orange"
        onClose={
          handleClose
            ? (e) => {
                e.preventDefault();
                handleClose(tagID);
              }
            : null
        }
      >
        {children}
      </AntTag>
    </span>
  );
};
