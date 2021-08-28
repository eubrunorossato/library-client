import React from 'react';
import { Preloader, Container, Row, Col } from 'react-materialize';

const Loading = (props) => {
  return (
    <Container>
      <Row>
        <Col
          className="offset-l5"
          l={1}
          s={6}
        >
          <div style={{ marginTop: "2rem" }}>
            <Preloader
              active={props.active}
              flashing={true}
            />
          </div>
        </Col>
      </Row >
    </Container>
  )
};

export default Loading;