import { Head, useForm, router } from '@inertiajs/react'
import { Form, Input, Button, Card, Typography } from 'antd'
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import styles from './create.module.css'
import AppLayout from '~/components/appLayout'

const { Title, Text } = Typography

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
  })

  return (
    <AppLayout>
      <Head title="Nouvelle tâche" />

      <div className={styles.pageHeader}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Ajouter une tâche
          </Title>
          <Text type="secondary">Enregistrez une nouvelle mission dans votre liste.</Text>
        </div>
        <Button
          className={styles.btnCustom}
          icon={<ArrowLeftOutlined />}
          onClick={() => router.get('/web/todos')}
        >
          Retour à la liste
        </Button>
      </div>

      <Card bordered={false} className={styles.formCard}>
        <Form
          layout="vertical"
          onFinish={() => post('/web/todos')}
          size="large"
          requiredMark={false}
          className={styles.formPadding}
        >
          <Form.Item
            label={
              <Text strong className={styles.labelText}>
                Titre
              </Text>
            }
            validateStatus={errors.title ? 'error' : ''}
            help={errors.title}
          >
            <Input
              className={`${styles.inputField} ${styles.inputTitle}`}
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              placeholder="Ex: Finaliser le dossier de présentation"
              autoFocus
            />
          </Form.Item>

          <Form.Item
            label={
              <Text strong className={styles.labelText}>
                Description
              </Text>
            }
            validateStatus={errors.description ? 'error' : ''}
            help={errors.description}
          >
            <Input.TextArea
              className={styles.inputField}
              value={data.description || ''}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Détails..."
              rows={10}
            />
          </Form.Item>

          {/* LA ZONE QUI DOIT ÊTRE À DROITE */}
          <div className={styles.actionBar}>
            <Button
              className={`${styles.btnCustom} ${styles.btnCancel}`}
              onClick={() => router.get('/web/todos')}
            >
              Annuler
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={`${styles.btnCustom} ${styles.btnSubmit}`}
              icon={<SaveOutlined />}
              loading={processing}
            >
              Enregistrer
            </Button>
          </div>
        </Form>
      </Card>
    </AppLayout>
  )
}
