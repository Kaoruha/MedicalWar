<template>
  <q-layout view="hHh lpR fFf">
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="accent"
      size="5px"
      skip-hijack
    />
    <Header></Header>
    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
  import Header from "../components/Header";

  export default {
    components: {
      Header,
    },
    data() {
      return {}
    }
  }
</script>
