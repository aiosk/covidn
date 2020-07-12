<template lang="pug">
  .ratio-population
    include ../html/rankingHelpText.pug
    .grid-x.large-up-2
      .cell('v-for'="v in cases" ':key'="v" )
        Card( ':class'="['card-ranking',`card-ranking--${v}`]" )
          template(#header)
            h6 {{ `${v} Rate per 1 Million Population Ratio` }}
            menu
              a.fullscreen.show-for-large('@click'='onClickFullscreen' title="resize card" aria-label="resize card"): i.icon-window-maximize
          template(#mainImage)
            canvas(':id'="`RatioPopulation_${v.toUpperCase()}`")
          template(#menu)
            a.download-card('@click'='downloadOnClick' title='download card' aria-label='download card'): i.icon-download-cloud
            a.share('@click'='shareOnClick' title='share' aria-label='share'): i.icon-share

        Dialog('v-model'='modelDialog')
          component(:is='componentChart' ':zone'='modelChart.zone' 'v-model'="modelChart")
</template>

<script>
import Card from "@/components/Card.vue";
import Dialog from "@/components/Dialog.vue";
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
      modelChart: { zone: null, population: null, isDialog: true },
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

      resJSON = Object.entries(resJSON);
      cases.forEach(v => {
        let orderedResJSON = _orderBy(
          resJSON,
          v2 => {
            const v3 = v2[1];
            return parseInt(v3.populationRatio[v]);
          },
          "desc"
        );
        orderedResJSON.forEach((v2, i2) => {
          const k3 = v2[0];
          const v3 = v2[1];

          this.data[v].datasets[0].data.push(v3.populationRatio[v]);
          if (!this.data[v].datasets[0].population) {
            this.data[v].datasets[0].population = [];
          }
          this.data[v].datasets[0].population.push(v3.population);
          this.$set(
            this.data[v].datasets[0],
            "backgroundColor",
            defaultChartColor[v]
          );

          if (!this.data[v].datasets[0].datalabels) {
            this.$set(this.data[v].datasets[0], "datalabels", {
              align: [],
              color: []
            });
          }
          const divider = 10;
          this.$set(
            this.data[v].datasets[0].datalabels.align,
            i2,
            i2 < orderedResJSON.length / divider ? "start" : "end"
          );
          this.$set(
            this.data[v].datasets[0].datalabels.color,
            i2,
            i2 < orderedResJSON.length / divider ? "#fff" : "#000"
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

            // console.log(chartItem[0]._index);
            const thisCase = chartItem[0]._chart.canvas.id
              .split("_")[1]
              .toLowerCase();
            const chartItemID = chartItem[0]._view.label.replace(/ /g, "_");
            // console.log(thisCase, _this.data[thisCase]);
            _this.$set(_this.modelChart, "zone", chartItemID);
            _this.$set(
              _this.modelChart,
              "population",
              _this.data[thisCase].datasets[0].population[chartItem[0]._index]
            );
            // _this.modelChart.zone = chartItemID;
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
@import "@/css/_ranking";
.ratio-population {
}
</style>
