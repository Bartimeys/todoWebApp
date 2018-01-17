<template>
  <div>
    <div class="button-group">
      <button @click="getTodos">Refresh</button>
      <button @click="enableAddMode" v-if="!addingTodo && !selectedTodo">Add</button>
    </div>
    <transition name="fade">
      <ul class="todos" v-if="todos && todos.length">
        <li v-for="todo in todos" :key="todo.id"
            class="todo-container"
            :class="{selected: todo === selectedTodo}">
          <div class="todo-element">
            <div class="badge" >{{todo.id}}</div>
            <div class="todo-text" @click="onSelect(todo)">
              <div class="name">{{todo.name}}</div>
              <div class="saying">{{todo.saying}}</div>
            </div>
          </div>
          <button class="delete-button" @click="deleteTodo(todo)">Delete</button>
        </li>
      </ul>
    </transition>
    <transition name="fade">
      <TodoDetail
        v-if="selectedTodo || addingTodo"
        :todo="selectedTodo"
        @unselect="unselect"
        @todoChanged="todoChanged"></TodoDetail>
    </transition>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop, Watch } from 'vue-property-decorator';
  import TodoDetail from './TodoDetail.vue';
  import { todoService } from '../todo.service';
  import { Todo } from '../todo';
  @Component({
    components: { TodoDetail }
  })
  export default class TodoList extends Vue {
    addingTodo = false;
    selectedTodo: Todo | null = null;
    todos: Todo[] = <Todo[]>[];
    created() {
      this.getTodos();
    }
    deleteTodo(todo: Todo) {
      return todoService.deleteTodo(todo).then(() => {
        this.todos = this.todos.filter(h => h !== todo);
        if (this.selectedTodo === todo) {
          this.selectedTodo = null;
        }
      });
    }
    enableAddMode() {
      this.addingTodo = true;
      this.selectedTodo = null;
    }
    getTodos() {
      this.todos = [];
      this.selectedTodo = null;
      return todoService.getTodos().then(response => (this.todos = response.data));
    }
    todoChanged(mode: string, todo: Todo) {
      if (mode === 'add') {
        todoService.addTodo(todo).then(() => this.todos.push(todo));
      } else {
        todoService.updateTodo(todo).then(() => {
          let index = this.todos.findIndex(h => todo.id === h.id);
          this.todos.splice(index, 1, todo);
        });
      }
    }
    onSelect(todo: Todo) {
      this.selectedTodo = todo;
    }
    unselect() {
      this.addingTodo = false;
      this.selectedTodo = null;
    }
  }
</script>

<style lang="scss" scoped>
  .button-group {
    margin: 0.5em;
  }
  button.delete-button {
    background-color: rgb(216, 59, 1);
    color: white;
    padding: 4px;
    position: relative;
    font-size: 12px;
    max-width: 50px;
  }
  .selected {
    background-color: rgb(0, 120, 215) !important;
    color: white;
  }
  .todos {
    float: left;
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 20em;
    li {
      cursor: pointer;
      position: relative;
      background-color: #f7f7f7;
      margin: 0.5em;
      height: 3.2em;
      border-radius: 4px;
      &:hover {
        color: #607d8b;
        color: rgb(0, 120, 215);
        background-color: #ddd;
        left: 1px;
      }
      &.selected:hover {
        color: white;
      }
    }
    .text {
      position: relative;
      top: -3px;
    }
    .saying {
      margin: 5px 2.3px;
    }
    .name {
      font-weight: bold;
    }
    .todo-container {
      display: flex;
      flex-flow: row wrap;
    }
    > * {
      flex: 1 100%;
    }
    .todo-element {
      display: flex;
      flex-flow: row wrap;
      flex: 18 auto;
      order: 1;
      padding: 0;
      margin: 0;
    }
    .delete-button {
      flex: 1 auto;
      order: 2;
      border-radius: 0 4px 4px 0;
    }
    .todo-text {
      flex: 1 auto;
      order: 2;
      padding: 0.2em 0.5em;
    }
    .badge {
      flex: 1 auto;
      order: 1;
      font-size: small;
      color: #ffffff;
      padding: 1.2em 1em 0em 1em;
      background-color: #607d8b;
      background-color: rgb(0, 120, 215);
      background-color: rgb(134, 183, 221);
      margin: 0em 0em 0em 0em;
      border-radius: 4px 0 0 4px;
      max-width: 1.5em;
    }
  }
</style>
