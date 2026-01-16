import { Card, Typography, Button, theme } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs'
import { Todo } from '~/pages/home'
import { router } from '@inertiajs/react'

interface TodoListProps {
  selectedDate: Dayjs
  todos: Todo[]
  token: ReturnType<typeof theme.useToken>['token']
}

export const TodoList = ({ selectedDate, todos, token }: TodoListProps) => {
  const tasks = todos.filter((t) => dayjs(t.dueAt).isSame(selectedDate, 'day'))

  const handleToggle = (id: string) => {
    router.patch(`/todos/${id}`)
  }

  const handleDelete = (id: string) => {
    router.delete(`/todos/${id}`)
  }

  return (
    <Card
      variant="borderless"
      styles={{
        header: {
          borderBottom: 'none',
          paddingTop: '20px',
        },
        body: {
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: 'none',
      }}
      title={
        <div style={{ textAlign: 'center' }}>
          <Typography.Title
            level={5}
            style={{ margin: 0, textTransform: 'capitalize', fontWeight: 700 }}
          >
            {selectedDate.format('dddd D MMMM')}
          </Typography.Title>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tasks.map((todo) => (
          <div
            key={todo.id}
            onClick={() => handleToggle(todo.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              background: token.colorBgContainer,
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              border: `1px solid ${todo.isCompleted ? 'transparent' : token.colorBorderSecondary}`,
              opacity: todo.isCompleted ? 0.7 : 1,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                flexShrink: 0,
                marginRight: '12px',
                border: `2px solid ${todo.isCompleted ? token.colorSuccess : token.colorBorder}`,
                background: todo.isCompleted ? token.colorSuccess : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {todo.isCompleted && <span style={{ color: 'white', fontSize: '10px' }}>✓</span>}
            </div>
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflow: 'hidden',
              }}
            >
              <Typography.Text
                delete={todo.isCompleted}
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: todo.isCompleted ? token.colorTextDisabled : token.colorText,
                }}
              >
                {todo.title}
              </Typography.Text>

              {todo.hour && (
                <span
                  style={{
                    fontSize: '10px',
                    padding: '1px 5px',
                    background: token.colorFillAlter,
                    borderRadius: '4px',
                    color: token.colorTextSecondary,
                  }}
                >
                  {todo.hour}
                </span>
              )}
            </div>
            <Button
              type="text"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelete(todo.id)
              }}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
