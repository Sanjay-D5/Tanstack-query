import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchUser } from "../API/api"
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

// npm package: npm install react-intersection-observer
export const InfiniteScroll = () => {
    const {data, hasNextPage, fetchNextPage, status, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ["users"],
        queryFn: fetchUser,
        getNextPageParam: (lastpage, allpages) => {
            console.log("lastPage", lastpage, allpages);
            return lastpage.length === 10 ? allpages.length + 1 : undefined;
        },
    });

    // const handleScroll = () => {
    //     const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

    //     if(bottom && hasNextPage){
    //         fetchNextPage();
    //     }
    // };

    // ref at some point, view will become true
    const {ref, inView} = useInView({
        threshold: 1,
    });

    useEffect(() => {
        // window.addEventListener("scroll", handleScroll);
        // return () => window.removeEventListener("scroll", handleScroll);
        if(inView && hasNextPage){
            fetchNextPage();
        }
        
    }, [hasNextPage, inView, fetchNextPage]);

    if(status === "loading") return <div>Loading..</div>
    if(status === "error") return <div>Error fetching data</div>

    return (
        <div>
            <h1>Infinite scroll with React Wuery v5</h1>

            {data?.pages?.map((page, index) => (
                <ul key={index}>
                    {page.map((user) => (
                        <li key={user.id} style={{padding: "10px" , border:"1px solid #ccc"}}>
                            <p>{user.login}</p>
                            <img src={user.avatar_url} alt={user.login} width={50} height={50}/>
                        </li>
                    ))}
                </ul>
            ))}
            <div ref={ref} style={{padding: "20px", textAlign:"center"}}>
                {isFetchingNextPage 
                    ? "Loading more..."
                    : hasNextPage
                    ? "Scroll down to more"
                    : "No more users"
                }
            
            </div>
        </div>
    )
}

// pageParams => is a number of pages