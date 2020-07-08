<template lang='pug'>
  .home
    MyForm('v-model'="myModel")

    #myChart.grid-x.xlarge-up-2(aria-describedby="chartHelpText")
      template(v-for="v in myModel.selectedZones")
        .cell(':key'="v" ':class'='[{"width-100":v=="NATIONAL"},"chart-item"]' ':id'="`CellChart_${v}`" )
          //- MyChart(':zone'='v' 'v-model'="myModel")
          component(':key'="v"  ':is'="myChart[v]" ':zone'='v' 'v-model'="myModel" ':ref'='v')
</template>

<script>
// @ is an alias to /src
import MyForm from "@/components/MyForm.vue";
import MyChart from "@/components/MyChart.vue";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";
import _isEqual from "lodash/isEqual";
import _sortBy from "lodash/sortBy";
import {
  defaultPeriods,
  zones,
  defaultZones,
  defaultHiddenDatasets
} from "@/js/vars";

let MediaQuery;

export default {
  name: "Home",
  components: {
    // HelloWorld
    MyForm,
    MyChart
  },
  data() {
    return {
      lazyLoadCanvas: null,
      myChart: {},
      myModel: {
        mediaQuery: {
          isAtLeastMedium: false
        },
        statsNational: {},
        periods: defaultPeriods,
        zones,
        selectedZones: _cloneDeep(defaultZones),
        hiddenDatasets: _cloneDeep(defaultHiddenDatasets)
      }
    };
  },
  watch: {
    myChart: function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas) {
          this.lazyLoadCanvas.update();
        }
      }, 9);
    },
    "myModel.hiddenDatasets": async function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas) {
          this.lazyLoadCanvas.update();
        }
      }, 9);

      let newQuery = { ...this.$route.query };
      delete newQuery.hidden;
      if (!_isEqual(val, defaultHiddenDatasets)) {
        newQuery.hidden = val.map(v => (v ? 1 : 0)).join("");
      }

      try {
        await this.$router.push({
          query: newQuery
        });
      } catch (e) {
        // console.log(e);
      }
    },
    "myModel.periods": async function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas) {
          this.lazyLoadCanvas.update();
        }
      }, 9);

      let newQuery = { ...this.$route.query };
      delete newQuery.periods;
      if (val != defaultPeriods) {
        newQuery.periods = val;
      }

      try {
        await this.$router.push({
          query: newQuery
        });
      } catch (e) {
        // console.log(e);
      }
    },
    "myModel.selectedZones": async function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas) {
          this.lazyLoadCanvas.update();
        }
      }, 9);

      let newQuery = { ...this.$route.query };
      delete newQuery.zones;
      if (!!val.length && !_isEqual(_sortBy(val), _sortBy(defaultZones))) {
        newQuery.zones = val.join("+");
      }

      try {
        await this.$router.push({
          query: newQuery
        });
      } catch (e) {
        // console.log(e);
      }
    }
  },
  methods: {
    windowOnResize(e) {
      this.$set(
        this.myModel.mediaQuery,
        "isAtLeastMedium",
        MediaQuery.atLeast("medium")
      );
    },
    getNationalStats(e) {
      (async () => {
        const url = `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/stats/NATIONAL.json?_=${Date.now()}`;
        let res = await fetch(url);
        let resJSON = await res.json();
        // resJSON.datasets[1].borderDash = [5, 5];

        this.$set(this.myModel, "statsNational", resJSON);
      })();
    }
  },
  created() {
    window.addEventListener("resize", this.windowOnResize);

    let {
      hidden: hiddenDatasets,
      zones: selectedZones,
      periods
    } = this.$route.query;

    if (!!hiddenDatasets) {
      hiddenDatasets = hiddenDatasets.split("").map(v => v == "1");
      this.myModel.hiddenDatasets = hiddenDatasets;
    }

    if (!!selectedZones) {
      selectedZones = selectedZones.split("+");
      this.myModel.selectedZones = selectedZones;
    }

    if (!!periods) {
      this.myModel.periods = periods;
    }
    this.getNationalStats();
  },
  mounted() {
    ({ MediaQuery } = require("@/js/mediaQuery"));
    MediaQuery._init();
    this.$set(
      this.myModel.mediaQuery,
      "isAtLeastMedium",
      MediaQuery.atLeast("medium")
    );
    _delay(() => {
      const LazyLoad = require("lazyload");

      this.lazyLoadCanvas = new LazyLoad({
        elements_selector: ".chart-item",
        unobserve_entered: true,
        callback_enter: el => {
          const elId = el.id
            .split("_")
            .slice(1)
            .join("_");

          this.$set(this.myChart, elId, MyChart);
          if (!!this.$refs[elId]) {
            this.$refs[elId][0].updateChartData();
          }
        }
        // callback_exit: el => {
        //   const elId = el
        //     .querySelector("canvas")
        //     .id.split("_")
        //     .slice(1)
        //     .join("_");
        //   console.log("callback_exit", elId);
        // }
      });
    }, 299);
  },
  destroyed() {
    this.lazyLoadCanvas.destroy();

    this.$set(this.myModel, "periods", defaultPeriods);
    this.$set(this.myModel, "selectedZones", _cloneDeep(defaultZones));
    this.$set(
      this.myModel,
      "hiddenDatasets",
      _cloneDeep(defaultHiddenDatasets)
    );
    window.removeEventListener("resize", this.windowOnResize);
  }
};
</script>

<style lang="scss">
@import "@/css/_foundation";
@include foundation-everything;
@include foundation-form-helptext;
.chart-item {
  min-height: 20rem;
}
.help-text {
  img {
    $size: 1.25rem;
    width: $size;
    height: $size;
  }

  ul {
    margin: 0;
  }
  li {
    // display: inline-block;
    // list-style-type: none;
    margin: 0 1rem;
  }
}
.cell {
  transition: width 1s;
  position: relative;
}

#top {
  // margin-bottom: 0.5rem;
  $position: 1rem;
  position: fixed;
  bottom: $position;
  right: $position;
  margin: 0;
  img {
    $size: 1.5rem;
    width: $size;
    height: $size;
  }

  background: $medium-gray;
  // background: rgba(192, 192, 192, 0.5);
  padding: 0.5rem;
  border-radius: 50%;
}
.legend {
  padding: 0.5rem;
  font-size: 0.875rem;
  text-align: left;
  .item {
    cursor: pointer;
    margin-bottom: 0.25rem;
    .color {
      $size: 1rem;
      width: $size;
      height: $size;
      display: inline-block;
    }
    .text {
      // padding: 0.125rem;
      padding-left: 0.25rem;
      line-height: 0.875rem;
    }
  }
}
.width-100 {
  width: 100% !important;
  .legend {
    @include breakpoint(xlarge up) {
      @include xy-grid-layout(8, ".cell");
    }
  }
}
</style>