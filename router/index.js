import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Test from "@/components/Test";
import About from "@/components/About";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/about",
        name: "about",
        component: About,
      },
      {
        path: "/test",
        name: "test",
        component: Test,
      },
    ],
  });
}
