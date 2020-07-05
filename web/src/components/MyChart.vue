<template lang="pug">
  .my-chart
    .action(v-lazy-container="{ selector: 'img' }")
      .loader
      a.icon.download-raw(rel="noopener" ':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/${this.zone}.csv`' target='_blank'): img.lazy(data-src="./img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")
      a.icon.download-chart('@click'='onClickDownloadChart'): img(data-src="./img/baseline_get_app_black_18dp.png" alt="download chart" title='download chart')
      a.icon.fullscreen.show-for-xlarge('@click'='onClickFullscreen'): img(data-src="./img/baseline_fullscreen_black_18dp.png" alt="fullscreen")

    canvas(:id="`Chart_${zone}`")
</template>

<script>
import _delay from "lodash/delay";
import _isUndefined from "lodash/isUndefined";
import _cloneDeep from "lodash/cloneDeep";

// http://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect
var image = new Image();
image.src = "img/watermark2.png";

export default {
  name: "MyChart",
  props: {
    zone: String,
    value: Object,
  },
  computed: {
    urlData() {
      return `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${this.zone}-${
        this.periods
      }.json?_=${Date.now()}`;
    },
    periods() {
      return this.value.periods;
    },
    hiddenDatasets() {
      return this.value.hiddenDatasets;
    },
  },
  data() {
    return {
      chartInstance: null,
      data: { datasets: [], labels: [] },
    };
  },
  watch: {
    value(val, oldVal) {
      this.updateChartData();
    },
  },
  methods: {
    onClickFullscreen(e) {
      e.target.closest(".cell.callout").classList.toggle("width-100");
    },
    onClickDownloadChart(e) {
      const $anchor = e.target.closest("a.download-chart");
      // Page.domSpin(e.target);

      const image = this.chartInstance.toBase64Image();
      $anchor.href = image;
      $anchor.download = `Chart_${this.zone}.jpg`;
    },
    updateChartData() {
      (async () => {
        let res = await fetch(this.urlData);
        let newData = await res.json();

        // if (!!this.hiddenDatasets && !!this.hiddenDatasets.length) {
        this.hiddenDatasets.forEach((v, i) => {
          newData.datasets[i].hidden = v;
        });
        // }
        this.data.datasets = newData.datasets;
        this.data.labels = newData.labels;
        this.chartInstance.update();
      })();
    },
  },
  mounted() {
    const _this = this;

    _delay(() => {
      const { default: Chart } = require("../js/chartjs");

      this.chartInstance = new Chart(`Chart_${this.zone}`, {
        type: "bar",
        data: this.data,
        options: {
          title: {
            display: true,
            text: this.zone.split("_").join(" "),
          },
          tooltips: {
            mode: "index",
            filter: function(tooltipItem, data) {
              // console.log(
              //   data.datasets[tooltipItem.datasetIndex].label,
              //   data.datasets[tooltipItem.datasetIndex].type
              // );
              return _isUndefined(data.datasets[tooltipItem.datasetIndex].type);
            },
          },
          legend: {
            // position: "right",
            // display: false,
            onClick(e, legendItem) {
              var index = legendItem.datasetIndex;
              var ci = this.chart;
              // var meta = ci.getDatasetMeta(index);

              // See controller.isDatasetVisible comment
              // meta.hidden =
              //   meta.hidden === null ? !ci.data.datasets[index].hidden : null;
              ci.data.datasets[index].hidden = !ci.data.datasets[index].hidden;

              // We hid a dataset ... rerender the chart

              const propsValue = _cloneDeep(_this.value);
              _this.$set(propsValue.hiddenDatasets, index, ci.data.datasets[index].hidden);
              // propsValue.hiddenDatasets = ci.data.datasets.map((v) => v.hidden);

              _this.$emit("input", propsValue);
              ci.update();
            },
          },
          scales: {
            // xAxes: [{ ticks: { display: MyFoundation.mqAtleast("medium") } }],
            // yAxes: [{ ticks: { display: MyFoundation.mqAtleast("medium") } }],
          },
          animation: { duration: 0 },
          hover: { animationDuration: 0 },
          responsiveAnimationDuration: 0,
          watermark: {
            // the image you would like to show
            // alternatively, this can be of type "Image"
            image: image,
            // x and y offsets of the image
            x: 0,
            y: 0,
            // width and height to resize the image to
            // image is not resized if these values are not set
            // width: 108,
            // height: 39,
            // opacity of the image, from 0 to 1 (default: 1)
            opacity: 1,
            // x-alignment of the image (default: "left")
            // valid values: "left", "middle", "right"
            alignX: "middle",
            // y-alignment of the image (default: "top")
            // valid values: "top", "middle", "bottom"
            alignY: "middle",
            // if true, aligns the watermark to the inside of the chart area (where the lines are)
            // (where the lines are)
            // if false, aligns the watermark to the inside of the canvas
            // see samples/alignToChartArea.html
            // alignToChartArea: false,
            // determines whether the watermark is drawn on top of or behind the chart
            // valid values: "front", "back"
            position: "front",
          },
        },
      });
    }, 499);

    _delay(() => {
      this.updateChartData();
    }, 699);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.my-chart {
  position: relative;
}
.action {
  position: absolute;
  right: 0;
  top: 0;
  text-align: right;
  a.icon {
    $size: 3rem;
    height: $size;
    width: $size;
    // padding: 1rem;
    display: inline-block;
    padding: 0.5rem;
    img {
      $size: 2rem;
      height: $size;
      width: $size;
    }
  }

  & > .cell:nth-child(1) {
    order: 2;
  }
  & > .cell:nth-child(2) {
    order: 1;
  }
}
</style>
