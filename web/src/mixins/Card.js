import { defaultShare } from "@/js/vars";

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
