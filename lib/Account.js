export default class Account {
  constructor(site, user, password, timestamp) {
    this.site = site;
    this.user = user;
    this.password = password;
    this.timestamp = ((typeof timestamp === "undefined") ? Date.now() : timestamp).toString();
  }
  
  cipher(key) {
    return;
  }
  
  decipher(key) {
    return;
  }

  persist() {
    return;
  }

  pull () {
    return;
  }

  push () {
    return;
  }
}

Account.prototype.toString = function() { return this.site }
Account.prototype.toJSON = function() { return {site: this.site, user: this.user, password: this.password }; }
