import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as WC from 'woocommerce-api';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];

  constructor(public navCtrl: NavController) {
    this.WooCommerce = WC({
        url: "http://samarth.southeastasia.cloudapp.azure.com",
        consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
        consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4"
    })

    // obtenir les donnees de woocommerce store
    this.WooCommerce.getAsync("products").then((data) => { // en retour on a une Promise
      console.log(JSON.parse(data.body))
      this.products = JSON.parse(data.body).products 
    }, (err) => {
      console.log(err)
    })

  }

}