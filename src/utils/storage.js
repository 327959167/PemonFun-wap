const lockr = require("./lockr");
class Storage {
  constructor(prefix) {
    this.lockr = lockr;
    this.lockr.prefix = prefix;
  }

  set(key, value, expireTime = 0) {
    let obj = { value };
    if (expireTime && expireTime > 0) {
      let timestamp = parseInt(new Date().getTime() / 1000) + expireTime;
      obj.timestamp = timestamp;
    }
    this.lockr.set(`${key}`, obj);
  }

  setValue(key, value, localKey) {
    let info = this.get(localKey) || {};
    info[key] = value;
    this.set(localKey, info);
  }

  get(key) {
    let data = this.lockr.get(`${key}`) || {};
    if (data.timestamp) {
      let nowTime = parseInt(new Date().getTime() / 1000);
      if (nowTime < data.timestamp) {
        return data.value;
      }
      return null;
    }
    return data.value;
  }

  remove(key) {
    this.lockr.rm(key);
  }

  flush() {
    this.lockr.flush();
  }
}
export default Storage;
// module.exports = Storage;
