// Accessing data in old way using axios
import {useEffect, useState} from "react";
import axios from "axios";

export const FetchOld = () => {
    const [posts, setPosts] = useState([]); //fetching data
    const [isLoading, setIsLoading] = useState(true); // isLoading iserror
    const [isError, setIsError] = useState(false); // isLoading iserror

    // Fetch posts data function
    const getPostsData = async () => {
        try {
        const res = await axios.get(
            "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3"
        );
        if (res.status === 200) {
            setPosts(res.data); //fetching data
            setIsLoading(false); // isLoading iserror
        }
        } catch (error) {
        console.error(error);
        setIsError(true); // isLoading iserror
        setIsLoading(false); // isLoading iserror
        }
    };

    useEffect(() => {
        getPostsData(); //fetching data
    }, []);
    
    // conditional rendering based on loading, error, posts data
    // // isLoading iserror
    if(isLoading) return <p>Loading..</p>
    if(isError) return <p>Something went wrong</p>

    return (
        <div>
            <ul className="section-accordion">
                {posts?.map((curele) => {
                    const {id, title, body} = curele;
                    return (
                        <li key={id}>
                            <p>{title}</p>
                            <p>{body}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};