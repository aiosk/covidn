import head from "lodash/head";

const data = [
  [
    "tanggal",
    "total confirmed",
    "confirmed",
    "total recover",
    "recover",
    "total death",
    "death",
    "total active",
    "active",
  ],
  // ["2020-03-02", 1, 1, 1, 1, 1, 1, 1, 1]
  ["2020-03-02", 0, 0, 0, 0, 0, 0, 0, 0],
];

const color = {
  death: "#A50026",
  recover: "#87ceeb",
  active: "#ff6347",
};

const parseCases = (file) => {
  let data = [
    file.map((v) => v[4]),
    file.map((v) => v[6]),
    file.map((v) => v[8]),
  ];
  let title = [head(data[0]), head(data[1]), head(data[2])];
  data = [data[0].slice(1), data[1].slice(1), data[2].slice(1)];

  let tanggal = file.map((v) => v[0]);
  tanggal = tanggal.slice(1);
  let dataPoly = data.map((v) => {
    let prepareData = v.map((v2, i2) => {
      let v2Int = parseInt(v2);
      return [i2 + 1, v2Int ? v2Int : 0];
    });
    let newDataPoly = regression("polynomial", prepareData);
    let newDataPolyPoints = newDataPoly.points;
    return newDataPolyPoints.map((v) => v[1]);
  });

  return {
    datasets: [
      {
        label: title[0],
        data: data[0],
        backgroundColor: color.recover,
      },
      // {
      //   label: title[0],
      //   data: dataPoly[0],
      //   borderColor: color.recover,
      //   type: "line"
      // },
      {
        label: title[1],
        data: data[1],
        backgroundColor: color.death,
      },
      {
        label: title[0],
        data: dataPoly[1],
        borderColor: color.death,
        type: "line",
      },
      {
        label: title[2],
        data: data[2],
        backgroundColor: color.active,
      },
      {
        label: title[0],
        data: dataPoly[2],
        borderColor: color.active,
        type: "line",
      },
    ],
    labels: tanggal,
  };
};
export default { data, color, parseCases };
