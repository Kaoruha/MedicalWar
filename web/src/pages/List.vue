<template>
  <q-page class="flex list_container">
    <div class="list">
      <Details v-for="item in list" v-bind:key="item.title">{{item.title}}</Details>
    </div>
  </q-page>
</template>


<script>
  import Details from '../components/Details'
  export default {
    name: 'List',
    components: {
      Details
    },
    data() {
      return {
        list:[
          {
            title:'fuck me1',
            caption:'',
            img:''
          },
          {
            title:'fuck me2',
            caption:'',
            img:''
          },
          {
            title:'fuck me3',
            caption:'',
            img:''
          },
          {
            title:'fuck me4',
            caption:'',
            img:''
          },
          {
            title:'fuck me5',
            caption:'',
            img:''
          },
          {
            title:'fuck me6',
            caption:'',
            img:''
          },
          {
            title:'fuck me7',
            caption:'',
            img:''
          },
          {
            title:'fuck me8',
            caption:'',
            img:''
          }
        ]
      }
    },
  }
</script>


<style lang="sass" scoped>
  .list
    margin: 60px auto 0
    background-color: green
    max-width: 1650px
</style>






