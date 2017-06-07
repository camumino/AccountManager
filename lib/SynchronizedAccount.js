import * as constants from './constants.js';
import { AsyncStorage, AlertIOS} from 'react-native';

export default class SynchronizedAccount {
  constructor(account, key) {
    this.account = account
  }
  
  cipher(key) {
    return;
  }
  
  decipher(key) {
    return;
  }
  async persist() {
    try {
      key = constants.generatePersistanceKey(false, this.account.timestamp); // generate a key to persist
      data = JSON.stringify(this.account.toJSON());

      await AsyncStorage.setItem(key, data);
    } catch (error) {
      // Error saving data
    }
  }

  pull () {
    return;
  }

  push () {
    return;
  }
}
