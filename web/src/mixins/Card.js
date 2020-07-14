import { defaultShare, defaultChartColor } from "@/js/vars";

const main = {
  methods: {
    rankingFromCsv(csv) {
      const csvList = csv
        .split(/\r\n|\n/)
        .map((v) => v.split(","))
        .filter((v) => v.length > 1);
      const csvHeader = csvList[0];
      const csvBody = csvList.slice(1);
      const csvDatasets = csvBody.map((v) => v.slice(1));
      let color = defaultChartColor[this.myCase[1]];
      // console.log(csvDatasets);

      this.$set(this.data.datasets, 0, {
        label: this.myCase[1],
        backgroundColor: color,
        data: [],
        lastUpdate: [],
        percentage: [],
        population: [],
      });
      csvDatasets.forEach((v, i) => {
        this.$set(this.data.datasets[0].lastUpdate, i, v[0]);
        this.$set(this.data.datasets[0].data, i, v[1]);
        this.$set(this.data.datasets[0].percentage, i, v[2]);
        this.$set(this.data.datasets[0].population, i, v[3]);
      });
      this.$set(
        this.data,
        "labels",
        csvBody.map((v) => v[0].replace(/_/g, " "))
      );
    },
    fromCsv(csv) {
      const csvList = csv
        .split(/\r\n|\n/)
        .map((v) => v.split(","))
        .filter((v) => v.length > 1);
      const csvHeader = csvList[0];
      const csvBody = csvList.slice(1);
      const csvDatasets = csvBody.map((v) => v.slice(1));

      let color = {};
      csvHeader.slice(1).forEach((v, i) => {
        Object.entries(defaultChartColor).forEach(([k2, v2]) => {
          if (v.includes(k2)) {
            color[v] = v2;
          }
        });
      });
      csvHeader.slice(1).forEach((v, i) => {
        this.$set(this.data.datasets, i, { label: v, borderColor: color[v], data: [], spanGaps: false });
      });
      csvDatasets.forEach((v, i) => {
        v.forEach((v2, i2) => {
          const value = v2 <= 0 && i2 % 2 == 0 ? NaN : v2;
          this.$set(this.data.datasets[i2].data, i, value);
        });
      });

      this.$set(
        this.data,
        "labels",
        csvBody.map((v) => {
          var date = new Date(v[0]);

          var options = { month: "short", day: "numeric" };
          return date.toLocaleDateString("en-US", options);
        })
      );
    },
    fullscreenOnClick(e) {
      e.target.closest(".cell").classList.toggle("width-100");
      const $icon = e.target.closest("menu").querySelector(".fullscreen i");
      $icon.classList.toggle("icon-window-maximize");
      $icon.classList.toggle("icon-window-restore");
    },
    downloadOnClick(e) {
      const domtoimage = require("domtoimage");
      const $card = e.target.closest(".card");
      const $title = $card.querySelector("h4,h5,h6");
      const downloadName = `${$title.innerText.replace(/ /g, "_")}.jpeg`;

      (async () => {
        const dataUrl = await domtoimage.toJpeg($card.querySelector(".capture"), {
          quality: 0.95,
          filter(v) {
            return v.tagName !== "MENU" && v.tagName !== "UL";
          },
        });

        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = downloadName;
        a.click();
      })();
      // Page.domSpin(e.target);
    },

    shareOnClick(e) {
      const urlPath = this.$router.resolve({
        to: "/daily",
        query: { ...this.$route.query, ...{ zone: this.zone } },
      }).href;
      const fullUrl = location.origin + "/" + urlPath;
      const $card = e.target.closest(".card");
      const $title = $card.querySelector("h4,h5,h6");

      try {
        navigator.share(
          {
            title: $title.innerText,
            text: $title.innerText,
            url: fullUrl,

            // fbId: "123456789123456",
            // hashtags: "javascript,shareAPI,polyfill"
          },
          defaultShare
        );
      } catch (e) {
        console.log("Oh noh! You couldn't share it! :'(\n", e);
      }
    },
  },
};

export default main;
