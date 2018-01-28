<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <div class="header-bar"></div>
    <p class="router">
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
      <router-link to="/todos">Go to Todos</router-link>
      <router-link to="/nofly">Go to list of Dastardly Deeds</router-link>
      <router-link to="/autocomplete"> Vue js autocomplete</router-link>
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import VueRouter, { RouteConfig } from 'vue-router';
  import TodoList from './components/TodoList.vue';
  import NoFlyList from './components/NoFlyList.vue'
  import Autocomplete from './components/Autocomplete.vue'
  import { RouteViews } from './models';
  const PageNotFound = { template: '<div>404</div>' };
  const viewNames = ['completed', 'active', '*'];
  const routes: RouteConfig[] = [
    { path: '/', redirect: '/todos' },
    { path: '/todos', component: TodoList },
    { path: '/nofly', component: NoFlyList },
    { path: '/autocomplete', component: Autocomplete },
    // { path: '/nofly', component: NoFlyList },
    { path: '**', component: PageNotFound }
  ];
  const router = new VueRouter({ routes });
  Vue.use(VueRouter);
  @Component({ router: router })
  export default class App extends Vue {
    mixins = [VueRouter];
    title: string;
    constructor() {
      super(router);
      this.title = 'My Vue and CosmosDB Todos App';
    }
  }
</script>
<style lang="scss">
  @import "assets/style/style.scss";
  p.router > a {
    padding: 5px 10px;
    text-decoration: none;
    margin: 10px 5px 0 0;
    display: inline-block;
    background-color: #eee;
    border-radius: 4px;
    cursor: pointer;
  }
  a.router-link-exact-active.router-link-active {
    color: #039be5;
  }
</style>
