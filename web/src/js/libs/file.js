import chunk from "lodash/chunk";
import range from "lodash/range";
import sumBy from "lodash/sumBy";
import head from "lodash/head";
import last from "lodash/last";

const csv2Array = (file) => {
  let fileNew = file.split("\n").map((v) => v.split(","));
  return fileNew.filter((v) => v.length > 1);
};

const chunkByDays = (data, size) => {
  let dataTitle = data[0];
  let dataTable = data.slice(1);
  dataTable = chunk(dataTable, size);
  dataTable = dataTable.map((v, i) => {
    let col = range(1, v[0].length).map((i) => {
      return sumBy(v, (v2) => parseInt(v2[i]));
    });
    let dateStart = head(head(v));
    let dateEnd = head(last(v));
    dateStart = new Date(dateStart).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    dateEnd = new Date(dateEnd).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
    let datePeriod = `${dateStart} - ${dateEnd}`;

    return [...[datePeriod], ...col];
  });
  return [...[dataTitle], ...dataTable];
};

export default { chunkByDays, csv2Array };
