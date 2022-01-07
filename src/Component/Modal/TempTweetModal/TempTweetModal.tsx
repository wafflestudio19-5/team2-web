import { useState } from 'react';
import axios from 'axios';

const TempTweetModal = () => {
  const [files, setFiles] = useState();
  const handleUpload = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFiles(file);
  };
  const onClick = () => {
    const formData = new FormData();
    formData.append('media', files ? files : '');
    formData.append('content', 'ddd');
    axios
      .post('/tweet/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response);
      });
  };
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onClick();
      }}
      encType="multipart/form-data"
    >
      파일명 :{' '}
      <input
        onChange={e => {
          handleUpload(e);
        }}
        type="file"
        name="myfile"
      />
      <button type="submit">제출하기</button>
    </form>
  );
};

export default TempTweetModal;
