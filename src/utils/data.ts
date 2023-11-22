import {v4 as uuidv4} from "uuid";
import {IComment, IUpvote, IUser} from "../types";

// users table
export const users: IUser[] = [
  {
    id: uuidv4(),
    name: "Shristi Singh",
  },
  {
    id: uuidv4(),
    name: "Anjali Vanga",
  },
  {
    id: uuidv4(),
    name: "Vandhana Ram",
  },
  {
    id: uuidv4(),
    name: "ME",
  },
];

// comments table
export const comments: IComment[] = [
  {
    id: uuidv4(),
    // reference to user
    author: users[0],
    content:
      "I absolutely didn't know that Maggi was actually directly targeting working women and mothers. Although, I remember their ads were focused on that messaging. But, still, never thought that they were so laser-focused on that demographic. Thanks for sharing, looking forward to part 2 :)",
    upvotes: 0,
    isDeleted: false,
    // replies
    children: [],
  },
  {
    id: uuidv4(),
    author: users[2],
    content:
      'The "catch them young" point is so correct. People who grew up with Maggi, can\'t switch to different brand. But, I wonder if the kids today have the same obssession with Maggi as some of the GenZs and Millenials do. Probably explain their falling market share.',
    upvotes: 0,
    isDeleted: false,
    children: [],
  },
];

// upvotes table
export const upvotes: IUpvote[] = [];
