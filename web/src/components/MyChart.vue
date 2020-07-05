<template lang="pug">
  .my-chart
    .action(v-lazy-container="{ selector: 'img' }")
      .loader
      a.icon.download-raw(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/${this.zone}.csv`' target='_blank'): img.lazy(data-src="./img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")
      a.icon.download-chart('@click'='onClickDownloadChart'): img(data-src="./img/baseline_get_app_black_18dp.png" alt="download chart" title='download chart')
      a.icon.fullscreen.show-for-xlarge('@click'='onClickFullscreen'): img(data-src="./img/baseline_fullscreen_black_18dp.png" alt="fullscreen")

    canvas(:id="`Chart_${zone}`" ':aria-describedby'="`chartHelpText_${zone}`")
    .help-text.callout.secondary(':id'='`chartHelpText_${zone}`')
      ul(v-lazy-container="{ selector: 'img' }")
        li #[strong.show-for-xlarge Click]#[strong.hide-for-xlarge Tap / Touch] chart legend to show/hide chart data
        li #[strong.show-for-xlarge Hover]#[strong.hide-for-xlarge Tap / Touch] chart to show case number
        li.hide-for-xlarge #[strong Tap / Touch outside] chart to hide case number
</template>

<script>
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";

export default {
  name: "MyChart",
  props: {
    zone: String,
    value: Object
  },
  computed: {
    periods() {
      return this.value.periods;
    },
    hiddenDatasets() {
      return this.value.hiddenDatasets;
    },
    mqIsAtLeastMedium() {
      return this.value.mediaQuery.isAtLeastMedium;
    }
  },
  data() {
    return {
      chartInstance: null,
      data: { datasets: [], labels: [] }
    };
  },
  watch: {
    periods(val, oldVal) {
      this.updateChartData();
    },
    hiddenDatasets(val, oldVal) {
      this.updateChartDatasets();
    },
    mqIsAtLeastMedium(val, oldVal) {
      if (!this.chartInstance) {
        return;
      }
      this.chartInstance.options.legend.display = val;
      this.chartInstance.options.scales.xAxes[0].ticks.display = val;
      this.chartInstance.options.scales.yAxes[0].ticks.display = true;
      this.chartInstance.update();
    }
  },
  methods: {
    onClickFullscreen(e) {
      e.target.closest(".cell.callout").classList.toggle("width-100");
    },
    onClickDownloadChart(e) {
      const $anchor = e.target.closest("a.download-chart");
      // Page.domSpin(e.target);

      const image = this.chartInstance.toBase64Image();
      $anchor.href = image;
      $anchor.download = `Chart_${this.zone}.jpg`;
    },
    updateChartData() {
      (async () => {
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${
          this.zone
        }-${this.periods}.json?_=${Date.now()}`;
        let res = await fetch(url);
        let resJSON = await res.json();
        resJSON.datasets[1].borderDash = [5, 5];

        this.$set(this.data, "datasets", resJSON.datasets);
        this.$set(this.data, "labels", resJSON.labels);
        this.updateChartDatasets();
      })();
    },
    updateChartDatasets() {
      this.hiddenDatasets.forEach((v, i) => {
        if (!!this.chartInstance.data.datasets.length) {
          this.chartInstance.data.datasets[i].hidden = v;
        }
      });
      this.chartInstance.update();
    }
  },
  mounted() {
    const _this = this;

    _delay(() => {
      const { initChart } = require("../js/chartjs");
      this.chartInstance = initChart({
        zone: this.zone,
        data: this.data,
        mqIsAtLeastMedium: this.mqIsAtLeastMedium,
        legendOnClick(e, legendItem) {
          var index = legendItem.datasetIndex;
          var ci = this.chart;
          // var meta = ci.getDatasetMeta(index);

          // See controller.isDatasetVisible comment
          // meta.hidden =
          //   meta.hidden === null ? !ci.data.datasets[index].hidden : null;
          ci.data.datasets[index].hidden = !ci.data.datasets[index].hidden;

          // We hid a dataset ... rerender the chart

          const propsValue = _cloneDeep(_this.value);
          _this.$set(
            propsValue.hiddenDatasets,
            index,
            ci.data.datasets[index].hidden
          );
          // propsValue.hiddenDatasets = ci.data.datasets.map((v) => v.hidden);

          _this.$emit("input", propsValue);
          ci.update();
        }
      });
    }, 499);

    _delay(() => {
      this.updateChartData();
    }, 699);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../css/_foundation";
@include foundation-form-helptext;

.my-chart {
}
canvas {
  // margin-top: 0.5rem;
}
.help-text {
  margin: {
    top: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0rem;
  }
}
.action {
  position: absolute;
  right: 0;
  top: 0;
  text-align: right;
  a.icon {
    $size: 3rem;
    height: $size;
    width: $size;
    // padding: 1rem;
    display: inline-block;
    padding: 0.5rem;
    img {
      $size: $size - 1rem;
      height: $size;
      width: $size;
    }
  }

  & > .cell:nth-child(1) {
    order: 2;
  }
  & > .cell:nth-child(2) {
    order: 1;
  }
}
</style>
