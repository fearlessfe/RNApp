import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

export const onLoadPopularData = (storeName, url) => {
  return dispitch => {
    dispitch({
      type: Types.POPULAR_REFRESH,
      storeName,
    });
    let dataStore = new DataStore();
    dataStore
      .fetchData(url)
      .then(data => {
        handleData(dispitch, storeName, data);
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

function handleData(dispitch, storeName, data) {
  dispitch({
    type: Types.LOAD_POPULAR_SUCCESS,
    items: data && data.data && data.data.items,
    storeName,
  });
}
