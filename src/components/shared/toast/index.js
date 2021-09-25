import { ToastContainer } from 'react-toastify';
import './_toast.css'

const Toast = (props) => {
  return (
    <ToastContainer
      closeOnClick
      theme='colored'
    />
  )
};

export default Toast;