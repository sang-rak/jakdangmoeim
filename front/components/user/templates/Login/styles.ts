import { Form, Typography } from "antd";
import styled from "styled-components";

export const StyledTitle = styled.div`
  font-size: xx-large;
`;

export const justifyOptions = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];

export const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export const FormWrapper = styled(Form)`
  padding: 10px;
`;

export const alignOptions = ["flex-start", "center", "flex-end"];

export const { Title } = Typography;
