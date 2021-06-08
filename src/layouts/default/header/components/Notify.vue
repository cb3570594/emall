<template>
  <Popover title="" trigger="click">
    <Badge :count="count" dot>
      <BellOutlined :style="{ fontSize: '20px' }" class="cursor-pointer" />
    </Badge>
    <template #content>
      <Tabs>
        <TabPane v-for="item in tabListData" :key="item.key">
          <template #tab>
            {{ item.name }}
            <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
          </template>
          <List item-layout="horizontal" :data-source="item.list">
            <template #renderItem="{ item }">
              <ListItem>
                <ListItemMeta :description="item.description">
                  <template #title>{{ item.title }}</template>
                </ListItemMeta>
              </ListItem>
            </template>
          </List>
        </TabPane>
      </Tabs>
    </template>
  </Popover>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { BellOutlined } from '@ant-design/icons-vue'
import { Popover, Tabs, Badge, List } from 'ant-design-vue'

export default defineComponent({
  components: {
    Popover,
    BellOutlined,
    Tabs,
    TabPane: Tabs.TabPane,
    Badge,
    List,
    ListItem: List.Item,
    ListItemMeta: List.Item.Meta,
  },
  setup() {
    const tabListData = reactive([
      {
        key: 0,
        name: '订单消息',
        list: [
          {
            title: '付款信息',
            description: 'XX用户下单￥80.00',
          },
          {
            title: '退款信息',
            description: 'XX用户退货￥70.00',
          },
        ],
      },
      {
        key: 1,
        name: '系统消息',
        list: [
          {
            title: '公告',
            description: '系统预计明天凌晨2-6点进行升级维护',
          },
        ],
      },
    ])
    const count = ref(1)
    return {
      tabListData,
      count,
    }
  },
})
</script>
