import delay from "lodash/delay";
import isUndefined from "lodash/isUndefined";
import cloneDeep from "lodash/cloneDeep";
import Chartjs from "./libs/chartjs.js";
import Prov from "./libs/prov.js";
const { provinces, initChartHtml: initChartHtmlProv } = Prov;

let periods = 14;
const $slider = document.querySelector("form input[type='range']");
const $sliderHtml = document.querySelector(`#periodsValue`);
let lazyLoadCanvas;

const updatePeriods = (
  newPeriods,
  options = { updateSlider: false, updateCanvas: false }
) => {
  periods = newPeriods;
  $sliderHtml.innerHTML = newPeriods;
  // console.log("updateSlider", options.updateSlider);
  if (options.updateSlider) {
    $slider.value = newPeriods;
  }
  // console.log("lazyLoadCanvas.update()", lazyLoadCanvas);
  if (!!lazyLoadCanvas && options.updateCanvas) {
    lazyLoadCanvas.update();
  }
};

$(window)
  .on("changed.zf.mediaquery", function (event, newSize, oldSize) {
    // console.log("MediaQuery.current", Foundation.MediaQuery.current);
    if (Foundation.MediaQuery.atLeast("xlarge")) {
      document.querySelector("#chartHelpTextMobile").style.display = "none";
      document.querySelector("#chartHelpTextDesktop").style.display = "";
      updatePeriods(7, { updateSlider: true, updateCanvas: true });
    } else {
      document.querySelector("#chartHelpTextMobile").style.display = "";
      document.querySelector("#chartHelpTextDesktop").style.display = "none";
      updatePeriods(14, { updateSlider: true, updateCanvas: true });
    }
  })
  .trigger("changed.zf.mediaquery");

let lazyLoad;
const onSliderReleaseUpdateLabel = (e, onChange = false) => {
  let { value } = e.target;
  if (onChange) {
    updatePeriods(value, { updateCanvas: true });
  } else {
    updatePeriods(value);
  }
};
$slider.addEventListener("input", onSliderReleaseUpdateLabel);
$slider.addEventListener("change", (e) => {
  onSliderReleaseUpdateLabel(e, true);
});

let myChart = {};
(() => {
  const $chartGrid = document.querySelector("#myChart.grid-x");
  initChartHtmlProv($chartGrid, provinces);
  const $cellChart = $chartGrid.querySelectorAll(".cell");

  const onClickCb = (e) => {
    // console.log("t");

    let $this = e.target.closest(".cell");
    let $thisCanvas = $this.querySelector("canvas");

    let chartId = $thisCanvas.id;

    if ($this.style.width == "100%") {
      $this.style.width = "";
    } else {
      $this.style.width = "100%";
    }

    myChart[chartId].resize();
  };
  $cellChart.forEach((v) => {
    v.removeEventListener("click", onClickCb);
    v.addEventListener("click", onClickCb);
    v.querySelector("canvas").addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
})();

(() => {
  let myChartData = {};
  let myChartDataDefault = { datasets: [], labels: [] };

  /* init dataDefault myChartDataDefault */
  myChartData["Chart_NATIONAL"] = cloneDeep(myChartDataDefault);
  provinces.forEach((v) => {
    myChartData[`Chart_${v}`] = cloneDeep(myChartDataDefault);
  });

  delay(() => {
    lazyLoadCanvas = new LazyLoad({
      elements_selector: "canvas",
      unobserve_entered: true,
      callback_enter: onCanvasEnterViewport,
      callback_exit: logElement,
      callback_loading: logElement,
      callback_loaded: logElement,
    });
    lazyLoad = new LazyLoad();

    // myChart["Chart_NATIONAL"] = Chartjs.initChart(
    //   "Canvas_NATIONAL",
    //   myChartData["Chart_NATIONAL"]
    // );
  }, 9);
  const logElement = (el) => {
    // myChart[el.id].destroy();
    // console.log(myChart[el.id]);
    console.log(el);
  };

  const updateChart = (elementId) => {
    const dataId = elementId.split("_").slice(1).join("_");
    myChart[elementId].canvas.previousElementSibling.style.display = "";

    (async () => {
      // console.log("updateChart", periods);

      const data = await Chartjs.getFile(dataId, periods);
      // console.log(elementId, dataId, data, data.labels);
      data.datasets[0].hidden = true;
      // data.datasets[4].hidden = true;
      myChartData[elementId].labels = data.labels;
      myChartData[elementId].datasets = data.datasets;
      myChart[elementId].update();
      myChart[elementId].canvas.previousElementSibling.style.display = "none";
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
})();
