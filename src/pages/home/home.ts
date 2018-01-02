import { ProductDetailsPage } from './../product-details/product-details';
import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;

  @ViewChild('productSlides') productSlides: Slides

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController) {
    
    this.page = 2;

    this.WooCommerce = WC({
        url: "http://samarth.southeastasia.cloudapp.azure.com",
        consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
        consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4"
    })

    // appel de la function d'implementation de l'Infinite Scroll
    // this.loadMoreProducts()
    this.loadMoreProducts(null)

    // obtenir les donnees de woocommerce store
    this.WooCommerce.getAsync("products").then((data) => { // en retour on a une Promise
      console.log(JSON.parse(data.body))
      this.products = JSON.parse(data.body).products 
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad(){
   setInterval(() => {
     if (this.productSlides.getActiveIndex() == this.productSlides.length() -1) {
       this.productSlides.slideTo(0)
     }
    this.productSlides.slideNext();
   }, 3000)
  }

  loadMoreProducts(event) {
    if (event == null) {
      this.page = 2
      this.moreProducts = []
    } else {
      this.page++
    }

      // obtenir les donnees de woocommerce store de la page ? & Infinite Scroll
    this.WooCommerce.getAsync("products?page=" + this.page).then(data => {
        // en retour on a une Promise
        console.log(JSON.parse(data.body));
        // pas ajouter de nouveaux products ....
        this.moreProducts = JSON.parse(data.body).products;
        // ... mais ajouter de nouveaux products lorsque l'utilisateur Scroll au tableau
        this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

        if (event != null) {
          event.complete();
        }

        // si plus de products à afficher => fin du Scroll
        if (JSON.parse(data.body).products.length < 10) {
          event.enable(false);

          this.toastCtrl
            .create({
              message: "No more products",
              duration: 5000,
              cssClass: "toastStyle"
            })
            .present();
        }
      }, err => {
        console.log(err);
      });
  }

  openProductPage(product) {
    // push() adds the new page on the top of the navigation stack with the option to going back
    this.navCtrl.push(ProductDetailsPage, {"product": product} )
  }



}