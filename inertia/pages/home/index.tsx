import { Head } from '@inertiajs/react'

import 'dayjs/locale/fr'
import AppLayout from '~/components/appLayout'

export default function Index() {
  return (
    <AppLayout>
      <Head title="Toudoux" />
    </AppLayout>
  )
}
