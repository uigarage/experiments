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
