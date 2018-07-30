let emi: number = 0, 
p: number = 0,  // =  400000, //this.principal,
r: number = 0,   // =  8.75/12/100, // this.interest,
n: number = 0,   // = 36, //this.tenure;  //  in months, if it's in years, then convert it to months.
totalPayment: number = 0;

let interestPayable: number = 0;

p =  this.principal,
r =  this.interest /12/100,
n =  (this.monthOrYear == 'Year(s)') ? (this.tenure * 12) : this.tenure ;  
//  in months, if it's in years, then convert it to months.

emi = (p * r * Math.pow((1 + r),n)/( Math.pow((1 + r),n) - 1));
console.log(emi.toFixed(2));
totalPayment = emi * n;

interestPayable = (totalPayment - p);
console.log('Interest Payable: ' + interestPayable);
console.log('Total Payment: ' + totalPayment);


let balance: number = this.principal,
interest: number = 0,
principalComponent: number = 0,
interestComponent: number = 0;
for(var i = 0, len = n; i < len; i++ ) {
    console.log('Month ' + (i+1));

    interestComponent = (((balance) / 100 ) * 30 ) / 12;
    // console.log("(balance - principalComponent) = " + (balance - principalComponent));
    principalComponent = emi - interestComponent;
    // console.log('interestComponent: ' + interestComponent);
    // console.log('principalComponent: ' + principalComponent);
    // console.log("P" + i + " + " + "i" + i + " = " + emiFromPrincipal);

    balance = balance - principalComponent;
    console.log("P" + i + " = " + principalComponent.toFixed(2) 
                + ", i" + i + " = " + interestComponent.toFixed(2) 
                + ", Balance = " + balance.toFixed(2));
}
