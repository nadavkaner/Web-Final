export default {
  seed() {
    return [{
      userSent: 'nadav',
      userReceived: 'mor',
      lastPokeTime: Date.now(),
      numberOfPokes: 3
    }, {
      userSent: 'bar',
      userReceived: 'nadav',
      lastPokeTime: Date.now(),
      numberOfPokes: 4
    }, {
      userSent: 'mor',
      userReceived: 'bar',
      lastPokeTime: Date.now(),
      numberOfPokes: 105
    }];
  }
};