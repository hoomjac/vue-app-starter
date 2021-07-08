import {
  Button,
  Breadcrumb,
  Menu,
  Card,
  Drawer,
  Dropdown,
  Switch
} from 'ant-design-vue'
import { App } from 'vue'

export function registerGlobalComponent(app: App): App {
  app.use(Button)
  app.use(Breadcrumb)
  app.use(Menu)
  app.use(Card)
  app.use(Drawer)
  app.use(Dropdown)
  app.use(Switch)
  return app
}
