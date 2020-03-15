const getAllLists = () => {
  return fetch('/api/lists').then(async res => {
    let data = await res.json();
    let lists = data.lists;
    for (let i = 0; i < lists.length; i++) {
      let itemsFromDB = await fetch(`/api/lists/${lists[i].id}/items`).then(res => res.json());
      lists[i].items = itemsFromDB.items;
    }
    return lists;
  });
}

export {
  getAllLists
}