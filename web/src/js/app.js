import delay from "lodash/delay";
import isUndefined from "lodash/isUndefined";
import cloneDeep from "lodash/cloneDeep";
import Chartjs from "./libs/chartjs.js";
import Prov from "./libs/prov.js";
const { provinces, initChartHtml: initChartHtmlProv } = Prov;

let periods = 7;
const $slider = document.querySelector("form input[type='range']");

// console.log(Foundation.MediaQuery.atLeast("large"));

$(window)
  .on("changed.zf.mediaquery", function (event, newSize, oldSize) {
    if (Foundation.MediaQuery.atLeast("large")) {
      document.querySelector("#chartHelpTextMobile").style.display = "none";
      document.querySelector("#chartHelpTextDesktop").style.display = "";
    } else {
      document.querySelector("#chartHelpTextMobile").style.display = "";
      document.querySelector("#chartHelpTextDesktop").style.display = "none";
    }
  })
  .trigger("changed.zf.mediaquery");
if (Foundation.MediaQuery.atLeast("large")) {
  periods = 7;
  $slider.value = 7;
}
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

let myChart = {};
let myChartData = {};
let myChartDataDefault = { datasets: [], labels: [] };

/* init dataDefault myChartDataDefault */
myChartData["Chart_NATIONAL"] = cloneDeep(myChartDataDefault);
provinces.forEach((v) => {
  myChartData[`Chart_${v}`] = cloneDeep(myChartDataDefault);
});

delay(() => {
  lazyLoad = new LazyLoad({
    elements_selector: "canvas",
    unobserve_entered: true,
    callback_enter: onCanvasEnterViewport,
    callback_exit: logEl,
    callback_loading: logEl,
    callback_loaded: logEl,
  });

  // myChart["Chart_NATIONAL"] = Chartjs.initChart(
  //   "Canvas_NATIONAL",
  //   myChartData["Chart_NATIONAL"]
  // );
}, 9);
const logEl = (el) => {
  // myChart[el.id].destroy();
  // console.log(myChart[el.id]);
  console.log(el);
};

if (Foundation.MediaQuery.atLeast("large")) {
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
    v.querySelector("canvas").addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
}

const updateChart = (elementId) => {
  const dataId = elementId.split("_").slice(1).join("_");
  myChart[elementId].canvas.previousElementSibling.style.display = "";

  (async () => {
    const data = await Chartjs.getFile(dataId, periods);
    // console.log(elementId, dataId, data, data.labels);
    data.datasets[0].hidden = true;
    myChartData[elementId].labels = data.labels;
    myChartData[elementId].datasets = data.datasets;
    myChart[elementId].update();
    // myChart[elementId].canvas.previousElementSibling.style.display = "none";
    console.log();
  })();
};

const onCanvasEnterViewport = (el) => {
  // console.log("enter", el, i, i2);
  if (isUndefined(myChart[el.id])) {
    // console.log(el.id, myChartData[el.id]);
    myChart[el.id] = Chartjs.initChart(el.id, myChartData);
  }

  delay(() => {
    updateChart(el.id);
  }, 99);
};
