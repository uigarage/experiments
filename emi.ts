import { ListProfilePage } from './../list-profile/list-profile';
import { HistoryPage } from './../history/history';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { EMIHISTORY, EmiDO, calculateForEMI, EMI_SEARCH_TYPE, TENURE_TYPE, TENURE_TYPE_LABEL } from '../../app/common';

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
  saveButtonDisable: Boolean = false;
  storedEmiList: any;

  EmiResultSet: EmiDO;

  constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public storage: Storage,
        public alertCtrl: AlertController,
        public modal: ModalController
    ) {

    console.log('EMI > constructor');

    this.monthOrYear = TENURE_TYPE_LABEL.year;
    this.selectTenure = true;
    this.saveButtonDisable = true;

    if(this.navParams.get('principal')) {
        console.log('calculate EMI with params');
        console.log(this.EmiResultSet);

        this.principal = this.navParams.get('principal');
        this.interest = this.navParams.get('interest');
        this.tenure = this.navParams.get('tenure');
        let tenureType = this.navParams.get('tenureType');

        this.onPrincipalChange();

        this.monthOrYear = (tenureType === TENURE_TYPE.year) ? TENURE_TYPE_LABEL.year : TENURE_TYPE_LABEL.month; 

        this.EmiResultSet = calculateForEMI({
            principal: this.principal,
            interest: this.interest,
            tenure: this.tenure,
            tenureType: tenureType,
            searchType: EMI_SEARCH_TYPE.normal
        });
        
        console.log(this.EmiResultSet);
    }

    this.storage.get(EMIHISTORY).then((val) => {
        console.log(val);
        if(!val) {
            this.storage.set(EMIHISTORY, []);
        }
    });
  }

  onSelectTenure($event) {
    console.log('EMI > onSelectTenure');
    this.monthOrYear = TENURE_TYPE_LABEL.month;

    if(this.selectTenure)
      this.monthOrYear  = TENURE_TYPE_LABEL.month;
  }

  public onKeyUp(event: any) {
    const MY_REGEXP =  /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;;

    let newValue = event.target.value;
    let regExp = new RegExp(MY_REGEXP);

    console.log(newValue.toLocaleString("en-IN"));
    // if (!regExp.test(newValue)) {
    //   event.target.value = newValue.slice(0, -1);
    // }
  }

  ionViewDidLoad() {
  }
  
  saveProfile() {
    console.log('EMI > saveProfile');

    const emiData = {
        principal:  this.principal,
        interest:   this.interest,
        tenure:     this.tenure,
        tenureType: (this.selectTenure === TENURE_TYPE_LABEL.year) ? TENURE_TYPE.year: TENURE_TYPE.month,
        id: null
    };

    const modal   =  this.modal.create('EditProfilePage', {data: emiData });
    modal.present();
    modal.onDidDismiss(data => {
        // Call the method to do whatever in your home.ts
        console.log('Modal closed');
        console.log(data);
        if(data) {
            //this.navCtrl.push(ListProfilePage);
            
            this.navCtrl.setRoot(ListProfilePage, {}, {animate: true, direction: "forward"});
        }
    });
  }

  onPrincipalChange() {
    if( this.principal) {
        var principalAmountInWords = this.number2text(this.principal);
        this.principalAmountInWords = principalAmountInWords;
    } else {
        this.principalAmountInWords = '';
    }
  }

  calculate(emiForm) {
    console.log('EMI > calculateEMI');
    var errorMessage = [];
    console.log(emiForm);
    
    // Doing some basic form validation
    if( !emiForm.form.valid ) {
        if( !emiForm.form.controls.principal.valid ) {
            if( !emiForm.form.controls.principal.value || emiForm.form.controls.principal.value == '' ) {
                errorMessage.push('Principal amount is empty');
            }
        }

        if( !emiForm.form.controls.interest.valid ) {
            if( !emiForm.form.controls.interest.value || emiForm.form.controls.interest.value == '' ) {
                errorMessage.push('Interest is empty');
            }
        }

        if( !emiForm.form.controls.tenure.valid ) {
            if( !emiForm.form.controls.tenure.value || emiForm.form.tenure.interest.value == '' ) {
                errorMessage.push('Tenure is empty');
            }
        }
    }

    if(errorMessage.length) {
        var errorMessageToDisplay = '';
        for(var i = 0, len = errorMessage.length; i < len; i++) {
            errorMessageToDisplay +=  errorMessage[i] + '<br/>';
        }

        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: errorMessageToDisplay,
            buttons: ['Dismiss']
        });
        alert.present();

        return;
    }

    //  If all goes well, enable the Details button
    this.saveButtonDisable = false;

    console.log(this.emiObj);

    let emi;
    emi = calculateForEMI({
        principal: this.principal,
        interest: this.interest,
        tenure: this.tenure,
        tenureType: (this.monthOrYear === 'Year(s)') ?  TENURE_TYPE.year : TENURE_TYPE.month,
        searchType: EMI_SEARCH_TYPE.normal
    }); 

    console.log(emi);
    this.EmiResultSet = emi;
    this.storeEMIValues(emi);
  }

  storeEMIValues(emi: EmiDO) {
    console.log('EMI > storeEMIValues');
    var storedEmiList = [];
    this.storage.get(EMIHISTORY).then((data) => {
        if(data) {
            console.log('Inside GET Storage');
            console.log(data);
            storedEmiList = data;

            console.log(this.isEMIValuesAlreadyExist(storedEmiList, emi));
            if(!this.isEMIValuesAlreadyExist(storedEmiList, emi)) {
                storedEmiList.push(emi);
                this.storage.set(EMIHISTORY, storedEmiList);
            }

            console.log('Stored EMI List');
            console.log(storedEmiList);            
        }
    });
  }

  isEMIValuesAlreadyExist(storedList, emi) {
    var temp;
    for( var i = 0, len = storedList.length; i < len; i++ ) {
        temp = storedList[i];
        if(temp.searchType === EMI_SEARCH_TYPE.normal) {
            if(temp.principal === emi.principal 
                && temp.interest === emi.interest
                && temp.tenure === emi.tenure
                && temp.tenureType === emi.tenureType ) {
                    return true;
            }
        }        
    }
    return false;
  }

  totalAmountToPay(data) {
    console.log('Total Amount To Pay');
   console.log(data); 
  }

  openPage(page: string) {
    console.log('EMI > openPage > ', page);

    if(page === 'history') {
        this.navCtrl.push(HistoryPage); 
    }
    if(page === 'save') {
        //this.navCtrl.push(SaveProfilePage);
    }
  }

  //    Common utils function
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
