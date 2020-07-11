<template lang="pug">
  .home-chart-stats
    .grid-x.small-up-2('v-if'="!!stats.population").hide-for-medium
      .cell
        .card.population
          .card-section
            h6 Population
            .total {{ numberWithCommas(stats.population) }}
      .cell
        .card.confirmed
          .card-section
            h6 Confirmed
            .total {{ numberWithCommas(stats.total.confirmed) }}
              sup {{ plusMinusStr(stats.daily.confirmed) }}

    .grid-x(':class'="[{'small-up-2':!stats.population},{'medium-up-4':!stats.population},{'small-up-3':!!stats.population},{'medium-up-5':!!stats.population}]")
      .cell('v-if'="!!stats.population").show-for-medium
        .card.population
          .card-section
            h6 Population
            .total {{ numberWithCommas(stats.population) }}
      .cell.show-for-medium
        .card.confirmed
          .card-section
            h6 Confirmed
            .total {{ numberWithCommas(stats.total.confirmed) }}
              sup {{ plusMinusStr(stats.daily.confirmed) }}
      .cell.hide-for-medium('v-if'="!stats.population")
        .card.confirmed
          .card-section
            h6 Confirmed
            .total {{ numberWithCommas(stats.total.confirmed) }}
              sup {{ plusMinusStr(stats.daily.confirmed) }}
      .cell
        .card.recover
          .card-section
            h6 Recover
            .total {{ numberWithCommas(stats.total.recover) }}
              sup {{ plusMinusStr(stats.daily.recover) }}
      .cell
        .card.death
          .card-section
            h6 Death
            .total {{ numberWithCommas(stats.total.death) }}
              sup {{ plusMinusStr(stats.daily.death) }}
      .cell
        .card.active
          .card-section
            h6 Active
            .total {{ numberWithCommas(stats.total.active) }}
              sup {{ plusMinusStr(stats.daily.active) }}
    .help-text.text-right Last Update: {{ stats.lastUpdate }}
</template>

<script>
import _delay from "lodash/delay";
import _isEmpty from "lodash/isEmpty";

export default {
  name: "ZoneStats",
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
  .total {
    font-size: 1rem;
  }
  .card-section {
    padding: 0.5rem;
  }
}

// .confirmed,
// .recover,
// .death,
// .active {
//   // @include breakpoint(small only) {
//   // }
// }
.population,
.confirmed {
  margin: 0;
  background: map-get($case-color, "confirmed");
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
