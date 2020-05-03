import { Subject } from "../utils/subject.js";

class Store {
  constructor(state = {}, subject) {
    this.state = state;
    this.subject = subject;
  }

  getFileById(fileId) {
    this.state.files.find(({ id }) => id === fileId);
    return this.state.files.find(({ id }) => id === fileId);
  }

  getFileList() {
    return [...this.state.files];
  }

  addFile(file) {
    this.state.files.unshift(file);
    this.subject.notify({ ...this.state });
  }

  removeFileById(fileId) {
    const files = this.state.files.filter(({ id }) => id !== fileId);
    this.state = { ...this.state, files };
    this.subject.notify({ ...this.state });
  }

  update(state) {
    this.state = { ...this.state, ...state };
    this.subject.notify({ ...this.state });
  }

  subscribe(observer) {
    this.subject.subscribe(observer);
  }
}

export const VIEW_STATE = {
  INIT: Symbol(),
  FILE_DETAIL: Symbol(),
};

const INIT_STATE = {
  files: [],
  viewState: VIEW_STATE.INIT,
  selectedFileId: undefined,
  selectedOption: "name",
  selectedFileType: undefined,
};

export default new Store(INIT_STATE, new Subject());
