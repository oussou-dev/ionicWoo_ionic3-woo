import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  total: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage
            ) {
      this.storage.ready().then(() => {
        this.storage.get("cart").then((data) => {
          this.cartItems = data
          console.log(data);
          
        })
      })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
