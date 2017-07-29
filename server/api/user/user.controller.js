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

export function create ({body: {username, password}}) {
    return User.findOne({username})
        .then( user => {
            if(user){
                return Promise.reject(createError(400,'Bad Request'))
            }

            return User.create({
                username: username,
                password: password,
                admin: false,
                avgReactionTime: 0,
                numberOfPokes: 0
            }).then(createdUser => {return createdUser._id});
        });
}