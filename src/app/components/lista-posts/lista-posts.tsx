import  { useState, useEffect } from 'react';
import './lista-posts.css';
import { Posts } from '../../types/posts';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../../api/service';


let PostsList = () => {
    const [posts, setPosts] = useState([] as Posts[]);
    useEffect(() => {
      const getPosts = async () => {
          const postsData = await getAllPosts();
          setPosts(postsData.slice(0,10));
      };
      getPosts();
    }, []);

  return (
    <div>
      <h2>Lista de Posts</h2>
      <h3><Link to="/posts/0/0">Crear</Link></h3>
      <table>
        <thead>
          <tr>
            <th>Id</th>   
             <th>Usuario</th>
            <th>Title</th>
            <th>Body</th>
            <th>Options</th>
        
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr>
              <td>{post.id}</td>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td className='buttons'>

                  <Link to={`/posts/1/${post.id}`}>Delete</Link>
                  <Link to={`/posts/2/${post.id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsList;