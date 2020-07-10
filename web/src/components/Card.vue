<template lang='pug'>
  .card
    .capture
      header.card-divider
        slot(name='header')
      main.card-section
        slot(name='main')
      main.card-image
        slot(name='mainImage')
    menu.card-section
      slot(name='menu')
    
</template>

<script>
export default {
  name: "Card",
  props: {
    value: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/css/_foundation";
@include foundation-card;
</style>
