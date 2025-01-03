// Dynamic page
import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { FetchInvPost } from "../../API/api";

export const FetchIndv = () => {
  let { id } = useParams();

  let { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", id], // useState
    queryFn: () => FetchInvPost(id), // useEffect
  });

  // Conditional rendering based on loading, error, and posts data
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="section-accordion">
      <h1>Post ID Number - {id}</h1>
      <li key={id}>
        <p>{data.id}</p>
        <p>{data.title}</p>
        <p>{data.body}</p>
      </li>
      <NavLink to="/rq">
        <button>Go Back</button>
      </NavLink>
    </div>
  );
};