const zones = [
  "NATIONAL",
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
const defaultZones = [
  "NATIONAL",
  "JAWA_TIMUR",
  "DKI_JAKARTA",
  "SULAWESI_SELATAN",
  "JAWA_TENGAH",
  //ranking
  "RIAU",
  "KALIMANTAN_BARAT",
  "KALIMANTAN_UTARA",
  "BENGKULU",
  "SULAWESI_UTARA",
  // "BANTEN",
  "MALUKU_UTARA",
  "SUMATERA_UTARA",
  //ratio
  "PAPUA",
  "MALUKU",
  "KALIMANTAN_SELATAN",
  //ratio pop
];
const defaultPeriods = 4;
const defaultHiddenDatasets = [true, true, true, true, false, false, false, false, true, true, true, true];

const cases = ["confirmed", "recover", "death", "active"];
const defaultChartData = { datasets: [{ data: [] }], labels: [] };

const defaultChartColor = {
  confirmed: "#2c347c",
  recover: "#3c928c",
  death: "#ec6f58",
  active: "#c6ac42",
};
const defaultShare = {
  // change this configurations to hide specific unnecessary icons
  copy: true,
  email: true,
  print: false,
  sms: false,
  messenger: true,
  facebook: true,
  whatsapp: true,
  twitter: true,
  linkedin: false,
  telegram: true,
  skype: false,
  // language: "pt" // specify the default language
};

export {
  zones,
  defaultZones,
  defaultPeriods,
  defaultHiddenDatasets,
  cases,
  defaultChartData,
  defaultChartColor,
  defaultShare,
};
