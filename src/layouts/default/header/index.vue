<template>
  <Notify class="mr-6" />
  <UserDropDown />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Notify from './components/Notify.vue'
import UserDropDown from './components/UserDropDown.vue'
export default defineComponent({
  components: {
    Notify,
    UserDropDown,
  },
  setup() {},
})
</script>
