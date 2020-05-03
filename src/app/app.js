import { FileManager } from "./file-manager/file-manager.js";
import { FileDetailModal } from "./file-detail-modal/file-detail-modal.js";
import store, { VIEW_STATE } from "../store/store.js";
import { convertStringToHTMLElement } from "../utils/covert-string-to-html-element.js";

export class App {
  constructor(element) {
    this.element = element;
  }

  render() {
    const { state } = store;

    const childElement = convertStringToHTMLElement(
      `<div class="container"></div>`
    );

    this.element.removeChild(this.element.firstElementChild);
    this.element.appendChild(childElement);

    const fileManager = new FileManager(childElement);
    const fileDetailModal = new FileDetailModal(childElement);

    fileManager.render();

    if (state.viewState === VIEW_STATE.FILE_DETAIL) fileDetailModal.render();
  }
}
