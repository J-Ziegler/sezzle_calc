var messages = [];
var key = 0;
var math = require('math-expression-evaluator');

module.exports = {
  getCalculations: function() {return messages},
  addCalc: function(exp, res) {
    var newObject = {
      expression: exp,
      result: res,
      key: key,
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
  }

}
