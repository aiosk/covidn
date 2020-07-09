<template lang="pug">
  .home-chart-stats
    //- .grid-x.small-up-1
      //- .cell
      //-   .card.population
      //-     .card-section
      //-       .text Population
      //-       .total {{numberWithCommas(stats.population)}}

    .grid-x.small-up-2.medium-up-4
      .cell
        .card.confirmed
          .card-section
            .text Confirmed
            .total {{numberWithCommas(stats.total.confirmed)}}
              sup {{ plusMinusStr(stats.daily.confirmed) }}
      .cell
        .card.recover
          .card-section
            .text Recover
            .total {{numberWithCommas(stats.total.recover)}}
              sup {{ plusMinusStr(stats.daily.recover) }}
      .cell
        .card.death
          .card-section
            .text Death
            .total {{numberWithCommas(stats.total.death) }}
              sup {{ plusMinusStr(stats.daily.death) }}
      .cell
        .card.active
          .card-section
            .text Active
            .total {{ numberWithCommas(stats.total.active) }}
              sup {{ plusMinusStr(stats.daily.active) }}
    .help-text.text-right Last Update: {{stats.lastUpdate}}
</template>

<script>
import _delay from "lodash/delay";
import _isEmpty from "lodash/isEmpty";

export default {
  name: "HomeChartStats",
  props: { value: Object },
  computed: {
    stats() {
      return this.value.stats;
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
    plusMinusStr(val) {
      if (val == 0) {
        return "";
      }
      return `(${val > 0 ? `+${val}` : val})`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/css/_foundation";
@import "@/css/_color";
@include foundation-card;

.home-chart-stats {
}
canvas {
  // @include absolute-center;
}
.population,
.confirmed,
.recover,
.death,
.active {
  border: none;
  margin: 0;
  color: white;
  text-align: center;
  height: 100%;
  .text {
    @include breakpoint(small only) {
      display: inline-block;
      margin-left: 0.5rem;
    }
    font-weight: 100;
    font-size: 1.125rem;
  }
  .total {
    font-size: 1.325rem;
  }
  .percentage,
  .rate-mil {
    font-size: 0.875rem;
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
  background: map-get($element-color, "title");
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

.help-text {
  margin-top: 0;
}
</style>
