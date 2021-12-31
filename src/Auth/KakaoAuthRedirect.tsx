import React from 'react';
import { BeatLoader } from 'react-spinners';

function KakaoAuthRedirect() {
  const code = new URL(window.location.href).searchParams.get('code');
  React.useEffect(() => {
    /*인가코드 보내고 토큰 받아오는 내용*/
  }, []);
  return (
    <div
      style={{
        position: 'absolute',
        top: '50px',
        left: '40%',
        right: '40%',
        bottom: '50px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <BeatLoader loading={true}></BeatLoader>
    </div>
  );
}

export default KakaoAuthRedirect;
