<template lang="pug">
  #app.grid-container
    h4.text-center Daily Indonesia COVID-19 cases
    h5.text-center National and Provinces
      .clearfix(v-lazy-container="{ selector: 'img' }")
        a.float-right(href='https://github.com/aiosk/covidn')
          img.lazy(alt="GitHub stars" data-src="https://img.shields.io/github/stars/aiosk/covidn?logo=github&style=for-the-badge")
    #chartHelpText.help-text.callout.warning
      ul(v-lazy-container="{ selector: 'img' }")
        li.hide-for-xlarge For best results please view in #[strong landscape] mode
        li #[strong.show-for-xlarge Hover]#[strong.hide-for-xlarge Tap / Touch] chart bar to see case number
        li #[strong.show-for-xlarge Click]#[strong.hide-for-xlarge Tap / Touch] chart legend to show/hide chart data
        li Click #[img(data-src="/img/baseline_get_app_black_18dp.png" alt="download chart")] to save chart as image
        li Click #[img(data-src="/img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")] to save chart raw data
        li.show-for-xlarge Click #[img(data-src="/img/baseline_fullscreen_black_18dp.png" alt="fullscreen")] to toggle chart #[strong full-width] mode

    MyForm('v-model'="myModel")
    #myChart.grid-x.xlarge-up-2(aria-describedby="chartHelpText")
      .cell.callout('@show'="handler" v-for="v in myModel.selectedZones" ':key'="v" ':class'='{"width-100":v=="NATIONAL"}')
        MyChart(':zone'='v' 'v-model'="myModel")
      //- MyChart.cell.callout(v-for="v in myModel.selectedZones" ':key'="v" ':class'='{"width-100":v=="NATIONAL"}' ':zone'='v' 'v-model'="myModel")
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
  "NUSA_TENGGARA_TIMUR",
];
const logElement = (el) => {
  console.log(el);
};
const defaultHiddenDatasets = [true, false, true, false, true, false, true, false];
const defaultSelectedZones = [
  "NATIONAL",
  "DKI_JAKARTA",
  "JAWA_BARAT",
  "JAWA_TENGAH",
  "JAWA_TIMUR",
  "SULAWESI_SELATAN",
  "KALIMANTAN_SELATAN",
];

export default {
  name: "App",
  components: {
    MyForm,
    MyChart,
  },
  data() {
    return {
      myModel: {
        periods: 14,
        zones,
        selectedZones: _cloneDeep(defaultSelectedZones),
        hiddenDatasets: _cloneDeep(defaultHiddenDatasets),
      },
    };
  },
  watch: {
    "myModel.hiddenDatasets": (val, oldVal) => {
      let urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("hidden");
      if (!_isEqual(val, defaultHiddenDatasets)) {
        urlParams.set(`hidden`, val.join("+"));
      }

      window.history.replaceState({}, "", `${location.pathname}?${urlParams}`);
    },
    "myModel.periods": (val, oldVal) => {
      let urlParams = new URLSearchParams(window.location.search);
      urlParams.set("periods", val);
      window.history.replaceState({}, "", `${location.pathname}?${urlParams}`);
    },
    "myModel.selectedZones": (val, oldVal) => {
      let urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("zones");

      if (!_isEqual(_sortBy(val), _sortBy(defaultSelectedZones))) {
        urlParams.set(`zones`, val.join("+"));
      }
      window.history.replaceState({}, "", `${location.pathname}?${urlParams}`);
    },
  },
  methods: {
    handler(component) {
      console.log(component);
    },
  },
  created() {
    let urlParams = new URLSearchParams(window.location.search);
    let selectedZones = urlParams.get("zones");
    let hiddenDatasets = urlParams.get("hidden");
    const _this = this;

    if (!!hiddenDatasets) {
      hiddenDatasets = hiddenDatasets.split("+");
      hiddenDatasets
        .map((v) => JSON.parse(v.toLowerCase() == "true"))
        .forEach((v, i) => {
          _this.$set(this.myModel.hiddenDatasets, i, v);
        });
    }

    if (!!selectedZones) {
      selectedZones = selectedZones.split("+");
      this.myModel.selectedZones = !!selectedZones.length ? selectedZones : defaultSelectedZones;
    }
    const periods = urlParams.get("periods");
    this.myModel.periods = !!periods ? periods : 14;
  },
};
</script>

<style lang="scss">
@import "css/_foundation";
@include foundation-everything;

#chartHelpText {
  img {
    $size: 1.5rem;
    width: $size;
    height: $size;
  }
}
.cell {
  transition: width 1s;
}
.callout {
  padding: 0.5rem;
}
.width-100 {
  width: 100% !important;
}
</style>
