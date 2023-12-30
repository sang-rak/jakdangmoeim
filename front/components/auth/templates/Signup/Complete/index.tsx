import React, { memo, useCallback, useState } from "react";
import AppLayout from "../../../../common/organisms/AppLatout";
import { FlexWrapper } from "./styles";
import Title from "../../../../common/atoms/Title";
const Complete = () => {
  return (
    <AppLayout>
      <FlexWrapper gap="large" vertical>
        <div>
          <Title content="가입이" customStyle={{ margin: 0 }} />
          <Title content="완료되었습니다" customStyle={{ margin: 0 }} />
        </div>
      </FlexWrapper>
    </AppLayout>
  );
};

export default memo(Complete);
