<template lang="pug">
  form.daily-form.callout.secondary
    .grid-x.periods
      .cell.xlarge-3
        label(for='periods') #[span {{periods}}] days period
      .cell.xlarge-9
        input#periods(name="periods" type='range' min='1' max='14' step='1' 'v-model'='periods' aria-describedby="periodsHelpText" )
        p#periodsHelpText.help-text Try smaller or larger data periods by sliding (tap/click => hold => move) slider to change days period.#[br]#[strong Smaller] day periods will generate complicated chart data, while #[strong larger] day periods will generate simplified chart data. Use wisely.
    .grid-x.zones
      .cell.xlarge-3
        label(for='zones') Zone
      .cell.xlarge-9
        menu.text-right
            a('@click'='selectAllOnClick') select all
            a('@click'='deselectAllOnClick') deselect all
        select#zones(name="zones" multiple 'v-model'='selectedZones')
          option(v-for="v in zones" ':key'="v" ':value'='v' ) {{v.split('_').join(' ')}}
        p.help-text Too many charts, i don't like to scroll, i want to select some chart
    //- .grid-x.align-right
    //-   .cell
    //-     button.button(type='submit') Submit
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
export default {
  name: "DailyForm",
  props: { value: Object },
  computed: {
    zones() {
      return this.value.zones;
    },
    periods: {
      get() {
        return this.value.periods;
      },
      set(val) {
        const propsValue = _cloneDeep(this.value);
        this.$set(propsValue, "periods", val);
        this.$emit("input", propsValue);
      }
    },
    selectedZones: {
      get() {
        return this.value.selectedZones;
      },
      set(val) {
        const propsValue = _cloneDeep(this.value);
        this.$set(propsValue, "selectedZones", val);
        this.$emit("input", propsValue);
      }
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/css/_foundation";
@include foundation-forms;
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
