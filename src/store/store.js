import { Subject } from "../utils/subject.js";

class Store {
  constructor(state = {}, subject) {
    this.state = state;
    this.subject = subject;
  }

  getFileById(fileId){
    return this.state.files[fileId]
  }

  getFileList(){
    return Object.keys(this.state.files).map(key => this.state.files[key])
  }

  addFile(file){
    this.state.files[file.id] = file;
    this.subject.notify({ ...this.state });
  }

  removeFileById(fileId){
    delete this.state.files[fileId]
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
