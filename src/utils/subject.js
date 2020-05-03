export class Subject {
  constructor() {
    this.observers = [];
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(
      (subscriber) => subscriber !== observer
    );
  }
}
