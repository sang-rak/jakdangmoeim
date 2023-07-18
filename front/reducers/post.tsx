import shortId from "shortid";

export interface User {
  id?: number;
  nickname: string;
}

export interface Images {
  src: string;
}

export interface Comment {
  User: User;
  content: string;
}

export interface Post {
  id: number;
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
}
export const initialState: State = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "잉락",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src: "https://picsum.photos/seed/picsum/200/300",
        },
        {
          src: "https://picsum.photos/seed/picsum/200/300",
        },
        {
          src: "https://picsum.photos/seed/picsum/200/300",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "roro",
          },
          content: "예시로 만들 콘텐트",
        },
        {
          User: {
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
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

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
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "Jackdang",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data: any) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "잉락",
  },
});
const reducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };

    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
