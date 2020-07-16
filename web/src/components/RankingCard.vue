<template lang='pug'>
  .ranking-card
    Card(':class'="[`card-${myCase[0]}`,`card-${myCase[0]}--${myCase[1]}`]" )
      template(#header)
        h6 {{ title }}
        menu
          a.fullscreen.show-for-large('@click'='fullscreenOnClick' title="resize card" aria-label="resize card"): i.icon-window-maximize

      template(#mainImage)
        canvas(':id'="`${myCase[0]}_${myCase[1].toUpperCase()}`")
      template(#menu)
        .grid-x
          .cell.small-6
            label(':for'='`periods_${myCase.join("-")}`') Periods
          .cell.auto
            .periods
              //- input(':id'="`periods_${myCase.join("-")}`" 'v-model'='periods' type='number' min='1' max='14' step='1')
              select(':id'="`periods_${myCase.join('-')}`"  'v-model'='periods')
                option(value="0") All Time
                option(value="1") Last day
                option(value="3") Last 3 day
                option(value="7") Last week
                option(value="14") Last 2 weeks
                option(value="28") Last 4 weeks
        .float-right
          a.download-card('@click'='downloadOnClick' title='download card' aria-label='download card'): i.icon-floppy
          a.share('@click'='shareOnClick' title='share' aria-label='share'): i.icon-share
    Dialog('v-model'='modelDialog')
      component(:is='componentChart' ':zone'='modelChart.zone' 'v-model'="modelChart")
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
import { defaultChartData, defaultChartColor } from "@/js/vars";

export default {
  name: "RankingCard",
  mixins: [MixinRanking, MixinCard, MixinForm],
  components: {
    Card,
    Spinner,
    Dialog
  },
  props: {
    myCase: Array,
    value: Object
  },
  data() {
    return {
      chartInstance: null,
      data: _cloneDeep(defaultChartData),
      modelSpinner: { isOpen: true },
      modelDialog: { isOpen: false },
      modelChart: {
        zone: null,
        isDialog: true
      }
    };
  },
  computed: {
    periods: {
      get() {
        return !!this.value.periods ? this.value.periods : 0;
      },
      set(val) {
        this.emitModel({ periods: val });
      }
    },
    title() {
      switch (this.myCase[0]) {
        case "ranking":
          return `${this.myCase[1]} Case ${this.myCase[0]}`;
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
          return `Case ${myCase} ${this.myCase[0]}`;
          break;
        case "ratio-population":
          return `${this.myCase[1]} Case per 1M Population`;
          break;
        default:
          return `${this.myCase[1]} ${this.myCase[0]}`;
      }
    }
  },
  watch: {
    periods(val, oldVal) {
      this.updateData();
    }
  },
  methods: {
    updateData() {
      (async () => {
        // https://raw.githubusercontent.com/aiosk/covidn/develop/cli/dist/web/stats/${this.myCase.join("-")}.csv?_=${Date.now()}
        // https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/web/stats/${this.myCase.join("-")}.csv?_=${Date.now()}
        const url = `https://raw.githubusercontent.com/aiosk/covidn/develop/cli/dist/web/stats/${
          this.periods
        }/${this.myCase.join("-")}.csv?_=${Date.now()}`;
        let res = await fetch(url);
        let resText = await res.text();
        this.rankingFromCsv(resText);

        if (!this.data.datasets[0].datalabels) {
          this.$set(this.data.datasets[0], "datalabels", {
            align: [],
            color: []
          });
        }
        let divider = 2;
        // switch (this.myCase[0]) {
        //   case "ratio":
        //     divider = 10;
        //     break;
        //   case "ratio-population":
        //     switch (this.myCase[1]) {
        //       case "death":
        //         divider = 2;
        //         break;
        //       case "confirmed":
        //         divider = 4;
        //         break;
        //       default:
        //         divider = 3;
        //     }
        //     break;
        //   default:
        //     divider = 2;
        // }
        const datasetDataLength = this.data.datasets[0].data.length;
        this.data.datasets[0].data.forEach((v, i) => {
          this.$set(
            this.data.datasets[0].datalabels.align,
            i,
            i < divider ? "start" : "end"
          );
          this.$set(
            this.data.datasets[0].datalabels.color,
            i,
            i < divider ? "#fff" : "#000"
          );
        });

        if (!this.chartInstance) {
          return;
        }
        this.chartInstance.update();
        this.modelSpinner.isOpen = false;
      })();
    }
  },
  created() {
    this.updateData();
  },
  mounted() {
    const _this = this;
    _delay(() => {
      if (!this.chartInstance) {
        const { initChartRanking } = require("@/js/chartjs");
        this.chartInstance = initChartRanking({
          elementId: `${this.myCase[0]}_${this.myCase[1].toUpperCase()}`,
          data: this.data,
          onClick(e, chartItem) {
            let col;
            this.getElementsAtEventForMode(e, "y", 1).forEach(function(item) {
              col = item._index;
            });
            if (_isUndefined(col)) {
              return;
            }
            const chartItemID = _this.data.labels[col].replace(/ /g, "_");

            // if (!chartItem.length) {
            //   return;
            // }
            // const chartItemID = chartItem[0]._view.label.replace(/ /g, "_");
            _this.modelChart.zone = chartItemID;
            if (!!_this.data.datasets[0].population[col]) {
              _this.modelChart.population =
                _this.data.datasets[0].population[col];
            }
            _this.modelDialog.isOpen = true;
          },
          datalabelsFormatter(val, ctx) {
            const percentage = _this.data.datasets[0].percentage[ctx.dataIndex];

            var date = new Date(
              _this.data.datasets[0].lastUpdate[ctx.dataIndex]
            );
            var options = { month: "short", day: "numeric" };
            const lastUpdate = date.toLocaleDateString("en-US", options);

            if (!!percentage) {
              return `${val} (${percentage}%) (${lastUpdate})`;
            }
            if (_this.myCase[0] == "ratio") {
              return `${val}% (${lastUpdate})`;
            }
            return `${val} (${lastUpdate})`;
          },
          tooltipsCallbackLabel(tooltipItem, data) {
            // var label = data.labels[tooltipItem.index] || "";
            const val =
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

            const percentage =
              _this.data.datasets[0].percentage[tooltipItem.datasetIndex];
            var date = new Date(
              _this.data.datasets[0].lastUpdate[tooltipItem.datasetIndex]
            );
            var options = { month: "short", day: "numeric" };
            const lastUpdate = date.toLocaleDateString("en-US", options);
            if (!!percentage) {
              return [
                `${_this.myCase[1]}: ${val}`,
                `Percentage: ${percentage}%`,
                `Last Update: ${lastUpdate}`
              ];
            }
            if (_this.myCase[0] == "ratio") {
              return [
                `${_this.myCase[1]}: ${val}%`,
                `Last Update: ${lastUpdate}`
              ];
            }
            return [`${_this.myCase[1]}: ${val}`, `Last Update: ${lastUpdate}`];
          }
        });
      }
    }, 9);
  },
  destroyed() {
    if (!!this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.data = _cloneDeep(defaultChartData);
  }
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
