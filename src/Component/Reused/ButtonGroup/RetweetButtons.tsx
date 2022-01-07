import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

interface props {
  function1: (e: React.MouseEvent<HTMLElement>) => void;
  function2: (e: React.MouseEvent<HTMLElement>) => void;
  display: string;
}

function RetweetButtons(props: props) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '30px',
        left: '10px',
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
          Retweet
        </Button>
        <Button onClick={props.function2} key="two">
          Quote Retweet
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default RetweetButtons;
