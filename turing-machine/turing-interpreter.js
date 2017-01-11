"use strict"

var Tape = require('./tape.js');
var TuringMachine = require('./turing_machine.js').TuringMachine;
var State = require('./turing_machine.js').State;
var Edge = require('./turing_machine.js').Edge;



// Environment is a list of machines, States is a list of states.
var Machines = {};
var Machine = new TuringMachine();
var Mode = "compile";

var setMachine = function(args) {
    if (Machines[args[0]] == null) {
        Machines[args[0]] = new TuringMachine(args[0]);
    }
    Machine = Machines[args[0]];
    return "New Machine named: " + args[0];
}

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

var newMachineState = function(args) { // stateName, machineName, nextStateS, nextStateF
    Machine.addMachineState(args[0], Machines[args[1]], args[2], args[3]);
    return "Added function: " + args[0];
}

var addEdge = function(args) {
  Machine.states[args[0]].addEdge(args[2], new Edge(args[1], args[3], args[4]));
  return "Added edge: " + args[0] + "->" + args[1] + "  " + args[2] + "->" + args[3] + "  " + args[4];
}

var run = function(args) {
  let result = Machine.run(new Tape(args[0]));
  console.log( (result.accept ? "    Accept" : "    Reject") + "\n    " +
          result.tape.toString());
  return ""
}

var help = function(args) {
  if (args.length == 0) {
    return functions;
  } else {
    return functions[args[0]].usage
  }
}



// Used in the interperator to call a function
var functions = {
  "SetMachine" : setMachine,
  "Start" : start,
  "Accept": accept,
  "Reject": reject,
  "NewState": newState,
  "AddEdge": addEdge,
  "Run": run,
  "Help": help,
  "AddFunction": newMachineState
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
  console.log("    " + readLine(line));
}

var startREPL = function() {
  let lineStart = "> ";
  // std in will change if i make stand alone repl outside of node
  process.stdout.write(lineStart);
  var stdin = process.openStdin();
  stdin.addListener("data", function(d) {
    REPL(d.toString().trim());
    process.stdout.write(lineStart);
  });
}

startREPL();


// readFile("./hasOne.tm");
