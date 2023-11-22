import {IComment} from "../types";

type CommentBodyProps = {
  comment: IComment;
  isEditOpen: boolean;
  editedContent: string;
  setEditedContent: React.Dispatch<React.SetStateAction<string>>;
};

export default function CommentBody({
  comment,
  isEditOpen,
  editedContent,
  setEditedContent,
}: CommentBodyProps) {
  return (
    <div className="border border-slate-300 rounded-md p-4 w-full">
      <h3 className="font-semibold mb-3">{comment.author.name}</h3>
      {isEditOpen ? (
        <textarea
          className="rounded-md w-full focus-visible:outline-none p-2 text-slate-500 border"
          onChange={(e) => setEditedContent(e.target.value)}
          rows={4}
          value={editedContent}
          autoFocus
        ></textarea>
      ) : (
        <p className="text-slate-500">{comment.content}</p>
      )}
    </div>
  );
}
