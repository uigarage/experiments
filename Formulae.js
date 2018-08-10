    console.log('Calculating Principal');
    let principal = 0,
        roi = 0,
        emi = 9749,
        r = 30/12/100,
        n = 12; //  calculated in months

    principal = (emi / r) * ( (Math.pow((1 + r), n) - 1) / (Math.pow((1 + r), n)) );
    principal = Math.round(principal * 100 ) /100;
    console.log("P = ", principal);

    console.log('Calculating Interest');
    principal = 100000;
    
    roi = ( emi / principal ) * ( (Math.pow( (1+r), n) -1) / (Math.pow( (1+r), n) )  );
    console.log("ROI = ", Math.round(roi * 12 * 100));


// R = 30/12/100
// 0.025
// x = 1 + R
// 1.025
// emi = 9749;
// 9749
// P = 100000;
// 100000
// y = emi / (emi - (P*R))
// 1.3448751551938198
// Math.log(y) / Math.log(x)
// 11.999588388793368
// Math.round(Math.log(y) / Math.log(x));
