/** Stored in localStorage and returned by auth endpoints */
export type AuthUser = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

export type AuthorRef = {
  _id: string;
  name: string;
};

export type Post = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author?: AuthorRef | string;
  createdAt?: string;
  updatedAt?: string;
};
