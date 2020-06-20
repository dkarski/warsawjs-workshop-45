import store from "../../../store/store.js";
import { convertStringToHTMLElement } from "../../../utils/covert-string-to-html-element.js";
import { generateUuid } from "../../../utils/generate-uuid.js";
import {FileFactory} from "./file-factory-2.js";

export class FileUploadInput {
  constructor(element) {
    this.element = element;
  }

  uploadFile({ type, name, size }) {
    const id = generateUuid();
    const file = FileFactory.create(type, { size, name, id });
    store.addFile(file);
  }

  handleFileUploadInputChange(event) {
    const targetFile = event.target.files[0];

    if (targetFile) {
      this.uploadFile(targetFile);
    }
  }

  generateHTMLString() {
    return `
      <div class="file-upload-input-container">
        <div class="file-upload-input">
          <button class="file-upload-input__button">Upload a file</button>
          <input class="file-upload-input__input" type="file" name="myfile" />
        </div>
      </div>
    `;
  }

  render() {
    const htmlString = this.generateHTMLString();
    const childElement = convertStringToHTMLElement(htmlString);

    this.element.appendChild(childElement);

    this.element
      .querySelector(".file-upload-input__input")
      .addEventListener("change", (event) => {
        this.handleFileUploadInputChange(event);
      });
  }
}
