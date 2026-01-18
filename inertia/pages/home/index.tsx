import { Head, router } from '@inertiajs/react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/fr'
import { theme } from 'antd'
import AppLayout from '~/components/Layout/appLayout'
import { TodoCalendar } from '~/components/Todos/Calendar/TodoCalendar'
import { TodoList } from '~/components/Todos/List/TodoList'
import { TodoForm } from '~/components/Todos/Form/TodoForm'
import { useState } from 'react'

dayjs.locale('fr')

export interface Todo {
  id: string
  title: string
  description: string | null
  isCompleted: boolean
  dueAt: string
  hour: string | null
}

export interface IndexProps {
  todos: Todo[]
  currentMonth: number
  currentYear: number
}

export default function Index({ todos, currentMonth, currentYear }: IndexProps) {
  const { token } = theme.useToken()
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())

  const handleDateChange = (newDate: Dayjs) => {
    const isDifferentPeriod = newDate.month() + 1 !== currentMonth || newDate.year() !== currentYear
    if (isDifferentPeriod) {
      router.get(
        '/',
        { month: newDate.month() + 1, year: newDate.year() },
        {
          preserveState: true,
          replace: true,
          only: ['todos', 'currentMonth', 'currentYear'],
        }
      )
    }
    setSelectedDate(newDate)
  }

  return (
    <AppLayout>
      <Head title="Toudoux - Calendrier" />
      <div style={{ display: 'flex', gap: '30px', alignItems: 'stretch' }}>
        <TodoCalendar
          selectedDate={selectedDate}
          todos={todos}
          onDateChange={handleDateChange}
          token={token}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <TodoList selectedDate={selectedDate} todos={todos} token={token} />
          <TodoForm selectedDate={selectedDate} />
        </div>
      </div>
    </AppLayout>
  )
}
