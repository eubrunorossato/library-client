import { Container, Table } from 'react-materialize';
import './_requestQueue.css'

const RequestQueue = () => {
    return (
        <Container>
            <div className="box">
                <Table hoverable={true}  centered={true} responsive={true}>
                    <thead>
                        <tr>
                            <th data-field="id">
                                Nome
                            </th>
                            <th data-field="name">
                                Data de Retirada
                            </th>
                            <th data-field="price">
                                Data de Retorno
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Alvin
                            </td>
                            <td>
                                Eclair
                            </td>
                            <td>
                                $0.87
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Alan
                            </td>
                            <td>
                                Jellybean
                            </td>
                            <td>
                                $3.76
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Jonathan
                            </td>
                            <td>
                                Lollipop
                            </td>
                            <td>
                                $7.00
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    )
};

export default RequestQueue;