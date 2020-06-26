import delay from "lodash/delay";
import isUndefined from "lodash/isUndefined";
import cloneDeep from "lodash/cloneDeep";
import Chartjs from "./libs/chartjs.js";
import Prov from "./libs/prov.js";
const { provinces, initChartHtml: initChartHtmlProv } = Prov;

let periods = 7;
const $slider = document.querySelector("form input[type='range']");

// console.log(Foundation.MediaQuery.atLeast("large"));
// if (Foundation.MediaQuery.atLeast("large")) {
//   periods = 7;
//   $slider.value = 7;
// }
let lazyLoad;
const onSliderReleaseUpdateLabel = (e) => {
  let { value } = e.target;
  periods = value;
  document.querySelector(`#periodsValue`).innerHTML = value;
  lazyLoad.update();
};
$slider.addEventListener("input", onSliderReleaseUpdateLabel);
// $slider.addEventListener("change", onSliderReleaseUpdateLabel);

initChartHtmlProv(document.querySelector("#myChart.grid-x"), provinces);

delay(() => {
  lazyLoad = new LazyLoad({
    elements_selector: "canvas",
    unobserve_entered: true,
    callback_enter: onCanvasEnterViewport,
    callback_exit: logEl,
    callback_loading: logEl,
    callback_loaded: logEl,
  });
}, 9);
const logEl = (el) => {
  // myChart[el.id].destroy();
  // console.log(myChart[el.id]);
  console.log(el);
};

const $cellChart = document.querySelectorAll("#myChart.grid-x .cell");
$cellChart.forEach((v) => {
  v.addEventListener("click", (e) => {
    let $this = e.target.closest(".cell");
    let $thisCanvas = $this.querySelector("canvas");

    let chartId = $thisCanvas.id;

    if ($this.style.width == "100%") {
      $this.style.width = "";
    } else {
      $this.style.width = "100%";
    }

    myChart[chartId].resize();
  });
});

let myChart = {};
let myChartData = {};
let myChartDataDefault = { datasets: [], labels: [] };

/* init dataDefault myChartDataDefault */
myChartData["Chart_NATIONAL"] = cloneDeep(myChartDataDefault);
provinces.forEach((v) => {
  myChartData[`Chart_${v}`] = cloneDeep(myChartDataDefault);
});

const updateChart = (elementId) => {
  const dataId = elementId.split("_").slice(1).join("_");

  (async () => {
    const data = await Chartjs.getFile(dataId, periods);
    // console.log(elementId, dataId, data, data.labels);
    data.datasets[0].hidden = true;
    myChartData[elementId].labels = data.labels;
    myChartData[elementId].datasets = data.datasets;
    myChart[elementId].update();
  })();
};

const onCanvasEnterViewport = (el) => {
  // console.log("enter", el);
  if (isUndefined(myChart[el.id])) {
    // console.log(el.id, myChartData[el.id]);
    myChart[el.id] = new Chart(el.id, {
      type: "bar",
      data: myChartData[el.id],
      options: {
        title: {
          display: true,
          text: el.id.split("_").slice(1).join(" "),
        },
        tooltips: {
          filter: function (tooltipItem) {
            return [2, 4].indexOf(tooltipItem.datasetIndex) === -1;
          },
        },
        animation: {
          duration: 0,
        },
        hover: {
          animationDuration: 0,
        },
        responsiveAnimationDuration: 0,
      },
    });
  }
  delay(() => {
    updateChart(el.id);
  }, 99);
};
