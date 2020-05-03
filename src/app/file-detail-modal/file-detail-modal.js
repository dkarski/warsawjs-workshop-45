import store, { VIEW_STATE } from "../../store/store.js";
import { convertStringToHTMLElement } from "../../utils/covert-string-to-html-element.js";

export class FileDetailModal {
  constructor(element) {
    this.element = element;
  }

  handleCloseIconClick() {
    store.update({ selectedFileId: undefined, viewState: VIEW_STATE.INIT });
  }

  generateHTMLString({ file }) {
    return `
			<div class="modal">
				<div class="modal__content">
					<header class="modal__heading">
							<h2>${file.name}</h2>
							<span class="modal__heading__close-icon">&#x2715;</span>
					</header>
					<div class="modal__description">
					  <p><b>type:</b> ${file.type}</p>
					  <p><b>size:</b> ${transformBytes(file.size)}</p>
					</div>
				</div>
			</div>
		`;
  }

  render() {
    const { state } = store;

    const file = store.getFileById(state.selectedFileId);
    const htmlString = this.generateHTMLString({ file });
    const childElement = convertStringToHTMLElement(htmlString);

    this.element.appendChild(childElement);

    this.element
      .querySelector(".modal__heading__close-icon")
      .addEventListener("click", () => {
        this.handleCloseIconClick();
      });
  }
}
