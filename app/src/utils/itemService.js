const getListItems = (listId) => fetch(`/api/list/${listId}/items`).then(res => res.json());

const addTaskToDB = async (listId, description) => {
  return await fetch(`/api/lists/${listId}/add_item`, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({ description })
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Error creating task!');
  });
}

export {
  getListItems,
  addTaskToDB
}