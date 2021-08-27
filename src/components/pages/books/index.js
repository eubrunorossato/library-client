import React, { useState, useEffect } from 'react';
import Button from '../../shared/button/index';
import Card from '../../shared/cards/index';
import axios from '../../../config/axios';
import { Row, Col, Container } from 'react-materialize';
import './_books.css'

const Books = () => {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    async function getBookList() {
      const { data } = await axios.get('/api/books/getAll')
      console.log(data);
    };
    getBookList();
  }, []);
  return (
    <Container>
      <div className="box">
        <Row>
          <Col
            m={6}
            s={12}
          >
            <Card />
          </Col>
          <Col
            m={6}
            s={12}
          >
            <div className="actionPanel">
              <p>Avaliables:</p>
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
    </Container >
  )
}

export default Books