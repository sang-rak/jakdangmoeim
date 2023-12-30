import { ILavel } from "../../../../types/lavel";
import { StyledLavel } from "./styles";

import { CSSProperties, FC, memo, useMemo } from "react";

const Lavel: FC<ILavel> = (props) => {
  const { content, customStyle } = props;

  const style: CSSProperties = useMemo(() => {
    return { ...customStyle };
  }, [customStyle]);
  return <StyledLavel style={style} label={content}></StyledLavel>;
};

export default memo(Lavel);
