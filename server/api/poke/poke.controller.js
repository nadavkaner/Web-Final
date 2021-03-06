import Poke from './poke.model';
import User from '../user/user.model';
import _ from 'lodash';
import empty from 'http-reject-empty';

export function index({query: {term, filter}}) {
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

  return Poke.aggregate([
    {$lookup:
    {
      from: "users",
      localField: "userSent",
      foreignField: "username",
      as: "userSentData"
    }},
    {$lookup:
    {
      from: "users",
      localField: "userReceived",
      foreignField: "username",
      as: "userReceivedData"
    }},
    {$match: query},
    { $unwind: "$userSentData" },
    { $unwind: "$userReceivedData" }]
  );
}

export function GroupByUserFights() {
  return Poke.aggregate([
    {$project: {users: ["$userSent", "$userReceived"]}},
    {$unwind: "$users"},
    {
      $group: {
        _id: "$users",
        count: {$sum: 1}
      }
    },
    {$lookup:
    {
      from: "users",
      localField: "_id",
      foreignField: "username",
      as: "userData"
    }},
    { $unwind: "$userData" },
    {$sort: {count: -1}},
    {$limit: 5}
  ]);
}

export function suggestedPokes({query: {username}}) {
  return Poke.find({$or: [{'userReceived': username}, {'userSent': username}]})
    .select('userReceived userSent')
    .then(pokes => {
      const distinct = [...new Set(pokes.reduce((arr, val) => {
        arr.push(val.userReceived);
        arr.push(val.userSent);
        return arr;
      }, [username]))];

      return User.find({$and: [{'username': {$nin: distinct}}, {'admin': false}]});
    });
}

export function get({params: {id}}) {
  return Poke.findById(id)
    .then(empty);
}

export function create({body}, res) {
  return Poke.create(body)
    .then(post => {
      res.status(201);

      return post;
    });
}

export function update({body, params: {id}}) {
  return Poke.findById(id)
    .then(empty)
    .then(post => {
      post.userSent = body.userSent;
      post.userReceived = body.userReceived;
      post.lastPokeTime = body.lastPokeTime;
      post.numberOfPokes = body.numberOfPokes;

      return post.save();
    });
}

export function destroy({params: {id}}) {
  return Poke.findById(id)
    .then(empty)
    .then(post => {
      return post.remove();
    })
    .then(_.noop);
}
