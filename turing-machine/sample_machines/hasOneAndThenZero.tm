SetMachine HasOneAndThenZero
Accept a
Reject r
Start checkOne
AddFunction checkZero hasZero a r
AddFunction checkOne hasOne checkZero r
NewState a
NewState r
