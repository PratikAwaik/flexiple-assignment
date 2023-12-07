import {useEffect, useState} from "react";
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

const REDIRECT_URI =
  process.env.NODE_ENV === "production"
    ? "https://flexiple-assignment-pratikawaik.vercel.app"
    : "http://localhost:3000";

const CLIENT_ID = "eb3422dc-40d1-4722-8a79-4383e0d9c752";

const exchangeCodeWithAccessToken = async (
  code: string,
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
) => {
  const res = await fetch(
    `https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token?grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&code=${code}&client_id=${CLIENT_ID}&state=1234`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log("RES ==== ", res);
  const body = await res.json();

  console.log("BODY ==== ", body);
  setAccessToken(body.access_token);
};

function App() {
  const setComments = useStore((s) => s.setComments);
  const setUpvotes = useStore((s) => s.setUpvotes);
  const setUsers = useStore((s) => s.setUsers);
  const storeComments = useStore((s) => s.comments);
  const searchParams = new URLSearchParams(document.location.search);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const lsComments = getLSComments();
    const lsUpvotes = getLSUpvotes();
    const lsUsers = getLSUsers();

    if (!lsComments) updateComments(comments, setComments);
    if (!lsUpvotes) updateUpvotes(upvotes, setUpvotes);
    if (!lsUsers) updateUsers(users, setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchParams.get("code")) {
      exchangeCodeWithAccessToken(
        searchParams.get("code") as string,
        setAccessToken
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Access token ===== ", accessToken);

  const getObservations = async () => {
    const res = await fetch(
      `https://epicproxy.bswhealth.org/FHIR-PRD/CONNECT/api/FHIR/R4/Observation`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const body = await res.json();

    console.log(body);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <a
        href={`https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&state=1234&scope=fhirUser Observation.read`}
        target="_blank"
        rel="noreferrer"
        className="px-2 py-1 bg-blue-700 text-white rounded-md my-10 self-center"
      >
        Get code
      </a>
      <button
        type="button"
        onClick={getObservations}
        className="px-2 py-1 bg-orange-500 text-white"
      >
        Get observations
      </button>
      <main
        className="main flex items-center justify-center mx-auto max-w-6xl my-5 p-4"
        id="main"
      >
        <CommentsContainer allComments={storeComments} />
      </main>
    </div>
  );
}

export default App;
