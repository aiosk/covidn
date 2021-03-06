const Chart = require("chartjs");

Chart.plugins.unregister(ChartDataLabels);

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

const defaultZoom = {
  // Container for pan options
  pan: {
    // Boolean to enable panning
    enabled: true,
    // Panning directions. Remove the appropriate direction to disable
    // Eg. 'y' would only allow panning in the y direction
    // A function that is called as the user is panning and returns the
    // available directions can also be used:
    //   mode: function({ chart }) {
    //     return 'xy';
    //   },
    mode: "x",
    rangeMin: {
      // Format of min pan range depends on scale type
      x: null,
      y: null,
    },
    rangeMax: {
      // Format of max pan range depends on scale type
      x: null,
      y: null,
    },
    // On category scale, factor of pan velocity
    speed: 20,
    // Minimal pan distance required before actually applying pan
    threshold: 10,
    // Function called while the user is panning
    onPan: function({ chart }) {
      console.log(`I'm panning!!!`);
    },
    // Function called once panning is completed
    onPanComplete: function({ chart }) {
      console.log(`I was panned!!!`);
    },
  },
  // Container for zoom options
  zoom: {
    // Boolean to enable zooming
    enabled: true,
    // Enable drag-to-zoom behavior
    drag: true,
    // Drag-to-zoom effect can be customized
    // drag: {
    // 	 borderColor: 'rgba(225,225,225,0.3)'
    // 	 borderWidth: 5,
    // 	 backgroundColor: 'rgb(225,225,225)',
    // 	 animationDuration: 0
    // },
    // Zooming directions. Remove the appropriate direction to disable
    // Eg. 'y' would only allow zooming in the y direction
    // A function that is called as the user is zooming and returns the
    // available directions can also be used:
    //   mode: function({ chart }) {
    //     return 'xy';
    //   },
    mode: "x",
    rangeMin: {
      // Format of min zoom range depends on scale type
      x: null,
      y: null,
    },
    rangeMax: {
      // Format of max zoom range depends on scale type
      x: null,
      y: null,
    },
    // Speed of zoom via mouse wheel
    // (percentage of zoom on a wheel event)
    speed: 0.1,
    // Minimal zoom distance required before actually applying zoom
    threshold: 2,
    // On category scale, minimal zoom level before actually applying zoom
    sensitivity: 3,
    // Function called while the user is zooming
    onZoom: function({ chart }) {
      console.log(`I'm zooming!!!`);
    },
    // Function called once zooming is completed
    onZoomComplete: function({ chart }) {
      console.log(`I was zoomed!!!`);
    },
  },
};

const initChartDaily = (params = { zone: null, data: null }) => {
  const chartInstance = new Chart(`Chart_${params.zone}`, {
    type: "line",
    data: params.data,
    options: {
      // title: {
      //   display: true,
      //   text: params.zone.split("_").join(" "),
      //   fontSize: 16,
      // },
      // maintainAspectRatio: false,
      tooltips: {
        mode: "index",
        intersect: false,
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
            var label = data.datasets[tooltipItem.datasetIndex].label || "";

            let dailyDatasetIndexVal;
            let totalDatasetIndexVal;
            if (tooltipItem.datasetIndex % 2 == 0) {
              dailyDatasetIndexVal = tooltipItem.datasetIndex + 1;
              totalDatasetIndexVal = tooltipItem.datasetIndex;
            } else {
              dailyDatasetIndexVal = tooltipItem.datasetIndex;
              totalDatasetIndexVal = tooltipItem.datasetIndex - 1;
            }
            let daily = data.datasets[dailyDatasetIndexVal].data[tooltipItem.index];
            let total = data.datasets[totalDatasetIndexVal].data[tooltipItem.index];

            const dailyStr = daily == 0 ? "" : daily > 0 ? `(+${daily})` : `(${daily})`;

            return `${label}: ${total} ${dailyStr}`;
          },
        },
      },
      legend: {
        display: false,
      },
      legendCallback: (chart) => {
        const chartLegendHtml = chart.legend.legendItems
          .map((v) => {
            return `<div class='cell item'>
  <div class='grid-x'>
    <div class='cell small-2'>
      <span class='color' style="background-color:${v.fillStyle};border:.2rem solid ${v.strokeStyle};"></span>
    </div>
    <div class='cell auto'>
      <span class='text' style="text-decoration:${v.hidden ? "line-through" : "none"};">${v.text}</span>
    </div>
  </div>
</div>`;
          })
          .join("\n");

        return chartLegendHtml;
      },
      elements: {
        line: {
          tension: 0.2,
          // fill: false,
        },
        point: {
          radius: 2,
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
      // plugins: {
      //   zoom: defaultZoom,
      // },
    },
  });

  return chartInstance;
};

const initChartRanking = (
  params = {
    elementId: null,
    data: null,
    onClick: null,
    datalabelsFormatter: null,
    tooltipsCallbackLabel: null,
    rightPadding: null,
  }
) => {
  const chartInstance = new Chart(params.elementId, {
    type: "horizontalBar",
    data: params.data,
    plugins: [ChartDataLabels],
    options: {
      onClick: params.onClick,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      animation: { duration: 0 },
      hover: { animationDuration: 0 },
      responsiveAnimationDuration: 0,
      watermark: defaultWatermark,

      layout: {
        padding: {
          right: params.rightPadding,
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
              min: 0,
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
              // display: false,
              // min: 0,
              // maxRotation: 23,
              callback: function(label, index, labels) {
                const newLabel = label.replace(/_/g, " ");
                let abbr = newLabel
                  .replace("DAERAH ISTIMEWA", "D.I.")
                  .replace("NUSA TENGGARA", "NUSTRA.")
                  // .replace("NUSA TENGGARA BARAT", "NTB")
                  // .replace("NUSA TENGGARA TIMUR", "NTT")
                  .replace("BANGKA BELITUNG", "BABEL")
                  .replace("YOGYAKARTA", "YOGYA")
                  .replace("KEPULAUAN", "KEP.")
                  .replace("KALIMANTAN", "KAL.")
                  .replace("SUMATERA", "SUM.")
                  .replace("SULAWESI", "SUL.");
                // .replace("JAWA", "JA");
                // .replace("UTARA", "UT")
                // .replace("SELATAN", "SEL")
                // .replace("TIMUR", "TIM")
                // .replace("TENGAH", "TENG")
                // .replace("BARAT", "BAR");
                return abbr;
              },
            },
          },
        ],
      },
      tooltips: {
        // enabled: false,
        // intersect: false,
        callbacks: {
          label: params.tooltipsCallbackLabel,
        },
      },
      plugins: {
        datalabels: {
          color: "#000",
          // backgroundColor: "#e6e6e6",
          anchor: "end",
          align: "end",
          // textAlign: "left",
          // opacity: 0.675,
          // clamp: true,
          // clip: true,
          formatter: params.datalabelsFormatter,
          font: {
            // weight: "bold",
            // size: 10,
          },
          // padding: {
          //   top: 0,
          //   bottom: 0,
          // },
        },
      },
    },
  });
  return chartInstance;
};

export { initChartDaily, initChartRanking };
