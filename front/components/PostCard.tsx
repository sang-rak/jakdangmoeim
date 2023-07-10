import React, { useState, useCallback } from "react";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Avatar, Button, Card, List, Popover } from "antd";
import { Post } from "../reducers/post";
import { useSelector } from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";

export interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const id = useSelector((state: any) => state.user.me?.id);
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onToggleLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="text">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            style={{ margin: 40 }}
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <div>
                <List.Item>
                  <List.Item.Meta
                    title={item.User.nickname}
                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    description={item.content}
                  />
                </List.Item>
              </div>
            )}
          />
        </div>
      )}
      {/* <CommentForm /> */}
      {/* <Comments /> */}
    </div>
  );
};

export default PostCard;
