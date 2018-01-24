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
          <button class="delete-button" @click="deleteTodo(todo)">x</button>
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
  div, .todo-element {
    display: inline-block;
  }
  li {
    list-style:none;
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    border-radius: 4px;
    color: #888;
    height: 2em;
  }
  button.delete-button{
    border: none;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    float: right;
    margin-right: .8em;
    background-color: #cc9a9a;
    color: white;
    width: 2em;
  }
  .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.9em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
  button{
    padding: 5px 10px;
    text-decoration: none;
    background-color: #eee;
    border-radius: 4px;
    cursor: pointer;
  }
  ul{
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  label{
    width: 3em;
  }
</style>
