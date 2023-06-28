Vue.createApp({
  data() {
    return {
      toggleClass: false,
    };
  },
  methods: {
    toggleLight() {
      document.querySelector("body").classList.toggle("toggle-bg");
      this.toggleClass = !this.toggleClass;
      if (this.toggleClass) {
        document.title = "Good Night";
      } else {
        document.title = "Good Morning";
      }
    },
  },
}).mount("#app");
