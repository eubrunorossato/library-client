import { TextInput, Row, Col } from 'react-materialize';
import DatePicker from "react-datepicker";
import './_scheduler.css'

const Scheduler = () => {
    return (
        <Row>
            <Col
                l={4}
            >
                <TextInput
                    id="TextInput-31"
                    label="Name"
                />
                <span className='explanation'>*First and Second name</span>
            </Col>
            <Col
                l={4}
            >
                <DatePicker
                    placeholderText="Pick Date"
                    showYearDropdown={true}
                    dateFormat="dd/MM/yyyy"
                />
            </Col>
            <Col
                l={4}
            >
                <DatePicker
                    placeholderText="Return Date"
                    showYearDropdown={true}
                    dateFormat="dd/MM/yyyy"
                />
            </Col>
        </Row>
    )
};

export default Scheduler;