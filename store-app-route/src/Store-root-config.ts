import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

const routes = constructRoutes(
  document.querySelector("#single-spa-layout") as HTMLTemplateElement
);

registerApplication({
  name: "@Store/store-app-navbar",
  app: () => System.import("@Store/store-app-navbar"),
  activeWhen: ["/"],
});

registerApplication({
  name: "@Store/store-app-books",
  app: () => System.import("@Store/store-app-books"),
  activeWhen: ["/books"],
});

registerApplication({
  name: "@Store/store-app-toys",
  app: () => System.import("@Store/store-app-toys"),
  activeWhen: ["/toys"],
});

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
