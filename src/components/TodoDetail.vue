<template>
  <div class="editarea">
    <div>
      <div class="editfields">
        <div>
          <label>id: </label>
          <input v-if="addingTodo" type="number" v-model="editingTodo.id" ref="id" placeholder="id" />
          <label v-if="!addingTodo" class="value">{{editingTodo.id}}</label>
        </div>
        <div>
          <label>name: </label>
          <input v-model="editingTodo.name" ref="name" placeholder="name" />
        </div>
        <div>
          <label>saying: </label>
          <input v-model="editingTodo.saying" placeholder="saying" @keyup.enter="save"/>
        </div>
      </div>
      <button @click="clear">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
  import { Todo } from '../todo';
  @Component({})
  export default class TodoDetail extends Vue {
    @Prop({default: null}) todo: Todo | null;
    addingTodo = !this.todo;
    editingTodo: Todo | null = null;
    @Watch('todo') onTodoChanged(value: string, oldValue: string) {
      this.editingTodo = this.cloneIt();
      this.setFocus();
    }
    $refs: {
      id: HTMLElement;
      name: HTMLElement;
    };
    addTodo() {
      const todo = <Todo>this.editingTodo;
      this.emitRefresh('add', todo);
    }
    @Emit('unselect') clear() {
      this.editingTodo = null;
    }
    cloneIt() {
      return Object.assign({}, this.todo);
    }
    created() {
      this.editingTodo = this.cloneIt();
    }
    @Emit('todoChanged') emitRefresh(mode: string, todo: Todo) {
      this.clear();
    }
    mounted() {
      this.setFocus();
    }
    setFocus() {
      if (this.addingTodo && this.editingTodo) {
        this.$refs.id.focus();
      } else {
        this.$refs.name.focus();
      }
    }
    save() {
      if (this.addingTodo) {
        this.addTodo();
      } else {
        this.updateTodo();
      }
    }
    updateTodo() {
      const todo = <Todo>this.editingTodo;
      this.emitRefresh('update', todo);
    }
  }
</script>

<style lang="scss" scoped>
  button {
    font-size: 14px;
    background-color: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    width: 100px;
  }
  label{
    width: 3em;
  }
</style>
