"use strict";

Vue.createApp({
  data() {
    return {
      count: 0,
      bgCount: 0,
    };
  },
  methods: {
    resetCount(event) {
      this.count = 0;
      this.bgCount = 0;
      event.target.blur();
    },
    countEvent() {
      this.count++;
      this.bgCount++;
      if (this.bgCount === 101) {
        this.bgCount = 1;
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        this.count++;
        this.bgCount++;
        if (this.bgCount === 101) {
          this.bgCount = 1;
        }
      }
    });
  },
}).mount("#app");
