import {useEffect} from "react";
import CommentsContainer from "./components/CommentsContainer";
import {comments, upvotes, users} from "./utils/data";
import {
  getLSComments,
  getLSUpvotes,
  getLSUsers,
  updateComments,
  updateUpvotes,
  updateUsers,
} from "./utils/helpers";
import {useStore} from "./store";

function App() {
  const setComments = useStore((s) => s.setComments);
  const setUpvotes = useStore((s) => s.setUpvotes);
  const setUsers = useStore((s) => s.setUsers);
  const storeComments = useStore((s) => s.comments);

  useEffect(() => {
    const lsComments = getLSComments();
    const lsUpvotes = getLSUpvotes();
    const lsUsers = getLSUsers();

    if (!lsComments) updateComments(comments, setComments);
    if (!lsUpvotes) updateUpvotes(upvotes, setUpvotes);
    if (!lsUsers) updateUsers(users, setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      className="main flex items-center justify-center mx-auto max-w-6xl my-5 p-4"
      id="main"
    >
      <CommentsContainer allComments={storeComments} />
    </main>
  );
}

export default App;
