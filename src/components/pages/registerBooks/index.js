import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../helpers/index'
import Form from './form';
import Loading from '../../shared/loading/index';
import './_registerbook.css'

const RegisterBook = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function getAuthorList() {
      const {data} = await axiosInstance.get('/api/author/getAll');
      setAuthors(data.authors)
      setIsLoading(false);
    }
    getAuthorList();
  }, []);
  return (
    <>
      { isLoading ? <Loading /> : <Form authorList={authors}/> }
    </>
  )
};

export default RegisterBook;