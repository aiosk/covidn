<template lang='pug'>
  .home
    MyForm('v-model'="myModel")

    .grid-x.xlarge-up-2(aria-describedby="chartHelpText")
      template(v-for="v in myModel.selectedZones")
        .cell(':key'="v" ':class'='[{"width-100":v=="NATIONAL"},"chart-item"]' ':id'="`CellChart_${v}`" )
          component(':key'="v"  ':is'="homeChart[v]" ':zone'='v' 'v-model'="myModel" ':ref'='v')
</template>

<script>
// @ is an alias to /src
import MyForm from "@/components/MyForm.vue";
import HomeChart from "@/components/HomeChart.vue";
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
    MyForm,
    HomeChart
  },
  data() {
    return {
      lazyLoadCanvas: null,
      homeChart: {},
      myModel: {
        periods: defaultPeriods,
        zones,
        selectedZones: _cloneDeep(defaultZones),
        hiddenDatasets: _cloneDeep(defaultHiddenDatasets)
      }
    };
  },
  watch: {
    homeChart: function(val, oldVal) {
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
  methods: {},
  created() {
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
  },
  mounted() {
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

          this.$set(this.homeChart, elId, HomeChart);
          if (!!this.$refs[elId]) {
            this.$refs[elId][0].updateChartHiddenDatasets();
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