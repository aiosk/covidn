<template lang='pug'>
  .dialog()
    .reveal-overlay(':style'="{display:styleDisplay}" '@click.self'='overlayOnClick' '@keydown.esc'="overlayOnClick")
      .reveal(':style'="{display:styleDisplay}" ':class'="[{collapse:isCollapse},{large:isLarge}]"  ref='dialog' tabindex="0")
        button.close-button('@click'='closeOnClick' aria-label="Close Accessible Modal" type="button")
          span(aria-hidden="true") &times;
        slot

</template>

<script>
import MixinForm from "@/mixins/Form.js";
import _delay from "lodash/delay";

export default {
  name: "Dialog",
  mixins: [MixinForm],
  props: {
    value: Object
  },
  data() {
    return {
      scrollTop: null
    };
  },
  computed: {
    isOpen: {
      get() {
        return !!this.value && !!this.value.isOpen;
      },
      set(val) {
        this.emitModel({ isOpen: val });
      }
    },
    isCollapse: {
      get() {
        return !!this.value && !!this.value.isCollapse;
      }
      // set(val) {
      //   this.emitModel({ isCollapse: val });
      // }
    },
    isLarge: {
      get() {
        return !!this.value && !!this.value.isLarge;
      }
      // set(val) {
      //   this.emitModel({ isLarge: val });
      // }
    },
    styleDisplay() {
      return this.isOpen ? "block" : "none";
    }
  },
  watch: {
    isOpen(val, oldVal) {
      const $html = document.querySelector("html");
      if (val) {
        _delay(() => {
          this.$refs.dialog.focus();
        }, 9);
        this.scrollTop = $html.scrollTop;
        $html.style.top = `-${$html.scrollTop}px`;
        $html.classList.add("zf-has-scroll");
        $html.classList.add("is-reveal-open");
      } else {
        $html.classList.remove("zf-has-scroll");
        $html.classList.remove("is-reveal-open");
        $html.style.top = null;
        window.scrollTo({ top: this.scrollTop });
      }
    }
  },
  methods: {
    closeOnClick(e) {
      this.isOpen = false;
    },
    overlayOnClick(e) {
      console.log("hi2");
      this.isOpen = false;
    }
  },
  mounted() {},
  destroyed() {
    this.scrollTop = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/css/_foundation";
@include foundation-card;
@include foundation-close-button;
@include foundation-reveal;

.card {
}
// #close {
//   position: absolute;
//   top: 1rem;
//   right: 0;
// }
.reveal {
  top: 0;
  height: unset;
  min-height: unset;
}
.close-button {
  top: 0.75rem;
  span {
    color: white;
  }
}
</style>
