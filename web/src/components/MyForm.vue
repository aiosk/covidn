<template lang="pug">
  form.my-form.callout.secondary
    .grid-x.periods
      .cell.xlarge-3
        label(for='periods') #[span {{periods}}] days period
      .cell.xlarge-9
        input#periods(name="periods" type='range' min='1' max='21' step='1' 'v-model'='periods' aria-describedby="periodsHelpText" )
        p#periodsHelpText.help-text Try smaller or larger data periods by sliding (tap/click => hold => move) slider to change days period.#[br]#[strong Smaller] day periods will generate complicated chart data, while #[strong larger] day periods will generate simplified chart data. Use wisely.
    .grid-x.zones
      .cell.xlarge-3
        label(for='zones') Zone
      .cell.xlarge-9
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
  name: "MyForm",
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
</style>
