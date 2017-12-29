import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.page = 1;

    this.category = this.navParams.get("category")

    this.WooCommerce = WC({
      url: "http://samarth.southeastasia.cloudapp.azure.com",
      consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
      consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4"
    });
  
    // filtrer les produits obtenus depuis le store par catégorie
    // 2 categories peuvent avoir le même nom mais pas le même slug dans woocommerce
    this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then((data) => { // en retour on a une Promise
      console.log(JSON.parse(data.body))
      this.products = JSON.parse(data.body).products 
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

}
