import type { App } from 'vue'
// import 'ant-design-vue/dist/antd.css'
import {
  Input,
  Select,
  Button,
  Form,
  Table,
  Tag,
  Dropdown,
  Menu,
  Row,
  Col,
  Divider,
  Layout,
  BackTop,
  Result,
  Card,
  Statistic,
} from 'ant-design-vue'

export default function createAntdImport(app: App<Element>): App<Element> {
  return app
    .use(Input)
    .use(Select)
    .use(Button)
    .use(Form)
    .use(Table)
    .use(Tag)
    .use(Dropdown)
    .use(Menu)
    .use(Row)
    .use(Col)
    .use(Divider)
    .use(Layout)
    .use(BackTop)
    .use(Result)
    .use(Card)
    .use(Statistic)
}
