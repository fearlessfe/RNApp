import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

export const onRefreshPopular = (storeName, url, pageSize) => {
  return dispitch => {
    dispitch({
      type: Types.POPULAR_REFRESH,
      storeName,
    });
    let dataStore = new DataStore();
    dataStore
      .fetchData(url)
      .then(data => {
        handleData(dispitch, storeName, data, pageSize);
      })
      .catch(error => {
        console.error(error);
        dispitch({
          type: Types.POPULAR_REFRESH_FAIL,
          storeName,
          error,
        });
      });
  };
};

function handleData(dispitch, storeName, data, pageSize) {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  dispitch({
    type: Types.POPULAR_REFRESH_SUCCESS,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
    storeName,
    pageIndex: 1,
  });
}

export function onLoadMorePopular(
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  callback,
) {
  return dispitch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        // 已加载全部数据
        if (typeof callback === 'function') {
          callback('no more');
        }
        dispitch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray,
        });
      } else {
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray
            : pageSize * pageIndex;
        dispitch({
          type: Types.POPULAR_REFRESH_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        });
      }
    }, 500);
  };
}
