<template lang="pug">
  .ratio
    Card('v-for'="v in cases" ':key'="v" ':class'="[`card--${v}`]" )
      template(#header)
        h4 {{`Case ${v == 'death' ? 'fatality':v} Ratio`}}
      template(#mainImage)
        canvas(':id'="`Ratio_${v.toUpperCase()}`")
      template(#menu)
        a.download-chart('@click'='onClickDownloadChart'): i.icon-floppy(title='download chart')
    Dialog('v-model'='modelDialog')
      //- template(#header) {{title}}
      component(:is='homeChart' ':zone'='modelChart.zone' 'v-model'="modelChart")
</template>



<script>
import Card from "@/components/Card.vue";
import Dialog from "@/components/Dialog.vue";
import HomeChart from "@/components/HomeChart.vue";
import _delay from "lodash/delay";
import _orderBy from "lodash/orderBy";
import _debounce from "lodash/debounce";
import _zipObject from "lodash/zipObject";
import _cloneDeep from "lodash/cloneDeep";
import { cases } from "@/js/vars";

const defaultCases = cases.filter(v => v != "confirmed");
const defaultChartData = { datasets: [{ data: [] }], labels: [] };

export default {
  name: "RationPopulation",
  components: {
    HomeChart,
    Card,
    Dialog
  },
  data() {
    return {
      modelDialog: {
        isOpen: false
      },
      homeChart: null,
      modelChart: {
        zone: null,
        periods: 3,
        hiddenDatasets: [
          true,
          true,
          true,
          true,
          false,
          false,
          false,
          false,
          true,
          true,
          true,
          true
        ]
      },
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
    }, 500),
    "modelDialog.isOpen": function(val, oldVal) {
      if (!val) {
        this.homeChart = null;
      } else {
        this.homeChart = HomeChart;
      }
    }
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
          this.$set(this.data[v].datasets[0], "backgroundColor", color[v]);
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
