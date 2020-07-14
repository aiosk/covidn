<template lang='pug'>
  .spinner.reveal-overlay(':style'="{display:styleDisplay}" '@click.self'='overlayOnClick')
      .reveal(':style'="{display:styleDisplay}" ':class'="[{collapse:isCollapse},{large:isLarge}]")
        .spin: i.icon-spinner

</template>

<script>
import MixinForm from "@/mixins/Form.js";
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
      this.isOpen = false;
    }
  },
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

.spinner {
}
.reveal-overlay {
  position: absolute;
}
.reveal {
  background: none;
  width: unset;
  border: none;
  @include absolute-center;
}

.icon-spinner {
  color: white;
  font-size: 2.5rem;
}
.spin {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
// #close {
//   position: absolute;
//   top: 1rem;
//   right: 0;
// }
.reveal {
  // top: 0;
  // height: unset;
  // min-height: unset;
}
</style>
