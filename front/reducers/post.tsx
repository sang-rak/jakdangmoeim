import shortId from "shortid";
import { produce } from "immer";

export interface User {
  id?: string;
  nickname: string;
}

export interface Images {
  src: string;
  id: string;
}

export interface Comment {
  id: string;
  User: User;
  content: string;
}

export interface Post {
  id: string;
  User: User;
  content: string;
  Images: Images[];
  Comments: Comment[];
}

export interface State {
  mainPosts: Post[];
  imagePaths: string[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: any;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: any;
}
export const initialState: State = {
  mainPosts: [
    {
      id: "1",
      User: {
        id: "1",
        nickname: "잉락",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          id: shortId.generate(),
          src: "https://picsum.photos/seed/picsum/200/300",
        },
        {
          id: shortId.generate(),
          src: "https://picsum.photos/seed/picsum/200/300",
        },
        {
          id: shortId.generate(),
          src: "https://picsum.photos/seed/picsum/200/300",
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "roro",
          },
          content: "예시로 만들 콘텐트",
        },
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: "heldoo",
          },
          content: "예시예시예시예시예시예시",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "ADD_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "ADD_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "ADD_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data: any) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data: any) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});
const dummyPost = (data: any) => ({
  id: data.id,
  content: data.content,
  User: {
    id: "1",
    nickname: "잉락",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data: any) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: "1",
    nickname: "잉락",
  },
});
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state: State = initialState, action: any) =>
  produce(state, (draft: any) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v: any) => v.id !== action.data
        );
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find(
          (v: any) => v.id === action.data.postId
        );
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex(
        //   (v) => v.id === action.data.postId
        // );
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
