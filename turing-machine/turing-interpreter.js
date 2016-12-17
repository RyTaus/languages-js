"use strict"

var Tape = require('./tape.js');
var TuringMachine = require('./turing_machine.js').TuringMachine;
var State = require('./turing_machine.js').State;
var Edge = require('./turing_machine.js').Edge;



// Environment is a list of machines, States is a list of states.
var Machine = new TuringMachine();
var Mode = "compile";

var start = function(args) {
  Machine.setStart(args[0]);
  return "StartState: " + args[0];
}

var accept = function(args) {
  Machine.setAccept(args[0]);
  return "AcceptState: " + args[0];
}

var reject = function(args) {
  Machine.setReject(args[0]);
  return "RejectState: " + args[0];
}

var newState = function(args) {
  Machine.addState(new State(args[0]));
  return "Added state: " + args[0];
}

var addEdge = function(args) {
  Machine.states[args[0]].addEdge(args[2], new Edge(args[1], args[3], args[4]));
  return "Added edge: " + args[0] + "->" + args[1] + "  " + args[2] + "->" + args[3] + "  " + args[4];
}

var run = function(args) {
  let result = Machine.run(new Tape(args[0]));
  return (result.accept ? "Accept" : "Reject") + "\n" +
          result.tape.toString();
}





// Used in the interperator to call a function
var functions = {
  "Start" : start,
  "Accept": accept,
  "Reject": reject,
  "NewState": newState,
  "AddEdge": addEdge,
  "Run": run
}

var readLine = function(inputLine) {
  var args = inputLine.split(" ");
  if (args[0] in functions) {
    // Run Proper Function
    return functions[args.shift()](args);
  } else {
    // Might throw this
    return "Error: No such function: " + args[0];
  }
}

var readFile = function(fileName) {
  var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fileName)
  });

  lineReader.on('line', function (line) {
    readLine(line);
  });
}

var REPL = function(line) {
  console.log("  " + readLine(line));
}

var startREPL = function() {
  // std in will change if i make stand alone repl outside of node
  var stdin = process.openStdin();
  stdin.addListener("data", function(d) {
    REPL(d.toString().trim());
  });
}

startREPL();

// readLine("NewState Qo");

// readFile("./hasOne.tm");
