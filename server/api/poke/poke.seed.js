export default {
  seed() {
    return [{
      userSent: 'Nadav',
      userReceived: 'Mor',
      lastPokeTime: Date.now(),
      numberOfPokes: 69
    }, {
      userSent: 'Nadav',
      userReceived: 'Bar',
      lastPokeTime: Date.now(),
      numberOfPokes: 4
    }, {
      userSent: 'Mor',
      userReceived: 'Bar',
      lastPokeTime: Date.now(),
      numberOfPokes: 105
    }, {
        userSent: 'Mor',
        userReceived: 'Nadav',
        lastPokeTime: Date.now(),
        numberOfPokes: 333
    }, {
        userSent: 'Bar',
        userReceived: 'Nadav',
        lastPokeTime: Date.now(),
        numberOfPokes: 666
    }];
  }
};