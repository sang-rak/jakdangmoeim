import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Button, Card } from "antd";

import { logoutAction } from "../reducers";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
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
      <Card.Meta avatar={<Avatar>JD</Avatar>} title="작당모임"></Card.Meta>
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
