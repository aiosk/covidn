import ZoneCard from "@/components/ZoneCard.vue";

const main = {
  components: {
    ZoneCard,
  },
  data() {
    return {
      modelDialog: {
        isOpen: false,
        isCollapse: true,
        // isLarge: true,
      },
      componentChart: null,
    };
  },
  watch: {
    "modelDialog.isOpen": function(val, oldVal) {
      this.componentChart = !val ? null : ZoneCard;
    },
  },
};

export default main;
