<template lang="pug">
  form.daily-form.callout.secondary
    .grid-x.zones
      .cell.small-12.medium-2
        label(for='zones') Zone
      .cell.small-auto.medium-auto
        select#zones(name="zones" multiple 'v-model'='selectedZones')
          option(v-for="v in zones" ':key'="v" ':value'='v' ) {{ v.replace(/_/g, " ") }}
        menu.clearfix
          span.float-left
            .selected
              b {{ selectedZones.length }}&nbsp;
              | selected
          span.float-right
            a('@click'='selectAllOnClick') Select All
            a('@click'='deselectAllOnClick') Deselect All
        p.help-text Too many charts, i don't like to scroll, i want to select some chart
    //- .grid-x.align-right
    //-   .cell
    //-     button.button(type='submit') Submit
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import MixinForm from "@/mixins/Form.js";
import { defaultZones } from "@/js/vars";

export default {
  name: "DailyForm",
  mixins: [MixinForm],
  props: { value: Object },
  computed: {
    zones() {
      return this.value.zones;
    },
    selectedZones: {
      get() {
        return this.value.selectedZones;
      },
      set(val) {
        this.emitModel({ selectedZones: val });
      }
    }
  },
  watch: {},
  methods: {
    selectAllOnClick(e) {
      const $select = e.target.closest(".cell").querySelector("select");
      $select.querySelectorAll("option").forEach(v => {
        v.selected = true;
      });
      $select.dispatchEvent(new Event("change"));
    },
    deselectAllOnClick(e) {
      const $select = e.target.closest(".cell").querySelector("select");
      $select.querySelectorAll("option:not([value='NATIONAL'])").forEach(v => {
        v.selected = false;
      });
      $select.dispatchEvent(new Event("change"));
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/css/_foundation";
@include foundation-forms;
@include foundation-switch;
@include foundation-float-classes;
// @include foundation-button;

.zones {
  select {
    margin-bottom: 0;
  }
  menu {
    padding-left: 0;
    margin: {
      top: 0;
      bottom: 0.5rem;
    }
    a {
      margin: 0 0.5rem;
    }
  }
}
</style>
