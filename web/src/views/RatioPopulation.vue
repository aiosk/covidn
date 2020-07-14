<template lang="pug">
  .ratio-population
    include ../html/rankingHelpText.pug
    .grid-x.large-up-2
      .cell.card-item('v-for'="v in cases" ':key'="v" ':id'="`card_${v}`")
        component(':is'="componentCard[v]" ':myCase'="['ratio-population',v]" )
</template>

<script>
import RankingCard from "@/components/RankingCard.vue";
import _delay from "lodash/delay";
import _orderBy from "lodash/orderBy";
import _debounce from "lodash/debounce";
import _zipObject from "lodash/zipObject";
import _cloneDeep from "lodash/cloneDeep";
import { cases, defaultChartData, defaultChartColor } from "@/js/vars";

export default {
  name: "RationPopulation",
  components: {
    RankingCard
  },
  data() {
    return {
      cases: _cloneDeep(cases),
      lazyLoadCanvas: null,
      componentCard: _zipObject(cases, [null, null, null, null])
    };
  },
  watch: {},
  created() {},
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
    }, 299);
  },
  destroyed() {
    if (!!this.lazyLoadCanvas) {
      this.lazyLoadCanvas.destroy();
    }
  }
};
</script>

<style lang="scss">
@import "@/css/_foundation";
@include foundation-form-helptext;

.ratio-population {
}
.card-item {
  min-height: 30rem;
}
</style>
