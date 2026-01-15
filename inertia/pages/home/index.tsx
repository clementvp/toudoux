import { Head } from '@inertiajs/react'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import AppLayout from '~/components/appLayout'
import { Calendar, Select, Typography, theme } from 'antd'

dayjs.locale('fr')

export default function Index() {
  const { token } = theme.useToken()

  return (
    <AppLayout>
      <Head title="Toudoux - Calendrier" />

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <div
          style={{
            flex: '0 0 75%',
            background: token.colorBgContainer,
            padding: '24px',
            borderRadius: token.borderRadiusLG,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <Calendar
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
                      onChange={(newYear) => {
                        const now = value.clone().year(newYear)
                        onChange(now)
                      }}
                    />
                    <Select
                      value={month}
                      options={monthOptions}
                      style={{ minWidth: '120px', textTransform: 'capitalize' }}
                      onChange={(newMonth) => {
                        const now = value.clone().month(newMonth)
                        onChange(now)
                      }}
                    />
                  </div>
                </div>
              )
            }}
            onSelect={(date) => console.log('Date sélectionnée:', date.format('DD-MM-YYYY'))}
          />
        </div>

        {/* Colonne latérale pour le futur formulaire */}
        <div style={{ flex: 1 }}>
          <Typography.Title level={3} style={{ marginTop: 0 }}>
            Ajouter une tâche
          </Typography.Title>
          <p style={{ color: token.colorTextDescription }}>
            Sélectionnez une date pour créer un nouveau Toudoux.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
