// https://covid19.disiplin.id/

GlobalJs.createIt({ baseUrl: "https://covid19.disiplin.id" })._ajaxRequestFeedBack(
  "POST",
  "json",
  "https://covid19.disiplin.id/emerging/data_provinces",
  { emerging: "COVID-19" },
  (data) => {
    const mapData = data.features.map((v) => {
      return v.properties;
    });
    // copy(JSON.stringify(mapData));
    // prompt("copas", JSON.stringify(data));
    console.log(mapData);
  }
);
