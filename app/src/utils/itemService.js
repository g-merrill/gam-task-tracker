const getListItems = (listId) => fetch(`/api/list/${listId}/items`).then(res => res.json());

export {
  getListItems
}