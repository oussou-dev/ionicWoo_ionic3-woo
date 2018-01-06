import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private storage: Storage,
              private viewCtrl: ViewController
            ) {

      this.total = 0.0

      this.storage.ready().then(() => {
        this.storage.get("cart").then((data) => {
          this.cartItems = data
          console.log(this.cartItems);
          
          if (this.cartItems.length > 0) {
            
            this.cartItems.forEach((item, index) => {
              this.total = this.total + (item.product.price * item.qty)
            })
          } else {
            this.showEmptyCartMessage = true
          }
        })
      })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  // remove product from cart
  // supprimer un produit + mettre à jour le total à payer + prévoir le cas où le produit supprimé est le dernier
  removeFromCart(item, i) {
    let price = item.product.price
    let qty = item.qty

    this.cartItems.splice(i,1);

    this.storage.set("cart", this.cartItems).then( () => {
      this.total = this.total - (price * qty)
    })

    if (this.cartItems.length == 0) {
      this.showEmptyCartMessage = true
    } 
    
  }

  closeModal() {
    this.viewCtrl.dismiss()
  }

}
