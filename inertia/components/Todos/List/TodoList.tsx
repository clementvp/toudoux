import { Card, Typography, Button, theme, Select, Flex } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs'
import { Todo } from '~/pages/home'
import { router } from '@inertiajs/react'
import styles from './TodoList.module.css'

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
      className={styles.card}
      styles={{
        header: { borderBottom: 'none', paddingTop: '20px', paddingBottom: '10px' },
        body: {
          padding: '20px',
          backgroundColor: '#f8f9fa',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
      title={
        <Flex justify="space-evenly" align="center" vertical>
          <Typography.Title level={5} className={styles.titleText} style={{ marginBottom: 0 }}>
            {selectedDate.format('dddd D MMMM')}
          </Typography.Title>
          <Select
            style={{ width: '100%' }}
            defaultValue=""
            options={[
              { value: '', label: 'Toutes priorités' },
              { value: '1', label: 'Haute' },
              { value: '2', label: 'Moyenne' },
              { value: '3', label: 'Basse' },
            ]}
          />
        </Flex>
      }
    >
      <div className={styles.listContainer}>
        {tasks.map((todo) => (
          <div
            key={todo.id}
            className={styles.todoItem}
            style={{
              background: token.colorBgContainer,
              border: `1px solid ${todo.isCompleted ? 'transparent' : token.colorBorderSecondary}`,
              opacity: todo.isCompleted ? 0.7 : 1,
            }}
          >
            <div
              onClick={() => handleToggle(todo.id)}
              className={styles.checkbox}
              style={{
                border: `2px solid ${todo.isCompleted ? token.colorSuccess : token.colorBorder}`,
                background: todo.isCompleted ? token.colorSuccess : 'transparent',
              }}
            >
              {todo.isCompleted && <span className={styles.checkboxIcon}>✓</span>}
            </div>

            <div className={styles.contentWrapper}>
              <Typography.Text
                delete={todo.isCompleted}
                className={styles.todoText}
                style={{ color: todo.isCompleted ? token.colorTextDisabled : token.colorText }}
              >
                {todo.title}
              </Typography.Text>

              {todo.hour && (
                <span
                  className={styles.hourBadge}
                  style={{
                    background: token.colorFillAlter,
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
              onClick={() => handleDelete(todo.id)}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}
