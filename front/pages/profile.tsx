import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NIcknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const followerList = [
    { nickname: "작당" },
    { nickname: "모임" },
    { nickname: "사람" },
  ];
  const followingList = [
    { nickname: "작당" },
    { nickname: "모임" },
    { nickname: "사람" },
  ];

  return (
    <>
      <Head>
        <title>내 프로필 | 작당모임</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
