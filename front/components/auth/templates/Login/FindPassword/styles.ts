import styled from "styled-components";
import Link from "next/link";
import { Button, Flex, Form } from "antd";

export const LinkWrapper = styled(Link)`
  float: right;
  color: #000000;
  font-size: 12px;
`;

export const FlexWrapper = styled(Flex)`
  width: 100%;
  min-height: 100%;
`;

export const FormWrapper = styled(Form)`
  padding: 10px;
`;

export const ErrorMessage = styled.div`
  color: red;
`;
