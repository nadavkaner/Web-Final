import User from './user.model';
import empty from 'http-reject-empty';
import createError from 'http-errors';

function getLowerCaseName(str) {
  return str.toLowerCase();
}

export function index() {
  return User.find({}).where('admin').equals(false);
}

export function get({params: {id}}) {
  return User.findById(id)
      .then(empty);
}

export function login({body: {username, password}}) {
  let userNameLowCase = getLowerCaseName(username);
  return User.findOne({username: userNameLowCase})
      .then(empty)
      .then(user => {
        if (user.password !== password) {
          return Promise.reject(createError(401, 'Unauthorized'));
        }

        return user._id;
      });
}

export function destroy() {
  return null;
}

export function update() {
  return null;
}

export function create({body: {username, password}}) {
  let userNameLowCase = getLowerCaseName(username);
  return User.findOne({username: userNameLowCase})
      .then(user => {
        if (user) {
          return Promise.reject(createError(400, 'Bad Request'))
        }

        return User.create({
          username: userNameLowCase,
          password: password,
          admin: false,
          avgReactionTime: 0,
          numberOfPokes: 0
        })
      })
      .then(createdUser => createdUser._id);
}