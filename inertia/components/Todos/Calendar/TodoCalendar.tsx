import { Calendar, Typography, Select, Badge } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { Todo } from '~/pages/home'

interface TodoCalendarProps {
  selectedDate: Dayjs
  todos: Todo[]
  onDateChange: (date: Dayjs) => void
  token: any
}

export const TodoCalendar = ({ selectedDate, todos, onDateChange, token }: TodoCalendarProps) => {
  const dateCellRender = (value: Dayjs) => {
    const listData = todos.filter((todo) => dayjs(todo.dueAt).isSame(value, 'day'))
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge
              status={item.isCompleted ? 'default' : 'processing'}
              text={
                <span
                  style={{
                    fontSize: '11px',
                    textDecoration: item.isCompleted ? 'line-through' : 'none',
                    color: item.isCompleted ? token.colorTextDisabled : token.colorText,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.hour ? `${item.hour} ${item.title}` : item.title}
                </span>
              }
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      style={{
        flex: '0 0 70%',
        background: token.colorBgContainer,
        padding: '24px',
        borderRadius: token.borderRadiusLG,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <Calendar
        value={selectedDate}
        onSelect={onDateChange}
        cellRender={(current, info) =>
          info.type === 'date' ? dateCellRender(current) : info.originNode
        }
        headerRender={({ value, onChange }) => {
          const year = value.year()
          const month = value.month()
          const yearOptions = Array.from({ length: 10 }, (_, i) => ({
            label: `${year - 2 + i}`,
            value: year - 2 + i,
          }))
          const monthOptions = Array.from({ length: 12 }, (_, i) => ({
            label: dayjs().month(i).format('MMMM'),
            value: i,
          }))

          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <Typography.Title level={4} style={{ margin: 0, textTransform: 'capitalize' }}>
                {value.format('MMMM YYYY')}
              </Typography.Title>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Select
                  value={year}
                  options={yearOptions}
                  onChange={(y) => onChange(value.clone().year(y))}
                />
                <Select
                  value={month}
                  style={{ minWidth: '120px', textTransform: 'capitalize' }}
                  options={monthOptions}
                  onChange={(m) => onChange(value.clone().month(m))}
                />
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}
