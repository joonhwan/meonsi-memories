export function getLocalStoreItem(key, defaultValue = {}) {
  try {
    const json = JSON.parse(localStorage.getItem(key));
    return json || {};
  } catch (error) {
    console.warn("getLocalStoreItem failed : error = ", error);
    return {};
  }
}
