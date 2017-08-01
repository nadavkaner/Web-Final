export default {
  seed() {
    return [{
      username: 'admin',
      password: '123',
      admin: true,
      avgReactionTime: 60,
      numberOfPokes: 666,
      randomImage: 1
    }, {
      username: 'nadav',
      password: '123',
      admin: false,
      avgReactionTime: 404,
      numberOfPokes: 444,
      randomImage: 2
    }, {
      username: 'mor',
      password: '123',
      admin: false,
      avgReactionTime: 104,
      numberOfPokes: 111,
      randomImage: 3
    }, {
      username: 'bar',
      password: '123',
      admin: false,
      avgReactionTime: 204,
      numberOfPokes: 222,
      randomImage: 4
    }, {
      username: 'shauli',
      password: '123',
      admin: false,
      avgReactionTime: 204,
      numberOfPokes: 222,
      randomImage: 5
    }];
  }
};