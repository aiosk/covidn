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
      router-link( to="/ratio" 'v-slot'="{ href, route, navigate, isActive, isExactActive }" )
        li( ':class'="[isActive && 'is-active', isExactActive && 'is-active']" )
          a(':href'="href" '@click'="navigate") Ratio
      router-link( to="/ratio-population" 'v-slot'="{ href, route, navigate, isActive, isExactActive }" )
        li( ':class'="[isActive && 'is-active', isExactActive && 'is-active']" )
          a(':href'="href" '@click'="navigate") Population Ratio
      router-link( to="/about" 'v-slot'="{ href, route, navigate, isActive, isExactActive }" )
        li( ':class'="[isActive && 'is-active', isExactActive && 'is-active']" )
          a(':href'="href" '@click'="navigate") About
    
    #chartHelpText.callout.warning.hide-for-medium
      ul.help-text
        li For best results please view in #[strong landscape] mode
    br
    router-view

    button.button.small#top('@click'='topBtnOnClick' title="Scroll to top" aria-label="Scroll to top"): i.icon-up-circled
</template>

<script>
export default {
  name: "App",
  methods: {
    topBtnOnClick(e) {
      document.querySelector("#nav").scrollIntoView({ behavior: "smooth" });
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
@include foundation-visibility-classes;

#app {
  padding-bottom: 2rem;
}
#nav {
}
.menu {
  background: $light-gray;
  .menu-text,
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

[class^="icon-"],
[class*=" icon-"] {
  font-size: 2rem;
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
  bottom: $position;
  right: $position;
  // background: map-get($foundation-palette, "primary");
  background: white;

  $size: 3rem;
  width: $size;
  height: $size;

  border-radius: 50%;
  i {
    @include absolute-center;
    font-size: 3rem;
    // color: white;
    color: map-get($foundation-palette, "primary");
    // color: $dark-gray;
    // color: $medium-gray;
  }
}

.card {
  .capture {
    background-color: white;
  }
}
.cell {
  transition: none !important;
}

#shareAPIPolyfill-backdrop,
#shareAPIPolyfill-container {
  z-index: 1100;
}
</style>
