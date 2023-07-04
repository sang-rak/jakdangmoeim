export interface User {
  id?: number;
  nickname: string;
}

export interface Image {
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
  Images: Image[];
  Comments: Comment[];
}

export interface State {
  mainPosts: Post[];
  imagePaths: string[];
  postAdded: boolean;
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
            id: 2,
            nickname: "roro",
          },
          content: "예시로 만들 콘텐트",
        },
        {
          User: {
            id: 3,
            nickname: "heldoo",
          },
          content: "예시예시예시예시예시예시",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미 데이터 입니다.",
  User: {
    id: 1,
    nickname: "Jackdang",
  },
  Images: [],
  Comments: [],
};

const reducer = (state: State = initialState, action: { type: string }) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return { ...state };
  }
};

export default reducer;
