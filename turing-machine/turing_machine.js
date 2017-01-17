"use strict"
var Tape = require("./tape.js");

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

    runAsState(machine, state, tape) {
        let trans = this.getEdge(tape.readCell());
        let done = false;
        if (trans == null) {
            done = true;
        } else {
            state = trans.nextState;
            tape.writeCell(trans.write);
            if (trans.direction == "R") {
                tape.moveRight();
            } else {
                tape.moveLeft();
            }
        }
        return {
            "done": done,
            "newState": state
        };
    }
}

class TuringMachine {
    constructor(name, tapeAlphabet, inputAlphabet, startState, acceptState, rejectState) {
        this.name = name;
        this.states = {};
        this.machineTransitionSucc = {};
        this.machineTransitionFail = {};
        this.tapeAlphabet = tapeAlphabet;
        this.inputAlphabet = inputAlphabet;
        this.startState = startState;
        this.acceptState = acceptState;
        this.rejectState = rejectState;
        this.returnState = null;
    }

    addState(state) {
        this.states[state.name] = state;
    }

    addMachineState(stateName, machine, nextStateSucc, nextStateFail) {
        this.states[stateName] = machine;
        this.machineTransitionSucc[stateName] = nextStateSucc;
        this.machineTransitionFail[stateName] = nextStateFail;
    }

    setAccept(stateName) {
        this.acceptState = stateName;
    }

    setReject(stateName) {
        this.rejectState = stateName;
    }

    setStart(stateName) {
        this.startState = stateName;
    }

    transition(state, tape) {
        return this.states[state].runAsState(this, state, tape);
    }

    run(tape) {
        var state = this.startState;
        while (state !== this.acceptState || state !== this.rejectState) {
            let temp = this.transition(state, tape);
            state = temp.newState;
            if (temp.done) {
                break;
            }
        }

        return {
            "accept": state == this.acceptState,
            "tape": tape
        };
    }

    runAsState(machine, state, tape) {
        let temp = this.run(tape);
        return {
            "done": false,
            "newState": (temp.accept ? machine.machineTransitionSucc[state] : machine.machineTransitionFail[state])
        };
    }

}

module.exports = {
    "TuringMachine": TuringMachine,
    "State": State,
    "Edge": Edge
}
