<template lang="pug">
  #app.grid-container
    h4.text-center Daily Indonesia COVID-19 cases
    h5.text-center National and Provinces
      .clearfix
        a.float-right(href='https://github.com/aiosk/covidn')
          img.lazy(alt="GitHub stars" data-src="https://img.shields.io/github/stars/aiosk/covidn?logo=github&style=for-the-badge")
    #chartHelpText.help-text.callout.warning
      ul
        li.mobile For best results please view in #[strong landscape] mode
        li.mobile Click #[img.lazy(data-src="/img/baseline_get_app_black_18dp.png" alt="download chart")] to save chart as image
        li.mobile Click #[img.lazy(data-src="/img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")] to save chart raw data
        li.mobile #[strong Tap or Touch] chart bar to see case number
        li.mobile #[strong Tap or Touch] chart legend to show/hide chart data
        li.desktop Click #[img.lazy(data-src="/img/baseline_fullscreen_black_18dp.png" alt="fullscreen")] to toggle chart #[strong full-width] mode
        li.desktop Click #[img.lazy(data-src="/img/baseline_get_app_black_18dp.png" alt="download")] to save chart as image
        li.desktop Click #[img.lazy(data-src="/img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")] to save chart raw data
        li.desktop #[strong Hover mouse] on chart bar to see case number
        li.desktop #[strong Click] chart legend to show/hide chart data
    MyForm(':zones'="zones" ':selected-zones'='selectedZones' ':periods'='periods')

    #myChart.grid-x.xlarge-up-2(aria-describedby="chartHelpText")
      MyChart(v-for="v in selectedZones" ':key'="v" ':zone'='v' ':periods'='periods' '@legendOnClick'='chartLegendOnClick' ':hiddenDatasets'='hiddenDatasets')
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import MyForm from "./components/MyForm.vue";
import MyChart from "./components/MyChart.vue";
import _delay from "lodash/delay";
import _cloneDeep from "lodash/cloneDeep";
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
export default {
  name: "App",
  components: {
    MyForm,
    MyChart,
  },
  data() {
    return {
      zones,
      periods: 14,
      selectedZones: [],
      hiddenDatasets: [true, true, false, false, false, false, false, false],
    };
  },
  methods: {
    chartLegendOnClick(newData) {
      const newHiddenDatasets = _cloneDeep(this.hiddenDatasets);
      newHiddenDatasets[newData[0]] = newData[1];
      this.hiddenDatasets = newHiddenDatasets;

      let urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("hidden");
      this.hiddenDatasets.forEach((v, i) => {
        urlParams.append(`hidden`, v);
      });

      window.history.replaceState({}, "", `${location.pathname}?${urlParams}`);
    },
  },
  created() {
    let urlParams = new URLSearchParams(window.location.search);
    const selectedZones = urlParams.getAll("zones");
    const hiddenDatasets = urlParams.getAll("hidden");
    this.hiddenDatasets = hiddenDatasets.map((v) =>
      JSON.parse(v.toLowerCase() == "true")
    );

    this.selectedZones = !!selectedZones.length ? selectedZones : zones;
    const periods = urlParams.get("periods");
    this.periods = !!periods ? periods : 14;
  },
  mounted() {
    _delay(() => {
      const LazyLoad = require("lazyload");
      let _ = new LazyLoad();

      // let lazyLoadCanvas = new LazyLoad({
      //   elements_selector: "canvas",
      //   // unobserve_entered: true,
      //   callback_enter: onCanvasEnterViewport,
      //   callback_exit: logElement,
      //   callback_loading: logElement,
      //   callback_loaded: logElement,
      // });
    }, 299);
    const onCanvasEnterViewport = (el) => {};
  },
};
</script>

<style lang="scss">
@import "css/_foundation";
@include foundation-everything;
</style>
