import {create} from "zustand";
import {IComment, IUpvote, IUser} from "./types";
import {getLSComments, getLSUpvotes, getLSUsers} from "./utils/helpers";

type StoreProps = {
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
  upvotes: IUpvote[];
  setUpvotes: (upvotes: IUpvote[]) => void;
  users: IUser[];
  setUsers: (users: IUser[]) => void;
};

export const useStore = create<StoreProps>((set) => ({
  comments: getLSComments(),
  setComments: (comments: IComment[]) => set({comments}),
  upvotes: getLSUpvotes(),
  setUpvotes: (upvotes: IUpvote[]) => set({upvotes}),
  users: getLSUsers(),
  setUsers: (users: IUser[]) => set({users}),
}));
