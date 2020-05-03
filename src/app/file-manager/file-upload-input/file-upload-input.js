import store from "../../../store/store.js";
import { convertStringToHTMLElement } from "../../../utils/covert-string-to-html-element.js";
import { generateUuid } from "../../../utils/generate-uuid.js";
import {
  CSV_FILE_ICON,
  FILE_ICON,
  JPG_FILE_ICON,
  MP3_FILE_ICON,
  PDF_FILE_ICON,
  PNG_FILE_ICON,
  SVG_FILE_ICON,
} from "../../../utils/icons.js";

export class FileUploadInput {
  constructor(element) {
    this.element = element;
  }

  uploadFile({ type, name, size }) {
    const id = generateUuid();

    let file;
    switch (type) {
      case "image/jpeg": {
        file = {
          id,
          name,
          size,
          type: "image/jpeg",
          icon: JPG_FILE_ICON,
        };
        break;
      }
      case "image/svg+xml": {
        file = {
          id,
          name,
          size,
          type: "image/svg+xml",
          icon: SVG_FILE_ICON,
        };
        break;
      }
      case "image/png": {
        file = {
          id,
          name,
          size,
          type: "image/png",
          icon: PNG_FILE_ICON,
        };
        break;
      }
      case "application/pdf": {
        file = {
          id,
          name,
          size,
          type: "application/pdf",
          icon: PDF_FILE_ICON,
        };
        break;
      }
      case "audio/x-m4a": {
        file = {
          id,
          name,
          size,
          type: "audio/x-m4a",
          icon: MP3_FILE_ICON,
        };
        break;
      }
      case "text/csv": {
        file = {
          id,
          name,
          size,
          type: "text/csv",
          icon: CSV_FILE_ICON,
        };
        break;
      }
      default: {
        file = {
          id,
          name,
          size,
          type: "default",
          icon: FILE_ICON,
        };
        break;
      }
    }
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
