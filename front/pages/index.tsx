import React from "react";
import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { RootState } from "../reducers";
const Home = () => {
  const { me } = useSelector((state: any) => state.user);
  const { mainPosts } = useSelector((state: any) => state.post);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
