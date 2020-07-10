<template lang='pug'>
  .dialog
    .reveal-overlay(':style'="{display:styleDisplay}" '@click.self'='overlayOnClick')
      .reveal(':style'="{display:styleDisplay}")
        button.close-button('@click'='closeOnClick' aria-label="Close Accessible Modal" type="button")
          span(aria-hidden="true") &times;
        slot

</template>

<script>
export default {
  name: "Dialog",
  props: {
    value: Object
  },
  computed: {
    isOpen: {
      get() {
        return !!this.value && !!this.value.isOpen;
      },
      set(val) {
        this.value.isOpen = val;
      }
    },
    styleDisplay() {
      return this.isOpen ? "block" : "none";
    }
  },
  watch: {
    isOpen(val, oldVal) {
      const $html = document.querySelector("html");
      $html.classList.toggle("is-reveal-open");
      // $html.classList.toggle("zf-has-scroll");
    }
  },
  methods: {
    closeOnClick(e) {
      this.isOpen = false;
    },
    overlayOnClick(e) {
      this.isOpen = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/css/_foundation";
@include foundation-card;
@include foundation-reveal;
@include foundation-close-button;

.card {
}
.reveal {
  padding: 0;
}
// #close {
//   position: absolute;
//   top: 1rem;
//   right: 0;
// }
</style>
