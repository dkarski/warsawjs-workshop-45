import { FileTypeList } from "./file-type-list/file-type-list.js";
import { FileList } from "./file-list/file-list.js";
import { FileUploadInput } from "./file-upload-input/file-upload-input.js";
import { convertStringToHTMLElement } from "../../utils/covert-string-to-html-element.js";

export class FileManager {
  constructor(element) {
    this.element = element;
  }

  render() {
    const childElement = convertStringToHTMLElement(
      `<div class="file-manager-container"></div>`
    );
    this.element.appendChild(childElement);

    const fileTypeList = new FileTypeList(childElement);
    const fileList = new FileList(childElement);
    const fileUploadInput = new FileUploadInput(childElement);

    // FIXME: The below line is commented because component return duplicate types of file.
    // fileTypeList.render();
    fileList.render();
    fileUploadInput.render();
  }
}
