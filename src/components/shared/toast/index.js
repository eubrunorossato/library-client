import { ToastContainer } from 'react-toastify';
import './_toast.css'

const Toast = (props) => {
  return (
    <ToastContainer
      autoClose={5000}
      closeOnClick
      theme='colored'
    />
  )
};

export default Toast;