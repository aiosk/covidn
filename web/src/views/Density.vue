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
      let dataZones = zones
        .filter(v => v != "NATIONAL")
        .map(async (v, i) => {
          const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/stats/${v}.json?_=${Date.now()}`;
          let res = await fetch(url);
          let resJSON = await res.json();
          resJSON.zone = v.split("_").join(" ");
          cases.forEach(v => {
            const totalCaseCamelcase = _camelCase(`total ${v}`);
            const totalCasePerMPopCamelcase = `${totalCaseCamelcase}PerMPop`;
            resJSON[totalCasePerMPopCamelcase] = (
              (resJSON[totalCaseCamelcase] / resJSON.population) *
              1000000
            ).toFixed(0);

            this.$set(
              this.data[v].datasets[0].data,
              i,
              resJSON[totalCaseCamelcase]
            );
            this.$set(this.data[v].datasets[0], "backgroundColor", color[v]);
            this.$set(this.data[v].labels, i, resJSON.zone);
          });
          return resJSON;
        });
      dataZones = await Promise.all(dataZones);
      console.log(dataZones);

      cases.forEach(v => {
        const totalCaseCamelcase = _camelCase(`total ${v}`);
        const totalCasePerMPopCamelcase = `${totalCaseCamelcase}PerMPop`;
        let currentOrderedData = _orderBy(
          dataZones,
          v2 => {
            return parseInt(v2[totalCasePerMPopCamelcase]);
          },
          "desc"
        );
        currentOrderedData.forEach((v2, i2) => {
          this.$set(
            this.data[v].datasets[0].data,
            i2,
            v2[totalCasePerMPopCamelcase]
          );
          this.$set(this.data[v].labels, i2, v2.zone);
          // this.chartInstance[v].update();
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
