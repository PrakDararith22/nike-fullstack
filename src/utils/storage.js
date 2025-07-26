export class StorageList {
  constructor(storageKey = "list") {
    this.key = storageKey;
    this.items = this.load();
  }

  load() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }

  add(item) {
    if (!this.items.find(p => p.id === item.id)) {
      this.items.push(item);
      this.save();
    }
  }

  remove(id) {
    this.items = this.items.filter(p => p.id !== id);
    this.save();
  }

  getAll() {
    return this.items;
  }

  clear() {
    this.items = [];
    this.save();
  }
}
