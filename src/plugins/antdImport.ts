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
  Tree,
  Pagination,
  DatePicker,
  Modal,
  Switch,
  Upload,
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
    .use(Tree)
    .use(Pagination)
    .use(DatePicker)
    .use(Modal)
    .use(Switch)
    .use(Upload)
}
