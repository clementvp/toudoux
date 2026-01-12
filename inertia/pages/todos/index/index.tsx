import { Head, router } from '@inertiajs/react'
import { Table, Button, Tag, Typography, Card, Popconfirm, message } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import AppLayout from '~/components/appLayout'
import styles from './index.module.css'
import { useState, useEffect } from 'react'

const { Title, Text } = Typography

interface Todo {
  id: string
  title: string
  description: string | null
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

interface Props {
  todos: {
    data: Todo[]
    meta: {
      total: number
      per_page: number
      current_page: number
      last_page: number
    }
  }
}

export default function Index({ todos }: Props) {
  const [loading, setLoading] = useState(false)

  // État local pour piloter l'affichage de la pagination d'Antd
  const [currentPage, setCurrentPage] = useState(todos.meta.current_page)

  // On synchronise l'état local dès que le serveur renvoie de nouvelles données (props)
  useEffect(() => {
    setCurrentPage(todos.meta.current_page)
    setLoading(false)
  }, [todos.meta.current_page])

  const handleDelete = (id: string) => {
    router.delete(`/web/todos/${id}`, {
      onSuccess: () => message.success('Tâche supprimée avec succès'),
    })
  }

  const toggleStatus = (todo: Todo) => {
    router.put(
      `/web/todos/${todo.id}`,
      { isCompleted: !todo.isCompleted },
      {
        preserveState: true,
        onSuccess: () => message.success('Statut mis à jour'),
      }
    )
  }

  const handleTableChange = (pagination: any) => {
    setLoading(true)
    // On change visuellement le numéro de page immédiatement
    setCurrentPage(pagination.current)

    router.get(
      `/web/todos`,
      { page: pagination.current },
      {
        preserveScroll: true,
        preserveState: true,
        onFinish: () => setLoading(false),
      }
    )
  }

  const columns = [
    {
      title: 'STATUT',
      dataIndex: 'isCompleted',
      key: 'status',
      width: 140,
      render: (isCompleted: boolean, record: Todo) => (
        <Tag
          className={styles.statusTag}
          color={isCompleted ? '#52c41a' : '#1890ff'}
          style={{ cursor: 'pointer' }}
          onClick={() => toggleStatus(record)}
        >
          {isCompleted ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
          {isCompleted ? ' TERMINÉ' : ' EN COURS'}
        </Tag>
      ),
    },
    {
      title: 'TÂCHE',
      dataIndex: 'title',
      key: 'title',
      render: (_: unknown, record: Todo) => (
        <div style={{ padding: '8px 0' }}>
          <Text
            strong
            className={`${styles.taskTitle} ${record.isCompleted ? styles.completedTask : styles.activeTask}`}
          >
            {record.title}
          </Text>
          {record.description && (
            <div style={{ marginTop: 4 }}>
              <Text type="secondary" style={{ fontSize: '13px' }}>
                {record.description}
              </Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'CRÉÉE LE',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date: string) => (
        <Text type="secondary">{dayjs(date).format('DD MMM YYYY [à] HH:mm')}</Text>
      ),
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      width: 100,
      align: 'center' as const,
      render: (_: unknown, record: Todo) => (
        <Popconfirm
          title="Supprimer la tâche ?"
          onConfirm={() => handleDelete(record.id)}
          okText="Oui"
          cancelText="Non"
          okButtonProps={{ danger: true }}
        >
          <Button
            type="text"
            danger
            shape="circle"
            icon={<DeleteOutlined style={{ fontSize: '18px' }} />}
          />
        </Popconfirm>
      ),
    },
  ]

  return (
    <AppLayout>
      <Head title="Gestion des tâches" />

      <div className={styles.pageHeader}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Mes Tâches ({todos.meta.total})
          </Title>
        </div>
        <Button
          type="primary"
          className={styles.btnPrimary}
          icon={<PlusOutlined />}
          onClick={() => router.get('/web/todos/create')}
        >
          Nouvelle tâche
        </Button>
      </div>

      <Card bordered={false} className={styles.tableCard}>
        <Table
          dataSource={todos.data}
          columns={columns}
          rowKey="id"
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            current: currentPage,
            pageSize: todos.meta.per_page,
            total: todos.meta.total,
            showSizeChanger: false,
            position: ['bottomCenter'],
          }}
          className="custom-table"
          locale={{ emptyText: 'Votre liste est vide pour le moment.' }}
        />
      </Card>
    </AppLayout>
  )
}
