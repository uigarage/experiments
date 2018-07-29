export const enum EMI_SEARCH_TYPE {normal = 'normal', compare = 'compare'};
export const enum TENURE_TYPE { year = 'year', month = 'month' };
export const enum TENURE_TYPE_LABEL { year = 'Year(s)', month = 'Month(s)' };

export interface EmiDO {
    tenureType: string,
    principal: number,
    interest: number,
    tenure: number,
    searchType: string,
    principal2?: number,
    interest2?: number,
    tenure2?: number,

    emi?: number
    searchDate?: Date,
    tenureInWords: string
}

export const EMIHISTORY = 'history';

export function historyStorageLabel(): string {
  return EMIHISTORY;
}

export function calculateForEMI(data: any): EmiDO {

    let 
        emi:number = 0,
        interestPayable: number = 0,
        totalPayment: number = 0,
        p:number = 0,
        r:number = 0,
        n:number = 0,
        tenureInWords:string = '';

        p =  <number>data.principal,
        r =  data.interest /12/100,
        n =  (data.tenureType == TENURE_TYPE.year) ? (data.tenure * 12) : data.tenure;  
        //  in months, if it's in years, then convert it to months.
    emi = (p * r * Math.pow((1 + r),n)/( Math.pow((1 + r),n) - 1));

    totalPayment = emi * n;
    interestPayable = totalPayment - data.principal;
    tenureInWords   = MonthYearInWords(n);

    data.emi = emi;
    data.totalPayment = totalPayment;
    data.interestPayable = interestPayable;
    data.tenureInWords = tenureInWords;

    return data;
}

export function MonthYearInWords(monthCount) {
    function getPlural(number, word) {
        return number === 1 && word.one || word.other;
    }

    var months = { one: 'month', other: 'months' },
        years = { one: 'year', other: 'years' },
        m = monthCount % 12,
        y = Math.floor(monthCount / 12),
        result = [];

    y && result.push(y + ' ' + getPlural(y, years));
    m && result.push(m + ' ' + getPlural(m, months));
    return result.join(' and ');
}
