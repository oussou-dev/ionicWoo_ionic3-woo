import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {Http} from '@angular/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string
  password: string

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _http: Http,
              private toastCtrl: ToastController,
              private storage: Storage,
              private alertCtrl: AlertController) {

                this.username = '';
                this.password = '';

  }

  login() {
    this._http
      .get(
        'http://samarth.southeastasia.cloudapp.azure.com/api/auth/generate_auth_cookie/?insecure=cool&username=' +
          this.username +
          '&password=' +
          this.password
      )
      .subscribe(res => {
        console.log(res.json());
  
        let response = res.json()

        if(response.error) {
          this.toastCtrl.create({
            message: response.error,
            duration: 5000
          }).present()
          return
        }

        this.storage.set("userLoginInfo", response).then((data) => {

          this.alertCtrl.create({
            title: "Login Successful",
            message: "You have been logged in successfully",
            buttons: [{
              text: "ok",
              handler: () => {
                if (this.navParams.get('next')) {
                  this.navCtrl.push(this.navParams.get("next"))
                } else {
                  this.navCtrl.pop()
                }
              }
            }]
          }).present()


      });
  })

}
}