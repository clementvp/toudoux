import { Card, Form, Input, TimePicker, Button } from 'antd'
import { useForm } from '@inertiajs/react'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'
import styles from './TodoForm.module.css' // Import du fichier CSS

interface TodoFormProps {
  selectedDate: Dayjs
}

export const TodoForm = ({ selectedDate }: TodoFormProps) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    dueAt: selectedDate.format('YYYY-MM-DD'),
    hour: '',
  })

  useEffect(() => {
    setData('dueAt', selectedDate.format('YYYY-MM-DD'))
  }, [selectedDate])

  const onFinish = () => {
    post('/todos', {
      onSuccess: () => reset(),
    })
  }

  return (
    <Card
      className={styles.card}
      title={<div className={styles.cardTitle}>{selectedDate.format('dddd D MMMM')}</div>}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <div className={styles.rowContainer}>
          <Form.Item
            validateStatus={errors.title ? 'error' : ''}
            help={errors.title}
            required
            className={styles.titleItem}
          >
            <Input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="Quoi faire ?"
              size="large"
            />
          </Form.Item>

          <Form.Item className={styles.timePickerItem}>
            <TimePicker
              needConfirm={false}
              showNow={false}
              value={data.hour ? dayjs(data.hour, 'HH:mm') : null}
              onChange={(time) => {
                const formattedTime = time ? time.format('HH:mm') : ''
                setData('hour', formattedTime)
              }}
              format="HH:mm"
              placeholder="--:--"
              className={styles.timePicker}
              size="large"
              suffixIcon={null}
            />
          </Form.Item>
        </div>

        <Form.Item className={styles.descriptionItem} help={errors.description}>
          <Input.TextArea
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            rows={5}
            placeholder="Description (optionnel)..."
          />
        </Form.Item>

        <Button
          type="primary"
          block
          htmlType="submit"
          size="large"
          loading={processing}
          className={styles.submitButton}
        >
          Enregistrer
        </Button>
      </Form>
    </Card>
  )
}
