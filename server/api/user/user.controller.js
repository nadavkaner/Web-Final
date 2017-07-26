import User from './user.model';
import empty from 'http-reject-empty';
import createError from 'http-errors';

export function index () {
  return User.find({});
}

export function get ({params: {id}}) {
  return User.findById(id)
        .then(empty);
}

export function login ({body: {username, password}}) {
  return User.findOne({username})
      .then(empty)
      .then(user => {
        if (user.password !== password) {
          return Promise.reject(createError(401, 'Unauthorized'));
        }

        return user._id;
      });
}

export function destroy () {
  return null;
}

export function update () {
  return null;
}

export function create () {
  return null;
}