// using ReactQuery 
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, FetchPosts, updatePost } from "../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export const FetchRQ = () => {

    const [pageNumber, setPageNumber] = useState(0);

    // queryClient is used to access the cache data
    const queryClient = useQueryClient();


    // To "fetch data" from api or server , when pagenumber changes , it runs queryFn
    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts", pageNumber],  //like useState
        queryFn: () => FetchPosts(pageNumber),  //-- to pass argu we should use arrow func
        // staleTime: 5000,
        // gcTime: 1000,
        // refetchInterval: 1000,

        // When ferching data keep the previous data, untill new data is fetched.
        // placeholderData: keepPreviousData,

        // refetchIntervalInBackground: true,
        
    });
    

    // mutation function to delete the post , queryClient.setQueryData helps in accessing the data from the cache for a particular key
    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(["posts", pageNumber], (curElem) => {
                return curElem?.filter((post) => post.id !== id);
            });
        },
    });


    // mutation function to update the post , mutationFn is a syntax and updatePost is a function call.
    // apiData is a title we pass in Api.jsx
    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (apiData, postId) => {
            queryClient.setQueryData(["posts", pageNumber], (postsData) => {
                return postsData?.map((curPost) => {
                    return curPost.id === postId ? {...curPost, title: apiData.data.title} : curPost;
                })
            });
        },
    });


    if(isPending) return <p>Loading..</p>
    if(isError) return <p>Error: { error.message || "Something went wrong"}</p>

    return (
        <div>
            <ul className="section-accordion">
                {data?.map((curele) => {
                    const {id, title, body} = curele;
                    return (
                        <li key={id}>
                            {/* As we are using react-router, instead of a tag we use Navlink */}
                            <NavLink to={`/rq/${id}`}>
                                <p>{id}</p>
                                <p>{title}</p>
                                <p>{body}</p>
                            </NavLink>
                            <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                            <button onClick={() => updateMutation.mutate(id)}>update</button>
                        </li>
                    )
                })}
            </ul>

            {/* Pagination */}
            <div className="pagination-section container">
                <button 
                    disabled={pageNumber === 0 ? true : false} 
                    onClick={() => setPageNumber((prev) => prev - 3)}
                >Prev
                </button>
                <p>{(pageNumber / 3) + 1}</p>
                <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
            </div>
        </div>
    )
};