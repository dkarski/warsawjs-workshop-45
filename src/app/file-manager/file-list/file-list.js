import store, { VIEW_STATE } from "../../../store/store.js";
import { convertStringToHTMLElement } from "../../../utils/covert-string-to-html-element.js";

export class FileList {
  constructor(element) {
    this.element = element;
  }

  handleItemIconClick(id) {
    return () => {
      store.update({ selectedFileId: id, viewState: VIEW_STATE.FILE_DETAIL });
    };
  }

  handleRemoveButtonClick(id) {
    return () => {
      store.removeFileById(id);
    };
  }

  generateHTMLString({ files }) {
    return `
      <div class="file-list-container">
        <ul class="file-list">
          ${files
            .map(
              (file) => `   
            <li class="file-list__item" data-id="${file.id}">
              <div class="file-list__item__icon">${file.icon}</div>
              <h3 class="file-list__item__heading">${file.name}</h3>
              <button class="file-list__remove-button">remove</button>
            </li>  
          `
            )
            .join("")}
        </ul>
      </div>
    `;
  }

  render() {
    const { state } = store;

    let files = store.getFileList();
    switch (state.selectedOption) {
      case "name": {
        files = files.sort((fileA, fileB) => {
          return fileA.name.toUpperCase() > fileB.name.toUpperCase() ? 1 : -1;
        });
        break;
      }
      case "createdAt": {
        files = files.sort((fileA, fileB) => {
          return fileA.createdAt > fileB.createdAt ? 1 : -1;
        });
        break;
      }
      case "type": {
        files = files.sort((fileA, fileB) => {
          return fileA.type.toUpperCase() > fileB.type.toUpperCase() ? 1 : -1;
        });
        break;
      }
      default: {
        files = [...state.files];
      }
    }

    if (state.selectedFileType) {
      files = files.filter(({ type }) => type === state.selectedFileType);
    }

    const htmlString = this.generateHTMLString({ ...state, files });
    const childElement = convertStringToHTMLElement(htmlString);

    this.element.appendChild(childElement);

    this.element.querySelectorAll(".file-list__item__icon").forEach((file) => {
      const id = file.parentElement.getAttribute("data-id");
      file.addEventListener("click", this.handleItemIconClick(id));
    });

    this.element
      .querySelectorAll(".file-list__remove-button")
      .forEach((file) => {
        const id = file.parentElement.getAttribute("data-id");
        file.addEventListener("click", this.handleRemoveButtonClick(id));
      });
  }
}
