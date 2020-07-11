<template lang="pug">
  form.daily-form.callout.secondary
    .grid-x.periods
      .cell.large-3
        label(for='periods') #[span {{ periods }}] Days Period
      .cell.large-9
        input#periods(name="periods" type='range' min='1' max='14' step='1' 'v-model'='periods' aria-describedby="periodsHelpText" )
        p#periodsHelpText.help-text Try slide to smaller or larger data periods. #[strong Smaller] day periods will generate complicated chart data, while #[strong larger] day periods will generate simplified chart data. Use wisely.
    .grid-x.zones
      .cell.large-3
        label(for='zones') Zone
      .cell.large-9
        menu.text-right
            a('@click'='selectAllOnClick') Select All
            a('@click'='deselectAllOnClick') Deselect All
        select#zones(name="zones" multiple 'v-model'='selectedZones')
          option(v-for="v in zones" ':key'="v" ':value'='v' ) {{ v.split('_').join(' ') }}
        p.help-text Too many charts, i don't like to scroll, i want to select some chart
    .grid-x
      .cell.large-3
        label(for='legend') Show Legend
      .cell.large-9
        .switch.large
          input.switch-input#yes-no(type="checkbox" name="exampleSwitch" 'v-model'='showLegend')
          label.switch-paddle(for="yes-no")
            span.show-for-sr Do you like me?
            span.switch-active(aria-hidden="true") Yes
            span.switch-inactive(aria-hidden="true") No


    //- .grid-x.align-right
    //-   .cell
    //-     button.button(type='submit') Submit
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
import MixinForm from "@/mixins/Form.js";
import { defaultPeriods, defaultZones, defaultShowLegend } from "@/js/vars";

export default {
  name: "DailyForm",
  mixins: [MixinForm],
  props: { value: Object },
  computed: {
    zones() {
      return this.value.zones;
    },
    periods: {
      get() {
        return this.value.periods ? this.value.periods : defaultPeriods;
      },
      set(val) {
        this.emitModel({ periods: val });
      }
    },
    selectedZones: {
      get() {
        return this.value.selectedZones;
      },
      set(val) {
        this.emitModel({ selectedZones: val });
      }
    },
    showLegend: {
      get() {
        return this.value.showLegend
          ? this.value.showLegend
          : defaultShowLegend;
      },
      set(val) {
        this.emitModel({ showLegend: val });
      }
    }
  },
  watch: {
    periods(val, oldVal) {
      this.updateQuery("periods", val, defaultPeriods);
    },
    selectedZones(val, oldVal) {
      this.updateQuery("zones", val, defaultZones);
    },
    showLegend(val, oldVal) {
      this.updateQuery("legend", val, defaultShowLegend);
    }
  },
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
  created() {
    let { periods } = this.$route.query;

    if (!!periods) {
      this.periods = periods;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/css/_foundation";
@include foundation-forms;
@include foundation-switch;
// @include foundation-button;
.periods {
  input[type="range"] {
    width: 100%;
  }
  label span {
    font-weight: bold;
  }
}
.zones {
  menu {
    margin: 0;
    a {
      margin: 0 0.5rem;
    }
  }
}
</style>
