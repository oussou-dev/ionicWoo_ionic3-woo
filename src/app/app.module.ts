import {HttpModule} from '@angular/http';
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { CartPage } from './../pages/cart/cart';
import { ProductDetailsPage } from './../pages/product-details/product-details';
import { ProductsByCategoryPage } from './../pages/products-by-category/products-by-category';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Menu } from '../pages/menu/menu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Menu,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Menu,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}