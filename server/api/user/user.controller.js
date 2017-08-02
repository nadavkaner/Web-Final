import User from './user.model';
import Poke from '../poke/poke.model';
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

        return user;
      });
}

export function destroy({params: {id}}) {
  return User.findById(id)
    .then(empty)
    .then(user => {
      const {username} = user;
      return Poke.remove({$or: [{'userReceived': username}, {'userSent': username}]})
        .then(() => user.remove());
      });
}

export function update() {
  return null;
}

export function create({body: {username, password, location}}) {
  let userNameLowCase = getLowerCaseName(username);
  return User.findOne({username: userNameLowCase})
      .then(user => {
        if (user) {
          return Promise.reject(createError(400, 'Bad Request'))
        }

        return User.create({
          username: userNameLowCase,
          password: password,
          location: location,
          admin: false,
          avgReactionTime: 0,
          numberOfPokes: 0,
          randomImage: Math.floor((Math.random() * 10) + 1)
        })
      })
      .then(createdUser => createdUser._id);
}