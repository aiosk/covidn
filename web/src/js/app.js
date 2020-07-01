import delay from "lodash/delay";
import isUndefined from "lodash/isUndefined";
import cloneDeep from "lodash/cloneDeep";

import MyChartjs from "./libs/chartjs.js";
import Prov from "./libs/prov.js";
import Page from "./libs/page.js";
import MyFoundation from "./libs/foundation.js";

let myDataDefault = {
  GLOBAL: {
    periods: 14,
    zones: [],
    hiddenDatasets: [true, true, false, false, false, false, false, false],
    mediaQuery: {
      atLeastLarge: undefined,
      atLeastMedium: undefined,
    },
  },
  CHART: {},
  CHARTDATA: {},
};

let myData = ObservableSlim.create(myDataDefault, true, (changes) => {
  console.log(changes);
});

const $zoneInput = document.querySelector(`select#zone`);
const $chartHelpTextMobile = document.querySelectorAll(
  "#chartHelpText .mobile"
);
const $chartHelpTextDesktop = document.querySelectorAll(
  "#chartHelpText .desktop"
);
let lazyLoadCanvas;
let myDataGlobal = ObservableSlim.create(
  myDataDefault.GLOBAL,
  true,
  (changes) => {
    console.log(changes);
    changes.forEach((change) => {
      switch (change.currentPath) {
        case "periods":
          if (!!lazyLoadCanvas) {
            lazyLoadCanvas.update();
          }

          break;
        case "zones":
          const allChart = [...$zoneInput.querySelectorAll("option")]
            .map((v) => `#Chart_${v.value}`)
            .join(", ");
          const allChartCell = [
            ...document.querySelectorAll(allChart),
          ].map((v) => v.closest(".cell"));
          if (change.newValue.length) {
            Page.domShowOrHide(allChartCell, false);
            Page.domShowOrHide(
              [
                ...document.querySelectorAll(
                  change.newValue.map((v) => `#Chart_${v}`).join(", ")
                ),
              ].map((v) => v.closest(".cell")),
              true
            );
          } else {
            Page.domShowOrHide(allChartCell, true);
          }

          break;
        case "mediaQuery.atLeastLarge":
          if (change.newValue) {
            myDataGlobal.periods = 7;
          } else {
            myDataGlobal.periods = 14;
          }
          console.log(change.newValue);
          if (change.newValue) {
            Page.domShowOrHide($chartHelpTextMobile, false);
            Page.domShowOrHide($chartHelpTextDesktop, true);
          } else {
            Page.domShowOrHide($chartHelpTextMobile, true);
            Page.domShowOrHide($chartHelpTextDesktop, false);
          }
          break;
        case "mediaQuery.atLeastMedium":
          for (const k in myChart) {
            myChart[k].options.scales.xAxes[0].ticks.display = change.newValue;
            myChart[k].options.scales.yAxes[0].ticks.display = change.newValue;
          }

          break;
        case "hiddenDatasets":
          for (const k in myChartData) {
            myDataGlobal.hiddenDatasets.forEach((v, i) => {
              if (!!myChartData[k].datasets.length)
                myChartData[k].datasets[i].hidden = v;
            });
          }
          // if (!!lazyLoadCanvas) {
          //   lazyLoadCanvas.update();
          // }
          for (const k in myChart) {
            myChart[k].update();
            document
              .querySelector(`#${k}`)
              .closest(".cell")
              .querySelector(".legend").innerHTML = myChart[k].generateLegend();
          }

          break;
      }
    });
  }
);

let myChart = {};
let myChartData = {};
["NATIONAL"].concat(Prov.provinces).forEach((v) => {
  myChartData[`Chart_${v}`] = cloneDeep(MyChartjs.dataDefault);
});

((_) => {
  const $periodsInput = document.querySelector("form input[type='range']");
  $periodsInput.addEventListener("input", (e) => {
    const $label = e.target.closest(".grid-x").querySelector(`label span`);
    $label.innerHTML = e.target.value;
  });
  $periodsInput.addEventListener("change", (e) => {
    myDataGlobal.periods = e.target.value;
  });
})();

(() => {
  $zoneInput.addEventListener("change", (e) => {
    const selectedVal = [...e.target.querySelectorAll("option:checked")].map(
      (v) => v.value
    );
    myDataGlobal.zones = selectedVal;
  });
})();

(() => {
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
  // const $form = document.querySelector("form");

  $(window)
    .on("changed.zf.mediaquery", function (event, newSize, oldSize) {
      // console.log("MediaQuery.current", Foundation.MediaQuery.current);

      myDataGlobal.mediaQuery.atLeastLarge = MyFoundation.mqAtleast("xlarge");
      myDataGlobal.mediaQuery.atLeastMedium = MyFoundation.mqAtleast("medium");
    })
    .trigger("changed.zf.mediaquery");
})();

const logElement = (el) => {
  console.log(el);
};
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

    let _ = new LazyLoad();
  }, 9);

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
        const data = await MyChartjs.getFile(el.id, myDataGlobal.periods);

        myDataGlobal.hiddenDatasets.forEach((v, i) => {
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
        const $legendOnClick = (e) => {
          if (e.target.style.textDecoration == "none") {
            e.target.style.textDecoration = "line-through";
          } else {
            e.target.style.textDecoration = "none";
          }
          myDataGlobal.hiddenDatasets = [
            ...$legend.querySelectorAll(".text"),
          ].map((v) => v.style.textDecoration != "none");
        };
        $legend.removeEventListener("click", $legendOnClick);
        $legend.addEventListener("click", $legendOnClick);
      })();
    }, 99);
  };
})();
