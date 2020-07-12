<template lang='pug'>
  .daily
    h3 Daily Cases per Provinces
    DailyForm('v-model'="myModel")

    .grid-x.large-up-2(aria-describedby="chartHelpText")
      .cell(v-for="v in myModel.selectedZones" ':key'="v" ':id'='`Cell_${v}`' ':class'='[{"width-100":myModel.selectedZones.length == 1},"chart-item"]' )
        component(':is'="componentZoneCard[v]" ':zone'='v' 'v-model'="myModel")
</template>

<script>
// @ is an alias to /src
import DailyForm from "@/components/DailyForm.vue";
import ZoneCard from "@/components/ZoneCard.vue";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";
import { zones, defaultZones } from "@/js/vars";

export default {
  name: "Daily",
  components: {
    DailyForm,
    ZoneCard
  },
  data() {
    return {
      lazyLoadCanvas: null,
      componentZoneCard: {},
      myModel: {
        periods: null,
        zones,
        selectedZones: _cloneDeep(defaultZones),
        hiddenDatasets: null,
        showLegend: false
      }
    };
  },
  watch: {
    componentZoneCard: function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas) {
          this.lazyLoadCanvas.update();
        }
      }, 9);
    },
    "myModel.selectedZones": async function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas) {
          this.lazyLoadCanvas.update();
        }
      }, 9);
    }
  },

  created() {
    let { zones: selectedZones } = this.$route.query;

    if (!!selectedZones) {
      selectedZones = selectedZones.split("+");
      this.myModel.selectedZones = selectedZones;
    }
  },
  mounted() {
    _delay(() => {
      if (!this.lazyLoadCanvas) {
        const LazyLoad = require("lazyload");

        this.lazyLoadCanvas = new LazyLoad({
          elements_selector: ".chart-item",
          unobserve_entered: true,
          callback_enter: el => {
            const elId = el.id
              .split("_")
              .slice(1)
              .join("_");

            this.$set(this.componentZoneCard, elId, ZoneCard);
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
    this.lazyLoadCanvas.destroy();

    this.$set(this.myModel, "periods", null);
    this.$set(this.myModel, "selectedZones", _cloneDeep(defaultZones));
    this.$set(this.myModel, "hiddenDatasets", null);
    this.$set(this.myModel, "componentZoneCard", {});
  }
};
</script>

<style lang="scss">
@import "@/css/_foundation";
// @import "@/css/_chart";
.chart-item {
  min-height: 20rem;
}
.cell {
  position: relative;
}

.width-100 {
  width: 100% !important;
}
</style>