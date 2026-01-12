import { Head, router } from '@inertiajs/react'
import { Table, Button, Space, Tag, Typography, Card, Popconfirm, message } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

const { Title, Text } = Typography

interface Todo {
  id: string
  title: string
  description: string | null
  isCompleted: boolean // OK : Correspond à ton log
  createdAt: string
}

interface Props {
  todos: Todo[]
}

export default function Index({ todos }: Props) {
  const handleDelete = (id: string) => {
    router.delete(`/web/todos/${id}`, {
      onSuccess: () => message.success('Tâche supprimée'),
    })
  }

  const toggleStatus = (todo: Todo) => {
    router.put(
      `/web/todos/${todo.id}`,
      {
        // On envoie la clé attendue par ton contrôleur (isCompleted)
        isCompleted: !todo.isCompleted,
      },
      {
        preserveState: false,
        onSuccess: () => message.success('Statut mis à jour'),
      }
    )
  }

  const handleLogout = () => {
    router.post('/web/logout')
  }

  const columns = [
    {
      title: 'Statut',
      // CORRECTION : Doit être isCompleted pour matcher la clé de l'objet
      dataIndex: 'isCompleted',
      key: 'status',
      width: 130,
      render: (isCompleted: boolean, record: Todo) => (
        <Tag
          color={isCompleted ? 'success' : 'processing'}
          style={{ cursor: 'pointer', borderRadius: '12px' }}
          onClick={() => toggleStatus(record)}
        >
          {isCompleted ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          {isCompleted ? ' Terminé' : ' En cours'}
        </Tag>
      ),
    },
    {
      title: 'Tâche',
      dataIndex: 'title',
      key: 'title',
      render: (_: unknown, record: Todo) => (
        <div
          style={{
            textDecoration: record.isCompleted ? 'line-through' : 'none',
            opacity: record.isCompleted ? 0.5 : 1,
          }}
        >
          <Text strong>{record.title}</Text>
          {record.description && (
            <>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {record.description}
              </Text>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Créé le',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => new Date(date).toLocaleDateString('fr-FR'),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_: unknown, record: Todo) => (
        <Space size="middle">
          <Popconfirm
            title="Supprimer la tâche ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Supprimer"
            cancelText="Annuler"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Head title="Mes Todos" />
      <div style={{ padding: '40px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button type="link" danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>

        <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0 }}>
              Ma Liste
            </Title>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => router.get('/web/todos/create')}
            >
              Nouvelle tâche
            </Button>
          </div>

          <Table dataSource={todos} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} />
        </Card>
      </div>
    </>
  )
}
