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

  const redirect_uri =
    process.env.NODE_ENV === "production"
      ? "https://flexiple-assignment-pratikawaik.vercel.app"
      : "http://localhost:3000";

  const client_id = "eb3422dc-40d1-4722-8a79-4383e0d9c752";

  return (
    <main
      className="main flex items-center justify-center mx-auto max-w-6xl my-5 p-4"
      id="main"
    >
      <a
        href={`https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=${redirect_uri}&client_id=${client_id}&state=1234&scope=fhirUser Observation.read Observation.search`}
        target="_blank"
        rel="noreferrer"
      >
        Click
      </a>
      <CommentsContainer allComments={storeComments} />
    </main>
  );
}

export default App;
