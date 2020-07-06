<template lang="pug">
  #app.grid-container
    a(href='./')
      h4.text-center Daily Indonesia COVID-19 cases
      h5.text-center National and Provinces
    .clearfix &nbsp;
      a.float-right(href='https://github.com/aiosk/covidn')
        img.lazy(alt="GitHub stars" data-src="https://img.shields.io/github/stars/aiosk/covidn?logo=github&style=for-the-badge")
    br
    MyForm('v-model'="myModel")

    #chartHelpText.help-text.callout.secondary
      ul
        li.hide-for-xlarge For best results please view in #[strong landscape] mode
        li Click #[img.lazy(data-src="./img/baseline_get_app_black_18dp.png" alt="download chart")] to save chart as image
        li Click #[img.lazy(data-src="./img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")] to save chart raw data
        li.show-for-xlarge Click #[img.lazy(data-src="./img/baseline_fullscreen_black_18dp.png" alt="fullscreen")] to toggle chart #[strong full-width] mode
        li #[strong.show-for-xlarge Click]#[strong.hide-for-xlarge Tap / Touch] chart legend to show/hide chart data
        li #[strong.show-for-xlarge Hover]#[strong.hide-for-xlarge Tap / Touch] chart legend to show case number
        li.hide-for-xlarge #[strong Tap / Touch outside] chart legend to hide case number

    #myChart.grid-x.xlarge-up-2(aria-describedby="chartHelpText")
      .cell(v-for="v in myModel.selectedZones" ':key'="v" ':class'='[{"width-100":v=="NATIONAL"},"chart-item",`chart-item--${v}`]' )
        MyChart(':zone'='v' 'v-model'="myModel" ':ref'='v')

    button.button.small#top('@click'='topBtnOnClick')
      img.lazy(data-src="img/baseline_vertical_align_top_black_18dp.png" alt="Scroll to top")
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import MyForm from "./components/MyForm.vue";
import MyChart from "./components/MyChart.vue";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";
import _isEqual from "lodash/isEqual";
import _sortBy from "lodash/sortBy";

const zones = [
  "NATIONAL",
  "DKI_JAKARTA",
  "JAWA_BARAT",
  "JAWA_TIMUR",
  "JAWA_TENGAH",
  "SULAWESI_SELATAN",
  "BANTEN",
  "NUSA_TENGGARA_BARAT",
  "BALI",
  "PAPUA",
  "KALIMANTAN_SELATAN",
  "SUMATERA_BARAT",
  "SUMATERA_SELATAN",
  "KALIMANTAN_TENGAH",
  "KALIMANTAN_TIMUR",
  "SUMATERA_UTARA",
  "DAERAH_ISTIMEWA_YOGYAKARTA",
  "KALIMANTAN_UTARA",
  "KEPULAUAN_RIAU",
  "KALIMANTAN_BARAT",
  "SULAWESI_TENGGARA",
  "LAMPUNG",
  "SULAWESI_UTARA",
  "SULAWESI_TENGAH",
  "RIAU",
  "PAPUA_BARAT",
  "SULAWESI_BARAT",
  "JAMBI",
  "MALUKU_UTARA",
  "MALUKU",
  "GORONTALO",
  "KEPULAUAN_BANGKA_BELITUNG",
  "ACEH",
  "BENGKULU",
  "NUSA_TENGGARA_TIMUR"
];
const defaultPeriods = 8;
const defaultHiddenDatasets = [
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false
];
let MediaQuery;

export default {
  name: "App",
  components: {
    MyForm,
    MyChart
  },
  data() {
    return {
      lazyLoadCanvas: null,
      lazyLoad: null,
      myModel: {
        mediaQuery: {
          isAtLeastMedium: false
        },
        periods: defaultPeriods,
        zones,
        selectedZones: _cloneDeep(zones),
        hiddenDatasets: _cloneDeep(defaultHiddenDatasets)
      }
    };
  },
  watch: {
    "myModel.hiddenDatasets": function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas && !!this.lazyLoad) {
          this.lazyLoadCanvas.update();
          this.lazyLoad.update();
        }
      }, 9);
      let urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("hidden");
      if (!_isEqual(val, defaultHiddenDatasets)) {
        urlParams.set(`hidden`, val.map(v => (v ? 1 : 0)).join(""));
      }

      window.history.replaceState({}, "", `${location.pathname}?${urlParams}`);
    },
    "myModel.periods": function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas && !!this.lazyLoad) {
          this.lazyLoadCanvas.update();
          this.lazyLoad.update();
        }
      }, 9);
      let urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("periods");

      if (val != defaultPeriods) {
        urlParams.set("periods", val);
      }
      window.history.replaceState({}, "", `${location.pathname}?${urlParams}`);
    },
    "myModel.selectedZones": function(val, oldVal) {
      _delay(() => {
        if (!!this.lazyLoadCanvas && !!this.lazyLoad) {
          this.lazyLoadCanvas.update();
          this.lazyLoad.update();
        }
      }, 9);
      let urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("zones");

      if (!!val.length && !_isEqual(_sortBy(val), _sortBy(zones))) {
        urlParams.set(`zones`, val.join("+"));
      }
      window.history.replaceState({}, "", `${location.pathname}?${urlParams}`);
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
    topBtnOnClick(e) {
      document
        .querySelector("#chartHelpText")
        .scrollIntoView({ behavior: "smooth" });
      // window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  },
  created() {
    window.addEventListener("resize", this.windowOnResize);

    let urlParams = new URLSearchParams(window.location.search);
    let selectedZones = urlParams.get("zones");
    let hiddenDatasets = urlParams.get("hidden");
    const _this = this;

    if (!!hiddenDatasets) {
      hiddenDatasets = hiddenDatasets.split("").map(v => v == "1");
      hiddenDatasets.forEach((v, i) => {
        _this.$set(this.myModel.hiddenDatasets, i, v);
      });
    }

    if (!!selectedZones) {
      selectedZones = selectedZones.split("+");
      this.myModel.selectedZones = !!selectedZones.length
        ? selectedZones
        : _cloneDeep(zones);
    }

    let periods = urlParams.get("periods");
    periods = !!periods ? periods : defaultPeriods;
    if (!_isEqual(periods, defaultPeriods)) {
      this.myModel.periods = periods;
    }
  },
  mounted() {
    ({ MediaQuery } = require("./js/mediaQuery"));
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
          const elId = el
            .querySelector("canvas")
            .id.split("_")
            .slice(1)
            .join("_");
          const component = this.$refs[elId];
          component[0].init();
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
      this.lazyLoad = new LazyLoad({
        elements_selector: "img.lazy"
      });
    }, 99);
  },
  destroyed() {
    this.lazyLoadCanvas.destroy();
    this.lazyLoad.destroy();
    window.removeEventListener("resize", this.windowOnResize);
  }
};
</script>

<style lang="scss">
@import "css/_foundation";
@include foundation-everything;
@include foundation-form-helptext;

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
  font-size: 0.75rem;
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
      line-height: 0.75rem;
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
