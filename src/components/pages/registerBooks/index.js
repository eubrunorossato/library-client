import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../helpers/index'
import Form from './form';
import Loading from '../../shared/loading/index';
import './_registerbook.css'

const RegisterBook = () => {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getDropdownsList() {
      const authorList = await axiosInstance.get('/api/author/getAll');
      const genreList = await axiosInstance.get('/api/genre/getAll');
      setGenres(genreList.data);
      setAuthors(authorList.data.authors);
      setIsLoading(false);
    }
    getDropdownsList();
  }, []);
  return (
    <>
      { isLoading ? <Loading /> : <Form authorList={authors} genreList={genres}/> }
    </>
  )
};

export default RegisterBook;