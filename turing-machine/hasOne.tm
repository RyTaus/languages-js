Accept a
Reject r
Start i
NewState i
AddEdge i i 0 0 R
AddEdge i a 1 1 R
AddEdge i r # # L
NewState a
NewState r
Run 000010


tm = new TuringMachine(["$", "0", "1", "#"], ["0", "1"], "i", "a", "r");
tm.addState(new State("i").addEdge(0, new Edge("i", "0", "R")).addEdge(1, new Edge("a", "1", "R")).addEdge("#", new Edge("r", "#", "L")) )

tm.addState(new State("a") );
tm.addState(new State("r") );
