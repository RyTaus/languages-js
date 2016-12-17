"use strict"
var Tape  = require("./tape.js");

class Edge {
  constructor(ns, w, d) {
    this.nextState = ns;
    this.write = w;
    this.direction = d;
  }
}


class State {
  constructor(name) {
    this.name = name;
    this.edges = {};
  }

  addEdge(read, edge) {
    if (this.edges[read] == null) {
      this.edges[read] = edge;
    } else {
      this.edges[read].push(edge);
    }
    return this;
  }

  getEdge(read) {
    return this.edges[read];
  }
}



class TuringMachine {
  constructor(tapeAlphabet, inputAlphabet, startState, acceptState, rejectState) {
    this.states = {};
    this.tapeAlphabet = tapeAlphabet;
    this.inputAlphabet = inputAlphabet;
    this.startState = startState;
    this.acceptState = acceptState;
    this.rejectState = rejectState;


  }

  addState(state) {
    this.states[state.name] = state;
  }

  setAccept(stateName) {
    this.acceptState = stateName;
  }


  run(tape) {
    console.log(this);
    console.log("***************************");
    console.log(tape);
    var move = {
      "R": tape.moveRight,
      "L": tape.moveLeft
    }
    var state = this.startState;
    console.log(tape.toString());
    while (state != this.acceptState || state != this.rejectState) {
      let trans = this.states[state].getEdge(tape.readCell());
      console.log("______________");
      console.log(state);
      console.log(this.states[state]);
      if (trans == null) {
        // console.log(s);
        console.log("NO EDGE");
        break;
      }

      state = trans.nextState;
      tape.writeCell(trans.write);
      if (trans.direction == "R") {
        tape.moveRight();
      } else {
        tape.moveLeft();
      }
      console.log(tape.toString());
    }

    return {
      "accept": state == this.acceptState,
      "tape": tape
    };
  }



}

module.exports = {
  "TuringMachine": TuringMachine,
  "State": State,
  "Edge": Edge
}
