let comments = [
  { id: 1, postId: 1, content: 'Great post!' },
  { id: 2, postId: 1, content: 'Thanks for sharing.' }
];
let nextId = 3;

export function create(data) {
  const newComment = {
    id: nextId++,
    postId: Number(data.postId),
    content: data.content
  };
  comments.push(newComment);
  return newComment;
}

export function findByPostId(postId) {
  return comments.filter(c => c.postId === Number(postId));
}

export function deleteByPostId(postId) {
  comments = comments.filter(c => c.postId !== Number(postId));
}

export function getAll() {
  return comments;
}
