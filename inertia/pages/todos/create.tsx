import { Head, router, useForm } from '@inertiajs/react'
import { Form, Input, Button, Card, Typography, Space, message } from 'antd'
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

export default function Create() {
  // Initialisation du formulaire Inertia
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
  })

  // Fonction de soumission
  const submit = () => {
    post('/web/todos', {
      onSuccess: () => {
        message.success('Tâche créée avec succès !')
      },
      onError: () => {
        message.error('Veuillez vérifier les champs du formulaire.')
      },
    })
  }

  return (
    <>
      <Head title="Nouvelle tâche" />

      <div style={{ padding: '40px 20px', maxWidth: 600, margin: '0 auto' }}>
        {/* Bouton Retour */}
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.get('/web/todos')}
            style={{ padding: 0 }}
          >
            Retour à la liste
          </Button>
        </Space>

        <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0 }}>
              Ajouter une tâche
            </Title>
            <Text type="secondary">Décrivez ce que vous avez à faire.</Text>
          </div>

          <Form layout="vertical" onFinish={submit} size="large">
            {/* Champ Titre */}
            <Form.Item
              label="Titre"
              required
              validateStatus={errors.title ? 'error' : ''}
              help={errors.title}
            >
              <Input
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Ex: Acheter du pain"
                autoFocus
              />
            </Form.Item>

            {/* Champ Description */}
            <Form.Item
              label="Description"
              validateStatus={errors.description ? 'error' : ''}
              help={errors.description}
            >
              <Input.TextArea
                value={data.description || ''}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Ajoutez des détails (optionnel)..."
                rows={4}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 40 }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={processing}
                block
              >
                Enregistrer la tâche
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}
