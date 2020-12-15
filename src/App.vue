<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <div>
      <input type="text" v-model="message"/>
    </div>
    <div>
      <button @click="handleClick">点击测试</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: 'vue-ssr'
    }
  },
  methods: {
    handleClick() {
      console.log('click click')
    }

  }
}
</script>

<style scoped>

</style>
