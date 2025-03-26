import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '../components/home/home';
import PostsList from '../components/lista-posts/lista-posts';
import "./header.css";
import FormularioPosts from '../components/formulario-posts/formulario-posts';

const Header: React.FC = () => {
  return (
    <Router>
      <h1>Posts</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          {/* <li>
            <Link to="/formulario">Formulario</Link>
          </li> */}
         
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:func/:id" element={<FormularioPosts />} />
      </Routes>
    </Router>
  );
};

export default Header;