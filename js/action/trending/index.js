import Types from '../types';
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore';

export const onRefreshTrending = (storeName, url, pageSize) => {
  return dispitch => {
    dispitch({
      type: Types.TRENDING_REFRESH,
      storeName,
    });
    let dataStore = new DataStore();
    dataStore
      .fetchData(url, FLAG_STORAGE.flag_trending)
      .then(data => {
        handleData(
          Types.TRENDING_REFRESH_SUCCESS,
          dispitch,
          storeName,
          data,
          pageSize,
        );
      })
      .catch(error => {
        console.error(error);
        dispitch({
          type: Types.LOAD_POPULAR_FAIL,
          storeName,
          error,
        });
      });
  };
};

export const onLoadMoreTrending = (
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  cb,
) => {
  return dispitch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof cb === 'function') {
          cb('no more');
        }
        dispitch({
          type: Types.TRENDING_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray,
        });
      } else {
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex;
        dispitch({
          type: Types.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        });
      }
    });
  };
};

function handleData(actionType, dispitch, storeName, data) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  dispitch({
    type: actionType,
    items: fixItems,
    storeName,
  });
}
