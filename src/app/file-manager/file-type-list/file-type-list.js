import store from "../../../store/store.js";
import { convertStringToHTMLElement } from "../../../utils/covert-string-to-html-element.js";

export class FileTypeList {
  constructor(element) {
    this.element = element;
  }

  handleFileTypeClick(type) {
    return () => {
      store.update({
        selectedFileType:
          store.state.selectedFileType === type ? undefined : type,
      });
    };
  }

  generateHTMLString({ fileTypes, selectedFileType }) {
    return `
			<div class="file-type-list">
				${fileTypes
          .map(
            (type) => `
				    <div class="file-type-list__type ${
              selectedFileType === type ? "file-type-list__type--active" : ""
            }" data-type="${type}">${type}</div> 
				  `
          )
          .join("")}
			</div>
    `;
  }

  render() {
    const { state } = store;
    const { selectedFileType } = state;

    const fileTypes = store.getFileList().map(({ type }) => type);

    const htmlString = this.generateHTMLString({ fileTypes, selectedFileType });
    const childElement = convertStringToHTMLElement(htmlString);

    this.element.appendChild(childElement);

    this.element
      .querySelectorAll(".file-type-list__type")
      .forEach((element) => {
        const type = element.getAttribute("data-type");
        element.addEventListener("click", this.handleFileTypeClick(type));
      });
  }
}
