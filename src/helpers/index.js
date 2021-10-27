import axios from 'axios';
import { Col, ProgressBar } from 'react-materialize';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { authorization: localStorage.getItem('libraryTokenUser') }
});

const convertBufferToImage = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const renderMissingFieldList = (missingFields) => {
  let requiredFields = '';
  missingFields.map((field, index) => {
    if (missingFields[index + 1]) {
      requiredFields += `${field}, `
    } else {
      requiredFields += `${field}.`
    }
  });
  return requiredFields;
};

const renderLoading = () => {
  return (
    <Col s={12}>
      <ProgressBar />
    </Col>
  )
};

export { axiosInstance, convertBufferToImage, renderMissingFieldList, renderLoading };