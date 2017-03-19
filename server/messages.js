var messages = [];
var key = 0;
var math = require('math-expression-evaluator');

module.exports = {
  addCalc: function(exp, res) {
    var newObject = {
      expression: exp,
      key: key,
      result: res,
    };
    key++;
    messages.unshift(newObject);
    messages = messages.slice(0,10);
    return messages;
  },

  evaluate: function(eq) {
      try {
        return math.eval(eq);
      } catch(err) {
        return 'err';
      }
  },

  getCalculations: function() {return messages},
}
