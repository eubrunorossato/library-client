import React, { useState, useEffect } from 'react';
import Modal from '../../shared/modal/index';
import Scheduler from '../scheduler/index';
import Button from '../../shared/button/index';
import Toast from '../../shared/toast/index';
import Card from '../../shared/cards/index';
import Loading from '../../shared/loading/index'
import { axiosInstance, convertBufferToImage } from '../../../helpers';
import { Row, Col, Container } from 'react-materialize';
import './_books.css';

const renderBookList = (bookList, setBook, setIsModalOpen) => {
  const imageBase64List = getImagesBase64(bookList);
  return bookList.map((book, index) => (
    <div key={book.id} className="box">
      <Row>
        <Col
          m={6}
          s={12}
        >
          <Card keyId={book.id} imageBase64={imageBase64List[index]} bookName={book.name} bookResume={book.resume} />
        </Col>
        <Col
          m={6}
          s={12}
        >
          <div className="actionPanel">
            <p>Avaliables to book: <span>{book.avaliables}</span></p>
            <div className="buttonDivs">
              <Button iconName="book_online" buttonLabel="Book" clickAction={() => hadleModal(true, setBook, book, setIsModalOpen)}/>
            </div>
            <div className="buttonDivs">
              <Button iconName="volunteer_activism" buttonLabel="Donate same book" />
            </div>
          </div>
        </Col>
      </Row >
    </div>
  ))
};

const hadleModal = (action, setBook, book, setIsModalOpen) => {
  if (action){
    setBook(book);
    setIsModalOpen(true);
  } else {
    setBook({});
    setIsModalOpen(false);
  }
};

const getImagesBase64 = (bookList) => {
  const base64String = [];
  bookList.map(book => {
    return base64String.push(convertBufferToImage(book.book_picture.data));
  });
  return base64String;
};

const Books = () => {
  const [bookList, setBookList] = useState([]);
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal (){
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchBookList() {
      const { data } = await axiosInstance.get('/api/books/getAll');
      setBookList(data.books);
      setIsLoading(false)
    }
    fetchBookList();
  }, []);
  return (
    <Container>
      <Toast />
      {!isLoading ? renderBookList(bookList, setBook, setIsModalOpen) : <Loading active={isLoading} />}
      <Modal isOpen={isModalOpen} closeModal={closeModal} book={book}>
        <Scheduler />
      </Modal>
    </Container >
  )
}

export default Books