import { Button, Form, Input } from "antd";
import React, { useCallback } from "react";
import useInput from "../hooks/useInput";
import { useSelector } from "react-redux";

const CommentForm = ({ post }: any) => {
  const id = useSelector((state: any) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");
  const onsubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);

  return (
    <Form onFinish={onsubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40 }}
          type="primary"
          htmlType="submit"
        >
          멘트
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CommentForm;
