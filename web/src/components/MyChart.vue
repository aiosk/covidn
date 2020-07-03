<template lang="pug">
  .my-chart.cell.callout(':class'='{"width-100":isNational}')
    .action
      .loader
      a.icon.download-raw(':href'='`https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/${this.zone}.csv`' target='_blank'): img.lazy(data-src="/img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")
      a.icon.download-chart('@click'='onClickDownloadChart'): img.lazy(data-src="/img/baseline_get_app_black_18dp.png" alt="download chart" title='download chart')
      a.icon.fullscreen.show-for-xlarge('@click'='onClickFullscreen'): img.lazy(data-src="/img/baseline_fullscreen_black_18dp.png" alt="fullscreen")

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
  props: ["zone", "value"],
  computed: {
    isNational() {
      return this.zone == "NATIONAL";
    },
    urlData() {
      return `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${
        this.zone
      }-${this.periods}.json?_=${Date.now()}`;
    }
  },
  data() {
    return {
      periods: this.value.periods,
      hiddenDatasets: this.value.hiddenDatasets,

      chartInstance: null,
      data: { datasets: [], labels: [] }
    };
  },
  watch: {
    value(newData, oldData) {
      if (newData.periods != oldData.periods) {
        this.periods = newData.periods;
        this.updateChartData();
      }
      if (newData.hiddenDatasets != oldData.hiddenDatasets) {
        newData.hiddenDatasets.forEach((v, i) => {
          this.$set(this.hiddenDatasets, i, v);
        });
        // this.hiddenDatasets = newData.hiddenDatasets;
        this.updateChartData();
        //   // this.updateChartData();
        //   this.chartInstance.data.datasets.forEach((v, i) => {
        //     this.chartInstance.data.datasets[i].hidden = newData[i];
        //   });
        //   this.chartInstance.update();
      }
    }
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
        if (!!this.hiddenDatasets && !!this.hiddenDatasets.length) {
          this.hiddenDatasets.forEach((v, i) => {
            newData.datasets[i].hidden = v;
          });
        }
        this.data.datasets = newData.datasets;
        this.data.labels = newData.labels;
        this.chartInstance.update();
      })();
    }
  },
  created() {},
  mounted() {
    const _this = this;
    // this.$emit("on-click-legend", "a");
    _delay(() => {
      const Chart = require("chartjs");
      Chart.plugins.register({
        beforeDraw: function(chartInstance) {
          var ctx = chartInstance.chart.ctx;
          ctx.fillStyle = "white";
          ctx.fillRect(
            0,
            0,
            chartInstance.chart.width,
            chartInstance.chart.height
          );
        }
      });

      this.chartInstance = new Chart(`Chart_${this.zone}`, {
        type: "bar",
        data: this.data,
        options: {
          title: {
            display: true,
            text: this.zone.split("_").join(" ")
          },
          tooltips: {
            mode: "index",
            filter: function(tooltipItem, data) {
              // console.log(
              //   data.datasets[tooltipItem.datasetIndex].label,
              //   data.datasets[tooltipItem.datasetIndex].type
              // );
              return _isUndefined(data.datasets[tooltipItem.datasetIndex].type);
            }
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

              const propValue = _cloneDeep(_this.value);
              propValue.hiddenDatasets = ci.data.datasets.map(v => v.hidden);
              _this.$emit("input", propValue);
              ci.update();
            }
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
            position: "front"
          }
        }
      });
    }, 499);

    _delay(() => {
      this.updateChartData();
    }, 699);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.width-100 {
  width: 100% !important;
}
.my-chart {
  position: relative;
}
.cell {
  transition: width 1s;
}
.callout {
  padding: 0.5rem;
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
// .legend {
//   padding: 0.5rem;
//   font-size: 1rem;
//   text-align: left;
//   .item {
//     cursor: pointer;
//     margin-bottom: 0.5rem;
//     .color {
//       $size: 1rem;
//       width: $size;
//       height: $size;
//       display: inline-block;
//       border: {
//         width: 0.125rem;
//         style: solid;
//       }
//     }
//     .text {
//       // padding: 0.125rem;
//       padding-left: 0.5rem;
//       line-height: 1rem;
//     }
//   }
// }
</style>
