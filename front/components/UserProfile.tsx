import React, { useCallback } from "react";
import { Avatar, Button, Card, Form } from "antd";

type LoginFormProps = {
  setIsLoggedIn: (value: boolean) => void;
};

const UserProfile = ({ setIsLoggedIn }: LoginFormProps) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          작당인
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followings">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>JD</Avatar>}></Card.Meta>
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
