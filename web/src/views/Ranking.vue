<template lang="pug">
  .rangking
    include ../html/rankingHelpText.pug
    .grid-x.medium-up-2.large-up-4
      .cell('v-for'="v in cases" ':key'="v")
        Card( ':class'="['card-percentage',`card-percentage--${v}`]" )
          template(#header)
            h6 {{ `${v} Case Ranking` }}
          template(#mainImage)
            canvas(':id'="`RankingPie_${v.toUpperCase()}`")
          //- template(#menu)
          //-   a.download-card('@click'='downloadOnClick' title='download card' aria-label='download card'): i.icon-download-cloud
          //-   a.share('@click'='shareOnClick' title='share' aria-label='share'): i.icon-share

    .grid-x.large-up-2
      .cell('v-for'="v in cases" ':key'="v" )
        Card(':class'="['card-ranking',`card-ranking--${v}`]" )
          template(#header)
            h6 {{ `${v} Case Ranking` }}
            menu
              a.fullscreen.show-for-large('@click'='onClickFullscreen' title="resize card" aria-label="resize card"): i.icon-window-maximize

          template(#mainImage)
            canvas(':id'="`RankingBar_${v.toUpperCase()}`")
          template(#menu)
            a.download-card('@click'='downloadOnClick' title='download card' aria-label='download card'): i.icon-download-cloud
            a.share('@click'='shareOnClick' title='share' aria-label='share'): i.icon-share
    Dialog('v-model'='modelDialog')
      component(:is='componentChart' ':zone'='modelChart.zone' 'v-model'="modelChart")
</template>

<script>
import Card from "@/components/Card.vue";
import Dialog from "@/components/Dialog.vue";
import MixinRanking from "@/mixins/Ranking.js";
import MixinCard from "@/mixins/Card.js";
import _delay from "lodash/delay";
import _orderBy from "lodash/orderBy";
import _debounce from "lodash/debounce";
import _zipObject from "lodash/zipObject";
import _cloneDeep from "lodash/cloneDeep";
import { cases, defaultChartData, defaultChartColor } from "@/js/vars";

export default {
  name: "Ranking",
  mixins: [MixinRanking, MixinCard],
  components: {
    Card,
    Dialog
  },
  data() {
    return {
      cases,
      chartBarInstance: _zipObject(cases, [null, null, null, null]),
      chartPieInstance: _zipObject(cases, [null, null, null, null]),
      modelChart: {
        zone: null,
        isDialog: true
      },
      data: _zipObject(cases, [
        _cloneDeep(defaultChartData),
        _cloneDeep(defaultChartData),
        _cloneDeep(defaultChartData),
        _cloneDeep(defaultChartData)
      ]),
      dataPie: _zipObject(cases, [
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
        if (!this.chartBarInstance[v]) {
          return;
        }
        this.chartBarInstance[v].update();
      });
    }, 500),
    "dataPie.confirmed.labels": _debounce(function(val, oldVal) {
      cases.forEach(v => {
        if (!this.chartPieInstance[v]) {
          return;
        }
        this.chartPieInstance[v].update();
      });
    }, 500)
  },

  created() {
    _delay(async () => {
      const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/stats/stats.json?_=${Date.now()}`;
      let res = await fetch(url);
      let resJSON = await res.json();

      resJSON = Object.entries(resJSON).filter(v => v[0] != "NATIONAL");
      cases.forEach(v => {
        let orderedResJSON = _orderBy(
          resJSON,
          v2 => {
            const v3 = v2[1];
            return parseInt(v3.total[v]);
          },
          "desc"
        );
        orderedResJSON.forEach((v2, i2) => {
          const k3 = v2[0];
          const v3 = v2[1];

          // this.data[v].datasets[0].barThickness = 32;
          this.$set(this.data[v].datasets[0].data, i2, v3.total[v]);
          this.$set(
            this.data[v].datasets[0],
            "backgroundColor",
            defaultChartColor[v]
          );
          this.$set(this.data[v].labels, i2, k3.split("_").join(" "));
          if (!this.data[v].datasets[0].datalabels) {
            this.$set(this.data[v].datasets[0], "datalabels", {
              align: [],
              color: []
            });
          }
          const divider = 18;
          this.$set(
            this.data[v].datasets[0].datalabels.align,
            i2,
            i2 < orderedResJSON.length / divider ? "start" : "end"
          );
          this.$set(
            this.data[v].datasets[0].datalabels.color,
            i2,
            i2 < orderedResJSON.length / divider ? "#fff" : "#000"
          );

          this.$set(
            this.dataPie[v].datasets[0].data,
            i2,
            v3.totalPercentage[v]
          );
          this.$set(
            this.dataPie[v].datasets[0],
            "backgroundColor",
            defaultChartColor[v]
          );
          this.$set(this.dataPie[v].labels, i2, k3.split("_").join(" "));
        });
      });
    }, 9);
  },
  mounted() {
    const _this = this;
    _delay(() => {
      cases.forEach(v => {
        if (!this.chartBarInstance[v]) {
          const { initChartRanking } = require("@/js/chartjs");
          this.chartBarInstance[v] = initChartRanking({
            elementId: `RankingBar_${v.toUpperCase()}`,
            data: this.data[v],
            onClick(e, chartItem) {
              // console.log(e, chartItem);

              // e.preventDefault();
              if (!chartItem.length) {
                return;
              }
              const chartItemID = chartItem[0]._view.label.replace(/ /g, "_");

              _this.modelChart.zone = chartItemID;
              _this.modelDialog.isOpen = true;
            }
          });
        }
        if (!this.chartPieInstance[v]) {
          const { initChartPieRanking } = require("@/js/chartjs");
          this.chartPieInstance[v] = initChartPieRanking({
            elementId: `RankingPie_${v.toUpperCase()}`,
            data: this.dataPie[v]
          });
        }
      });
    }, 799);
  },
  destroyed() {
    cases.forEach(v => {
      if (!!this.chartBarInstance[v]) {
        this.chartBarInstance[v].destroy();
      }
      this.data[v] = _cloneDeep(defaultChartData);
    });
  }
};
</script>

<style lang="scss">
@import "@/css/_foundation";
@import "@/css/_ranking";
@include foundation-form-helptext;

.ranking {
}
</style>
