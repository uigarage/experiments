import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { EmiPage } from './../pages/emi/emi';
import { CalculateEmiPage } from './../pages/calculate-emi/calculate-emi';
import { HistoryPage } from './../pages/history/history';
import { LoanComparePage } from './../pages/loan-compare/loan-compare';
import { ListProfilePage } from './../pages/list-profile/list-profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionStorageProvider } from '../providers/session-storage/session-storage';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,    
    HomePage,
    CalculateEmiPage,
    EmiPage,
    HistoryPage,
    ListProfilePage,
    LoanComparePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'md'
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CalculateEmiPage,
    EmiPage,
    HistoryPage,
    ListProfilePage,
    LoanComparePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}    
  ]
})
export class AppModule {}
