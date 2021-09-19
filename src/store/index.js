export default {
  debug: true,
  state: {
    message: 'Hello!',
    rates: []
  },
  setMessageAction (newValue) {
    if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.message = newValue
  },
  clearMessageAction () {
    if (this.debug) console.log('clearMessageAction triggered')
    this.state.message = ''
  },
  setRatesWithLimit (rates, limit) {
    if (!limit) {
      limit = rates.length
    }
    this.state.rates = rates.slice(0, limit)
  }
}
