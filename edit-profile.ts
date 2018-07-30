import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const MYPROFILE = 'myprofile';

interface ProfileDO {
  id: number,
  profileName: string,
  loanDate: string,
  tenureType: boolean,
  principal: number,
  interest: number,
  tenure: number
}

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  principal: number;
  interest: number;
  tenure: number;
  tenureType: boolean;
  loanDate: String = new Date().toISOString();
  id: number = null;  //  for ID  new Date().valueOf() to make it unique values;
  profileObj: ProfileDO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private view: ViewController,
    public storage: Storage) {
  }

  ionViewWillLoad() {
    console.log(this.navParams);
    const data = this.navParams.get('data');
    this.principal = data.principal;
    this.interest = data.interest;
    this.tenure = data.tenure;
    this.tenureType = data.tenuretype
    this.id = data.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  saveProfile(frm) {
    console.log('Save Profile');
    console.log(frm);

    this.profileObj  =  {
      id: (this.id) ? this.id : new Date().valueOf(),
      profileName: frm.controls.profileName.value,
      loanDate: frm.controls.loanDate.value,
      tenureType: this.tenureType,
      principal: frm.controls.principal.value,
      interest: frm.controls.interest.value,
      tenure: frm.controls.tenure.value
    }

    console.log(this.profileObj);

    let storedList = [];
    this.storage.get(MYPROFILE).then((val) => {
      if(val) {
        console.log('Inside GET Storage');
        storedList = JSON.parse(val);
        console.log(val);

        if(!this.isStoredValueExist(storedList, this.profileObj.id)) {
          storedList.push(this.profileObj);
          this.storage.set(MYPROFILE, JSON.stringify( storedList ));
        }
      }
    });

    this.closeModal(true);
  }

  isStoredValueExist(storedList, id: number) {
    var temp;
    for( var i = 0, len = storedList.length; i < len; i++ ) {
        temp = storedList[i];
        if(temp.id === id) {
          return true;
        }
    }
    return false;
  }

  closeModal(bool) {
    this.view.dismiss(bool);
  }
}
