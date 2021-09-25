import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import Button from "../../shared/button/index";
import Toast from '../../shared/toast/index';
import { toast } from 'react-toastify';
import { Container, Row, TextInput, Col, ProgressBar } from 'react-materialize';
import { axiosInstance } from '../../../helpers/index'
import './_registerbook.css'

const RegisterBook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookObj, setBookObj] = useState({ name: '', author: '', gender: '', realeased_date: '', resume: '', book_picture: '' });

  const setFormBook = (variable, value) => {
    setBookObj({ ...bookObj, [variable]: value });
  };

  const checkFields = () => {
    const missingFields = [];
    if (bookObj.name === '') {
      missingFields.push('Book Name');
    }
    if (bookObj.author === '') {
      missingFields.push('Author');
    }
    if (bookObj.gender === '') {
      missingFields.push('Genre');
    }
    if (bookObj.realeased_date === '') {
      missingFields.push('Release Date');
    }
    if (bookObj.resume === '') {
      missingFields.push('Resume');
    }
    if (bookObj.book_picture === '') {
      missingFields.push('Book Picture');
    }
    return missingFields;
  };

  const renderLoading = () => {
    return (
      <Col s={12}>
        <ProgressBar />
      </Col>
    )
  };

  const renderMissingFieldList = (missingFields) => {
    let requiredFields = '';
    missingFields.map((field, index) => {
      if (missingFields[index + 1]) {
        requiredFields += `${field}, `
      } else {
        requiredFields += `${field}.`
      }
    });
    return requiredFields;
  };

  async function createBook() {
    setIsLoading(true);
    const missingFields = checkFields();
    if (missingFields.length > 0) {
      toast.error(`Missing Required fields: ${renderMissingFieldList(missingFields)}`);
    } else {
      const formData = prepareFormData();
      const { data } = await axiosInstance.post('/api/books/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success(data);
      setTimeout(() => {
        window.location = '/books'
      },3000);
    }
    setIsLoading(false);
  };

  function prepareFormData() {
    const formData = new FormData();
    formData.append('author', bookObj.author);
    formData.append('name', bookObj.name);
    formData.append('gender', bookObj.gender);
    formData.append('realeased_date', bookObj.realeased_date);
    formData.append('resume', bookObj.resume);
    formData.append('book_picture', bookObj.book_picture, bookObj.book_picture.name);
    return formData;
  };

  return (
    <Container>
      <Toast />
      <div className="formBox">
        <h1 style={{ color: "#EE6D72" }}>New Book</h1>
        <Row>
          <Col l={6}>
            <TextInput
              l={12}
              value={bookObj.name}
              onChange={event => setFormBook('name', event.target.value)}
              id="TextInput-1"
              label="Book Name"
            />
          </Col>
          <Col l={6}>
            <TextInput
              value={bookObj.author}
              onChange={event => setFormBook('author', event.target.value)}
              l={12}
              id="TextInput-2"
              label="Author"
            />
          </Col>
        </Row>
        <Row>
          <Col l={6}>
            <TextInput
              value={bookObj.gender}
              onChange={event => setFormBook('gender', event.target.value)}
              l={12}
              id="TextInput-3"
              label="Genre"
            />
          </Col>
          <Col l={6}>
            <TextInput
              value={bookObj.resume}
              onChange={event => setFormBook('resume', event.target.value)}
              l={12}
              id="TextInput-4"
              label="Book Resume"
            />
          </Col>
        </Row>
        <Row>
          <Col l={6}>
            <DatePicker
              selected={bookObj.realeased_date}
              onChange={(date) => setFormBook('realeased_date', date)}
              placeholderText="Release Date"
              showYearDropdown={true}
              dateFormat="dd/MM/yyyy"
            />
          </Col>
          <Col l={6}>
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file" onChange={event => setFormBook('book_picture', event.target.files[0])} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            l={6}>
            <div id="cancel">
              <Button buttonLabel="Cancelar" iconName="close" />
            </div>
          </Col>
          <Col
            l={6}>
            <div id="send">
              <Button buttonLabel="Criar Livro" iconName="send" clickAction={createBook} />
            </div>
          </Col>
        </Row>
        {
          isLoading ? renderLoading() : null
        }
      </div>
    </Container>
  )
};

export default RegisterBook;