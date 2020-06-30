import delay from "lodash/delay";
import isUndefined from "lodash/isUndefined";
import cloneDeep from "lodash/cloneDeep";

import MyChartjs from "./libs/chartjs.js";
import Prov from "./libs/prov.js";
import Page from "./libs/page.js";
import MyFoundation from "./libs/foundation.js";

let myChart = {};
let myChartData = {};
myChartData["Chart_NATIONAL"] = cloneDeep(MyChartjs.dataDefault);
Prov.provinces.forEach((v) => {
  myChartData[`Chart_${v}`] = cloneDeep(MyChartjs.dataDefault);
});

let hiddenDatasets = [true, true, false, false, false, false, false, false];

let periods = 14;
let lazyLoadCanvas;

const $zoneInput = document.querySelector(`select#zone`);
(() => {
  // const $form = document.querySelector("form");
  const $periodsInput = document.querySelector("form input[type='range']");
  const $periodsLabel = document.querySelector(`#periodsLabel`);

  const updatePeriods = (newPeriods) => {
    periods = newPeriods;
    $periodsLabel.innerHTML = newPeriods;
    if ($periodsInput.value != newPeriods) {
      $periodsInput.value = newPeriods;
    }
  };

  $(window)
    .on("changed.zf.mediaquery", function (event, newSize, oldSize) {
      // console.log("MediaQuery.current", Foundation.MediaQuery.current);
      Page.showHelpMobileOrDesktop(
        MyFoundation.mqAtleastLarge(),
        document.querySelectorAll("#chartHelpText .mobile"),
        document.querySelectorAll("#chartHelpText .desktop")
      );
      if (MyFoundation.mqAtleastLarge()) {
        updatePeriods(7);
      } else {
        updatePeriods(14);
      }

      for (const k in myChart) {
        if (MyFoundation.mqAtleast("medium")) {
          myChart[k].options.scales.xAxes[0].ticks.display = true;
          myChart[k].options.scales.yAxes[0].ticks.display = true;
        } else {
          myChart[k].options.scales.xAxes[0].ticks.display = false;
          myChart[k].options.scales.yAxes[0].ticks.display = false;
        }
      }
    })
    .trigger("changed.zf.mediaquery");

  const onSliderReleaseUpdateLabel = (e, onChange = false) => {
    let { value } = e.target;

    updatePeriods(value);
  };
  $periodsInput.addEventListener("input", onSliderReleaseUpdateLabel);
  $periodsInput.addEventListener("change", (e) => {
    onSliderReleaseUpdateLabel(e);
    if (!!lazyLoadCanvas) {
      lazyLoadCanvas.update();
    }
  });
  (() => {
    const allChart = [...$zoneInput.querySelectorAll("option")]
      .map((v) => `#Chart_${v.value}`)
      .join(", ");
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

  document.querySelectorAll("a.download-chart").forEach((v) => {
    v.addEventListener("click", (e) => {
      e.stopPropagation();
      const $anchor = e.target.closest("a.download-chart");
      Page.domSpin(e.target);

      const $cell = e.target.closest(".cell.callout");
      const $canvas = $cell.querySelector("canvas");
      const image = myChart[$canvas.id].toBase64Image();
      $anchor.href = image;
      $anchor.download = `${$canvas.id}.jpg`;
    });
  });
  document.querySelectorAll("a.fullscreen").forEach((v) => {
    v.addEventListener("click", (e) => {
      Page.domSpin(e.target);
      const $cell = e.target.closest(".cell.callout");
      $cell.classList.toggle("width-100");
    });
  });

  document.querySelector("button#top").addEventListener("click", (e) => {
    Page.domSpin(e.target.closest("button"));
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  });
})();

(() => {
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
  }, 9);
  const logElement = (el) => {
    // myChart[el.id].destroy();
    // console.log(myChart[el.id]);
    console.log(el);
  };

  const onCanvasEnterViewport = (el) => {
    // console.log("enter", el, i, i2);
    if (isUndefined(myChart[el.id])) {
      // console.log(el.id, myChartData[el.id]);
      myChart[el.id] = MyChartjs.initChart(el.id, myChartData[el.id]);
    }

    delay(() => {
      const $canvasLoader = myChart[el.id].canvas
        .closest(".cell")
        .querySelector(".loader");
      Page.domShowOrHide($canvasLoader, true);

      (async () => {
        const data = await MyChartjs.getFile(el.id, periods);

        hiddenDatasets.forEach((v, i) => {
          data.datasets[i].hidden = v;
        });
        myChartData[el.id].labels = data.labels;
        myChartData[el.id].datasets = data.datasets;

        myChart[el.id].update();
        Page.domShowOrHide($canvasLoader, false);

        const $legend = document
          .querySelector(`#${el.id}`)
          .closest(".cell")
          .querySelector(".legend");
        $legend.innerHTML = myChart[el.id].generateLegend();

        $legend.addEventListener("click", (e) => {
          if (e.target.style.textDecoration == "none") {
            e.target.style.textDecoration = "line-through";
          } else {
            e.target.style.textDecoration = "none";
          }
          hiddenDatasets = [...$legend.querySelectorAll(".text")].map(
            (v) => v.style.textDecoration != "none"
          );
          // console.log(myChartData, myChart);
          for (const k in myChartData) {
            hiddenDatasets.forEach((v, i) => {
              if (!!myChartData[k].datasets.length)
                myChartData[k].datasets[i].hidden = v;
            });
          }
          for (const k in myChart) {
            myChart[k].update();
            document
              .querySelector(`#${k}`)
              .closest(".cell")
              .querySelector(".legend").innerHTML = myChart[k].generateLegend();
          }
        });
      })();
    }, 99);
  };
})();
