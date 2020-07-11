<template lang="pug">
  .zone-card.card('aria-describedby'="chartHelpText")
    .capture
      .card-divider.title
        h6 {{ `Daily ${zone.split('_').join(' ')}`.toUpperCase() }}
      .card-image.stats
        component(':is'="componentStats" 'v-model'='myStatsModel')
      .card-image
        .legend('v-if'="legendHTML" v-html='legendHTML' '@click'='legendOnClick').grid-x.small-up-2.large-up-4
        .help-text.text-right('v-if'="legendHTML")
          div #[strong.show-for-large Touch / Click] legend item to toggle chart line
        canvas(:id="`Chart_${zone}`")
    .card-section.action
      a.download-raw(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/${this.zone}.csv`' target='_blank'): i.icon-download-cloud( title="download raw")
      a.download-chart('@click'='downloadOnClick'): i.icon-floppy(title='download chart')
      a.fullscreen.show-for-large('@click'='onClickFullscreen'): i.icon-resize-full(title="resize fullscreen")

</template>

<script>
import ZoneStats from "@/components/ZoneStats";
import MixinCard from "@/mixins/Card.js";
import MixinForm from "@/mixins/Form.js";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";

import {
  defaultChartData,
  defaultPeriods,
  defaultHiddenDatasets
} from "@/js/vars";

const defaultStats = {
  lastUpdate: null,
  total: {},
  daily: {}
};

export default {
  name: "ZoneCard",
  mixins: [MixinCard, MixinForm],
  components: {
    ZoneStats
  },
  props: {
    zone: String,
    value: Object
  },
  computed: {
    myStatsModel() {
      return { zone: this.zone, stats: this.stats };
    },
    population() {
      return this.value.population;
    },
    periods() {
      return this.value.periods ? this.value.periods : defaultPeriods;
    },
    hiddenDatasets: {
      get() {
        return this.value.hiddenDatasets
          ? this.value.hiddenDatasets
          : defaultHiddenDatasets;
      },
      set(val) {
        this.emitModel({ hiddenDatasets: val });
      }
    }
  },
  watch: {
    periods(val, oldVal) {
      this.updateChartData();
    },
    hiddenDatasets(val, oldVal) {
      this.updateChartHiddenDatasets();

      this.updateQuery("hidden", val, defaultHiddenDatasets);
    }
  },
  data() {
    return {
      chartInstance: null,
      legendHTML: null,
      stats: _cloneDeep(defaultStats),
      componentStats: null,
      data: _cloneDeep(defaultChartData)
    };
  },
  methods: {
    onClickFullscreen(e) {
      e.target.closest(".cell").classList.toggle("width-100");
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
      this.hiddenDatasets = hiddenDatasets;
    },
    updateChartData() {
      (async () => {
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${
          this.periods
        }/${this.zone}.json?_=${Date.now()}`;
        let res = await fetch(url);
        let resJSON = await res.json();

        this.$set(this.data, "datasets", resJSON.datasets);
        this.$set(this.data, "labels", resJSON.labels);

        // for (const k in this.data.datasets) {
        [4, 5, 6, 7].forEach(i => {
          this.$set(this.data.datasets[i], "spanGaps", false);
          this.data.datasets[i].data.forEach((v2, i2) => {
            if (!v2) {
              this.$set(this.data.datasets[i].data, i, NaN);
            }
          });
        });
        // }

        let i = 0;
        let found = false;
        const length = resJSON.datasets[4].data.length;
        while (!found) {
          i++;
          if (!!resJSON.datasets[0].data[length - i]) {
            found = true;
          }
        }
        const validIdx = length - i;

        this.$set(this.stats, "population", this.population);
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
      if (!this.hiddenDatasets.length) {
        return;
      }
      this.hiddenDatasets.forEach((v, i) => {
        if (!!this.chartInstance.data.datasets.length) {
          if (!this.chartInstance.data.datasets[i]) {
            return;
          }
          this.chartInstance.data.datasets[i].hidden = v;
        }
      });
      this.chartInstance.update();
      // this.legendHTML = this.chartInstance.generateLegend();
    }
  },
  created() {
    let { hidden: hiddenDatasets } = this.$route.query;

    if (!!hiddenDatasets) {
      hiddenDatasets = hiddenDatasets.split("").map(v => v == "1");
      this.hiddenDatasets = hiddenDatasets;
    }
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
    this.componentStats = ZoneStats;
  },
  destroyed() {
    this.data = _cloneDeep(defaultChartData);
    this.componentStats = null;
    this.stats = _cloneDeep(defaultStats);
    if (!this.chartInstance) {
      return;
    }
    this.chartInstance.destroy();
    this.chartInstance = null;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/css/_foundation";
@import "@/css/_color";
@include foundation-card;
@include foundation-form-helptext;

.zone-card {
  // margin: 0.5rem 0;
  &.card {
    $color: map-get($element-color, "title");
    border: 1px solid $color;

    .card-divider {
      background: $color;
      color: white;
    }
    .title {
    }
  }
}
.help-text {
  margin: 0;
}
.card-image {
  // padding: 1rem 0;
}

.action {
  a {
    margin: 0 0.5rem;
  }
}
</style>
