import * as React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Alert,
} from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import logo from '../../assets/login.png';
import './styles.css';

function Login(props: RouteComponentProps) {
  const auth = useAuth();
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signInError, setSignInError] = React.useState(false);

  async function handleSignInButtonClick() {
    const result = await auth.signIn(user, password);

    if (!result.Success) {
      setSignInError(true);
    } else {
      props.history.push('/encuesta_estructuras');
    }
  }

  function handleUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUser(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleAlertClose() {
    setSignInError(false);
  }

  function renderAlert() {
    if (signInError) {
      return (
        <Alert
          message="Aviso"
          description="Credenciales incorrectas"
          type="error"
          closable
          onClose={handleAlertClose}
        />
      );
    }

    return null;
  }

  return (
    <>
      {renderAlert()}

      <div className="container">
        <Row justify="center" align="middle">
          <img
            alt="perfil-ciudadano-login"
            src={logo}
            width="400px"
          />
        </Row>

        <Row justify="center">
          <Col lg={6} xs={24}>
            <Card title="Bienvenido">
              <Form data-cy="login-form" labelCol={{ span: 4 }}>
                <Form.Item
                  label="Usuario"
                  name="username"
                  rules={[{ required: true, message: 'Porfavor ingresa tu usuario' }]}
                >
                  <Input
                    value={user}
                    data-cy="user-input"
                    onChange={handleUserChange}
                  />
                </Form.Item>

                <Form.Item
                  label="Clave"
                  name="password"
                  rules={[{ required: true, message: 'Porfavor ingresa tu clave '}]}
                >
                  <Input.Password
                    value={password}
                    data-cy="password-input"
                    onChange={handlePasswordChange}
                  />
                </Form.Item>

                <Form.Item>
                  <div className="button-container">
                    <Button
                      type="primary"
                      data-cy="signin-button"
                      htmlType="submit"
                      onClick={handleSignInButtonClick}
                      loading={auth.loading}
                    >
                      Ingresar
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
