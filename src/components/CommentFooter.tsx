import {useMemo, useState} from "react";
import {useStore} from "../store";
import {IComment, IUpvote} from "../types";
import {
  createDeepCopy,
  findCommentAndCreate,
  findCommentAndUpdate,
  getCurrentUser,
  updateComments,
  updateUpvotes,
} from "../utils/helpers";
import {v4 as uuidv4} from "uuid";
import {useDisclosure} from "../hooks/useDisclosure";
import upvoteIcon from "../assets/upvote.svg";
import greenUpvoteIcon from "../assets/green-upvote.svg";
import replyIcon from "../assets/reply.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

type CommentFooterProps = {
  comment: IComment;
  editedContent: string;
  isEditOpen: boolean;
  onEditOpen: () => void;
  onEditClose: () => void;
};

export default function CommentFooter({
  comment,
  editedContent,
  isEditOpen,
  onEditOpen,
  onEditClose,
}: CommentFooterProps) {
  const storeComments = useStore((s) => s.comments);
  const setStoreComments = useStore((s) => s.setComments);
  const storeUpvotes = useStore((s) => s.upvotes);
  const setStoreUpvotes = useStore((s) => s.setUpvotes);

  const [replyContent, setReplyContent] = useState("");

  const currentUser = useMemo(() => getCurrentUser(), []);
  const {
    isOpen: isReplyOpen,
    onOpen: onReplyOpen,
    onClose: onReplyClose,
  } = useDisclosure();

  const hasAlreadyUpvoted = useMemo(() => {
    return storeUpvotes?.find(
      (upvote: IUpvote) =>
        upvote.comment?.id === comment?.id &&
        upvote.user?.id === currentUser?.id
    );
  }, [comment?.id, storeUpvotes, currentUser?.id]);

  const handleCreateComment = () => {
    const newComment: IComment = {
      id: uuidv4(),
      parentId: comment.id,
      content: replyContent,
      author: currentUser,
      children: [],
      isDeleted: false,
      upvotes: 0,
    };

    const updatedComments = findCommentAndCreate(
      createDeepCopy(storeComments),
      comment.id,
      newComment
    );
    updateComments(updatedComments, setStoreComments);
    onReplyClose();
    setReplyContent("");
  };

  const handleDeleteComment = () => {
    const deletedComment = {
      ...comment,
      isDeleted: true,
    };
    const updatedComments = findCommentAndUpdate(
      createDeepCopy(storeComments),
      comment.id,
      deletedComment
    );
    updateComments(updatedComments, setStoreComments);

    // remove upvotes related to the comment
    const updatedUpvotes = storeUpvotes.filter(
      (upvote) => upvote.comment?.id !== comment?.id
    );
    updateUpvotes(updatedUpvotes, setStoreUpvotes);
  };

  const handleUpvoteClick = () => {
    // update upvotes table based on hasAlreadyUpvoted
    let updatedUpvotes: IUpvote[];
    if (hasAlreadyUpvoted?.id) {
      updatedUpvotes = storeUpvotes.filter(
        (upvote: IUpvote) => upvote.id !== hasAlreadyUpvoted?.id
      );
    } else {
      const newUpvote: IUpvote = {
        id: uuidv4(),
        comment: comment,
        user: currentUser,
      };
      updatedUpvotes = [...storeUpvotes, newUpvote];
    }
    updateUpvotes(updatedUpvotes, setStoreUpvotes);

    // update comment based on hasAlreadyUpvoted
    const updatedComment = {
      ...comment,
      upvotes: hasAlreadyUpvoted?.id
        ? comment.upvotes - 1
        : comment.upvotes + 1,
    };

    const updatedComments = findCommentAndUpdate(
      createDeepCopy(storeComments),
      comment.id,
      updatedComment
    );

    updateComments(updatedComments, setStoreComments);
  };

  const handleContentUpdate = () => {
    const updatedComment = {
      ...comment,
      content: editedContent,
    };
    const updatedComments = findCommentAndUpdate(
      createDeepCopy(storeComments),
      comment.id,
      updatedComment
    );
    updateComments(updatedComments, setStoreComments);
    onEditClose();
  };

  return isEditOpen ? (
    <div className="flex items-center gap-3 justify-end mt-2">
      {/* cancel comment button */}
      <button
        type="button"
        onClick={onEditClose}
        className="text-slate-700 px-2 py-1 bg-slate-100 rounded-md text-sm hover:bg-slate-300"
      >
        Cancel
      </button>
      {/* update comment button */}
      <button
        type="button"
        className="text-blue-700 px-2 py-1 bg-blue-100 rounded-md text-sm hover:bg-blue-300"
        onClick={handleContentUpdate}
      >
        Update
      </button>
    </div>
  ) : (
    <>
      <div className="flex flex-wrap items-center gap-1 sm:gap-3 mt-2 ml-4">
        {/* upvotes */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-shrink-0"
            onClick={handleUpvoteClick}
          >
            <img
              src={hasAlreadyUpvoted?.id ? greenUpvoteIcon : upvoteIcon}
              alt="upvote icon"
              width={20}
              height={20}
            />
          </button>
          <span className="text-slate-500">{comment.upvotes}</span>
        </div>
        {/* reply button */}
        <button
          type="button"
          className="flex-shrink-0 flex items-center gap-1 px-2 py-1 hover:bg-slate-300 rounded-md"
          onClick={onReplyOpen}
        >
          <img src={replyIcon} alt="reply icon" width={22} height={22} />
          <span className="text-slate-500 text-sm hidden sm:block">Reply</span>
        </button>
        {/* edit button */}
        <button
          type="button"
          className="flex-shrink-0 flex items-center gap-1 px-2 py-1 hover:bg-slate-300 rounded-md"
          onClick={onEditOpen}
        >
          <img src={editIcon} alt="edit icon" width={20} height={20} />
          <span className="text-slate-500 text-sm hidden sm:block">Edit</span>
        </button>
        {/* delete button */}
        <button
          type="button"
          className="flex-shrink-0 flex items-center gap-1 px-2 py-1 hover:bg-slate-300 rounded-md"
          onClick={handleDeleteComment}
        >
          <img src={deleteIcon} alt="delete icon" width={22} height={22} />
          <span className="text-slate-500 text-sm hidden sm:block">Delete</span>
        </button>
      </div>
      {/* new reply field */}
      {isReplyOpen && (
        <div className="max-w-full">
          <div className="max-w-full ml-6 mt-3 border border-slate-900 rounded-md">
            <textarea
              rows={4}
              className="rounded-md w-full focus-visible:outline-none p-2 text-slate-500"
              placeholder="Write something..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              autoFocus
            ></textarea>
          </div>
          <div className="flex items-center gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={onReplyClose}
              className="text-slate-700 px-2 py-1 bg-slate-100 rounded-md text-sm hover:bg-slate-300"
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-blue-700 px-2 py-1 bg-blue-100 rounded-md text-sm hover:bg-blue-300"
              onClick={handleCreateComment}
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </>
  );
}
