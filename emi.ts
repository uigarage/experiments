import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the EmiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface EmiDO {
    tenureType: string,
    principal: number,
    interest: number,
    tenure: number
}

@IonicPage()
@Component({
  selector: 'page-emi',
  templateUrl: 'emi.html',
})
export class EmiPage {

  selectTenure: any;
  monthOrYear: string;
  principal: number;
  principalAmountInWords: string;
  interest: number;
  tenure: number;

  emiObj: EmiDO;


  constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            public storage: Storage,
            public alertCtrl: AlertController
        ) {
    console.log('EMI > constructor');
    this.monthOrYear = 'Year(s)';
    this.selectTenure = true;

    // set a key/value
    this.storage.set('sample_json', JSON.stringify( { prop: 'value1', prop2: 'value2'} ));
    this.storage.set('sample_json', JSON.stringify( [ { prop: 'value1', prop2: 'value2'}, { prop: 'value1', prop2: 'value2'} , { prop: 'value1', prop2: 'value2'}   ] ));

   
  }

  onSelectTenure($event) {
    console.log('EMI > onSelectTenure');
    console.log(this.selectTenure);
    console.log($event);
    this.monthOrYear = 'Month(s)';

    if(this.selectTenure)
      this.monthOrYear  = 'Year(s)';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmiPage');
  }
  
  onPrincipalChange() {
    console.log('EMI > onPrincipalChange');
    console.log(this.principal);
    var principalAmountInWords = this.number2text(this.principal);
    console.log(principalAmountInWords);
    this.principalAmountInWords = principalAmountInWords;
  }


  calculateEMI(emiForm) {
    console.log('EMI > calculateEMI');
    let errorMessage: any;

    console.log(emiForm);   

    //  Do a basic form validation
    if( !emiForm.form.valid ) {
        console.log('Form is not valid');
        if( !emiForm.form.controls.principal.valid ) {
            if( emiForm.form.controls.principal.value = '' ) {
                errorMessage.push('Principal amount is empty');
            }
            console.log('Principal amount is not valid');
        }
    }

    console.log(errorMessage);

    let alert = this.alertCtrl.create({
        title: 'Low battery',
        subTitle: '10% of battery remaining',
        buttons: ['Dismiss']
    });
    alert.present();

    // Or to get a key/value pair
    // this.storage.get('sample_json').then((val) => {
    //     console.log(JSON.parse(val));
    // });

    // E = P×r×(1 + r)n/((1 + r)n - 1)
    // E is EMI
    // where P is Priniple Loan Amount (400000)
    // r is rate of interest calualted in monthly basis it should be = Rate of Annual interest/12/100
    // if its 10% annual ,then its 10/12/100=0.00833
    // n is tenture in number of months
    // Eg: For 100000 at 10% annual interest for a period of 12 months
    // it comes  to 100000*0.00833*(1 + 0.00833)12/((1 + 0.00833)12 - 1) = 8792

    //  Monthly EMI: 12673.40
    //  Total Interest: 56242.53
    //  Total Payment: 456242.53
    this.emiObj = {
        tenureType: this.monthOrYear,
        principal: this.principal,
        interest: this.interest,
        tenure: this.tenure
    }

    console.log(this.emiObj);

    var emi, 
    p =  400000, //this.principal,
    r =  8.75/12/100, // this.interest,
    n = 36; //this.tenure;  //  in months, if it's in years, then convert it to months.

    emi = p * r * Math.pow((1 + r),n)/( Math.pow((1 + r),n) - 1);
    console.log(emi);

  }


  number2text(value) {
    var fraction = Math.round(this.frac(value)*100);
    var f_text  = "";

    if(fraction > 0) {
        f_text = "And "+this.convert_number(fraction)+" Paise";
    }

    return this.convert_number(value)+" Rupee "+f_text+" Only";
  }

  frac(f) {
      return f % 1;
  }

  convert_number(number) {
    if ((number < 0) || (number > 999999999)) 
    { 
        return "Number Out of Range!";
    }
    var Gn = Math.floor(number / 10000000);  /* Crore */ 
    number -= Gn * 10000000; 
    var kn = Math.floor(number / 100000);     /* lakhs */ 
    number -= kn * 100000; 
    var Hn = Math.floor(number / 1000);      /* thousand */ 
    number -= Hn * 1000; 
    var Dn = Math.floor(number / 100);       /* Tens (deca) */ 
    number = number % 100;               /* Ones */ 
    var tn= Math.floor(number / 10); 
    var one=Math.floor(number % 10); 
    var res = ""; 

    if (Gn>0) 
    { 
        res += (this.convert_number(Gn) + " Crore"); 
    } 
    if (kn>0) 
    { 
            res += (((res=="") ? "" : " ") + 
            this.convert_number(kn) + " Lakh"); 
    } 
    if (Hn>0) 
    { 
        res += (((res=="") ? "" : " ") +
            this.convert_number(Hn) + " Thousand"); 
    } 

    if (Dn) 
    { 
        res += (((res=="") ? "" : " ") + 
            this.convert_number(Dn) + " Hundred"); 
    } 


    var ones = Array("", "One", "Two", "Three", "Four", "Five", "Six","Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen","Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen","Nineteen"); 
    var tens = Array("", "", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty","Seventy", "Eighty", "Ninety"); 

    if (tn>0 || one>0) 
    { 
        if (!(res=="")) 
        { 
            res += " And "; 
        } 
        if (tn < 2) 
        { 
            res += ones[tn * 10 + one]; 
        } 
        else 
        { 

            res += tens[tn];
            if (one>0) 
            { 
                res += ("-" + ones[one]); 
            } 
        } 
    }

    if (res=="")
    { 
        res = "zero"; 
    } 
    return res;
  }

}
