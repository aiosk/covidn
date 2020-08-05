<template lang="pug">
.zone-card.card(aria-describedby="chartHelpText")
  .capture
    .card-divider.header
      .title
        h6 {{ title }}
      menu(v-if="!value.isDialog")
        a.fullscreen.show-for-large(
          @click="fullscreenOnClick",
          title="resize card",
          aria-label="resize card"
        ): i.icon-window-maximize
        a.close(@click="closeOnClick", title="close card"): i.icon-window-close
    .card-image.stats
      component(:is="componentStats", v-model="myStatsModel")
    .card-image
      .legend.grid-x.small-up-2.large-up-4(
        v-if="showLegend",
        v-html="legendHTML",
        @click="legendOnClick"
      )
      .help-text.text-right
        ul
          li(v-if="showLegend") #[strong Touch / Click] legend item to see available chart line
          li #[strong Touch / Hover] on chart to see case number

      canvas(:id="`Chart_${zone}`")
  .card-section
    menu.clearfix
      .grid-x.grid-margin-x
        .cell.small-12.medium-6
          .grid-x
            .cell.small-6
              label(:for="`interval_${zone}`") Interval
            .cell.auto
              .interval
                select(:id="`interval_${zone}`", v-model="interval")
                  option(value="1") Daily
                  option(value="3") 3 day
                  option(value="7") Weekly
                  option(value="14") 2 weeks
                  option(value="28") 4 weeks

        .cell.small-12.medium-6
          .grid-x
            .cell.small-6
              label(:for="`showLegend_${zone}`") Show Legend
            .cell.auto
              .switch.small
                input.switch-input(
                  :id="`showLegend_${zone}`",
                  type="checkbox",
                  v-model="showLegend"
                )
                label.switch-paddle(:for="`showLegend_${zone}`")
                  span.show-for-sr Show Legend ?
                  span.switch-active(aria-hidden="true") Yes
                  span.switch-inactive(aria-hidden="true") No
      .float-right
        a.download-table(
          rel="noopener",
          :href="`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/desktop/${this.zone}.csv`",
          target="_blank",
          title="download table",
          aria-label="download table"
        ): i.icon-table
        a.download-card(
          @click="downloadOnClick",
          title="download card",
          aria-label="download card"
        ): i.icon-floppy
        a.share(@click="shareOnClick", title="share", aria-label="share"): i.icon-share
  Dialog(v-model="modelDialog")
    h5 Are you sure you mant to remove {{ zone }} ?
    menu.float-right.button-group
      button.button.secondary(@click="closeYesOnClick")
        span.show-for-sr Yes
        span(aria-hidden="true") Yes
      button.button(@click="modelDialog.isOpen = false")
        span.show-for-sr No
        span(aria-hidden="true") No
  //- Spinner('v-model'='modelSpinner')
</template>

<script>
import ZoneStats from "@/components/ZoneStats";
import MixinCard from "@/mixins/Card.js";
import MixinForm from "@/mixins/Form.js";
import Dialog from "@/components/Dialog.vue";
import Spinner from "@/components/Spinner.vue";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";
import _debounce from "lodash/debounce";
import _range from "lodash/range";

import {
  defaultChartData,
  defaultInterval,
  defaultHiddenDatasets,
  defaultShare,
} from "@/js/vars";

const defaultShowLegend = false;

const defaultStats = {
  lastUpdate: null,
  total: {
    confirmed: 0,
    recover: 0,
    death: 0,
    active: 0,
  },
  daily: {
    confirmed: 0,
    recover: 0,
    death: 0,
    active: 0,
  },
};

