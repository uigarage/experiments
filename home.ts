import { HistoryPage } from './../history/history';
import { LoanComparePage } from './../loan-compare/loan-compare';
import { EmiPage } from './../emi/emi';
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // @ViewChild('username') username;
  // @ViewChild('password') password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  openPage(page: string) {
    console.log('Home > openPage > ', page);

    if(page === 'emi') 
      this.navCtrl.push(EmiPage)
  }

  loanCompare() {
    this.navCtrl.push(LoanComparePage);
  }

  history() {
    this.navCtrl.push(HistoryPage);
  }

  signIn() {
    // console.log(this.username.value + ', ' + this.password.value);

  }

}
