import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, createPost, updatePost, deletePost } from '../../api/service';
import { Posts } from '../../types/posts';
import { useNavigate } from 'react-router-dom';

const PostForm: React.FC = () => {
  const { func, id } = useParams();
  const nFunc = Number(func);
  const [formData, setFormData] = useState<Posts>({ id: 0, userId: 1, title: '', body: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (nFunc !== 0 && id) {
      const getPost = async () => {
        const post = await getPostById(id);
        setFormData(post);
      };

      getPost();
    }
  }, [nFunc, id]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nFunc === 0) {
      createPost(formData)
        .then(response => {
          console.log('Post created:', response);
          navigate("/posts");
        })

    } else if (nFunc === 1) {
      deletePost(id)
        .then(() => {
          console.log('Post deleted');
          navigate("/posts");

        })

    } else if (nFunc === 2) {
      updatePost(id, formData)
        .then(response => {
          console.log('Post updated:', response);
          navigate("/posts");

        })

    }
  }, [nFunc, formData, id]);

  const isReadOnly = nFunc === 1;

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label><br />
      <input type="text" name="title" id="title" required minLength={5} value={formData.title} onChange={handleChange} readOnly={isReadOnly} /><br /><br />
      <label htmlFor="body">Body</label><br />
      <input type="text" name="body" id="body" value={formData.body} required onChange={handleChange} readOnly={isReadOnly} /><br /><br />
      <label htmlFor="userId">Usuario</label><br />
      <input type="number" name="userId" id="userId" value={formData.userId} min={1} onChange={handleChange} readOnly={isReadOnly} /><br />
      <button type="submit">{nFunc === 0 ? 'Guardar' : nFunc === 2 ? 'Actualizar' : 'Eliminar'}</button>
    </form>
  );
};

export default PostForm;