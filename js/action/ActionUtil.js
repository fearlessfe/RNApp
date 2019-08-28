import Types from '../types';

export function handleData(actionType, dispitch, storeName, data) {
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
