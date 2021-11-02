import { useEffect, useState } from 'react';
import { Container, Table } from 'react-materialize';
import { useLocation } from "react-router-dom";
import { axiosInstance } from '../../../helpers/index'
import './_requestQueue.css'

const RequestQueue = (props) => {
    const [requests, setRequests] = useState([]);
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        async function getRequestList() {
            const { data } = await axiosInstance(`/api/request/getAllById/${location.state}`);
            setRequests(data)
        }
        getRequestList();
    }, []);

    const renderTable = () => {
        return (
            <Table centered={true} responsive={true} hoverable={true}>
                <thead>
                    <tr>
                        <th data-field="id">
                            Nome
                        </th>
                        <th data-field="name">
                            Data de retirada
                        </th>
                        <th data-field="price">
                            Data de Devolução
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requests.map(request => {
                            return (
                                <tr>
                                    <td>
                                        {request['User.name']}
                                    </td>
                                    <td>
                                        {request.pick_date}
                                    </td>
                                    <td>
                                        {request.return_date}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    }
    return (
        <Container>
            <div className="box">
                {renderTable()}
            </div>
        </Container>
    )
};

export default RequestQueue;