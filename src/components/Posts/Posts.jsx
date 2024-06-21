import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPost from "./CardPost";
import NewPostForm from "./NewPostForm";

const apiUrl = import.meta.env.VITE_BASE_API_URL;

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts`);
        setPosts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const handleNewPostCreated = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      setPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="posts-container">
      <NewPostForm onNewPostCreated={handleNewPostCreated} />
      {posts.map((post) => (
        <CardPost
          key={post.id}
          title={post.title}
          img={post.img}
          content={post.content}
          category={post.category.name}
          tags={post.tags}
        />
      ))}
    </div>
  );
}

export default Posts;
