<template lang="pug">
  .ratio
    include ../html/rankingHelpText.pug
    .grid-x.large-up-2
      .cell.card-item('v-for'="v in cases" ':key'="v" ':id'="`card_${v}`")
        component(':is'="componentCard[v]" ':myCase'="['ratio',v]" )
</template>



<script>
import RankingCard from "@/components/RankingCard.vue";
import _delay from "lodash/delay";
import _zipObject from "lodash/zipObject";
import _cloneDeep from "lodash/cloneDeep";
import { cases } from "@/js/vars";

const defaultCases = cases.filter(v => v != "confirmed");

export default {
  name: "RationPopulation",
  components: {
    RankingCard
  },
  data() {
    return {
      cases: _cloneDeep(defaultCases),
      lazyLoadCanvas: null,
      componentCard: _zipObject(cases, [null, null, null, null])
    };
  },
  mounted() {
    _delay(() => {
      if (!this.lazyLoadCanvas) {
        const LazyLoad = require("lazyload");

        this.lazyLoadCanvas = new LazyLoad({
          elements_selector: ".card-item",
          unobserve_entered: true,
          callback_enter: el => {
            const elId = el.id
              .split("_")
              .slice(1)
              .join("_");

            this.$set(this.componentCard, elId, RankingCard);
          }
          // callback_exit: el => {
          //   const elId = el
          //     .querySelector("canvas")
          //     .id.split("_")
          //     .slice(1)
          //     .join("_");
          //   console.log("callback_exit", elId);
          // }
        });
      }
    }, 99);
  },
  destroyed() {
    if (!!this.lazyLoadCanvas) {
      this.lazyLoadCanvas.destroy();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/css/_foundation";
@include foundation-form-helptext;
.ratio {
}
.card-item {
  min-height: 30rem;
}
</style>
