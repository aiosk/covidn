<template lang="pug">
  .ratio
    include ../html/rankingHelpText.pug
    Card('v-for'="v in cases" ':key'="v" ':class'="[`card--${v}`]" )
      template(#header)
        h6 {{ `Case ${v == 'death' ? 'fatality':(v == 'recover'?'recovery':v)} Ratio` }}
      template(#mainImage)
        canvas(':id'="`Ratio_${v.toUpperCase()}`")
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

const defaultCases = cases.filter(v => v != "confirmed");

export default {
  name: "RationPopulation",
  mixins: [MixinRanking, MixinCard],
  components: {
    Card,
    Dialog
  },
  data() {
    return {
      modelChart: { zone: null, isDialog: true },
      cases: defaultCases,
      chartInstance: _zipObject(defaultCases, [null, null, null]),
      data: _zipObject(defaultCases, [
        _cloneDeep(defaultChartData),
        _cloneDeep(defaultChartData),
        _cloneDeep(defaultChartData)
      ])
    };
  },
  watch: {
    "data.recover.labels": _debounce(function(val, oldVal) {
      defaultCases.forEach(v => {
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
      defaultCases.forEach(v => {
        let orderedResJSON = _orderBy(
          resJSON,
          v2 => {
            const v3 = v2[1];
            return parseInt(v3.ratio[v]);
          },
          "desc"
        );
        orderedResJSON.forEach(v2 => {
          const k3 = v2[0];
          const v3 = v2[1];

          this.data[v].datasets[0].data.push(v3.ratio[v]);
          this.$set(
            this.data[v].datasets[0],
            "backgroundColor",
            defaultChartColor[v]
          );
          this.$set(this.data[v].datasets[0], "datalabels", {
            backgroundColor: defaultChartColor[v]
          });
          this.data[v].labels.push(k3.split("_").join(" "));
        });
      });
    }, 9);
  },
  mounted() {
    const _this = this;
    defaultCases.forEach(v => {
      if (!this.chartInstance[v]) {
        const { initChartRanking } = require("@/js/chartjs");
        this.chartInstance[v] = initChartRanking({
          elementId: `Ratio_${v.toUpperCase()}`,
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
    defaultCases.forEach(v => {
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
.ratio-population {
}
</style>
