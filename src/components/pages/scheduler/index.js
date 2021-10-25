import { TextInput, Row, Col } from 'react-materialize';
import { toast } from 'react-toastify';
import Button from '../../shared/button/index';
import DatePicker from "react-datepicker";
import './_scheduler.css'
import { useState } from 'react';

const Scheduler = () => {
    const [schedulerData, setSchedulerData] = useState({ celphone: '', pickDate: '', returnDate: '' });
    let errorList = [];

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
            schedulerData.celphone[3] !== '9' ||
            schedulerData.celphone.length !== 11
        ) {
            errorList.push('phone number shoub be in this model [DDD]99999-9999');
        }
    };

    const createRequest = () => {
        checkDatesDifference();
        checkPhoneNumber();
        if (errorList.length > 0) {
            errorList.forEach((el) => {
                toast.error(el);
            });
            errorList = [];
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
                        onChange={(e) => setSchedulerObj(e.target.value, 'celphone')}
                    />
                    <span className='explanation'>*Example: (21) 99999-9999</span>
                </Col>
                <Col
                    l={4}
                >
                    <DatePicker
                        selected={schedulerData.pickDate}
                        onChange={(date) => setSchedulerObj(date, 'pickDate')}
                        placeholderText="Pick Date"
                        showYearDropdown={true}
                        dateFormat="dd/MM/yyyy"
                    />
                </Col>
                <Col
                    l={4}
                >
                    <DatePicker
                        selected={schedulerData.returnDate}
                        onChange={(date) => setSchedulerObj(date, 'returnDate')}
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