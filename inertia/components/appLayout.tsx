import { Layout, Typography, Space, Button } from 'antd'
import { UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import styles from './AppLayout.module.css'
import React from 'react'

const { Title } = Typography

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className={styles.layoutContainer}>
      <Layout.Header className={styles.headerStyle}>
        <Space size="middle" style={{ cursor: 'pointer' }} onClick={() => router.get('/web/todos')}>
          <div className={styles.logoContainer}>
            <UnorderedListOutlined />
          </div>
          <Title level={4} style={{ margin: 0 }}>
            Toudoux
          </Title>
        </Space>
        <Button
          type="text"
          danger
          icon={<LogoutOutlined />}
          onClick={() => router.post('/web/logout')}
        >
          Déconnexion
        </Button>
      </Layout.Header>

      <Layout.Content className={styles.contentArea}>
        <div className={styles.contentWrapper}>{children}</div>
      </Layout.Content>
    </Layout>
  )
}
