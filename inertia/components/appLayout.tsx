import { Layout, Typography, Space, Button } from 'antd'
import { UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons'
import { router } from '@inertiajs/react'
import styles from './AppLayout.module.css'
import React from 'react'

// On extrait Title ici pour pouvoir l'utiliser directement
const { Title } = Typography

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout className={styles.layoutContainer}>
      <Layout.Header className={styles.headerStyle}>
        <Space size="middle" className="cursor-pointer" onClick={() => router.get('/web/todos')}>
          <div className={styles.logoContainer}>
            <UnorderedListOutlined />
          </div>
          {/* Utilisation directe de Title grâce à l'extraction au-dessus */}
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

      <Layout.Content style={{ padding: '40px 50px' }}>
        <div className={styles.contentWrapper}>{children}</div>
      </Layout.Content>
    </Layout>
  )
}
