import React from 'react';
import { Card, CardTitle, Icon } from 'react-materialize';

const CardsShared = () => {
  return (
    <Card
      actions={[
        <a key="1" href="#">This is a link</a>
      ]}
      closeIcon={<Icon>close</Icon>}
      header={<CardTitle image="https://materializecss.com/images/sample-1.jpg" />}
      horizontal
      revealIcon={<Icon>more_vert</Icon>}
    >
      Here is the standard card with a horizontal image.
    </Card>
  )
};

export default CardsShared;