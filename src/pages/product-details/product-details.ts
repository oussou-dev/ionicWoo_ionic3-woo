import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api'

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    
    this.product = this.navParams.get("product")
    console.log(this.product)
  
    this.WooCommerce = WC({
      url: "http://samarth.southeastasia.cloudapp.azure.com",
      consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
      consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4"
    });  

    this.WooCommerce.getAsync('products/'+this.product.id+'/reviews').then((data) => {
      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews)
    }, (err) => {
      console.log(err)
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

}
