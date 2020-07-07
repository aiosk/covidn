<template lang="pug">
  .my-chart.card('aria-describedby'="chartHelpText")
    .capture
      .card-divider.title
        h4 {{zone.split('_').join(' ')}}
      .card-section.stats
        component(:is="myChartStats" 'v-model'='myStatsModel')
      .card-section.legend(v-html='legendHTML' '@click'='legendOnClick').grid-x.small-up-2.medium-up-4
      .card-image
        canvas(:id="`Chart_${zone}`")
    .card-section.action
      a.icon.download-raw(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/${this.zone}.csv`' target='_blank'): img.lazy(data-src="./img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")
      a.icon.download-chart('@click'='onClickDownloadChart'): img.lazy(data-src="./img/baseline_get_app_black_18dp.png" alt="download chart" title='download chart')
      a.icon.fullscreen.show-for-xlarge('@click'='onClickFullscreen'): img.lazy(data-src="./img/baseline_fullscreen_black_18dp.png" alt="fullscreen")

</template>

<script>
import MyChartStats from "./MyChartStats";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";

export default {
  name: "MyChart",
  components: {
    MyChartStats
  },
  props: {
    zone: String,
    value: Object
  },
  computed: {
    myStatsModel() {
      return { statsNational: this.value.statsNational, zone: this.zone };
    },
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
      legendHTML: null,
      stats: {},
      myChartStats: null,
      data: { datasets: [], labels: [] }
    };
  },
  watch: {
    periods(val, oldVal) {
      // this.updateChartData();
    },
    hiddenDatasets(val, oldVal) {
      // this.updateChartDatasets();
    },
    mqIsAtLeastMedium(val, oldVal) {
      if (!this.chartInstance) {
        return;
      }
      this.chartInstance.options.scales.xAxes[0].ticks.display = val;
      this.chartInstance.options.scales.yAxes[0].ticks.display = true;
      this.chartInstance.update();
    }
  },
  methods: {
    onClickFullscreen(e) {
      e.target.closest(".cell").classList.toggle("width-100");
    },
    onClickDownloadChart(e) {
      if (!this.chartInstance) {
        return;
      }
      const domtoimage = require("domtoimage");
      const $anchor = e.target.closest("a.download-chart");
      const _this = this;

      (async () => {
        const dataUrl = await domtoimage.toJpeg(
          e.target.closest(".card").querySelector(".capture")
        );

        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = `Chart_${this.zone}.jpeg`;
        a.click();
      })();
      // Page.domSpin(e.target);

      // $anchor.href = image;
      // $anchor.download = `Chart_${this.zone}.jpg`;
    },
    legendOnClick(e) {
      const $item = e.target.closest(".item");
      const $legend = e.target.closest(".legend");

      if (e.target.style.textDecoration == "none") {
        e.target.style.textDecoration = "line-through";
      } else {
        e.target.style.textDecoration = "none";
      }
      let hiddenDatasets = [...$legend.querySelectorAll(".text")].map(
        v => v.style.textDecoration != "none"
      );

      const propsValue = _cloneDeep(this.value);
      this.$set(propsValue, "hiddenDatasets", hiddenDatasets);
      // propsValue.hiddenDatasets = ci.data.datasets.map((v) => v.hidden);

      this.$emit("input", propsValue);
    },
    updateChartData() {
      if (!this.chartInstance) {
        return;
      }
      (async () => {
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${
          this.zone
        }-${this.periods}.json?_=${Date.now()}`;
        let res = await fetch(url);
        let resJSON = await res.json();
        // resJSON.datasets[1].borderDash = [5, 5];

        this.$set(this.data, "datasets", resJSON.datasets);
        this.$set(this.data, "labels", resJSON.labels);
        this.updateChartDatasets();
      })();
    },
    updateChartDatasets() {
      if (!this.chartInstance) {
        return;
      }
      this.hiddenDatasets.forEach((v, i) => {
        if (!!this.chartInstance.data.datasets.length) {
          this.chartInstance.data.datasets[i].hidden = v;
        }
      });
      this.chartInstance.update();
      this.legendHTML = this.chartInstance.generateLegend();
    },
    init() {
      if (!this.chartInstance) {
        const { initChartDaily } = require("../js/chartjs");
        this.chartInstance = initChartDaily({
          zone: this.zone,
          data: this.data,
          mqIsAtLeastMedium: this.mqIsAtLeastMedium
        });
      }
      _delay(() => {
        this.updateChartData();
        this.myChartStats = MyChartStats;
      }, 9);
    }
  },
  mounted() {},
  destroyed() {
    if (!this.chartInstance) {
      return;
    }
    this.chartInstance.destroy();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../css/_foundation";
@import "../css/_color";
@include foundation-card;

@mixin my-card($color: map-get($foundation-palette, "primary")) {
  @include card-container($border: 1px solid $color);
  .card-divider {
    @include card-divider($background: $color);
    color: white;
  }
}

.my-chart {
  margin: 0.5rem 0;
  &.card {
    @include my-card(map-get($foundation-palette, "primary"));
    .title {
      font-weight: bold;

      h4 {
        font-size: 1rem;
      }
    }
  }
}
.capture {
  background-color: white;
}
.card-image {
  padding: 1rem 0;
}

.action {
  text-align: right;
  a.icon {
    $size: 2rem;
    height: $size;
    width: $size;
    display: inline-block;
    position: relative;
    margin: 0 0.5rem;
    img {
      @include absolute-center;
      // $size: $size - 1rem;
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
