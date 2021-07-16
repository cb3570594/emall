import type { PropType } from 'vue'
import type { Menu } from '@/router/types'
import { propTypes } from '@/utils/propTypes'

export const basicProps = {
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  collapsedShowTitle: propTypes.bool,
  // 最好是4 倍数
  inlineIndent: propTypes.number.def(20),
  // 菜单组件的mode属性
  mode: {
    type: String,
    default: 'inline',
  },
  type: {
    type: String,
    default: 'mix',
  },
  theme: {
    type: String,
    default: 'dark',
  },
  inlineCollapsed: propTypes.bool,
  mixSider: propTypes.bool,

  isHorizontal: propTypes.bool,
  accordion: propTypes.bool.def(true),
  beforeClickFn: {
    type: Function as PropType<() => Promise<boolean>>,
  },
}

export const itemProps = {
  item: {
    type: Object as PropType<Menu>,
    default: {},
  },
  pathKey: {
    type: String,
    default: '',
  },
  level: propTypes.number,
  theme: propTypes.oneOf(['dark', 'light']),
  showTitle: propTypes.bool,
  isHorizontal: propTypes.bool,
}

export const contentProps = {
  item: {
    type: Object as PropType<Menu>,
    default: null,
  },
  showTitle: propTypes.bool.def(true),
}
