"use strict"

class TestBlock {
  constructor (description) {
    this.tests = 0;
    this.correct = 0;
    console.log("--- " + description + " ---")
  }

  describe(test) {
    console.log(test);
  }

  asserts(x) {
    var self = this;
    return {
      is: function(y) {
        self.tests += 1;
        if (x === y) {
          self.correct += 1;
          console.log("Test " + self.tests + ": SUCCESS");
        } else {
          console.log("Test " + self.tests + ": FAILURE");
          console.log("  Expected " + y + " but got " + x);
        }
      }
    }
  }

  end() {
    console.log(this.correct + " / " + this.tests + " Passed");
    console.log();
  }
}

module.exports = TestBlock;
