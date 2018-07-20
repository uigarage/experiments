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

  test() {
    console.log('Test');
  }
  signIn() {
    // console.log(this.username.value + ', ' + this.password.value);

  }

}
