<template>
  <div>
    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" />
    <a-tree
      :expandedKeys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :selectable="false"
      :tree-data="gData"
      @expand="onExpand"
    >
      <template #title="{ title }">
        <a-row type="flex" align="middle">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
          <PlusCircleOutlined class="icon-style" />
          <CloseCircleOutlined class="icon-style" />
        </a-row>
      </template>
    </a-tree>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import { PlusCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue'

const genData: TreeDataItem[] = [
  {
    title: '男装',
    key: '男装',
    children: [
      {
        title: '下装',
        key: '下装',
      },
      {
        title: 'T恤',
        key: 'T恤',
      },
    ],
  },
  {
    title: '女装',
    key: '女装',
    children: [
      {
        title: '裙装',
        key: '裙装',
      },
      {
        title: '女士上衣',
        key: '女士上衣',
      },
      {
        title: '裤装',
        key: '裤装',
      },
    ],
  },
  {
    title: '家电',
    key: '家电',
    children: [
      {
        title: '空调',
        key: '空调',
      },
      {
        title: '冰箱',
        key: '冰箱',
      },
      {
        title: '洗衣机',
        key: '洗衣机',
      },
      {
        title: '电视',
        key: '电视',
      },
    ],
  },
]

const dataList: TreeDataItem[] = []
const generateList = (data: TreeDataItem[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i]
    const { key } = node
    dataList.push({ key, title: key as string })
    if (node.children) {
      generateList(node.children)
    }
  }
}
generateList(genData)

const getParentKey = (key: string, tree: TreeDataItem[]): string | number | undefined => {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}
export default defineComponent({
  components: {
    PlusCircleOutlined,
    CloseCircleOutlined,
  },
  setup() {
    const expandedKeys = ref<string[]>([])
    const searchValue = ref<string>('')
    const autoExpandParent = ref<boolean>(true)
    const gData = ref<TreeDataItem[]>(genData)

    const onExpand = (keys: string[]) => {
      expandedKeys.value = keys
      autoExpandParent.value = false
    }

    watch(searchValue, (value) => {
      const expanded = dataList
        .map((item: TreeDataItem) => {
          if ((item.title as string).indexOf(value) > -1) {
            return getParentKey(item.key as string, gData.value)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      expandedKeys.value = expanded as string[]
      searchValue.value = value
      autoExpandParent.value = true
    })
    return {
      expandedKeys,
      searchValue,
      autoExpandParent,
      gData,
      onExpand,
    }
  },
})
</script>
<style lang="less">
.icon-style {
  font-size: 16px;
  margin-left: 16px;
  &:hover {
    color: @primary-color;
  }
}
</style>
