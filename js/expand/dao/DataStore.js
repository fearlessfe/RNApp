import AsyncStorage from '@react-native-community/async-storage';
import GitHubTrending from 'GitHubTrending';

export const FLAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending',
};

export default class DataStore {
  fetchData(url, flag = FLAG_STORAGE.flag_popular) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchNetData(url, flag)
              .then(data => {
                resolve(this._wrapData(data));
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          this.fetchNetData(url, flag)
            .then(data => {
              resolve(this._wrapData(data));
            })
            .catch(error => {
              reject(error);
            });
        });
    });
  }

  saveData(url, data, callback) {
    if (!data || !url) {
      return;
    }
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
  }

  _wrapData(data) {
    return {
      data,
      timestamp: new Date().getTime(),
    };
  }

  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (err, result) => {
        if (!err) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(err);
          console.error(err);
        }
      });
    });
  }

  fetchNetData(url, flag) {
    if (flag !== FLAG_STORAGE.flag_trending) {
      return new Promise((resolve, reject) => {
        fetch(url)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok');
          })
          .then(responseData => {
            this.saveData(url, responseData);
          })
          .catch(error => {
            reject(error);
          });
      });
    } else {
      new GitHubTrending()
        .fetchTrending(url)
        .then(items => {
          if (!items) {
            throw new Error('responseData is null');
          }
          this.saveData(url, items);
          return items;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - targetDate.getHours() > 4) {
      return false;
    }
    return true;
  }
}
