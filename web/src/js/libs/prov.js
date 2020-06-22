import isUndefined from 'lodash/isUndefined';
import chunk from 'lodash/chunk';

import File from "./file.js";
const { csv2Array } = File;

const provinces = ["DKI_JAKARTA", "JAWA_BARAT", "JAWA_TIMUR", "JAWA_TENGAH", "SULAWESI_SELATAN", "BANTEN", "NUSA_TENGGARA_BARAT", "BALI", "PAPUA", "KALIMANTAN_SELATAN", "SUMATERA_BARAT", "SUMATERA_SELATAN", "KALIMANTAN_TENGAH", "KALIMANTAN_TIMUR", "SUMATERA_UTARA", "DAERAH_ISTIMEWA_YOGYAKARTA", "KALIMANTAN_UTARA", "KEPULAUAN_RIAU", "KALIMANTAN_BARAT", "SULAWESI_TENGGARA", "LAMPUNG", "SULAWESI_UTARA", "SULAWESI_TENGAH", "RIAU", "PAPUA_BARAT", "SULAWESI_BARAT", "JAMBI", "MALUKU_UTARA", "MALUKU", "GORONTALO", "KEPULAUAN_BANGKA_BELITUNG", "ACEH", "BENGKULU", "NUSA_TENGGARA_TIMUR"];

const getFile = async () => {
  let res = await fetch(
    `https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/prov.csv?_=${Date.now()}`
  );
  let resTxt = await res.text();
  let file = csv2Array(resTxt);

  let fileObj = {};
  let fileTitle = file[0].slice(1);
  let fileData = file.slice(1);
  fileData.forEach(v => {
    let key = v[0].replace(/\s/gi, "_");
    if (isUndefined(fileObj[key])) {
      fileObj[key] = [];
      fileObj[key] = fileObj[key].concat([fileTitle]);
    }
    fileObj[key] = fileObj[key].concat([v.slice(1)]);
  });

  return fileObj;
};

const initChartHtml = ($dom, fileObjKeys, size = 2) => {
  let fileObjKeysChunk = chunk(fileObjKeys, size);
  let html = "";
  fileObjKeysChunk.forEach(v => {
    v.forEach(v2 => {
      html += `<div class="cell clearfix">`;
      html += `<canvas id='Chart_${v2}'></canvas>`;
      html += "</div>";
    });
  });
  $dom.innerHTML += html;
};

export default { provinces, getFile, initChartHtml };
