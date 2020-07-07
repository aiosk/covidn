<template lang="pug">
  .my-chart-stats
    .help-text.text-right Last Update: {{stats.lastUpdate}}
    .grid-x.small-up-1.medium-up-2
      .cell
        .card.population
          .card-section
            .text Population
            .total {{numberWithCommas(stats.population)}}
      .cell
        .card.confirmed
          .card-section
            .text Confirmed
            .total {{numberWithCommas(stats.totalConfirmed)}}
              sup {{ plusMinusStr(stats.confirmed) }}
            .percentage.show-for-medium('v-if'="zone!='NATIONAL'")
              b {{((stats.totalConfirmed/statsNational.totalConfirmed)*100).toFixed(2)}}%
              | &nbsp;from National Case
            //- .percentage {{((stats.totalConfirmed/stats.population)*100).toFixed(2)}}% from Population
            .rate-mil.show-for-medium
              b {{((stats.totalConfirmed/stats.population)*1000000).toFixed(0)}}
              | &nbsp;per 1M Population

    .grid-x.small-up-12.medium-up-3
      .cell
        .card.recover
          .card-section
            .text Recover
            .total {{numberWithCommas(stats.totalRecover)}}
              sup {{ plusMinusStr(stats.recover) }}
            //- .percentage.show-for-medium('v-if'="zone!='NATIONAL'") {{((stats.totalRecover/statsNational.totalRecover)*100).toFixed(2)}}% from National Case
            .rate-mil.show-for-medium
              b {{((stats.totalRecover/stats.population)*1000000).toFixed(0)}}
              | &nbsp;per 1M Population
      .cell
        .card.death
          .card-section
            .text Death
            .total {{numberWithCommas(stats.totalDeath) }}
              sup {{ plusMinusStr(stats.death) }}
            //- .percentage.show-for-medium('v-if'="zone!='NATIONAL'") {{((stats.totalDeath/statsNational.totalDeath)*100).toFixed(2)}}% from National Case
            .rate-mil.show-for-medium
              b {{((stats.totalDeath/stats.population)*1000000).toFixed(0)}}
              | &nbsp;per 1M Population
      .cell
        .card.active
          .card-section
            .text Active
            .total {{ numberWithCommas(stats.totalActive) }}
              sup {{ plusMinusStr(stats.active) }}
            //- .percentage.show-for-medium('v-if'="zone!='NATIONAL'") {{((stats.totalActive/statsNational.totalActive)*100).toFixed(2)}}% from National Case
            .rate-mil.show-for-medium
              b {{((stats.totalActive/stats.population)*1000000).toFixed(0)}}
              | &nbsp;per 1M Population

      //- canvas(':id'="`Stats_${zone}`")
</template>

<script>
import _delay from "lodash/delay";
import _isEmpty from "lodash/isEmpty";

export default {
  name: "MyChartStats",
  props: { value: Object },
  data() {
    return {
      stats: {},
      chartInstance: null,
      chartStatsData: {
        datasets: [
          {
            data: [1, 1, 1],
            backgroundColor: ["#3c928c", "#ec6f58", "#ceb546"]
          }
        ],
        labels: ["Recover", "Death", "Active"]
      }
    };
  },
  computed: {
    statsNational() {
      return this.value.statsNational;
    },
    zone() {
      return this.value.zone;
    }
  },
  watch: {},
  methods: {
    moolahRound(num, locale = "en") {
      // Nine Zeroes for Billions
      return Math.abs(Number(num)) >= 1.0e9
        ? Math.round(Math.abs(Number(num)) / 1.0e9) + "B"
        : // Six Zeroes for Millions
        Math.abs(Number(num)) >= 1.0e6
        ? Math.round(Math.abs(Number(num)) / 1.0e6) + "M"
        : // Three Zeroes for Thousands
        Math.abs(Number(num)) >= 1.0e3
        ? Math.round(Math.abs(Number(num)) / 1.0e3) + "K"
        : Math.abs(Number(num));
    },
    numberWithCommas(x) {
      return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    updateData() {
      (async () => {
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/stats/${
          this.zone
        }.json?_=${Date.now()}`;
        let res = await fetch(url);
        let resJSON = await res.json();
        // resJSON.datasets[1].borderDash = [5, 5];
        this.stats = resJSON;

        // console.log(this.chartStatsData.datasets[0].data);
        this.$set(this.chartStatsData.datasets[0], "data", [
          ((resJSON.totalRecover / resJSON.totalConfirmed) * 100).toFixed(2),
          ((resJSON.totalDeath / resJSON.totalConfirmed) * 100).toFixed(2),
          ((resJSON.totalActive / resJSON.totalConfirmed) * 100).toFixed(2)
        ]);
        if (this.chartInstance) {
          this.chartInstance.update();
        }
      })();
    },
    plusMinusStr(val) {
      if (val == 0) {
        return "";
      }
      return `(${val > 0 ? `+${val}` : val})`;
    }
  },
  created() {
    this.updateData();
  },
  mounted() {
    // _delay(() => {
    //   const { initChartStatsCase } = require("../js/chartjs");
    //   // console.log(this.chartStatsData);
    //   this.chartInstance = initChartStatsCase({
    //     zone: this.zone,
    //     data: this.chartStatsData
    //   });
    // }, 499);
  },
  destroyed() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../css/_foundation";
@import "../css/_color";
@include foundation-card;

.my-chart-stats {
}
canvas {
  // @include absolute-center;
}
.population,
.confirmed,
.recover,
.death,
.active {
  margin: 0;
  color: white;
  text-align: center;
  height: 100%;
  .text {
    @include breakpoint(small only) {
      display: inline-block;
      margin-left: 0.5rem;
    }
    font-weight: bold;
  }
  .text,
  .total {
    font-size: 1.25rem;
  }
  .percentage,
  .rate-mil {
    font-size: 0.675rem;
  }
  .rate-mil {
    // margin-top: 0.5rem;
  }
}
.population {
  // height: 7.35rem;
  height: 100%;

  .total {
    @include breakpoint(medium up) {
      @include absolute-center;
    }
  }
}
.population,
.confirmed {
  margin: 0;
  background: map-get($case-color, "confirmed");
}
.confirmed {
}
.recover,
.death,
.active {
}
.recover {
  background: map-get($case-color, "recover");
}
.death {
  background: map-get($case-color, "death");
}
.active {
  background: map-get($case-color, "active");
}
</style>
