<template lang="pug">
  .zone-card.card('aria-describedby'="chartHelpText")
    .capture
      .card-divider.header
        .title
          h6 {{ `Daily ${zone.split('_').join(' ')}`.toUpperCase() }}
        menu('v-if'='!value.isDialog')
          a.fullscreen.show-for-large('@click'='fullscreenOnClick' title="resize card" aria-label="resize card"): i.icon-window-maximize
          a.close('@click'='closeOnClick' title="close card"): i.icon-window-close-o
      .card-image.stats
        component(':is'="componentStats" 'v-model'='myStatsModel')
      .card-image
        .legend('v-if'="showLegend" v-html='legendHTML' '@click'='legendOnClick').grid-x.small-up-2.large-up-4
        .help-text.text-right
          ul
            li('v-if'="showLegend") #[strong Touch / Click] legend item to toggle chart line
            li #[strong Long Touch / Hover] on chart to see case number
        canvas(:id="`Chart_${zone}`")
    .card-section
      menu.clearfix
        .grid-x
          .cell.small-12.medium-6
            .grid-x
              .cell.small-4.medium-5
                label(':for'='`showPeriods_${zone}`') Set Periods
              .cell.auto
                .switch.small
                  input.switch-input(':id'="`showPeriods_${zone}`" type="checkbox" 'v-model'='showPeriods')
                  label.switch-paddle(':for'='`showPeriods_${zone}`')
                    span.show-for-sr Set Periods ?
                    span.switch-active(aria-hidden="true") Yes
                    span.switch-inactive(aria-hidden="true") No
              .cell.auto
                .periods(v-if="showPeriods")
                  input(':id'="`periods_${zone}`" 'v-model'='periods' type='number' min='1' max='14' step='1')

          .cell.small-12.medium-6
            .grid-x
              .cell.small-4.medium-5
                label(':for'='`showLegend_${zone}`') Show Legend
              .cell.auto
                .switch.small
                  input.switch-input(':id'="`showLegend_${zone}`" type="checkbox" 'v-model'='showLegend')
                  label.switch-paddle(':for'='`showLegend_${zone}`')
                    span.show-for-sr Show Legend ?
                    span.switch-active(aria-hidden="true") Yes
                    span.switch-inactive(aria-hidden="true") No
          //- .cell.small-12
          //-   .grid-x
          //-     .cell.small-4.medium-3
          //-       label(':for'='`showPeriodsRange_${zone}`') Set Periods Range
          //-     .cell.small-4.medium-3
          //-       .switch.small
          //-         input.switch-input(':id'="`showPeriodsRange_${zone}`" type="checkbox" 'v-model'='showPeriodsRange')
          //-         label.switch-paddle(':for'='`showPeriodsRange_${zone}`')
          //-           span.show-for-sr Set Periods Range ?
          //-           span.switch-active(aria-hidden="true") Yes
          //-           span.switch-inactive(aria-hidden="true") No
          //-     .cell.small-12.medium-auto
          //-       .grid-x(v-if="showPeriodsRange")
          //-         .cell.small-5
          //-           select.begin('v-model'="periodsRange.begin")
          //-             option('v-for'='(v,i) in data.labels' ':key'='v' ':value'="i") {{ v }}
          //-         .cell.auto
          //-           .text-center -
          //-         .cell.small-5
          //-           select.end('v-model'="periodsRange.end")
          //-             option('v-for'='(v,i) in data.labels.slice(periodsRange.begin)' ':key'='v' ':value'="i") {{ v }}
        .float-right
          //- a.subscribe-ics(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/ics/${this.zone}.ics`' target='_blank'): i.icon-calendar( title="subcribe ics")
          a.download-table(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/${this.zone}.csv`' target='_blank' title="download table" aria-label='download table'): i.icon-table
          a.download-card('@click'='downloadOnClick' title='download card' aria-label='download card'): i.icon-download-cloud
          a.share('@click'='shareOnClick' title='share' aria-label='share'): i.icon-share
    Dialog('v-model'='modelDialog')
      h5 Are you sure you mant to remove {{zone}} ?
      menu.float-right.button-group
        button.button.secondary('@click'='closeYesOnClick')
          span.show-for-sr Yes
          span(aria-hidden="true") Yes
        button.button('@click'="modelDialog.isOpen=false")
          span.show-for-sr No
          span(aria-hidden="true") No
</template>

<script>
import ZoneStats from "@/components/ZoneStats";
import MixinCard from "@/mixins/Card.js";
import MixinForm from "@/mixins/Form.js";
import Dialog from "@/components/Dialog.vue";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";
import _debounce from "lodash/debounce";
import _range from "lodash/range";

import {
  defaultChartData,
  defaultPeriods,
  defaultHiddenDatasets,
  defaultShare
} from "@/js/vars";
const defaultShowPeriods = false;
const defaultShowLegend = false;

const defaultStats = {
  lastUpdate: null,
  total: {},
  daily: {}
};

export default {
  name: "ZoneCard",
  mixins: [MixinCard, MixinForm],
  components: {
    ZoneStats,
    Dialog
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
      set: _debounce(function(val) {
        this.emitModel({ periods: val });
      }, 500)
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
    selectedZones: {
      get() {
        return this.value.selectedZones;
      },
      set(val) {
        this.emitModel({ selectedZones: val });
      }
    },
    showLegend: {
      get() {
        return this.value.showLegend
          ? this.value.showLegend
          : defaultShowLegend;
      },
      set(val) {
        this.emitModel({ showLegend: val });
      }
    }
  },
  watch: {
    showLegend(val, oldVal) {
      if (!this.chartInstance) {
        return;
      }
      if (!val) {
        return;
      }
      this.legendHTML = this.chartInstance.generateLegend();
    },
    periods(val, oldVal) {
      this.updateChartData();

      this.updateQuery("periods", val, defaultPeriods);
    },
    hiddenDatasets(val, oldVal) {
      this.updateChartHiddenDatasets();

      this.updateQuery("hidden", val, defaultHiddenDatasets);
    },
    "periodsRange.begin"(val, oldVal) {
      console.log(val, this.data);
      this.$set(this.data, "labels", this.data.labels.slice(val));
      this.data.datasets.forEach((v, i) => {
        this.$set(
          this.data.datasets[i],
          "data",
          this.data.datasets[i].data.slice(val)
        );
      });
      this.chartInstance.update();
    }
  },
  data() {
    return {
      modelDialog: { isOpen: false },
      chartInstance: null,
      legendHTML: null,
      stats: _cloneDeep(defaultStats),
      componentStats: null,
      data: _cloneDeep(defaultChartData),

      // showLegend: _cloneDeep(defaultShowLegend),
      showPeriods: _cloneDeep(defaultShowPeriods),
      showPeriodsRange: true,
      periodsRange: {
        begin: null,
        end: null
      }
    };
  },
  methods: {
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
        // https://raw.githubusercontent.com/aiosk/covidn/develop/cli/dist/web/${this.periods}/${this.zone}.csv?_=${Date.now()}
        // https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/web/${this.periods}/${this.zone}.csv?_=${Date.now()}
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/web/${
          this.periods
        }/${this.zone}.csv?_=${Date.now()}`;
        let res = await fetch(url);
        let resTxt = await res.text();
        this.fromCsv(resTxt);

        let i = 0;
        let found = false;
        const length = this.data.datasets[4].data.length;
        while (!found) {
          i++;
          if (!!this.data.datasets[0].data[length - i]) {
            found = true;
          }
        }
        const validIdx = length - i;

        this.$set(this.stats, "population", this.population);
        this.$set(this.stats, "lastUpdate", this.data.labels[length - i]);
        this.$set(this.stats, "total", {
          confirmed: this.data.datasets[0].data[validIdx],
          recover: this.data.datasets[2].data[validIdx],
          death: this.data.datasets[4].data[validIdx],
          active: this.data.datasets[6].data[validIdx]
        });
        this.$set(this.stats, "daily", {
          confirmed: this.data.datasets[1].data[validIdx],
          recover: this.data.datasets[3].data[validIdx],
          death: this.data.datasets[5].data[validIdx],
          active: this.data.datasets[7].data[validIdx]
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
    },
    closeOnClick(e) {
      this.modelDialog.isOpen = true;
    },
    closeYesOnClick(e) {
      this.$delete(this.selectedZones, this.selectedZones.indexOf(this.zone));
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
@include foundation-button;
@include foundation-button-group;
@include foundation-switch;

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
  ul {
    list-style-type: none;
  }
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
.reveal menu {
  button {
    margin: 0 0.5rem;
  }
}
</style>
