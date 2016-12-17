var TestBlock = require('./tester.js');
var Tape = require('./turing-machine/tape.js');
var TuringMachine = require('./turing-machine/turing_machine.js').TuringMachine;
var State = require('./turing-machine/turing_machine.js').State;
var Edge = require('./turing-machine/turing_machine.js').Edge;


// var t = new Tape('ryas_is_cool');
//
// var tb = new TestBlock('Tape');
//
// tb.asserts(t.toString()).is('.ryas_is_cool');
//
// tb.asserts(t.moveRight().toString()).is('.ryas_is_cool');
//
//
// tb.end();

// Edge = ns, w, d

tm = new TuringMachine(['$', '0', '1', '#'], ['0', '1'], 'q1', 'qa', 'qr');
tm.addState(new State('q1')
                .addEdge('$', new Edge('q8', '$', 'R'))
                .addEdge('0', new Edge('i', 'X', 'R'))
                .addEdge('1', new Edge('a', 'X', 'R'))
            )

tm.addState(new State('q2')
                .addEdge('$', new Edge('q4', '$', 'R'))
                .addEdge('0', new Edge('q2', '0', 'R'))
                .addEdge('1', new Edge('q2', '1', 'R'))
            )
tm.addState(new State('q3')
                .addEdge('$', new Edge('q5', '$', 'R'))
                .addEdge('0', new Edge('q3', '0', 'R'))
                .addEdge('1', new Edge('1', '1', 'R'))
            )


var tape = new Tape('0000100');

var x = tm.run(tape);
console.log(x.accept);
console.log(x.tape.toString());
