<template lang="pug">
  .ratio-population
    Card('v-for'="v in cases" ':key'="v" ':class'="[`card--${v}`]" )
      template(#header)
        h4 {{`${v} Case per 1 Million Population Ratio`}}
      template(#mainImage)
        canvas(':id'="`RatioPopulation_${v.toUpperCase()}`")
      template(#menu)
        a.download-chart('@click'='onClickDownloadChart'): i.icon-floppy(title='download chart')

</template>

<script>
import Card from "@/components/Card.vue";
import _delay from "lodash/delay";
import _orderBy from "lodash/orderBy";
import _debounce from "lodash/debounce";
import _zipObject from "lodash/zipObject";
import _cloneDeep from "lodash/cloneDeep";
import { cases } from "@/js/vars";

const defaultChartData = { datasets: [{ data: [] }], labels: [] };

export default {
  name: "RationPopulation",
  components: {
    Card
  },
  data() {
    return {
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
  methods: {
    onClickDownloadChart(e) {
      const domtoimage = require("domtoimage");
      const $card = e.target.closest(".card");
      const title = $card.querySelector("h4").innerText.replace(/ /g, "_");
      const downloadName = `${title}.jpeg`;

      (async () => {
        const dataUrl = await domtoimage.toJpeg(
          $card.querySelector(".capture")
        );

        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = downloadName;
        a.click();
      })();
    }
  },
  created() {
    _delay(async () => {
      const { color } = require("@/js/chartjs");

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
          this.$set(this.data[v].datasets[0], "backgroundColor", color[v]);
          this.data[v].labels.push(k3.split("_").join(" "));
        });
      });
    }, 9);
  },
  mounted() {
    cases.forEach(v => {
      if (!this.chartInstance[v]) {
        const { initChartRanking } = require("@/js/chartjs");
        this.chartInstance[v] = initChartRanking({
          elementId: `RatioPopulation_${v.toUpperCase()}`,
          data: this.data[v]
        });
      }
    });
  },
  destroyed() {
    cases.forEach(v => {
      if (!!this.chartInstance[v]) {
        this.chartInstance[v].destroy();
      }
      this.data[v] = { datasets: [], labels: [] };
    });
  }
};
</script>

<style lang="scss">
@import "@/css/_card";
.ratio-population {
}
</style>
