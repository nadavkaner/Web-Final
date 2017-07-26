import Post from './post.model';
import _ from 'lodash';
import empty from 'http-reject-empty';

export function index ({query: {term, filter}}) {
  const query = {};

  if (term && filter) {
    query.$and = term.split(' ').map(term => {
      const regex = new RegExp(term, 'i');
      const pred = {
        [filter]: regex
      };

      return {$or: [pred]};
    });
  }

  return Post.find(query);
}

export function getByGenre () {
  return Post.aggregate([{
    $group: {
      _id: '$genre',
      count: {$sum: 1}
    }
  }]);
}

export function getByAuthor () {
  return Post.aggregate([{
    $group: {
      _id: '$author',
      count: {$sum: 1}
    }
  }]);
}

export function get ({params: {id}}) {
  return Post.findById(id)
        .then(empty);
}

export function create ({body}, res) {
  return Post.create(body)
        .then(post => {
          res.status(201);

          return post;
        });
}

export function update ({body, params: {id}}) {
  return Post.findById(id)
        .then(empty)
        .then(post => {
          post.author = body.author;
          post.content = body.content;
          post.title = body.title;

          return post.save();
        });
}

export function destroy ({params: {id}}) {
  return Post.findById(id)
        .then(empty)
        .then(post => {
          return post.remove();
        })
        .then(_.noop);
}
