let posts = [
  { id: 1, title: 'First Post', content: 'This is the first post', thumbnailUrl: null }
];
let nextId = 2;

export function getAll() {
  return posts;
}

export function findById(id) {
  return posts.find(p => p.id === Number(id));
}

export function create(data) {
  const newPost = {
    id: nextId++,
    title: data.title,
    content: data.content,
    thumbnailUrl: data.thumbnailUrl || null
  };
  posts.push(newPost);
  return newPost;
}

export function deleteById(id) {
  const index = posts.findIndex(p => p.id === Number(id));
  if (index !== -1) {
    const deleted = posts.splice(index, 1);
    return deleted[0];
  }
  return null;
}
