import { createApp } from "vue";
import App from "./App.vue";
import AppLoading from "./components/common/AppLoading.vue";
import { setupDirectives } from "./directives";
import { setupRouter } from "./router";
import { setupAssets } from "./plugins";
import { setupStore } from "./store";
import { setupI18n } from "./locales";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";

async function setupApp() {
    // import assets: js、css
    setupAssets();

    // app loading
    const appLoading = createApp(AppLoading);

    appLoading.mount("#appLoading");

    const app = createApp(App);

    // store plugin: pinia
    setupStore(app);

    // vue custom directives
    setupDirectives(app);

    // vue router
    await setupRouter(app);

    setupI18n(app);

    // mount app
    app.mount("#app");

    //创建v-highlight全局指令
    app.directive("highlight", function (el) {
        let blocks = el.querySelectorAll("pre code");
        blocks.forEach((block: HTMLElement) => {
            hljs.highlightBlock(block);
        });
    });
}

setupApp();
