<template>
  <article class="input-todo">
    <form class="text-value">
      <input type="text" id="text-input" placeholder="Let's get this done..." />
    </form>
    <button @click="checkForDuplicates" id="add-todo">Add</button>
  </article>
  <section class="nodepad">
    <article id="filter">
      <header>
        <h2>Filter Options</h2>
      </header>
      <div>
        <input
          @click="filter = 'All'"
          type="radio"
          name="radio-button"
          id="all"
          checked="checked"
        />
        <label for="all">All</label>
      </div>
      <div>
        <input
          @click="filter = 'Open'"
          type="radio"
          name="radio-button"
          id="open-todos"
        />
        <label for="open-todos">Open</label>
      </div>
      <div>
        <input
          @click="filter = 'Done'"
          type="radio"
          name="radio-button"
          id="done"
        />
        <label for="done">Done</label>
      </div>
    </article>
    <article class="paper">
      <ul class="todo-list">
        <li v-for="(todo, index) of filterChecked" :key="todo.id">
          <input
            @change="checkboxStatus($event, index)"
            type="checkbox"
            id="test"
            :checked="todo.done"
          />
          <span :class="{ 'text-deco': todo.done }">{{
            todo.description
          }}</span>
        </li>
      </ul>
      <button @click="deleteTodos" id="remove-todos">Remove</button>
    </article>
  </section>
</template>

<script>
export default {
  name: "TodoApp",
  data() {
    return {
      filter: "All",
      todos: [],
    };
  },
  computed: {
    filterChecked() {
      if (this.filter === "Done") {
        return this.todos.filter((item) => item.done === true);
      } else if (this.filter === "Open") {
        return this.todos.filter((item) => item.done === false);
      } else {
        return this.todos;
      }
    },
  },
  methods: {
    loadData() {
      fetch("http://localhost:4730/todos")
        .then((response) => response.json())
        .then((todosFromApi) => {
          this.todos = todosFromApi;
        });
    },
    checkboxStatus(event, index) {
      this.todos[index].done = event.target.checked;
      this.updateData(this.todos[index]);
    },
    updateData(todo) {
      fetch(`http://localhost:4730/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(todo),
      })
        .then((response) => response.json())
        .then((updatedTodoFromApi) => {
          return updatedTodoFromApi;
        });
    },
    checkForDuplicates() {
      const newTodoInput = document.querySelector("#text-input");
      const test = this.todos.some((element) =>
        newTodoInput.value
          .trim()
          .toLowerCase()
          .includes(element.description.toLowerCase())
      );
      if (
        newTodoInput.value === null ||
        newTodoInput.value === undefined ||
        newTodoInput.value.trim() === ""
      ) {
        alert("Text Input is empty!");
      } else if (test) {
        alert("Todo already exists");
      } else {
        this.addTodo(newTodoInput.value.trim());
        newTodoInput.value = "";
      }
    },
    addTodo(inputTodo) {
      const newTodo = { description: inputTodo, done: false };

      fetch("http://localhost:4730/todos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newTodo),
      })
        .then((res) => res.json())
        .then((newTodoFromApi) => {
          this.todos.push(newTodoFromApi);
        });
    },
    deleteTodos() {
      const deleteTodos = this.todos.filter((filterTodo) => filterTodo.done);
      const deleteArray = [];
      deleteTodos.map((delTodo) => {
        deleteArray.push(
          fetch(`http://localhost:4730/todos/${delTodo.id}`, {
            method: "DELETE",
          })
        );
      });
      Promise.all(deleteArray).then(() => {
        this.loadData();
      });
    },
  },
  async created() {
    this.loadData();
  },
  mounted() {
    window.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.checkForDuplicates();
      }
    });
  },
};
</script>
