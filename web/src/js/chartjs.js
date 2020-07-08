import _isUndefined from "lodash/isUndefined";
import _sum from "lodash/sum";
import _take from "lodash/take";

const Chart = require("chartjs");

// Chart.plugins.register({
//   beforeDraw: function(chartInstance) {
//     var ctx = chartInstance.chart.ctx;
//     ctx.fillStyle = "white";
//     ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
//   },
// });

// http://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect
var image = new Image();
image.src = "img/watermark2.png";

const defaultWatermark = {
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
};

const initChartDaily = (params = { zone: null, data: null, mqIsAtLeastMedium: false }) => {
  const chartInstance = new Chart(`Chart_${params.zone}`, {
    type: "line",
    data: params.data,
    options: {
      // title: {
      //   display: true,
      //   text: params.zone.split("_").join(" "),
      //   fontSize: 16,
      // },
      tooltips: {
        mode: "index",
        intersect: false,
        // filter: function(tooltipItem, data) {
        //   return _isUndefined(data.datasets[tooltipItem.datasetIndex].type);
        // },
        callbacks: {
          labelColor(tooltipItem, chart) {
            let datasetIndexVal = tooltipItem.datasetIndex % 8;
            // console.log(tooltipItem.datasetIndex, datasetIndexVal, chart.data.datasets[datasetIndexVal]);

            return {
              // borderColor: "rgb(255, 0, 0)",
              borderColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor,
              backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor,
            };
          },
          label(tooltipItem, data) {
            let datasetIndexVal = tooltipItem.datasetIndex % 8;
            var label = data.datasets[datasetIndexVal].label || "";
            let value = data.datasets[datasetIndexVal].data[tooltipItem.index];
            // console.log(datasetIndexVal, datasetIndexVal + 4);
            // let total = data.datasets[datasetIndexVal + 4].data[tooltipItem.index];
            let total = _sum(_take(data.datasets[datasetIndexVal].data, tooltipItem.index + 1));

            const valueStr = value == 0 ? "" : value > 0 ? `(+${value})` : `(${value})`;
            // console.log(tooltipItem.datasetIndex, (tooltipItem.datasetIndex / 4).toFixed(0) == 1);

            let isSecondDataset = (tooltipItem.datasetIndex / 4).toFixed(1);
            isSecondDataset = isSecondDataset >= 1 && isSecondDataset < 2;

            if (isSecondDataset) {
              return `${label}: ${value}`;
            } else {
              return `${label}: ${total} ${valueStr}`;
            }
            // return `${label}: ${total} (${value > 0 ? "+" : ""}${value})`;
          },
        },
      },
      legend: {
        display: false,
        // display: params.mqIsAtLeastMedium,
      },
      legendCallback: (chart) => {
        const chartLegendHtml = chart.legend.legendItems
          .map((v) => {
            return `<div class='cell item ${v.text}'>
  <div class='grid-x'>
    <div class='cell small-2 color' style="background-color:${v.fillStyle};border:.2rem solid ${v.strokeStyle};"></div>
    <div class='cell small-10 text' style="text-decoration:${v.hidden ? "line-through" : "none"};">${v.text}</div>
  </div>
</div>`;
          })
          .join("\n");

        return chartLegendHtml;
      },
      elements: {
        line: {
          tension: 0,
          fill: false,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
              // display: params.mqIsAtLeastMedium,
              // min: 0,
              // maxRotation: 23,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              // display: params.mqIsAtLeastMedium,
              display: false,
              // min: 0,
              // maxRotation: 23,
            },
          },
        ],
      },
      animation: { duration: 0 },
      hover: { animationDuration: 0 },
      responsiveAnimationDuration: 0,
      watermark: defaultWatermark,
    },
  });

  return chartInstance;
};

const initChartStatsCase = (params = { zone: null, data: null }) => {
  const chartInstance = new Chart(`Stats_${params.zone}`, {
    type: "doughnut",
    data: params.data,
    options: {
      legend: {
        display: false,
      },
      animation: { duration: 0 },
      hover: { animationDuration: 0 },
      responsiveAnimationDuration: 0,
      // watermark: defaultWatermark,
      tooltips: {
        callbacks: {
          label(tooltipItem, data) {
            var label = data.labels[tooltipItem.index] || "";

            let value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

            return `${label}: ${value}%`;
          },
        },
      },
    },
  });
  return chartInstance;
};

export { initChartDaily, initChartStatsCase };
