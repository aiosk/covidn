import delay from "lodash/delay";
import isUndefined from "lodash/isUndefined";
import cloneDeep from "lodash/cloneDeep";

import Chartjs from "./libs/chartjs.js";
import Prov from "./libs/prov.js";
import Page from "./libs/page.js";

let periods = 14;
let lazyLoadCanvas;

(() => {
  const $sliderInput = document.querySelector("form input[type='range']");
  const $sliderLabel = document.querySelector(`#periodsLabel`);

  const $buttonZone = document.querySelector(`button#zoneButton`);
  const $selectZone = document.querySelector(`select#zone`);

  const updatePeriods = (
    newPeriods,
    options = { updateSlider: false, updateCanvas: false }
  ) => {
    periods = newPeriods;
    $sliderLabel.innerHTML = newPeriods;
    if (options.updateSlider) {
      $sliderInput.value = newPeriods;
    }
    if (!!lazyLoadCanvas && options.updateCanvas) {
      lazyLoadCanvas.update();
    }
  };

  $(window)
    .on("changed.zf.mediaquery", function (event, newSize, oldSize) {
      // console.log("MediaQuery.current", Foundation.MediaQuery.current);
      Page.showHelpMobileOrDesktop(
        Foundation.MediaQuery.atLeast("xlarge"),
        document.querySelectorAll("#chartHelpText .mobile"),
        document.querySelectorAll("#chartHelpText .desktop")
      );
      if (Foundation.MediaQuery.atLeast("xlarge")) {
        updatePeriods(7, { updateSlider: true, updateCanvas: true });
      } else {
        updatePeriods(14, { updateSlider: true, updateCanvas: true });
      }
    })
    .trigger("changed.zf.mediaquery");

  const onSliderReleaseUpdateLabel = (e, onChange = false) => {
    let { value } = e.target;
    if (onChange) {
      updatePeriods(value, { updateCanvas: true });
    } else {
      updatePeriods(value);
    }
  };
  $sliderInput.addEventListener("input", onSliderReleaseUpdateLabel);
  $sliderInput.addEventListener("change", (e) => {
    onSliderReleaseUpdateLabel(e, true);
  });

  $buttonZone.addEventListener("click", (e) => {
    $selectZone.classList.toggle("hide");
  });
  const allValues = [...$selectZone.querySelectorAll("option")].map(
    (v) => v.value
  );
  const allChart = allValues.map((v) => `#Chart_${v}`).join(", ");
  $selectZone.addEventListener("change", (e) => {
    const selectedValues = [...e.target.querySelectorAll("option:checked")].map(
      (v) => v.value
    );
    if (selectedValues.length) {
      Page.domShowOrHide(
        [...document.querySelectorAll(allChart)].map((v) => v.closest(".cell")),
        false
      );
      Page.domShowOrHide(
        [
          ...document.querySelectorAll(
            selectedValues.map((v) => `#Chart_${v}`).join(", ")
          ),
        ].map((v) => v.closest(".cell")),
        true
      );
    } else {
      Page.domShowOrHide(
        [...document.querySelectorAll(allChart)].map((v) => v.closest(".cell")),
        true
      );
    }
  });

  document.querySelectorAll("a.download").forEach((v) => {
    v.addEventListener("click", (e) => {
      e.stopPropagation();
      Page.domSpin(e.target);

      const $cell = e.target.closest(".cell");
      const $canvas = $cell.querySelector("canvas");
      const image = $canvas.toDataURL("image/jpeg");
      const $anchor = $cell.querySelector("a.download");
      $anchor.href = image;
      $anchor.download = `${$canvas.id}.jpg`;
    });
  });

  document.querySelector("button#top").addEventListener("click", (e) => {
    Page.domSpin(e.target.closest("button"));
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  });
})();

let myChart = {};
(() => {
  const $chartGrid = document.querySelector("#myChart.grid-x");
  const $cellChart = $chartGrid.querySelectorAll(".cell.callout");

  const onClickCb = (e) => {
    // console.log("t");

    let $this = e.target.closest(".cell.callout");
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

  /* init dataDefault */
  myChartData["Chart_NATIONAL"] = cloneDeep(Chartjs.dataDefault);
  Prov.provinces.forEach((v) => {
    myChartData[`Chart_${v}`] = cloneDeep(Chartjs.dataDefault);
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

    let lazyLoad = new LazyLoad();

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
    const $canvasLoader = myChart[elementId].canvas
      .closest(".cell")
      .querySelector(".loader");
    Page.domShowOrHide($canvasLoader, true);

    (async () => {
      // console.log("updateChart", periods);

      const data = await Chartjs.getFile(dataId, periods);
      // console.log(elementId, dataId, data, data.labels);
      data.datasets[0].hidden = true;
      // data.datasets[4].hidden = true;
      myChartData[elementId].labels = data.labels;
      myChartData[elementId].datasets = data.datasets;
      myChart[elementId].update();
      Page.domShowOrHide($canvasLoader, false);
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
