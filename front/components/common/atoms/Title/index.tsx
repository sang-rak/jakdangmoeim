import { ITitle } from "../../../../types/title";
import { StyledTitle } from "./styles";

import { CSSProperties, FC, memo, useMemo } from "react";

const Title: FC<ITitle> = (props) => {
  const { content, customStyle } = props;

  const style: CSSProperties = useMemo(() => {
    return { ...customStyle };
  }, [customStyle]);
  return <StyledTitle style={style}>{content}</StyledTitle>;
};

export default memo(Title);
