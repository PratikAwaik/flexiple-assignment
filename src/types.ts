export interface IComment {
  id: string;
  author: IUser;
  content: string;
  upvotes: number;
  children: IComment[];
  isDeleted: boolean;
  parentId?: string;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IUpvote {
  id: string;
  user: IUser;
  comment: IComment;
}
