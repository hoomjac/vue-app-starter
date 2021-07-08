<template>
  <div class="hello">
    <button @click="execute">发起请求</button>
    <div v-show="isFetching">loading</div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useRequest } from '@/framework/useRequest'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const { data, isFetching, error, execute } = useRequest(
      'https://jsonplaceholder.typicode.com/todos',
      {
        immediate: false
      }
    )

    return {
      todos: data,
      isFetching,
      error,
      execute
    }
  },
  props: {
    msg: String
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
