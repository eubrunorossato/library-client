import React from 'react';
import { Button, Icon } from 'react-materialize';
import './_button.css'

const ButtonShared = (props) => {
  return (
    <Button
      disabled={props.disabled}
      large
      node="a"
      waves="light"
      onClick={props.clickAction}
    >
      {props.buttonLabel}
      <Icon right>
        {props.iconName}
      </Icon>
    </Button>
  )
};

export default ButtonShared;