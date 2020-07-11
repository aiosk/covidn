<template lang="pug">
  .ratio-population
    .help-text.callout.warning
      ul
        li Long Tap to show legend
        li Tap to show province detail
    Card('v-for'="v in cases" ':key'="v" ':class'="[`card--${v}`]" )
      template(#header)
        h4 {{ `${v} Case per 1 Million Population Ratio` }}
      template(#mainImage)
        canvas(':id'="`RatioPopulation_${v.toUpperCase()}`")
      template(#menu)
        a.download-chart('@click'='downloadOnClick'): i.icon-floppy(title='download chart')

    Dialog('v-model'='modelDialog')
      component(:is='componentChart' ':zone'='modelChart.zone' 'v-model'="modelChart")
</template>

<script>
import Card from "@/components/Card.vue";
import Dialog from "@/components/Dialog.vue";
import ZoneCard from "@/components/ZoneCard.vue";
import MixinRanking from "@/mixins/Ranking.js";
import MixinCard from "@/mixins/Card.js";
import _delay from "lodash/delay";
import _orderBy from "lodash/orderBy";
import _debounce from "lodash/debounce";
import _zipObject from "lodash/zipObject";
import _cloneDeep from "lodash/cloneDeep";
import { cases, defaultChartData, defaultChartColor } from "@/js/vars";

export default {
  name: "RationPopulation",
  mixins: [MixinRanking, MixinCard],
  components: {
    Card,
    Dialog
  },
  data() {
    return {
      modelChart: { zone: null },
      cases,
      chartInstance: _zipObject(cases, [null, null, null, null]),
      data: _zipObject(cases, [
        _cloneDeep(defaultChartData),
        _cloneDeep(defaultChartData),
        _cloneDeep(defaultChartData),
        _cloneDeep(defaultChartData)
      ])
    };
  },
  watch: {
    "data.confirmed.labels": _debounce(function(val, oldVal) {
      cases.forEach(v => {
        this.chartInstance[v].update();
      });
    }, 500)
  },
  created() {
    _delay(async () => {
      const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/stats/stats.json?_=${Date.now()}`;
      let res = await fetch(url);
      let resJSON = await res.json();

      resJSON = Object.entries(resJSON).filter(v => v[0] != "NATIONAL");
      cases.forEach(v => {
        let orderedResJSON = _orderBy(
          resJSON,
          v2 => {
            const v3 = v2[1];
            return parseInt(v3.populationRatio[v]);
          },
          "desc"
        );
        orderedResJSON.forEach(v2 => {
          const k3 = v2[0];
          const v3 = v2[1];

          this.data[v].datasets[0].data.push(v3.populationRatio[v]);
          this.$set(
            this.data[v].datasets[0],
            "backgroundColor",
            defaultChartColor[v]
          );
          this.data[v].labels.push(k3.split("_").join(" "));
        });
      });
    }, 9);
  },
  mounted() {
    const _this = this;
    cases.forEach(v => {
      if (!this.chartInstance[v]) {
        const { initChartRanking } = require("@/js/chartjs");
        this.chartInstance[v] = initChartRanking({
          elementId: `RatioPopulation_${v.toUpperCase()}`,
          data: this.data[v],
          onClick(e, chartItem) {
            // e.preventDefault();
            if (!chartItem.length) {
              return;
            }
            const chartItemID = chartItem[0]._view.label.replace(/ /g, "_");

            _this.modelChart.zone = chartItemID;
            _this.modelDialog.isOpen = true;
          }
        });
      }
    });
  },
  destroyed() {
    cases.forEach(v => {
      if (!!this.chartInstance[v]) {
        this.chartInstance[v].destroy();
      }
      this.data[v] = _cloneDeep(defaultChartData);
    });
  }
};
</script>

<style lang="scss">
@import "@/css/_card";
.ratio-population {
}
</style>
