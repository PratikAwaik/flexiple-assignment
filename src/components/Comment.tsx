import {IComment} from "../types";
import userIcon from "../assets/user.svg";
import {useDisclosure} from "../hooks/useDisclosure";
import {useState} from "react";
import CommentBody from "./CommentBody";
import CommentFooter from "./CommentFooter";

type CommentProps = {
  comment: IComment;
};

export default function Comment({comment}: CommentProps) {
  const [editedContent, setEditedContent] = useState(comment.content);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  return (
    <div key={comment?.id} className="w-full flex items-start gap-2 mb-6">
      <div className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center flex-shrink-0">
        <img src={userIcon} alt="user icon" width={18} height={18} />
      </div>
      {comment.isDeleted ? (
        <p className="w-full text-slate-500">Comment deleted by user</p>
      ) : (
        <div className="w-full">
          <CommentBody
            comment={comment}
            isEditOpen={isEditOpen}
            editedContent={editedContent}
            setEditedContent={setEditedContent}
          />
          <CommentFooter
            comment={comment}
            editedContent={editedContent}
            setEditedContent={setEditedContent}
            isEditOpen={isEditOpen}
            onEditOpen={onEditOpen}
            onEditClose={onEditClose}
          />
        </div>
      )}
    </div>
  );
}
