import { Card, Form, Input, TimePicker, Button } from 'antd'
import { useForm } from '@inertiajs/react'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'

interface TodoFormProps {
  selectedDate: Dayjs
}

export const TodoForm = ({ selectedDate }: TodoFormProps) => {
  const { data, setData, post, processing, errors, reset } = useForm<any>({
    title: '',
    description: '',
    dueAt: selectedDate.format('YYYY-MM-DD'),
    hour: '',
  })

  useEffect(() => {
    setData('dueAt', selectedDate.format('YYYY-MM-DD'))
  }, [selectedDate])

  const onFinish = () => {
    post('/todos')
    reset()
  }

  return (
    <Card
      title={
        <div style={{ textAlign: 'center', lineHeight: '1.2', textTransform: 'capitalize' }}>
          {selectedDate.format('dddd D MMMM')}
        </div>
      }
      style={{ borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Form.Item
            validateStatus={errors.title ? 'error' : ''}
            help={errors.title}
            required
            style={{ flex: '0 0 75%', marginBottom: '12px' }}
          >
            <Input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="Quoi faire ?"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ flex: 1, marginBottom: '12px' }}>
            <TimePicker
              value={data.hour ? dayjs(data.hour, 'HH:mm') : null}
              onChange={(time) => {
                const formattedTime = time ? time.format('HH:mm') : null
                setData('hour', formattedTime)
              }}
              format="HH:mm"
              placeholder="--:--"
              style={{ width: '100%' }}
              size="large"
              suffixIcon={null}
            />
          </Form.Item>
        </div>

        <Form.Item style={{ marginBottom: '16px' }} help={errors.description}>
          <Input.TextArea
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            rows={5}
            placeholder="Détails (optionnel)..."
          />
        </Form.Item>

        <Button
          type="primary"
          block
          htmlType="submit"
          size="large"
          loading={processing} // Ajout du feedback visuel
          style={{ fontWeight: 600 }}
        >
          Enregistrer
        </Button>
      </Form>
    </Card>
  )
}
