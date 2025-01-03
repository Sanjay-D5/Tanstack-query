// Old way of getting data using AXIOS
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

// To "fetch data" from api for "reactQuery"
export const FetchPosts = async (pageNumber) => {
    try {
       const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
       return res.status === 200 ?  res.data : []; 
    } catch (error) {
        console.log(error);
    }
};

// to fetch individual post
export const FetchInvPost = async (id) => {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.status === 200 ? res.data : [];
    } catch (error) {
      console.log(error);
    }
};

// to delete post it delete from our system but not from the server 
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`)
}

// to update the post
// api.put - is used to completely replace the data
// api.patch - is used to update the partial data
export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, {title: "I have updated"})
}

// Infinite scrolling
// pageParam gets the 2nd page once we are in page end
export const fetchUser = async ({pageParam = 1}) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`      
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}