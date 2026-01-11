import { Head, useForm } from '@inertiajs/react'
import { Button, Checkbox, Form, Input, Card, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const onFinish = () => {
    post('/login') // L'URL de votre route de login dans Adonis
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
            <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email}>
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
            </Form.Item>

            <Form.Item validateStatus={errors.password ? 'error' : ''} help={errors.password}>
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
