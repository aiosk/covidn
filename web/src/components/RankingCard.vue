<template lang='pug'>
.ranking-card
  Card(:class="[`card-${myCase[0]}`, `card-${myCase[0]}--${myCase[1]}`]")
    template(#header)
      h6 {{ title }}
      menu
        a.fullscreen.show-for-large(
          @click="fullscreenOnClick",
          title="resize card",
          aria-label="resize card"
        ): i.icon-window-maximize

    template(#mainImage)
      canvas(:id="`${myCase[0]}_${myCase[1].toUpperCase()}`")
    template(#menu)
      .grid-x
        .cell.small-6
          label(:for="`periods_${myCase.join('-')}`") Periods
        .cell.auto
          .periods
            //- input(':id'="`periods_${myCase.join("-")}`" 'v-model'='periods' type='number' min='1' max='14' step='1')
            select(:id="`periods_${myCase.join('-')}`", v-model="rankPeriods")
              option(value="0") All Time
              option(value="1") Last day
              option(value="3") Last 3 day
              option(value="7") Last week
              option(value="14") Last 2 weeks
              option(value="28") Last 4 weeks
      .float-right
        a.download-card(
          @click="downloadOnClick",
          title="download card",
          aria-label="download card"
        ): i.icon-floppy
        a.share(@click="shareOnClick", title="share", aria-label="share"): i.icon-share
  Dialog(v-model="modelDialog")
    component(
      :is="componentChart",
      :zone="modelChart.zone",
      v-model="modelChart"
    )
  //- Spinner('v-model'='modelSpinner')
</template>

<script>
import Card from "@/components/Card.vue";
import Dialog from "@/components/Dialog.vue";
import Spinner from "@/components/Spinner.vue";
import MixinRanking from "@/mixins/Ranking.js";
import MixinCard from "@/mixins/Card.js";
import MixinForm from "@/mixins/Form.js";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";
import _debounce from "lodash/debounce";
import _isUndefined from "lodash/isUndefined";
import {
  defaultChartData,
  defaultChartColor,
  defaultRankPeriods,
} from "@/js/vars";

export default {
  name: "RankingCard",
  mixins: [MixinRanking, MixinCard, MixinForm],
  components: {
    Card,
    Spinner,
    Dialog,
  },
  props: {
    myCase: Array,
    value: Object,
  },
  data() {
    return {
      chartInstance: null,
      data: _cloneDeep(defaultChartData),
      modelSpinner: { isOpen: true },
      modelDialog: { isOpen: false },
      modelChart: {
        zone: null,
        isDialog: true,
      },
    };
  },
  computed: {
    rankPeriods: {
      get() {
        return !!this.value.rankPeriods
          ? this.value.rankPeriods
          : defaultRankPeriods;
      },
      set(val) {
        this.updateQuery("rankPeriods", val, defaultRankPeriods);
        this.emitModel({ rankPeriods: val });
      },
    },
    title() {
      let newTitle;
      let rankPeriodsTitle = "all time";

      switch (this.rankPeriods) {
        case "1":
          rankPeriodsTitle = "last day";
          break;
        case "3":
          rankPeriodsTitle = "last 3 day";
          break;
        case "7":
          rankPeriodsTitle = "last week";
          break;
        case "14":
          rankPeriodsTitle = "last 2 weeks";
          break;
        case "28":
          rankPeriodsTitle = "last 4 weeks";
          break;
        // default:
        //   rankPeriodsTitle = `last ${this.rankPeriods} days`;
      }

      switch (this.myCase[0]) {
        case "ranking":
          newTitle = `${this.myCase[1]} Case ${this.myCase[0]}`;
        case "ratio":
          let myCase;
          switch (this.myCase[1]) {
            case "recover":
              myCase = "recovery";
              break;
            case "death":
              myCase = "fatality";
              break;
            default:
              myCase = this.myCase[1];
          }
          newTitle = `Case ${myCase} ${this.myCase[0]}`;
          break;
        case "ratio-population":
          newTitle = `${this.myCase[1]} Case per 1M Population`;
          break;
        default:
          newTitle = `${this.myCase[1]} ${this.myCase[0]}`;
      }

      return `${newTitle} ${rankPeriodsTitle}`;
    },
  },
  watch: {
    rankPeriods(val, oldVal) {
      // this.emitModel({ rankPeriods: val });
      this.updateData();
    },
  },
  methods: {
    updateData() {
      (async () => {
        // https://raw.githubusercontent.com/aiosk/covidn/develop/cli/dist/web/stats/${this.myCase.join("-")}.csv?_=${Date.now()}
        // https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/web/stats/${this.myCase.join("-")}.csv?_=${Date.now()}
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/web/stats/${
          this.rankPeriods
        }/${this.myCase.join("-")}.csv?_=${Date.now()}`;
        let res = await fetch(url);
        let resText = await res.text();
        this.rankingFromCsv(resText);

        if (!this.chartInstance) {
          return;
        }
        this.chartInstance.update();
        this.modelSpinner.isOpen = false;
      })();
    },
  },
  created() {
    let { rankPeriods } = this.$route.query;

    if (!!rankPeriods) {
      this.rankPeriods = rankPeriods;
    }

    this.updateData();
  },
  mounted() {
    const that = this;
    _delay(() => {
      if (!this.chartInstance) {
        let chartRightPadding = 64;
        if (this.myCase[0] == "ranking") {
          chartRightPadding += 64 + 16;
        }
        if (this.myCase[0] == "ratio") {
          chartRightPadding += 32;
        }
        if (this.myCase[0] == "ratio-population") {
          chartRightPadding += 32;
        }
        const { initChartRanking } = require("@/js/chartjs");
        this.chartInstance = initChartRanking({
          elementId: `${this.myCase[0]}_${this.myCase[1].toUpperCase()}`,
          data: this.data,
          rightPadding: chartRightPadding,
          onClick(e, chartItem) {
            let col;
            this.getElementsAtEventForMode(e, "y", 1).forEach(function (item) {
              col = item._index;
            });
            if (_isUndefined(col)) {
              return;
            }
            const chartItemID = that.data.labels[col];

            that.modelChart.zone = chartItemID;
            if (!!that.data.datasets[0].population[col]) {
              that.modelChart.population =
                that.data.datasets[0].population[col];
            }
            that.modelDialog.isOpen = true;
          },
          datalabelsFormatter(val, ctx) {
            const percentage = that.data.datasets[0].percentage[ctx.dataIndex];

            const date = new Date(
              that.data.datasets[0].lastUpdate[ctx.dataIndex]
            );
            const options = { month: "short", day: "numeric" };
            const lastUpdate = date.toLocaleDateString("en-US", options);
            const ranking = ctx.dataIndex + 1;

            if (!!percentage) {
              return `#${ranking} | ${val} | ${percentage}% | ${lastUpdate}`;
            }
            if (that.myCase[0] == "ratio") {
              return `#${ranking} | ${val}% | ${lastUpdate}`;
            }
            return `#${ranking} | ${val} | ${lastUpdate}`;
          },
          tooltipsCallbackLabel(tooltipItem, data) {
            // var label = data.labels[tooltipItem.index] || "";
            const val =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

            const percentage =
              that.data.datasets[0].percentage[tooltipItem.datasetIndex];
            var date = new Date(
              that.data.datasets[0].lastUpdate[tooltipItem.datasetIndex]
            );
            var options = { month: "short", day: "numeric" };
            const lastUpdate = date.toLocaleDateString("en-US", options);
            const myCaseInTitleCase = that.toTitleCase(that.myCase[1]);
            if (!!percentage) {
              return [
                `${myCaseInTitleCase}: ${val}`,
                `Percentage: ${percentage}%`,
                `Last Update: ${lastUpdate}`,
              ];
            }
            if (that.myCase[0] == "ratio") {
              return [
                `${myCaseInTitleCase}: ${val}%`,
                `Last Update: ${lastUpdate}`,
              ];
            }
            return [
              `${myCaseInTitleCase}: ${val}`,
              `Last Update: ${lastUpdate}`,
            ];
          },
        });
      }
    }, 9);
  },
  destroyed() {
    if (!!this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.data = _cloneDeep(defaultChartData);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/css/_ranking";
@import "@/css/_foundation";
@include foundation-float-classes;
menu {
  // margin-top: 0.5rem;
  a {
    display: inline-block;
  }
}
</style>
