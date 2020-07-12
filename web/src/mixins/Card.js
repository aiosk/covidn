const main = {
  methods: {
    downloadOnClick(e) {
      const domtoimage = require("domtoimage");
      const $card = e.target.closest(".card");
      const $title = $card.querySelector("h4,h5,h6");
      const downloadName = `${$title.innerText.replace(/ /g, "_")}.jpeg`;

      (async () => {
        const dataUrl = await domtoimage.toJpeg($card.querySelector(".capture"), {
          quality: 0.95,
          filter(v) {
            return v.tagName !== "MENU";
          },
        });

        var a = document.createElement("a");
        a.href = dataUrl;
        a.download = downloadName;
        a.click();
      })();
      // Page.domSpin(e.target);
    },
  },
};

export default main;
