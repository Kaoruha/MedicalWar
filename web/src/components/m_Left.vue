<template>
  <q-scroll-area class="fit">
    <q-list v-for="(menuItem, index) in menuList" :key="index">
      <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple :to="menuItem.url">
        <q-item-section avatar>
          <q-icon :name="menuItem.icon" />
        </q-item-section>
        <q-item-section>{{ menuItem.label }}</q-item-section>
      </q-item>

      <q-separator v-if="menuItem.separator" />
    </q-list>
  </q-scroll-area>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuList: [
        {
          icon: "games",
          label: "Games",
          separator: false,
          url: "/manager/game",
        },
        {
          icon: "supervised_user_circle",
          label: "User",
          separator: false,
          url: "/manager/user",
        },
        // {
        //   icon: "local_hospital",
        //   label: "Hospital",
        //   separator: false,
        //   url: "/manager/hospital",
        // },
      ],
    };
  },
};
</script>

<style lang="sass">
</style>
