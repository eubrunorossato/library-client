import React from 'react';
import { Card, CardTitle, Icon } from 'react-materialize';

const CardsShared = (props) => {
  return (
    <Card
      actions={[
        <p key={props.keyId}>{props.bookName}</p>
      ]}
      closeIcon={<Icon>close</Icon>}
      header={<CardTitle image={`data:image/png;base64,${props.imageBase64}`} />}
      horizontal
      revealIcon={<Icon>more_vert</Icon>}
    >
      {props.bookResume}
    </Card>
  )
};

export default CardsShared;