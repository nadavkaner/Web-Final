export default {
  seed() {
    return [{
      username: 'Admin',
      password: '123',
      admin: true,
      avgReactionTime: 60,
      numberOfPokes: 666
    }, {
      username: 'Nadav',
      password: '123',
      admin: false,
      avgReactionTime: 404,
      numberOfPokes: 444
    }, {
      username: 'Mor',
      password: '123',
      admin: false,
      avgReactionTime: 104,
      numberOfPokes: 111
    }, {
      username: 'Bar',
      password: '123',
      admin: false,
      avgReactionTime: 204,
      numberOfPokes: 222
    }];
  }
};