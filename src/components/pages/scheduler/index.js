import { TextInput, Row, Col } from 'react-materialize';
import DatePicker from "react-datepicker";
import './_scheduler.css'

const Scheduler = () => {
    return (
        <Row>
            <Col
                l={3}
            >
                <TextInput
                    id="TextInput-31"
                    label="Name"
                />
                <span className='explanation'>*First and Second name</span>
            </Col>
            <Col
                l={3}
            >
                <DatePicker
                    placeholderText="Pick Date"
                    showYearDropdown={true}
                    dateFormat="dd/MM/yyyy"
                />
                <span className='explanation'>*First and Second name</span>
            </Col>
        </Row>
    )
};

export default Scheduler;