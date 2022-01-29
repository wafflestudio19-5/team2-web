import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
// @ts-ignore
import OutsideClickHandler from 'react-outside-click-handler';
import { useRef } from 'react';

interface props {
  function1: (e: React.MouseEvent<HTMLElement>) => void;
  function2: (e: React.MouseEvent<HTMLElement>) => void;
  display: string;
  setDisplay: (string: string) => void;
  text: string;
}

function RetweetButtons(props: props) {
  const boxRef = useRef();
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        props.setDisplay('none');
      }}
    >
      <Box
        ref={boxRef}
        sx={{
          position: 'absolute',
          bottom: '-40px',
          left: '30px',
          display: props.display,
          zIndex: '99',
          '& > *': {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
        >
          <Button onClick={props.function1} key="one">
            {props.text}
          </Button>
          <Button onClick={props.function2} key="two">
            Quote Retweet
          </Button>
        </ButtonGroup>
      </Box>
    </OutsideClickHandler>
  );
}

export default RetweetButtons;
