var messages = [];

module.exports = {
  calculations: messages,
  addCalc: function(c) {
    messages[0] = c;
    return messages;
  },

}
