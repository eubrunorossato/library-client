import React from 'react';
import { Button, Icon } from 'react-materialize';
import './_button.css'

const ButtonShared = (props) => {
  return (
    <Button
      large
      node="a"
      waves="light"
    >
      {props.buttonLabel}
      <Icon right>
        {props.iconName}
      </Icon>
    </Button>
  )
};

export default ButtonShared;