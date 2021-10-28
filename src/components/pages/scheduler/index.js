import { TextInput, Row, Col } from 'react-materialize';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../helpers/index'
import Button from '../../shared/button/index';
import DatePicker from "react-datepicker";
import { Context } from '../../../store/index';
import './_scheduler.css'
import { useEffect, useState, useContext } from 'react';

const Scheduler = (props) => {
    const [schedulerData, setSchedulerData] = useState({ celphone: '', pick_date: '', return_date: '', book_id: props.book_id });
    const [userInfo, setUserInfo] = useContext(Context);
    let errorList = [];

    useEffect(() => {
        async function getUserInfo() {
            const { data } = await axiosInstance.get(`/api/user/getUserByEmail/${userInfo.email}`);
            setSchedulerData({ ...schedulerData, celphone: data.userRegister.celphone })
        }
        getUserInfo();
    }, []);

    const setSchedulerObj = (value, key) => {
        setSchedulerData({ ...schedulerData, [key]: value });
    };

    const checkDatesDifference = () => {
        const diffTime = schedulerData.returnDate - schedulerData.pickDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0 || diffDays > 30) {
            errorList.push('You should pick a book for at minimun a week, and maximun a month');
        }
    };

    const checkPhoneNumber = () => {
        if (
            schedulerData.celphone[2] !== '9' ||
            schedulerData.celphone.length !== 11
        ) {
            errorList.push('phone number shoub be in this model [DDD]99999-9999');
        }
    };

    const createRequest = async () => {
        checkDatesDifference();
        checkPhoneNumber();
        if (errorList.length > 0) {
            errorList.forEach((el) => {
                toast.error(el);
            });
            errorList = [];
        } else {
            const { status, data } = await axiosInstance.post('/api/request/create', schedulerData);
            console.log(status, data);
            if (status !== 200) {
                toast.error(data.message);
            } else {
                toast.success('Livro reservado com sucesso. Verifique o SMS enviado a seu telefone com o código de retirada do Livro.');
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            }
        }
    };

    return (
        <>
            <Row>
                <Col
                    l={4}
                >
                    <TextInput
                        id="TextInput-31"
                        label="Celphone"
                        type="number"
                        value={schedulerData.celphone}
                        onChange={(e) => setSchedulerObj(e.target.value, 'celphone')}
                    />
                    <span className='explanation'>*Example: (21) 99999-9999</span>
                </Col>
                <Col
                    l={4}
                >
                    <DatePicker
                        selected={schedulerData.pick_date}
                        onChange={(date) => setSchedulerObj(date, 'pick_date')}
                        placeholderText="Pick Date"
                        showYearDropdown={true}
                        dateFormat="dd/MM/yyyy"
                    />
                </Col>
                <Col
                    l={4}
                >
                    <DatePicker
                        selected={schedulerData.return_date}
                        onChange={(date) => setSchedulerObj(date, 'return_date')}
                        placeholderText="Return Date"
                        showYearDropdown={true}
                        dateFormat="dd/MM/yyyy"
                    />
                </Col>
            </Row>
            <Row>
                <Col
                    l={6}>
                    <div id="cancel">
                        <Button buttonLabel="Cancelar" iconName="close" />
                    </div>
                </Col>
                <Col
                    l={6}>
                    <div id="send">
                        <Button buttonLabel="Criar Livro" iconName="send" clickAction={createRequest} />
                    </div>
                </Col>
            </Row>
        </>
    )
};

export default Scheduler;