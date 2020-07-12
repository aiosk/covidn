<template lang="pug">
  .zone-card.card('aria-describedby'="chartHelpText")
    .capture
      .card-divider.header
        .title
          h6 {{ `Daily ${zone.split('_').join(' ')}`.toUpperCase() }}
        menu('v-if'='!value.isDialog')
          a.fullscreen.show-for-large('@click'='onClickFullscreen'): i.icon-window-maximize(title="resize fullscreen")
      .card-image.stats
        component(':is'="componentStats" 'v-model'='myStatsModel')
      .card-image
        .legend('v-if'="showLegend" v-html='legendHTML' '@click'='legendOnClick').grid-x.small-up-2.large-up-4
        .help-text.text-right('v-if'="showLegend")
          div #[strong.show-for-large Touch / Click] legend item to toggle chart line
        canvas(:id="`Chart_${zone}`")
    .card-section
      menu.clearfix
        .float-left
          .periods('v-if'="showPeriods")
            label Periods
              input(':id'="`periods_${zone}`" type='number' 'v-model'='periods')
        .float-right
          //- a.subscribe-ics(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/ics/${this.zone}.ics`' target='_blank'): i.icon-calendar( title="subcribe ics")
          a.download-table(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/${this.zone}.csv`' target='_blank'): i.icon-table( title="download table")
          a.download-card('@click'='downloadOnClick'): i.icon-download-cloud(title='download card')

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
  defaultHiddenDatasets,
  defaultShowLegend
} from "@/js/vars";
const defaultShowPeriods = false;

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
    periods: {
      get() {
        return this.value.periods ? this.value.periods : defaultPeriods;
      },
      set(val) {
        this.emitModel({ periods: val });
      }
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
    },
    showLegend() {
      return this.value.showLegend ? this.value.showLegend : defaultShowLegend;
    },
    showPeriods() {
      return this.value.showPeriods
        ? this.value.showPeriods
        : defaultShowPeriods;
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
      const $icon = e.target.closest("menu").querySelector(".fullscreen i");
      $icon.classList.toggle("icon-window-maximize");
      $icon.classList.toggle("icon-window-restore");
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
              this.$set(this.data.datasets[i].data, i2, NaN);
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
      if (this.showLegend) {
        this.legendHTML = this.chartInstance.generateLegend();
      }
    }
  },
  created() {
    let { hidden: hiddenDatasets, periods } = this.$route.query;

    if (!!hiddenDatasets) {
      hiddenDatasets = hiddenDatasets.split("").map(v => v == "1");
      this.hiddenDatasets = hiddenDatasets;
    }
    if (!!periods) {
      this.periods = periods;
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
@include foundation-float-classes;
@include foundation-form-helptext;

.zone-card {
  // margin: 0.5rem 0;
  &.card {
    $color: map-get($element-color, "title");
    border: 1px solid $color;
    // border: none;
    // margin-bottom: 0;

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

menu {
  margin-top: 0;
  padding-left: 0;
  .periods {
    input {
      margin-left: 0.5rem;
      width: 3rem;
    }
  }
  a {
    margin: 0 0.5rem;
  }
  i {
    color: map-get($foundation-palette, "primary");
  }
}
.header {
  menu {
    position: absolute;
    top: 0.75rem;
    right: 0.5rem;

    i {
      color: white;
    }
  }
}
</style>
