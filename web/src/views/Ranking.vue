<template lang="pug">
  .rangking
    h3 Cases Ranking per Provinces
    template(v-for="v in cases")
      .card(':class'="[v]" ':key'="v")
        .capture
          .card-divider
            h4 {{v}}
          .card-image
            canvas(':id'="`RankingBar_${v.toUpperCase()}`")
        .card-section.action
          a.download-chart('@click'='onClickDownloadChart'): i.icon-download-cloud(title='download chart')
</template>

<script>
import _delay from "lodash/delay";
import _orderBy from "lodash/orderBy";
import _camelCase from "lodash/camelCase";
import _debounce from "lodash/debounce";
import _zipObject from "lodash/zipObject";
import _cloneDeep from "lodash/cloneDeep";
import { zones, cases } from "@/js/vars";

const defaultChartData = { datasets: [{ data: [] }], labels: [] };

export default {
  name: "Ranking",
  data() {
    return {
      cases,
      dataZones: null,
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
      const $anchor = e.target.closest("a.download-chart");
      const $card = e.target.closest(".card");
      const $cardTitle = $card.querySelector("h4");
      const _this = this;

      (async () => {
        const dataUrl = await domtoimage.toJpeg(
          $card.querySelector(".capture")
        );

        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `ChartRanking_${$cardTitle.innerText}.jpeg`;
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
        const totalCaseCamelcase = _camelCase(`total ${v}`);
        let orderedResJSON = _orderBy(
          resJSON,
          v => {
            return parseInt(v[1][totalCaseCamelcase]);
          },
          "desc"
        );
        orderedResJSON.forEach(v2 => {
          const k3 = v2[0];
          const v3 = v2[1];

          // this.data[v].datasets[0].barThickness = 32;
          this.data[v].datasets[0].data.push(v3[totalCaseCamelcase]);
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
          elementId: `RankingBar_${v.toUpperCase()}`,
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

<style scoped lang="scss">
@import "@/css/_foundation";
@import "@/css/_chart";
@include foundation-card;

.ranking {
}
.card-image {
  min-height: 40rem;
}
</style>
