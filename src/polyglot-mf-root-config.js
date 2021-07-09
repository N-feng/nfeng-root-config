import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@vue-mf/navbar",
//   app: () => System.import("http://localhost:8501/js/app.js"),
//   activeWhen: "/",
// });

// registerApplication({
//   name: "@polyglot-mf/navbar",
//   app: () => System.import("@polyglot-mf/navbar"),
//   activeWhen: "/",
// });

// react 子应用
// registerApplication({
//   name: "@polyglot-mf/navbar",
//   app: () => System.import("http://localhost:8080/polyglot-mf-navbar.js"),
//   activeWhen: "/",
// });

// registerApplication({
//   name: "@polyglot-mf/clients",
//   app: () => System.import("@polyglot-mf/clients"),
//   activeWhen: "/clients",
// });

// Vue2 子应用
// registerApplication({
//   name: "@polyglot-mf/clients",
//   app: () => System.import("https://localhost:8500/js/app.js"),
//   activeWhen: "/clients",
// });

// bciscm 子应用
registerApplication({
  name: "ygp-bciscm-static",
  app: () => System.import("http://localhost:8080/js/app.js"),
  activeWhen: "/",
});

// Vue2 子应用
// registerApplication({
//   name: "@polyglot-mf/clients",
//   app: () => System.import("poly-mf-clients"),
//   activeWhen: "/layout",
// });

registerApplication({
  name: "@polyglot-mf/account-settings",
  app: () => loadWithoutAmd("@polyglot-mf/account-settings"),
  activeWhen: "/settings",
});

// Vue3 vite 子应用
registerApplication({
  name: "@org/vite-example",
  app: () =>
    import(
      /* webpackIgnore: true */
      "http://localhost:3000/src/main.js"
    ),
  activeWhen: ["/vite-example"],
});

start();

// A lot of angularjs libs are compiled to UMD, and if you don't process them with webpack
// the UMD calls to window.define() can be problematic.
function loadWithoutAmd(name) {
  return Promise.resolve().then(() => {
    let globalDefine = window.define;
    delete window.define;
    return System.import(name).then((module) => {
      window.define = globalDefine;
      return module;
    });
  });
}
