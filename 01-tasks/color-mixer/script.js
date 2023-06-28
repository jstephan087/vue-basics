Vue.createApp({
  data() {
    return {
      color: {
        red: 30,
        green: 144,
        blue: 255,
      },
      textLabel: "#1e90ff",
    };
  },
  methods: {
    valueToHex(value) {
      value = Number.parseInt(value).toString(16);
      return value.length === 1 ? "0" + value : value;
    },
    updateColor(event, key) {
      this.color[key] = Number(event.target.value);
      this.colorChange();
      this.updateText();
    },
    updateText() {
      this.textLabel =
        "#" +
        this.valueToHex(this.color.red) +
        this.valueToHex(this.color.green) +
        this.valueToHex(this.color.blue);
    },
    getData() {
      fetch("https://dummy-apis.netlify.app/api/color")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.color.red = data.rgb.r;
          this.color.green = data.rgb.g;
          this.color.blue = data.rgb.b;
          this.updateText();
          this.colorChange();
        });
    },

    colorChange() {
      document.body.style = "background-color:" + this.textLabel;
    },
  },
  async created() {
    this.colorChange();
  },
}).mount("#app");
