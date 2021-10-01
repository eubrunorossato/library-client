import { Container, TextInput, Row, Col } from 'react-materialize';
import { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { toast } from 'react-toastify';
import {renderMissingFieldList, renderLoading, axiosInstance} from '../../../helpers/index';
import Toast from '../../shared/toast/index';
import Button from '../../shared/button/index';
const RegisterUser = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(props.location.state);
    const history = useHistory();
    
    useEffect(() => {
        if (user.email === ''){
            setUser({...user, isByGoogle: false});
        } else {
            setUser({...user, isByGoogle: true});
        }
    }, []);

    const createUser = async() => {
        const missingFields = checkUser();
        if (missingFields.length > 0) {
            toast.error(`Preencha os campos obrigatórios: ${renderMissingFieldList(missingFields)}`);
        } else {
            setIsLoading(true);
            const {status} = await axiosInstance.post('/api/user/create', user);
            if (status !== 200){
                toast.error('Erro interno no servidor');    
            } else {
                toast.success('Registro Feito.');
                setTimeout(() => {
                    history.push('/library')
                }, 3000);
                setIsLoading(false);
            }
        }
    };

    const checkUser = () => {
        let missingFields = [];
        if (user.celphone === '' || user.celphone.length !== 11) {
            missingFields.push('Celular deve ter 11 digitos');
        }
        if (user.email === '') {
            missingFields.push('Endereço de email obrigatório');
        }
        if (user.name === '') {
            missingFields.push('Nome Completo Obrigatório');
        }
        if (user.nickname === '') {
            missingFields.push('Apelido Obrigatório');
        }
        return missingFields;
    };

    const buildUserObj = (variable, value) => {
        setUser({...user, [variable]: value})
    };

    return (
        <Container>
            <Toast />
            <div className="loginBox">
                <Row>
                    <h4>Olá {user.name}</h4>
                    <p>Preencha algumas informações adcionais para finalizar o cadastro</p>
                </Row>
                <Row>
                    {
                        user.email === ''  ?
                        <TextInput
                        disabled={isLoading}
                        password
                        value=''
                        id="TextInput-38"
                        label="Password"
                        validate
                        />
                        :
                        null
                    }
                </Row>
                <Row>
                <TextInput
                    id="TextInput-41"
                    disabled={isLoading}
                    label="Como gostaria de ser chamado"
                    onChange={event => buildUserObj('nickname', event.target.value)}
                    />
                </Row>
                <Row>
                    <TextInput
                    disabled={isLoading}
                    id="TextInput-41"
                    label="Telefone Móvel (com ddd)"
                    onChange={event => buildUserObj('celphone', event.target.value)}
                    />
                </Row>
                <Row>
                <Col
                    l={6}>
                    <div id="cancel">
                    <Button disabled={isLoading} buttonLabel="Cancelar" iconName="close" />
                    </div>
                </Col>
                <Col
                    l={6}>
                    <div id="send">
                    <Button disabled={isLoading} buttonLabel="Criar Usuário" iconName="send" clickAction={createUser}/>
                    </div>
                </Col>
            </Row>
            {
            isLoading ? renderLoading() : null
            }
            </div>
        </Container>
    )
};

export default RegisterUser