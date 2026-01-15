/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import 'antd/dist/reset.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { ConfigProvider } from 'antd'
import frFR from 'antd/locale/fr_FR'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <ConfigProvider locale={frFR}>
        <App {...props} />
      </ConfigProvider>
    )
  },
})
