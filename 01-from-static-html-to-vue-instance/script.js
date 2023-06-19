Vue.createApp({
  data() {
    return {
      userName: "John Doe",
      dateTime: new Date().toLocaleString("en-US"),
    };
  },
}).mount("#welcome-app");
