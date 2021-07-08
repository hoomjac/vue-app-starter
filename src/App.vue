<template>
  <ConfigProvider :prefixCls="prefixCls">
    <HelloWorld />
  </ConfigProvider>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { name as pkgName } from '../package.json'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const prefixCls = computed(() => pkgName + '-')

    return { prefixCls }
  },
  components: {
    ConfigProvider,
    HelloWorld
  }
})
</script>

<style lang="scss"></style>
