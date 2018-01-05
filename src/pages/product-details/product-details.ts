import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api'
import { Storage } from '@ionic/storage';


@Component({
  selector: "page-product-details",
  templateUrl: "product-details.html"
})
export class ProductDetailsPage {
  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC({
      url: "http://samarth.southeastasia.cloudapp.azure.com",
      consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
      consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4"
    });

    this.WooCommerce.getAsync("products/" + this.product.id + "/reviews").then(
      data => {
        this.reviews = JSON.parse(data.body).product_reviews;
        console.log(this.reviews);
      },
      err => {
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProductDetailsPage");
  }

  addToCart(product) {
    // get a key/value pair
    this.storage.get("cart").then(data => {
      if (data == null || data.length == 0) {
        data = [];
        data.push({
          product: product,
          qty: 1,
          amount: parseFloat(product.price)
        });
      } else {
        let added = 0;

        for (let i = 0; i < data.length; i++) {
          if (product.id == data[i].product.id) {
            console.log("Product is already in the cart");

            let qty = data[i].qty;
            data[i].qty = qty + 1;
            data[i].amount =
              parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }
        }

        if (added == 0) {
          data.push({
            product: product,
            qty: 1,
            amount: parseFloat(product.price)
          });
        }
      }

      // update the cart to the localstorage
      this.storage.set("cart", data).then(() => {
        console.log("Cart Updated");
        console.log(data);

        this.toastCtrl
          .create({
            message: "Cart Updated",
            duration: 3000
          })
          .present();
      });
    });
  }
}