export default {
  name: "ZoneCard",
  mixins: [MixinCard, MixinForm],
  components: {
    ZoneStats,
    Spinner,
    Dialog,
  },
  props: {
    zone: String,
    value: Object,
  },
  computed: {
    title() {
      let intervalTitle = "daily";

      switch (this.interval) {
        case "1":
          intervalTitle = `daily`;
          break;
        case "3":
          intervalTitle = `every 3 days`;
          break;
        case "7":
          intervalTitle = `weekly`;
          break;
        case "14":
          intervalTitle = `every 2 weeks`;
          break;
        case "28":
          intervalTitle = `every 4 weeks`;
          break;
        // default:
        //   intervalTitle = `every ${this.interval} days`;
      }
      return `${this.zone.replace(/_/g, " ")} ${intervalTitle}`.toUpperCase();
    },
    myStatsModel() {
      return { zone: this.zone, stats: this.stats };
    },
    population() {
      return this.value.population;
    },
    interval: {
      get() {
        return this.value.interval ? this.value.interval : defaultInterval;
      },
      set: _debounce(function (val) {
        this.emitModel({ interval: val });
      }, 500),
    },
    hiddenDatasets: {
      get() {
        return this.value.hiddenDatasets
          ? this.value.hiddenDatasets
          : defaultHiddenDatasets;
      },
      set(val) {
        this.emitModel({ hiddenDatasets: val });
      },
    },
    selectedZones: {
      get() {
        return this.value.selectedZones;
      },
      set(val) {
        this.emitModel({ selectedZones: val });
      },
    },
    showLegend: {
      get() {
        return this.value.showLegend
          ? this.value.showLegend
          : defaultShowLegend;
      },
      set(val) {
        this.emitModel({ showLegend: val });
      },
    },
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
    interval(val, oldVal) {
      this.updateChartData();

      this.updateQuery("interval", val, defaultInterval);
    },
    hiddenDatasets(val, oldVal) {
      this.updateChartHiddenDatasets();

      this.updateQuery("hidden", val, defaultHiddenDatasets);
    },
  },
  data() {
    return {
      modelSpinner: { isOpen: true },
      modelDialog: { isOpen: false },
      chartInstance: null,
      legendHTML: null,
      stats: _cloneDeep(defaultStats),
      componentStats: null,
      data: _cloneDeep(defaultChartData),

      // showLegend: _cloneDeep(defaultShowLegend),
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
        (v) => v.style.textDecoration != "none"
      );
      this.hiddenDatasets = hiddenDatasets;
    },
    updateChartData() {
      (async () => {
        // https://raw.githubusercontent.com/aiosk/covidn/develop/cli/dist/web/${this.interval}/${this.zone}.csv?_=${Date.now()}
        // https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/web/${this.interval}/${this.zone}.csv?_=${Date.now()}
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/web/daily/${
          this.interval
        }/${this.zone}.csv?_=${Date.now()}`;
        try {
          let res = await fetch(url);

          if (!res.ok) {
            console.log(res.ok);
            // make the promise be rejected if we didn't get a 2xx response
            throw new Error("Not 2xx response");
          }
          // go the desired response
          let resTxt = await res.text();
          this.fromCsv(resTxt);
        } catch (e) {
          console.log(url, " failed");
        }

        if (!this.data.datasets[0].data.length) {
          return;
        }
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
          active: this.data.datasets[6].data[validIdx],
        });
        this.$set(this.stats, "daily", {
          confirmed: this.data.datasets[1].data[validIdx],
          recover: this.data.datasets[3].data[validIdx],
          death: this.data.datasets[5].data[validIdx],
          active: this.data.datasets[7].data[validIdx],
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
      this.modelSpinner.isOpen = false;

      if (this.showLegend) {
        this.legendHTML = this.chartInstance.generateLegend();
      }
    },
    closeOnClick(e) {
      this.modelDialog.isOpen = true;
    },
    closeYesOnClick(e) {
      this.$delete(this.selectedZones, this.selectedZones.indexOf(this.zone));
    },
  },
  created() {
    let { hidden: hiddenDatasets, interval } = this.$route.query;

    if (!!hiddenDatasets) {
      hiddenDatasets = hiddenDatasets.split("").map((v) => v == "1");
      this.hiddenDatasets = hiddenDatasets;
    }
    if (!!interval) {
      this.interval = interval;
    }
    this.updateChartData();
  },
  mounted() {
    _delay(() => {
      if (!this.chartInstance) {
        const { initChartDaily } = require("@/js/chartjs");
        this.chartInstance = initChartDaily({
          zone: this.zone,
          data: this.data,
        });
      }
      this.componentStats = ZoneStats;
    }, 9);
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
  },
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
  // position: relative;
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
  .interval {
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
  position: relative;
  menu {
    position: absolute;
    top: 0.75rem;
    right: 0.5rem;

    i {
      color: white;
      font-size: 1.5rem;
    }
  }
}
.reveal menu {
  button {
    margin: 0 0.5rem;
  }
}
.switch {
  // width: 5rem !important;
}
</style>
