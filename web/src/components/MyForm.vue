<template lang="pug">
  form.my-form.callout.secondary
    .grid-x.periods
      .cell.xlarge-3
        label(for='periods') #[span {{periods}}] days period
      .cell.xlarge-9
        input(name="periods" type='range' min='1' max='21' step='1' 'v-model'='periods' '@change'='periodsOnChange' aria-describedby="periodsHelpText" )
        p#periodsHelpText.help-text Try smaller or larger data periods by sliding (tap/click => hold => move) slider to change days period.#[br]#[strong Smaller] day periods will generate complicated chart data, while #[strong larger] day periods will generate simplified chart data. Use wisely.
    .grid-x.zones
      .cell.xlarge-3
        label(for='zone') Zone
      .cell.xlarge-9
        select(name="zones" multiple '@change'='zoneOnChange')
          option(v-for="v in zones" ':key'="v" ':value'='v' ':selected'='selectedZones.indexOf(v) > -1') {{v.split('_').join(' ')}}
        p.help-text Too many charts, i don't like to scroll, i want to select some chart
    .grid-x.align-right
      .cell
        button.button(type='submit') Submit
</template>

<script>
import _cloneDeep from "lodash/cloneDeep";
export default {
  name: "MyForm",
  props: ["value"],
  data() {
    return {
      zones: this.value.zones,
      periods: this.value.periods,
      selectedZones: this.value.selectedZones
    };
  },
  watch: {
    selectedZones(newData, oldData) {}
  },
  methods: {
    periodsOnChange(e) {
      const propValue = _cloneDeep(this.value);
      propValue.periods = this.periods;
      propValue.selectedZones = this.selectedZones;
      this.$emit("input", propValue);
    },
    zoneOnChange(e) {
      const newData = [...e.target.querySelectorAll("option:checked")].map(
        v => v.value
      );
      this.selectedZones = newData;
      const propValue = _cloneDeep(this.value);
      propValue.periods = this.periods;
      propValue.selectedZones = this.selectedZones;
      this.$emit("input", propValue);
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../css/_foundation";
@include foundation-forms;
@include foundation-button;
.periods {
  input[type="range"] {
    width: 100%;
  }
  label span {
    font-weight: bold;
  }
}
</style>
