import { createApp } from "vue";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faCheck,
  faUpload,
  faFileImage,
  faTrash,
  faPencilSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// @ts-ignore
import App from "./App.vue";

import "./assets/main.css";

library.add(faTimes, faCheck, faUpload, faFileImage, faTrash, faPencilSquare);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());

app.mount("#app");
