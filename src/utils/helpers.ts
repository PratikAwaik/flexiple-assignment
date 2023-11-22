import {LS_COMMENTS_KEY, LS_UPVOTES_KEY, LS_USERS_KEY} from "../constants";
import StorageService from "../services/storage";
import {IComment, IUpvote, IUser} from "../types";

export const getLSComments = () => {
  const lsComments = StorageService.getItem(LS_COMMENTS_KEY);
  return lsComments ? JSON.parse(lsComments) : null;
};

export const updateLSComments = (comments: IComment[]) => {
  StorageService.setItem(LS_COMMENTS_KEY, JSON.stringify(comments));
};

export const getLSUsers = () => {
  const lsUsers = StorageService.getItem(LS_USERS_KEY);
  return lsUsers ? JSON.parse(lsUsers) : null;
};

export const updateLSUsers = (users: IUser[]) => {
  StorageService.setItem(LS_USERS_KEY, JSON.stringify(users));
};

export const getLSUpvotes = () => {
  const lsUpvotes = StorageService.getItem(LS_UPVOTES_KEY);
  return lsUpvotes ? JSON.parse(lsUpvotes) : null;
};

export const updateLSUpvotes = (upvotes: IUpvote[]) => {
  StorageService.setItem(LS_UPVOTES_KEY, JSON.stringify(upvotes));
};

export const getCurrentUser = () => getLSUsers()[3];

export const findCommentAndCreate = (
  comments: IComment[],
  parentId: string,
  commentToAdd: IComment
) => {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === parentId) {
      comments[i].children.push(commentToAdd);
      return comments;
    }

    if (comments[i].children !== undefined && comments[i].children.length > 0) {
      findCommentAndCreate(comments[i].children, parentId, commentToAdd);
    }
  }

  return comments;
};

export const findCommentAndUpdate = (
  comments: IComment[],
  commentId: string,
  updatedComment: IComment
): IComment[] => {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === commentId) {
      comments[i] = updatedComment;
      return comments;
    }

    if (comments[i].children !== undefined && comments[i].children.length > 0) {
      findCommentAndUpdate(comments[i].children, commentId, updatedComment);
    }
  }

  return comments;
};

export const updateComments = (
  comments: IComment[],
  setStoreComments: (comments: IComment[]) => void
) => {
  updateLSComments(comments);
  setStoreComments(comments);
};

export const updateUpvotes = (
  upvotes: IUpvote[],
  setStoreUpvotes: (upvotes: IUpvote[]) => void
) => {
  updateLSUpvotes(upvotes);
  setStoreUpvotes(upvotes);
};

export const updateUsers = (
  users: IUser[],
  setStoreUsers: (users: IUser[]) => void
) => {
  updateLSUsers(users);
  setStoreUsers(users);
};

export const createDeepCopy = (resource: any) =>
  JSON.parse(JSON.stringify(resource));
