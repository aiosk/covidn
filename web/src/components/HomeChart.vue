<template lang="pug">
  .home-chart.card('aria-describedby'="chartHelpText")
    .capture
      .card-divider.title
        h4 {{zone.split('_').join(' ')}}
      .card-image.stats
        component(':is'="homeChartStats" 'v-model'='myStatsModel')
      .card-image
        .legend(v-html='legendHTML' '@click'='legendOnClick').grid-x.small-up-2.medium-up-4
        canvas(:id="`Chart_${zone}`")
    .card-section.action
      a.icon.download-raw(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/${this.zone}.csv`' target='_blank'): img(src="@/assets/img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")
      a.icon.download-chart('@click'='onClickDownloadChart'): img(src="@/assets/img/baseline_get_app_black_18dp.png" alt="download chart" title='download chart')
      a.icon.fullscreen.show-for-xlarge('@click'='onClickFullscreen'): img(src="@/assets/img/baseline_fullscreen_black_18dp.png" alt="fullscreen")

</template>

<script>
import HomeChartStats from "@/components/HomeChartStats";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";

export default {
  name: "HomeChart",
  components: {
    HomeChartStats
  },
  props: {
    zone: String,
    value: Object
  },
  computed: {
    myStatsModel() {
      return { zone: this.zone, stats: this.stats };
    },
    periods() {
      return this.value.periods;
    },
    hiddenDatasets() {
      return this.value.hiddenDatasets;
    }
  },
  watch: {
    periods(val, oldVal) {
      this.updateChartData();
    }
  },
  data() {
    return {
      chartInstance: null,
      legendHTML: null,
      stats: {
        lastUpdate: null,
        total: {},
        daily: {}
      },
      homeChartStats: null,
      data: { datasets: [], labels: [] }
    };
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
    },
    legendOnClick(e) {
      const $item = e.target.closest(".item");
      if (!$item) {
        return;
      }
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
      this.$emit("input", propsValue);
    },
    updateChartData() {
      (async () => {
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${
          this.zone
        }/${this.periods}.json?_=${Date.now()}`;
        let res = await fetch(url);
        let resJSON = await res.json();

        this.$set(this.data, "datasets", resJSON.datasets);
        this.$set(this.data, "labels", resJSON.labels);

        let i = 0;
        let found = false;
        const length = resJSON.datasets[4].data.length;
        while (!found) {
          i++;
          if (resJSON.datasets[4].data[length - i] != 0) {
            found = true;
          }
        }
        const validIdx = length - i;

        this.$set(this.stats, "lastUpdate", resJSON.labels[length - i]);
        this.$set(this.stats, "total", {
          confirmed: resJSON.datasets[4].data[validIdx],
          recover: resJSON.datasets[5].data[validIdx],
          death: resJSON.datasets[6].data[validIdx],
          active: resJSON.datasets[7].data[validIdx]
        });
        this.$set(this.stats, "daily", {
          confirmed: resJSON.datasets[0].data[validIdx],
          recover: resJSON.datasets[1].data[validIdx],
          death: resJSON.datasets[2].data[validIdx],
          active: resJSON.datasets[3].data[validIdx]
        });

        this.updateChartHiddenDatasets();
      })();
    },
    updateChartHiddenDatasets() {
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
    }
  },
  created() {
    this.updateChartData();
  },
  mounted() {
    if (!this.chartInstance) {
      const { initChartDaily } = require("@/js/chartjs");
      this.chartInstance = initChartDaily({
        zone: this.zone,
        data: this.data
      });
    }
    this.homeChartStats = HomeChartStats;
  },
  destroyed() {
    this.data = { datasets: [], labels: [] };
    if (!this.chartInstance) {
      return;
    }
    this.chartInstance.destroy();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/css/_foundation";
@import "@/css/_color";
@include foundation-card;

.home-chart {
  margin: 0.5rem 0;
  &.card {
    $color: map-get($element-color, "title");
    border: 1px solid $color;

    .card-divider {
      background: $color;
      color: white;
    }
    .title {
      h4 {
        // font-weight: bold;
        font-size: 1.25rem;
      }
    }
  }
}
.stats {
  // padding-top: 0;
}
.capture {
  background-color: white;
}
.card-image {
  // padding: 1rem 0;
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
