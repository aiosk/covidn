import isUndefined from "lodash/isUndefined";

let dataDefault = { datasets: [], labels: [] };

const getFile = async (zone, periods = 14) => {
  let res = await fetch(
    `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/${zone}-${periods}.json?_=${Date.now()}`
  );
  let resJson = await res.json();

  return resJson;
};

const initChart = (elementId, myChartData) => {
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
    },
  });
  return myChart;
};

export default { getFile, initChart };
