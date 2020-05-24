const LOCAL_STRAGE_KEY = 'ReduxTodoApp';

export const saveLocalStorage = (data) => {
  console.log(data);
  return localStorage.setItem(LOCAL_STRAGE_KEY, JSON.stringify(data));
};

export const getLocalStorageData = () => {
  return localStorage.getItem(LOCAL_STRAGE_KEY);
};
