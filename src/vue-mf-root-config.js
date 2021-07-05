import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@vue-mf/navbar",
  // app: () => System.import("@vue-mf/navbar"),
  app: () => System.import("http://localhost:8501/js/app.js"),
  activeWhen: "/",
  // customProps: {
  //   githubLink: "https://github.com/vue-microfrontends/root-config",
  // },
});

registerApplication({
  name: "@vue-mf/dogs-dashboard",
  app: () => System.import("@vue-mf/dogs-dashboard"),
  activeWhen: "/view-doggos",
});

registerApplication({
  name: "@vue-mf/rate-dogs",
  app: () => System.import("@vue-mf/rate-dogs"),
  activeWhen: "/rate-doggos",
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
