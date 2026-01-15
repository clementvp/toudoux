import { Card, Form, Input, TimePicker, Button } from 'antd'
import { router } from '@inertiajs/react'
import { Dayjs } from 'dayjs'

interface TodoFormProps {
  selectedDate: Dayjs
}

export const TodoForm = ({ selectedDate }: TodoFormProps) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    router.post(
      '/',
      {
        ...values,
        dueAt: selectedDate.format('YYYY-MM-DD'),
        hour: values.time ? values.time.format('HH:mm') : null,
      },
      {
        onSuccess: () => form.resetFields(),
      }
    )
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
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: 'Requis' }]}
            style={{ flex: '0 0 75%', marginBottom: '12px' }}
          >
            <Input placeholder="Quoi faire ?" size="large" />
          </Form.Item>
          <Form.Item name="time" style={{ flex: 1, marginBottom: '12px' }}>
            <TimePicker
              format="HH:mm"
              placeholder="--:--"
              style={{ width: '100%' }}
              size="large"
              suffixIcon={null}
            />
          </Form.Item>
        </div>
        <Form.Item name="description" style={{ marginBottom: '16px' }}>
          <Input.TextArea rows={5} placeholder="Détails (optionnel)..." />
        </Form.Item>
        <Button type="primary" block htmlType="submit" size="large" style={{ fontWeight: 600 }}>
          Enregistrer
        </Button>
      </Form>
    </Card>
  )
}
