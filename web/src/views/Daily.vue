<template lang='pug'>
.daily
  h3 Daily Cases per Provinces
  DailyForm(v-model="myModel")

  .grid-x.large-up-2(aria-describedby="chartHelpText")
    .cell(
      v-for="v in myModel.selectedZones",
      :key="v",
      :class="[{ 'width-100': myModel.selectedZones.length == 1 }]"
    )
      .lazy-card(:id="`Cell_${v}`")
        component(:is="componentZoneCard[v]", :zone="v", v-model="myModel")
</template>

<script>
// @ is an alias to /src
import MixinForm from "@/mixins/Form.js";
import DailyForm from "@/components/DailyForm.vue";
import ZoneCard from "@/components/ZoneCard.vue";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";
import { zones, defaultZones } from "@/js/vars";

export default {
  name: "Daily",
  mixins: [MixinForm],
  components: {
    DailyForm,
    ZoneCard,
  },
  data() {
    return {
      lazyLoadCanvas: null,
      componentZoneCard: {},
      myModel: {
        interval: null,
        zones,
        selectedZones: _cloneDeep(defaultZones),
        hiddenDatasets: null,
        showLegend: false,
      },
    };
  },
  watch: {
    "myModel.selectedZones"(val, oldVal) {
      _delay(() => {
        val.forEach((v) => {
          this.$set(this.componentZoneCard, v, ZoneCard);
        });
      }, 9);

      this.updateQuery("zones", val, defaultZones);
    },
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
          elements_selector: ".lazy-card",
          unobserve_entered: true,
          callback_enter: (el) => {
            const elId = el.id.split("_").slice(1).join("_");

            this.$set(this.componentZoneCard, elId, ZoneCard);
          },
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

    this.$set(this.myModel, "interval", null);
    this.$set(this.myModel, "selectedZones", _cloneDeep(defaultZones));
    this.$set(this.myModel, "hiddenDatasets", null);
    this.$set(this.myModel, "componentZoneCard", {});
  },
};
</script>

<style lang="scss">
@import "@/css/_foundation";
// @include foundation-responsive-embed;
// @import "@/css/_chart";

.cell {
  // position: relative;
}

.width-100 {
  width: 100% !important;
}
@mixin my-responsive-embed($ratio) {
  @include responsive-embed($ratio);
  & > .card {
    position: absolute;
    top: 0;
    #{$global-left}: 0;
    width: 100%;
    height: 100%;
  }
}
.lazy-card {
  min-height: 33rem;
  // @include my-responsive-embed(3 by 4);
}
</style>