import React, { useState, useEffect } from 'react';
import Button from '../../shared/button/index';
import Card from '../../shared/cards/index';
import axios from '../../../helpers/axios';
import { Row, Col, Container } from 'react-materialize';
import './_books.css';


const Books = () => {
  const [bookList, setBookList] = useState([]);
  function renderBookList() {
    return bookList.map(book => (
      <div key={book.id} className="box">
        <Row>
          <Col
            m={6}
            s={12}
          >
            <Card bookName={book.name} bookResume={book.resume} />
          </Col>
          <Col
            m={6}
            s={12}
          >
            <div className="actionPanel">
              <p>Avaliables to book: <span>{book.avaliables}</span></p>
              <div className="buttonDivs">
                <Button iconName="book_online" buttonLabel="Book" />
              </div>
              <div className="buttonDivs">
                <Button iconName="volunteer_activism" buttonLabel="Donate same book" />
              </div>
            </div>
          </Col>
        </Row >
      </div>
    ))
  }
  useEffect(() => {
    async function fetchBookList() {
      const { data } = await axios.get('/api/books/getAll');
      setBookList(data.books);
    }
    fetchBookList();
  }, []);
  return (
    <Container>
      {renderBookList()}
    </Container >
  )
}

export default Books