<template>
  <div>
    <h1>Setting</h1>
    <input type="file" ref="file">
    <q-btn @click="submit">提交</q-btn>
    <q-btn @click="test">Test</q-btn>
  </div>
</template>

<script>
  import Tag from '../api/tag.js'

  export default {
    name: 'Setting',
    components: {},
    data() {
      return {}
    },
    methods: {
      submit() {
        const f = this.$refs.file.files[0]
        Tag.Upload(f)
        // console.log(this.$refs.file.files[0])
      },
      test() {
        console.log(this.$store.state.authorization.token)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
