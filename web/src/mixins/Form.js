import _isEqual from "lodash/isEqual";
import _isArray from "lodash/isArray";
import _isBoolean from "lodash/isBoolean";
import _isString from "lodash/isString";
import _sortBy from "lodash/sortBy";

const main = {
  methods: {
    emitModel(val) {
      const propsValue = { ...this.value, ...val };
      this.$emit("input", propsValue);
    },
    updateQuery: async function(key, val, defaultVal) {
      // console.log(key, val, defaultVal);

      let newQuery = { ...this.$route.query };
      delete newQuery[key];
      if (_isArray(val)) {
        if (_isBoolean(val[0])) {
          if (!_isEqual(val, defaultVal)) {
            newQuery[key] = val.map((v) => (v ? 1 : 0)).join("");
          }
        } else if (_isString(val[0])) {
          if (!!val.length && !_isEqual(_sortBy(val), _sortBy(defaultVal))) {
            newQuery[key] = val.join("+");
          }
        } else {
          newQuery[key] = val.join("+");
        }
      } else {
        if (val != defaultVal) {
          if (_isBoolean(val)) {
            newQuery[key] = val ? 1 : 0;
          } else {
            newQuery[key] = val;
          }
        }
      }

      try {
        await this.$router.push({
          query: newQuery,
        });
      } catch (e) {
        // console.log(e);
      }
    },
  },
};

export default main;
