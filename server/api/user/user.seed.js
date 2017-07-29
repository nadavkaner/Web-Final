export default {
  seed() {
    return [{
      username: 'admin',
      password: '123',
      admin: true,
      avgReactionTime: 60,
      numberOfPokes: 666
    }, {
      username: 'nadav',
      password: '123',
      admin: false,
      avgReactionTime: 404,
      numberOfPokes: 444
    }, {
      username: 'mor',
      password: '123',
      admin: false,
      avgReactionTime: 104,
      numberOfPokes: 111
    }, {
      username: 'bar',
      password: '123',
      admin: false,
      avgReactionTime: 204,
      numberOfPokes: 222
    }];
  }
};