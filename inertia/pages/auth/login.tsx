import { Head, useForm } from '@inertiajs/react'
import { Button, Checkbox, Form, Input, Card, Typography, Alert } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Login() {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    email: '',
    password: '',
    remember: false,
    auth: '',
  })

  const onFinish = () => {
    post('/web/login')
  }

  function onCloseAlert() {
    clearErrors('auth')
  }

  return (
    <>
      <Head title="Connexion" />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2}>Connexion</Title>
            <Text type="secondary">Bienvenue ! Veuillez vous identifier.</Text>
          </div>

          <Form
            name="login_form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
          >
            {errors.auth && (
              <Alert
                title="Erreur de connexion"
                description={errors.auth}
                type="error"
                showIcon
                style={{ marginBottom: 24 }}
                closable={{ 'closeIcon': true, 'onClose': onCloseAlert, 'aria-label': 'close' }}
              />
            )}
            <Form.Item>
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mot de passe"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Checkbox
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                >
                  Se souvenir de moi
                </Checkbox>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={processing}>
                Se connecter
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}
