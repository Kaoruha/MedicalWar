<template>
  <q-scroll-area class="fit">
    <q-list v-for="(menuItem, index) in menuList" :key="index" >

      <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple :to="menuItem.url">
        <q-item-section avatar>
          <q-icon :name="menuItem.icon" />
        </q-item-section>
        <q-item-section>
          {{ menuItem.label }}
        </q-item-section>
      </q-item>

      <q-separator v-if="menuItem.separator" />

    </q-list>
  </q-scroll-area>
</template>


<script>
  export default {
    name: 'Header',
    data() {
      return {
        menuList:[
          {
            icon: 'account_balance',
            label: 'Works',
            separator: false,
            url:'/manager/works'
          }
        ]
      }
    },
  }
</script>


<style lang="sass">
</style>






