import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/common/organisms/AppLatout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { useRouter } from "next/router";
const Index = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: any) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector(
    (state: any) => state.post
  );

  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login"); // / 페이지로 오면 /login 페이지로 리다이렉션
  }, []);

  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Index;
