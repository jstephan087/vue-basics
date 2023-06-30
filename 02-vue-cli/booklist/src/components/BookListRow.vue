<template>
  <tr class="table-item__table-row">
    <td>{{ title }}</td>
    <td>{{ isbn }}</td>
    <td>
      <BaseButton
        :text="bookmarkToggle"
        @bookmark="bookmark"
        variant="secondary"
      />
    </td>
  </tr>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },
  props: {
    title: String,
    isbn: String,
    isBookmarked: Boolean,
  },
  computed: {
    bookmarkToggle() {
      return this.isBookmarked ? "Remove" : "Add Bookmark";
    },
  },
  methods: {
    bookmark() {
      this.$emit("bookmark");
    },
  },
};
</script>

<style scoped>
.table-item__table td {
  padding: 12px 15px;
}
</style>
