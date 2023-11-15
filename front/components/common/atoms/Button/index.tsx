import { IButton } from "../../../../types/button";
import { StyledButton } from "./styles";

import { CSSProperties, FC, memo, useMemo } from "react";

const Button: FC<IButton> = (props) => {
  const {
    color,
    width,
    height,
    content,
    fontSize,
    customStyle,
    borderRadius,
    backgroundColor,
    handleClick,
  } = props;

  const style: CSSProperties = useMemo(() => {
    return {
      ...customStyle,
      width,
      height,
      color,
      fontSize,
      borderRadius,
      backgroundColor,
    };
  }, [
    customStyle,
    width,
    height,
    color,
    fontSize,
    borderRadius,
    backgroundColor,
  ]);
  return (
    <StyledButton style={style} onClick={handleClick}>
      {content}
    </StyledButton>
  );
};

export default memo(Button);
