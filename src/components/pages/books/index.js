import React from 'react';
import { Row, Col, Container } from 'react-materialize';
import Button from '../../shared/button/index';
import Card from '../../shared/cards/index';
import './_books.css'

export default function () {
  return (
    <Container>
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
    </Container >
  )
}