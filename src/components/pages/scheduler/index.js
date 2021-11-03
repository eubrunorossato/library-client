import { TextInput, Row, Col } from 'react-materialize';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../../helpers/index'
import Button from '../../shared/button/index';
import DatePicker from "react-datepicker";
import { Context } from '../../../store/index';
import './_scheduler.css'
import { useState, useContext } from 'react';

const Scheduler = (props) => {
    const [userInfo, setUserInfo] = useContext(Context);
    const [schedulerData, setSchedulerData] = useState({ email: userInfo.email, pick_date: '', return_date: '', book_id: props.book_id });
    let errorList = [];

    const setSchedulerObj = (value, key) => {
        const warnList = [];
        if (key !== 'email') {
            const weekDay = value.getDay();
            if (weekDay !== 0) {
                warnList.push('Dias de retirada e devolução só podem ocorrer aos domingos');
            }
        }
        if (key === 'pick_date') {
            const today = Date.now();
            if (value < today) {
                warnList.push('Selecionar uma data de retirada igual ou posterior a atual.');
            }
        }
        if (warnList.length > 0) {
            warnList.forEach(el => {
                toast.warn(el);
            });
        } else {
            setSchedulerData({ ...schedulerData, [key]: value });
        }
    };

    const checkPeriod = () => {
        const diffTime = Math.abs(schedulerData.return_date - schedulerData.pick_date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 30) {
            errorList.push('Tempo máximo de empréstimo é 30 dias.')
        }
    };

    const createRequest = async () => {
        checkPeriod();
        if (errorList.length > 0) {
            errorList.forEach((el) => {
                toast.warn(el);
            });
            errorList = [];
        } else {
            const { status, data } = await axiosInstance.post('/api/request/create', schedulerData, {
                validateStatus: () => {
                    return true;
                }
            })
            if (status === 200) toast.success('Livro criado com sucesso. Um e-mail foi enviado com o cóidgo de retirada do seu livro.');
            else if (status === 500) toast.warn(data.message);
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
                        label="Email"
                        value={userInfo.email}
                        onChange={(e) => setSchedulerObj(e.target.value, 'email')}
                    />
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