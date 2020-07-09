<template lang='pug'>
  #app.grid-container
    //- a(href='./')

    ul#nav.menu.vertical.medium-horizontal
      li.menu-text: a(href='./') COVIDN
      router-link( to="/daily" 'v-slot'="{ href, route, navigate, isActive, isExactActive }" )
        li( ':class'="[isActive && 'is-active', isExactActive && 'is-active']" )
          a(':href'="href" '@click'="navigate") Daily
      router-link( to="/ranking" 'v-slot'="{ href, route, navigate, isActive, isExactActive }" )
        li( ':class'="[isActive && 'is-active', isExactActive && 'is-active']" )
          a(':href'="href" '@click'="navigate") Ranking
      router-link( to="/density" 'v-slot'="{ href, route, navigate, isActive, isExactActive }" )
        li( ':class'="[isActive && 'is-active', isExactActive && 'is-active']" )
          a(':href'="href" '@click'="navigate") Density
      router-link( to="/about" 'v-slot'="{ href, route, navigate, isActive, isExactActive }" )
        li( ':class'="[isActive && 'is-active', isExactActive && 'is-active']" )
          a(':href'="href" '@click'="navigate") About
      li.github
          a(href='https://github.com/aiosk/covidn')
            img(alt="GitHub stars" src="https://img.shields.io/github/stars/aiosk/covidn?logo=github&style=for-the-badge")
    
    #chartHelpText.callout.warning.hide-for-medium
      ul.help-text
        li For best results please view in #[strong landscape] mode
    br
    router-view

    button.button.small#top('@click'='topBtnOnClick'): i.icon-angle-circled-up(title="Scroll to top")
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
@import "@/css/_foundation";
@import "@/css/_chart";
@include foundation-everything;
@include foundation-menu;

#nav {
  // text-align: center;
  // margin: 1rem 0;
  // position: fixe;
  // top: 0;
  // height: 2rem;
}
.menu {
  background: $light-gray;
  .menu-text,
  // .menu-text a,
  a {
    // padding: 0.5rem 0.75rem !important;
  }
  .menu-text {
    a {
      padding: 0 !important;
    }
  }

  .github {
    a {
      padding: 0.25rem;
    }
  }
}
.github {
  // margin: 1rem 0;
  text-align: right;
}
[class^="icon-"],
[class*=" icon-"] {
  font-size: 1.5rem;
  color: $black;
  &:before {
    margin: {
      left: 0;
      right: 0;
    }
  }
}
#chartHelpText {
  margin: 1rem 0;
  ul.help-text {
    margin-left: 0;
    list-style-type: none;
    li {
      // display: inline-block;
      // list-style-type: none;
      // margin: 0 1rem;
    }
  }
  .help-text {
    i {
      font-size: 1.25rem;
    }
  }
}

#top {
  // margin-bottom: 0.5rem;
  $position: 1rem;
  position: fixed;
  bottom: $position + 1rem;
  right: $position;
  background: white;
  // $size: 2.5rem;
  // width: $size;
  // height: $size;

  border-radius: 50%;
  i {
    font-size: 2.5rem;
    // color: map-get($foundation-palette, "primary");
    // color: $dark-gray;
    // color: $medium-gray;
  }
}
.card {
  .capture {
    background-color: white;
  }

  .action {
    text-align: right;
  }
}
</style>
