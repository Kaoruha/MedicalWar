<template>
  <div class="details">
<!--    <h1>t</h1>-->
  </div>
</template>


<script>
  export default {
    name: 'Details',
    data() {
      return {}
    },
  }
</script>


<style lang="sass">
  .details
    width: 265px
    height: 650px
    margin: 2.5px 5px
    box-sizing: border-box
    background-color: red
    display: inline-grid
    @media screen and (max-width: 1660px)
      width: 16vw
      margin: .16vw .33vw
      height: 40vw
      background-color: cornflowerblue
    @media screen and (max-width: 1280px)
      width: 24vw
      margin: .25vw .5vw
      height: 60vw
      background-color: cornflowerblue
    @media screen and (max-width: 900px)
      width: 49vw
      margin: .25vw .5vw
      height: 122.5vw
      background-color: cornflowerblue
    @media screen and (max-width: 600px)
      width: 100vw
      margin-top: 1vw
      height: 250vw
      background-color: cornflowerblue
</style>






