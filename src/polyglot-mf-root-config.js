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

registerApplication({
  name: "@polyglot-mf/navbar",
  app: () => System.import("http://192.168.70.246:8080/polyglot-mf-navbar.js"),
  activeWhen: "/",
});

// registerApplication({
//   name: "@polyglot-mf/clients",
//   app: () => System.import("@polyglot-mf/clients"),
//   activeWhen: "/clients",
// });

registerApplication({
  name: "@polyglot-mf/clients",
  app: () => System.import("https://localhost:8500/js/app.js"),
  activeWhen: "/clients",
});

registerApplication({
  name: "@polyglot-mf/account-settings",
  app: () => loadWithoutAmd("@polyglot-mf/account-settings"),
  activeWhen: "/settings",
});

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
