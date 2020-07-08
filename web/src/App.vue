<template lang='pug'>
  #app.grid-container
    a(href='./')
      h4.text-center Daily Indonesia COVID-19 cases
      h5.text-center National and Provinces
    .clearfix &nbsp;
      a.float-right(href='https://github.com/aiosk/covidn')
        img(alt="GitHub stars" src="https://img.shields.io/github/stars/aiosk/covidn?logo=github&style=for-the-badge")

    #nav
      router-link(to="/") Home
      | &nbsp;|&nbsp;
      router-link(to="/ranking") Ranking
      | &nbsp;|&nbsp;
      router-link(to="/density") Density
      | &nbsp;|&nbsp;
      router-link(to="/about") About

    #chartHelpText.callout.secondary
      ul.help-text
        li.hide-for-xlarge For best results please view in #[strong landscape] mode
        li Click #[img(src="@/assets/img/baseline_get_app_black_18dp.png" alt="download chart")] to save chart as image
        li Click #[img(src="@/assets/img/baseline_backup_table_black_18dp.png" alt="download raw" title="download raw")] to save chart raw data
        li.show-for-xlarge Click #[img(src="@/assets/img/baseline_fullscreen_black_18dp.png" alt="fullscreen")] to toggle chart #[strong full-width] mode
        li #[strong.show-for-xlarge Click]#[strong.hide-for-xlarge Tap / Touch] chart legend to show/hide chart data
        li #[strong.show-for-xlarge Hover]#[strong.hide-for-xlarge Tap / Touch] chart legend to show case number
        li.hide-for-xlarge #[strong Tap / Touch outside] chart legend to hide case number
    router-view

    button.button.small#top('@click'='topBtnOnClick')
      img(src="@/assets/img/baseline_vertical_align_top_black_18dp.png" alt="Scroll to top")
</template>

<script>
export default {
  name: "App",
  methods: {
    topBtnOnClick(e) {
      document
        .querySelector("#chartHelpText")
        .scrollIntoView({ behavior: "smooth" });
      // window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
  },
  mounted() {},
  destroyed() {}
};
</script>

<style lang="scss">
ul.help-text {
  margin-left: 0;
}
</style>
