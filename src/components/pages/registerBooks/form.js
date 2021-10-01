import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import Button from "../../shared/button/index";
import Toast from '../../shared/toast/index';
import { toast } from 'react-toastify';
import { Container, Row, TextInput, Col, ProgressBar, Select } from 'react-materialize';
import { axiosInstance } from '../../../helpers/index';
import {renderMissingFieldList} from '../../../helpers/index';

const Form  = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookObj, setBookObj] = useState({ name: '', author_id: '', genre_id: '', realeased_date: '', resume: '', book_picture: '' });

    const setFormBook = (variable, value) => {
        setBookObj({ ...bookObj, [variable]: value });
        console.log(bookObj);
    };

    const renderAuthorOptions = () => {
        return props.authorList.map(author =>  {
            return (
                <option key={author.id} value={author.id}>
                    {author.name}
                </option>
            )
        });
    };

    const renderGenresOptions = () => {
        return props.genreList.map(genre =>  {
            return (
                <option key={genre.id} value={genre.id}>
                    {genre.name}
                </option>
            )
        });
    };

    const checkFields = () => {
        const missingFields = [];
        if (bookObj.name === '') {
        missingFields.push('Book Name');
        }
        if (bookObj.author_id === '') {
        missingFields.push('Author');
        }
        if (bookObj.genre_id === '') {
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

    const createBook = async () => {
        setIsLoading(true);
        const missingFields = checkFields();
        if (missingFields.length > 0) {
        toast.error(`Preencha os campos obrigatórios: ${renderMissingFieldList(missingFields)}`);
        } else {
        const formData = prepareFormData();
        const { data } = await axiosInstance.post('/api/books/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success(data);
        setTimeout(() => {
            window.location = '/'
        }, 3000);
        }
        setIsLoading(false);
    };

    const prepareFormData = () => {
        const formData = new FormData();
        formData.append('author_id', bookObj.author_id);
        formData.append('name', bookObj.name);
        formData.append('genre_id', bookObj.genre_id);
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
                    <Select
                    id="Select-41"
                    onChange={event => setFormBook('author_id', event.target.value)}
                    multiple={false}
                    options={{
                        classes: '',
                        dropdownOptions: {
                        alignment: 'left',
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: true,
                        coverTrigger: true,
                        hover: false,
                        inDuration: 150,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 250
                        }
                    }}
                    value=""
                    >
                        <option
                            disabled
                            value=""
                        >
                            Auhtor
                        </option>

                        {renderAuthorOptions()}
                    </Select>
                </Col>
                <Col l={6}>
                <Select
                    id="Select-41"
                    multiple={false}
                    onChange={event => setFormBook('genre_id', event.target.value)}
                    options={{
                        classes: '',
                        dropdownOptions: {
                        alignment: 'left',
                        autoTrigger: true,
                        closeOnClick: true,
                        constrainWidth: true,
                        coverTrigger: true,
                        hover: false,
                        inDuration: 150,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        outDuration: 250
                        }
                    }}
                    value=""
                    >
                        <option
                            disabled
                            value=""
                        >
                            Genre
                        </option>

                        {renderGenresOptions()}
                    </Select>
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

export default Form;