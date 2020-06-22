import delay from 'lodash/delay';
import isUndefined from 'lodash/isUndefined';
import National from "./libs/national.js";
const { getFile: getFileNational } = National;
import Prov from "./libs/prov.js";
const { provinces, getFile: getFileProv, initChartHtml: initChartHtmlProv } = Prov;
import ChartLibs from "./libs/chart.js";
const { parseCases: parseCases } = ChartLibs
import File from "./libs/file.js";
const { dataDefault, chunkByDays } = File;

let periods = 14;
const $slider = document.querySelector("form input[type='range']");
const onSliderReleaseUpdateLabel = (e) => {
  let { value, id } = e.target;
  periods = value;
  document.querySelector(`#periodsValue`).innerHTML = value
}
$slider.addEventListener('mouseup', onSliderReleaseUpdateLabel)
$slider.addEventListener('touchend', onSliderReleaseUpdateLabel)

initChartHtmlProv(document.querySelector("#myChart.grid-x"), provinces);
delay(() => {
  const _ = new LazyLoad({
    elements_selector: "canvas",
    // unobserve_entered: true,
    callback_enter: onCanvasEnterViewport
  });
}, 9);


let myChart = {}
let myChartData = {}
let myChartDataDefault = { datasets: [], labels: [] };

const elId2dataId = (elId) => elId.split('_').slice(1).join('_')

const updateChart = elementId => {
  const dataId = elId2dataId(elementId)
  let dataChunk = chunkByDays(dataAll[dataId], periods);
  let parsedData = parseCases(dataChunk);
  myChartData[elementId].labels = parsedData.labels;
  myChartData[elementId].datasets = parsedData.datasets;
  myChart[elementId].options.title.text = dataId.split('_').join(' ').toUpperCase();
  myChart[elementId].update();
}

/* init dataDefault myChartDataDefault */
let dataAll = {};
dataAll['National'] = dataDefault
myChartData['Chart_National'] = myChartDataDefault
provinces.forEach(v => {
  dataAll[v] = dataDefault;
  myChartData[`Chart_${v}`] = myChartDataDefault
});

/* wait fetch file */
(async () => {
  const dataNational = await getFileNational();
  dataAll['National'] = dataNational;

  const dataProv = await getFileProv();
  provinces.forEach(v => {
    dataAll[v] = dataProv[v]
  });
})();

const onCanvasEnterViewport = (el) => {
  console.log(el)
  if (isUndefined(myChart[el.id])) {
    myChart[el.id] = new Chart(el.id, {
      type: "bar",
      data: myChartData[el.id],
      options: {
        title: {
          display: true,
          text: '...'
        },
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0
      }
    });
  }
  delay(() => {
    const dataId = elId2dataId(el.id);
    if (dataAll[dataId] != dataDefault) {
      updateChart(el.id)
    }
  }, 99)
}

// if (Foundation.MediaQuery.atLeast("large")) {
//   $slider.data("initialStart", 7);
// }
// $(document).foundation();

// // prov

(() => {

  //   const main = e => {
  //     if (Foundation.MediaQuery.atLeast("large")) {
  //       $("#provinces .grid-x")
  //         .off("click", ".cell")
  //         .on("click", ".cell", e => {
  //           let $this = $(e.target)
  //             .closest(".cell")
  //             .find("canvas");
  //           let chartId = $this
  //             .attr("id")
  //             .split("_")
  //             .slice(1)
  //             .join("_");
  //           let myChartParent = $(myChart[chartId].canvas)
  //             .closest(".cell")
  //             .get(0);
  //           if (myChartParent.style.width == "100%") {
  //             myChartParent.style.width = "";
  //           } else {
  //             myChartParent.style.width = "100%";
  //           }

  //           myChart[chartId].resize();
  //         });
  //     }


})();
