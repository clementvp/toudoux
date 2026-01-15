import { useState } from 'react'
import { Head } from '@inertiajs/react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/fr'
import AppLayout from '~/components/appLayout'
import { Calendar, Select, Typography, theme, Card, Form, Input, Button, TimePicker } from 'antd'

dayjs.locale('fr')

export default function Index() {
  const { token } = theme.useToken()
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())

  return (
    <AppLayout>
      <Head title="Toudoux - Calendrier" />

      <div style={{ display: 'flex', gap: '30px', alignItems: 'stretch' }}>
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
            headerRender={({ value, onChange }) => {
              const year = value.year()
              const month = value.month()
              const yearOptions = []
              for (let i = year - 2; i <= year + 30; i++) {
                yearOptions.push({ label: `${i}`, value: i })
              }
              const monthOptions = []
              for (let i = 0; i < 12; i++) {
                monthOptions.push({
                  label: dayjs().month(i).format('MMMM'),
                  value: i,
                })
              }

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
                      options={monthOptions}
                      style={{ minWidth: '120px', textTransform: 'capitalize' }}
                      onChange={(m) => onChange(value.clone().month(m))}
                    />
                  </div>
                </div>
              )
            }}
            onSelect={(date) => setSelectedDate(date)}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Card
            title={
              <div style={{ textAlign: 'center', lineHeight: '1.2' }}>
                <div style={{ textTransform: 'capitalize' }}>
                  {selectedDate.format('dddd D MMMM')}
                </div>
              </div>
            }
            style={{ flex: 1, overflowY: 'auto' }}
          ></Card>

          <Card
            title={
              <div style={{ textAlign: 'center', lineHeight: '1.2' }}>
                <div style={{ textTransform: 'capitalize' }}>
                  {selectedDate.format('dddd D MMMM')}
                </div>
              </div>
            }
            style={{ flex: 1 }}
          >
            <Form layout="vertical">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Form.Item
                  label="Titre"
                  name="title"
                  rules={[{ required: true, message: 'Requis' }]}
                  style={{ flex: '0 0 75%', marginBottom: '12px' }}
                >
                  <Input placeholder="Quoi faire ?" />
                </Form.Item>

                <Form.Item label="Heure" name="time" style={{ flex: 1, marginBottom: '12px' }}>
                  <TimePicker
                    format="HH:mm"
                    placeholder="--:--"
                    style={{ width: '100%' }}
                    allowClear
                  />
                </Form.Item>
              </div>

              <Form.Item label="Description" name="description" style={{ marginBottom: '16px' }}>
                <Input.TextArea rows={5} placeholder="Détails (optionnel)..." />
              </Form.Item>

              <Button type="primary" block htmlType="submit" size="large">
                Enregistrer
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
