<template lang="pug">
  .rangking
    include ../html/rankingHelpText.pug
    Card('v-for'="v in cases" ':key'="v" ':class'="[`card--${v}`]" )
      template(#header)
        h6 {{ `${v} Case Ranking` }}
      template(#mainImage)
        canvas(':id'="`RankingBar_${v.toUpperCase()}`")
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
  name: "Ranking",
  mixins: [MixinRanking, MixinCard],
  components: {
    Card,
    Dialog
  },
  data() {
    return {
      cases,
      chartInstance: _zipObject(cases, [null, null, null, null]),
      modelChart: {
        zone: null,
        isDialog: true
      },
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
        if (!this.chartInstance[v]) {
          return;
        }
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
            return parseInt(v3.total[v]);
          },
          "desc"
        );
        orderedResJSON.forEach(v2 => {
          const k3 = v2[0];
          const v3 = v2[1];

          // this.data[v].datasets[0].barThickness = 32;
          this.data[v].datasets[0].data.push(v3.total[v]);
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
    _delay(() => {
      cases.forEach(v => {
        if (!this.chartInstance[v]) {
          const { initChartRanking } = require("@/js/chartjs");
          this.chartInstance[v] = initChartRanking({
            elementId: `RankingBar_${v.toUpperCase()}`,
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
    }, 799);
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
@import "@/css/_foundation";
@import "@/css/_ranking";
@include foundation-form-helptext;

.ranking {
}
</style>
