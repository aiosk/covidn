import isUndefined from "lodash/isUndefined";

var image = new Image();
// http://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect
image.src = "/img/watermark2.png";

let dataDefault = { datasets: [], labels: [] };

const getFile = async (zone, periods = 14) => {
  let res = await fetch(
    `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${zone}-${periods}.json?_=${Date.now()}`
  );
  let resJson = await res.json();

  return resJson;
};

const initChart = (elementId, myChartData) => {
  Chart.plugins.register({
    beforeDraw: function (chartInstance) {
      var ctx = chartInstance.chart.ctx;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);
    },
  });
  const myChart = new Chart(elementId, {
    type: "bar",
    data: myChartData[elementId],
    options: {
      title: {
        display: true,
        text: elementId.split("_").slice(1).join(" "),
      },
      tooltips: {
        filter: function (tooltipItem, data) {
          // console.log(
          //   data.datasets[tooltipItem.datasetIndex].label,
          //   data.datasets[tooltipItem.datasetIndex].type
          // );

          return isUndefined(data.datasets[tooltipItem.datasetIndex].type);
        },
      },
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
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
  return myChart;
};

export default { dataDefault, getFile, initChart };
