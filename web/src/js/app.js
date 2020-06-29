import delay from "lodash/delay";
import isUndefined from "lodash/isUndefined";
import cloneDeep from "lodash/cloneDeep";
import range from "lodash/range";

import Chartjs from "./libs/chartjs.js";
import Prov from "./libs/prov.js";
import Page from "./libs/page.js";

let periods = 14;
let lazyLoadCanvas;

const $zoneInput = document.querySelector(`select#zone`);
let selectedDatasets;
(() => {
  const $periodsInput = document.querySelector("form input[type='range']");
  const $periodsLabel = document.querySelector(`#periodsLabel`);

  const $zoneBtn = document.querySelector(`button#zoneBtn`);

  const $datasetsBtn = document.querySelector(`button#datasetsBtn`);
  const $datasetsInput = document.querySelector(`select#datasets`);

  const updatePeriods = (
    newPeriods,
    options = { updateSlider: false, updateCanvas: false }
  ) => {
    periods = newPeriods;
    $periodsLabel.innerHTML = newPeriods;
    if (options.updateSlider) {
      $periodsInput.value = newPeriods;
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
  $periodsInput.addEventListener("input", onSliderReleaseUpdateLabel);
  $periodsInput.addEventListener("change", (e) => {
    onSliderReleaseUpdateLabel(e, true);
  });
  (() => {
    $zoneBtn.addEventListener("click", (e) => {
      $zoneInput.classList.toggle("hide");
    });
    const allVal = [...$zoneInput.querySelectorAll("option")].map(
      (v) => v.value
    );
    const allChart = allVal.map((v) => `#Chart_${v}`).join(", ");
    $zoneInput.addEventListener("change", (e) => {
      const selectedVal = [...e.target.querySelectorAll("option:checked")].map(
        (v) => v.value
      );
      if (selectedVal.length) {
        Page.domShowOrHide(
          [...document.querySelectorAll(allChart)].map((v) =>
            v.closest(".cell")
          ),
          false
        );
        Page.domShowOrHide(
          [
            ...document.querySelectorAll(
              selectedVal.map((v) => `#Chart_${v}`).join(", ")
            ),
          ].map((v) => v.closest(".cell")),
          true
        );
      } else {
        Page.domShowOrHide(
          [...document.querySelectorAll(allChart)].map((v) =>
            v.closest(".cell")
          ),
          true
        );
      }
    });
  })();

  (() => {
    $datasetsBtn.addEventListener("click", (e) => {
      $datasetsInput.classList.toggle("hide");
    });
    // const allVal = [...$datasetsInput.querySelectorAll("option")].map(
    //   (v) => v.value
    // );
    $datasetsInput.addEventListener("change", (e) => {
      selectedDatasets = [...e.target.querySelectorAll("option:checked")].map(
        (v) => v.value
      );
      // console.log(selectedVal, range(7));
      if (selectedDatasets.length) {
        Object.entries(myChartData).forEach((v) => {
          range(7).forEach((v2) => {
            if (!!v[1].datasets[v2]) {
              myChartData[v[0]].datasets[v2].hidden = true;
            }
          });
        });
        Object.entries(myChartData).forEach((v) => {
          selectedDatasets.forEach((v2) => {
            if (!!v[1].datasets[v2]) {
              myChartData[v[0]].datasets[v2].hidden = false;
            }
          });

          if (!!myChart[v[0]]) {
            myChart[v[0]].update();
          }
        });
      } else {
        Object.entries(myChartData).forEach((v) => {
          if (!!v[1].datasets[0]) {
            v[1].datasets[0].hidden = true;
          }
          range(1, 7).forEach((v2) => {
            if (!!v[1].datasets[v2]) {
              v[1].datasets[v2].hidden = false;
            }
          });
          if (!!myChart[v[0]]) {
            myChart[v[0]].update();
          }
        });
      }
    });
  })();

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
  document.querySelectorAll("a.fullscreen").forEach((v) => {
    v.addEventListener("click", (e) => {
      Page.domSpin(e.target);
      const $cell = e.target.closest(".cell");
      $cell.classList.toggle("width-100");
    });
  });

  document.querySelector("button#top").addEventListener("click", (e) => {
    Page.domSpin(e.target.closest("button"));
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  });
})();

let myChart = {};
let myChartData = {};

(() => {
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
      // data.datasets[0].hidden = true;
      // data.datasets[4].hidden = true;
      console.log(selectedDatasets);
      if (!!selectedDatasets && selectedDatasets.length) {
        range(7).forEach((v) => {
          data.datasets[v].hidden = true;
        });

        selectedDatasets.forEach((v) => {
          data.datasets[v].hidden = false;
        });
      } else {
        data.datasets[0].hidden = true;
        range(1, 7).forEach((v) => {
          data.datasets[v].hidden = false;
        });
      }
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
