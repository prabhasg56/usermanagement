import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let login = JSON.parse(localStorage.getItem('login'));
    if (!login) {
      navigate('/');
    }
  }, []);

  return <Component />;
}

export default Protected;
