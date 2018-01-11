import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from "woocommerce-api";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser:any = {}
  billing_shipping_same: boolean;
  WooCommerce: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController) {

    this.newUser.billing_address = {}
    this.newUser.billing_address = {}
    this.billing_shipping_same = false
  
    // this.WooCommerce = WC({
    //   url: "http://samarth.cloudapp.net",
    //   consumerKey: "ck_b615342c28e3aa9b0b9d384852cda85a82155197",
    //   consumerSecret: "cs_d75f28e39ae9f06318608cec44fc77dd75ce6427"
    // });

    this.WooCommerce = WC({
        url: "http://samarth.southeastasia.cloudapp.azure.com",
        consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
        consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4"
    })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same
  }

  checkEmail () {

    // variable qui prend comme valeur 'true' ou 'false' selon que l'email est valide ou pas
    let validEmail = false;

    // regular expression pour tester la validité de l'email saisi
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.test(this.newUser.email)) {
      // email looks valid (email saisi semble correct via regEx) => on passe un appel à la BDD
      this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then((data) => {
        // on stocke les données reçues et on les convertit au format json
        let res = JSON.parse(data.body);

        // le serveur nous renvoie des erreurs => l'Email n'existe pas dans la BDD donc pas encore pris
        if (res.errors) {
          validEmail = true;
          // message d'infos
          this.toastCtrl.create({
            message: "Congratulations. Email is good to go.",
            duration: 3000
          }).present()

        } else { // sinon
          validEmail = false;

          this.toastCtrl
            .create({
              message: "Email is already registrered. Please check.",
              showCloseButton: true
            }).present();
        }
        // console.log(validEMail); 
      })
    } else {
      // email looks no-valid (email saisi pas correct via regEx) => envoi d'une notifiication d'error
        validEmail = false;

        this.toastCtrl
          .create({
            message: "Invalid Email. Please check",
            showCloseButton: true
          })
          .present();

        // console.log(validEMail);
      } 
  }
}
