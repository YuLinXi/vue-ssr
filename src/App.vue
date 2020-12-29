<template>
  <div id="app">
    <div>
      <router-link to="/">Home Pages</router-link>
    </div>
    <div>
      <router-link to="/about">About Pages</router-link>
    </div>
    <div>
      <router-link to="/other">Other Pages</router-link>
    </div>
    <div style="margin-top: 100px">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
}
</script>

<style scoped>

</style>
