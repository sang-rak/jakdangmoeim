import { useSelector } from "react-redux";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";
import { StyledTitle } from "./styles";
import { memo } from "react";

const Loginform = () => {
  return (
    <div>
      <StyledTitle>작당모임</StyledTitle>
      <LoginForm />
    </div>
  );
};

export default memo(Loginform);
