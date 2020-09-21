<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    window.router = this.$router; // 方法赋值给window
  },
}
</script>
