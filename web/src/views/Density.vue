<template lang="pug">
  .density
    template(v-for="v in cases")
      .card(':class'="[v]" ':key'="v")
        .capture
          .card-divider
            h4 {{v}}
          .card-image
            canvas(':id'="`Density_${v.toUpperCase()}`")
        .card-section.action
          a.icon.download-chart('@click'='onClickDownloadChart'): img(src="@/assets/img/baseline_get_app_black_18dp.png" alt="download chart" title='download chart')
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
  name: "Density",
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
        a.download = `ChartDensity_${$cardTitle.innerText}.jpeg`;
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
        const totalCasePerMPopCamelcase = `${totalCaseCamelcase}PerMPop`;

        resJSON.forEach((v, i) => {
          const k2 = v[0];
          const v2 = v[1];

          resJSON[i][1][totalCasePerMPopCamelcase] = (
            (v2[totalCaseCamelcase] / v2.population) *
            1000000
          ).toFixed(0);
        });
      });
      cases.forEach(v => {
        const totalCaseCamelcase = _camelCase(`total ${v}`);
        const totalCasePerMPopCamelcase = `${totalCaseCamelcase}PerMPop`;

        let orderedResJSON = _orderBy(
          resJSON,
          v => {
            return parseInt(v[1][totalCasePerMPopCamelcase]);
          },
          "desc"
        );
        orderedResJSON.forEach(v2 => {
          const k3 = v2[0];
          const v3 = v2[1];

          this.data[v].datasets[0].data.push(v3[totalCasePerMPopCamelcase]);
          this.$set(this.data[v].datasets[0], "backgroundColor", color[v]);
          this.data[v].labels.push(k3);
        });
      });
    }, 9);
  },
  mounted() {
    cases.forEach(v => {
      if (!this.chartInstance[v]) {
        const { initChartRanking } = require("@/js/chartjs");
        this.chartInstance[v] = initChartRanking({
          elementId: `Density_${v.toUpperCase()}`,
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
@import "@/css/_foundation";
@import "@/css/_color";
@include foundation-card;
.capture {
  background: white;
}
.action {
  text-align: right;
}
.confirmed,
.recover,
.death,
.active {
  .card-divider {
    color: white;
    text-transform: uppercase;
    h4 {
      font-weight: bold;
      font-size: 1.25rem;
    }
  }
}
.confirmed {
  border: 1px solid map-get($case-color, "confirmed");
  .card-divider {
    background: map-get($case-color, "confirmed");
  }
}
.recover {
  border: 1px solid map-get($case-color, "recover");
  .card-divider {
    background: map-get($case-color, "recover");
  }
}
.death {
  border: 1px solid map-get($case-color, "death");
  .card-divider {
    background: map-get($case-color, "death");
  }
}
.active {
  border: 1px solid map-get($case-color, "active");
  .card-divider {
    background: map-get($case-color, "active");
  }
}
</style>
