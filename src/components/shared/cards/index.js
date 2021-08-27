import React from 'react';
import { Card, CardTitle, Icon } from 'react-materialize';

const CardsShared = (props) => {
  return (
    <Card
      actions={[
        <p>{props.bookName}</p>
      ]}
      closeIcon={<Icon>close</Icon>}
      header={<CardTitle image="https://materializecss.com/images/sample-1.jpg" />}
      horizontal
      revealIcon={<Icon>more_vert</Icon>}
    >
      {props.bookResume}
    </Card>
  )
};

export default CardsShared;