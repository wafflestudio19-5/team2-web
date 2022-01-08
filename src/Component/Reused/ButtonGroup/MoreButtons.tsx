import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

interface props {
  function1: (e: React.MouseEvent<HTMLElement>) => void;
  //function2: (e: React.MouseEvent<HTMLElement>) => void;
  display: string;
  text: string;
}

function MoreButtons(props: props) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '30px',
        right: '10px',
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
        {/*<Button key="two">TEMP</Button>*/}
      </ButtonGroup>
    </Box>
  );
}

export default MoreButtons;
