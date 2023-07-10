import React from "react";
import Link from "next/link";

interface PostCardContentProps {
  postData: string;
}

const PostCardContent = ({ postData }: PostCardContentProps): JSX.Element => {
  return (
    <div>
      {/* 해시테그 */}
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              {v}
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

export default PostCardContent;
