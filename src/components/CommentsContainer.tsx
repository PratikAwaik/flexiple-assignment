import {useMemo} from "react";
import {IComment} from "../types";
import Comment from "./Comment";

type CommentsContainerProps = {
  allComments: IComment[];
  recursiveComments?: IComment[];
};

export default function CommentsContainer({
  allComments,
  recursiveComments,
}: CommentsContainerProps) {
  const comments = useMemo(() => {
    return recursiveComments ?? allComments;
  }, [allComments, recursiveComments]);

  return (
    <div className="w-full">
      {comments?.map((comment: any) => (
        <div
          className={`max-w-full comments-container relative ${
            comment?.parentId && "ml-8"
          }`}
          key={comment?.id}
        >
          <div className="absolute left-3 top-11 h-[calc(100%_-_3.5rem)] border-[0.5px] border-theme-gray-line hover:border-theme-button"></div>
          <Comment comment={comment} />
          {comment?.children?.length > 0 ? (
            <CommentsContainer
              allComments={allComments}
              recursiveComments={comment?.children}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
