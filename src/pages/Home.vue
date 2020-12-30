<template>
  <div>
    <ul>
      <li
        v-for="post in posts"
        :key="post.id"
        v-html="post.title"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "Home",
  metaInfo: {
    title: '首页',
  },
  serverPrefetch() {
    return this.getPosts();
  },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    ...mapActions(['getPosts']),
  }
}
</script>

<style scoped>

</style>
