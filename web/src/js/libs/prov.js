import isUndefined from "lodash/isUndefined";
import chunk from "lodash/chunk";

const provinces = [
  "DKI_JAKARTA",
  "JAWA_BARAT",
  "JAWA_TIMUR",
  "JAWA_TENGAH",
  "SULAWESI_SELATAN",
  "BANTEN",
  "NUSA_TENGGARA_BARAT",
  "BALI",
  "PAPUA",
  "KALIMANTAN_SELATAN",
  "SUMATERA_BARAT",
  "SUMATERA_SELATAN",
  "KALIMANTAN_TENGAH",
  "KALIMANTAN_TIMUR",
  "SUMATERA_UTARA",
  "DAERAH_ISTIMEWA_YOGYAKARTA",
  "KALIMANTAN_UTARA",
  "KEPULAUAN_RIAU",
  "KALIMANTAN_BARAT",
  "SULAWESI_TENGGARA",
  "LAMPUNG",
  "SULAWESI_UTARA",
  "SULAWESI_TENGAH",
  "RIAU",
  "PAPUA_BARAT",
  "SULAWESI_BARAT",
  "JAMBI",
  "MALUKU_UTARA",
  "MALUKU",
  "GORONTALO",
  "KEPULAUAN_BANGKA_BELITUNG",
  "ACEH",
  "BENGKULU",
  "NUSA_TENGGARA_TIMUR",
];

const initChartHtml = ($dom, fileObjKeys, size = 2) => {
  let fileObjKeysChunk = chunk(fileObjKeys, size);
  let html = "";
  fileObjKeysChunk.forEach((v) => {
    v.forEach((v2) => {
      html += `<div class="cell callout">`;
      // html += `<a class='anchor' href="#Chart_${v2}"><img src="baseline_attach_file_black_18dp.png" alt="anchor"></a>`;
      html += `<canvas id='Chart_${v2}'></canvas>`;
      html += "</div>";
    });
  });
  $dom.innerHTML += html;
};

export default { provinces, initChartHtml };
