import { LoginPage } from './../login/login';
import { SignupPage } from './../signup/signup';
import { ProductsByCategoryPage } from './../products-by-category/products-by-category';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api'

@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class Menu {
  homePage: Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage;
    this.categories = [];

    this.WooCommerce = WC({
      url: "http://samarth.southeastasia.cloudapp.azure.com",
      consumerKey: "ck_a55da2f5918a380ed8565ba180fb04f4ec67f304",
      consumerSecret: "cs_3a5776160220af80f004a6983942fc5e06de22a4"
    });

    this.WooCommerce.getAsync("products/categories").then(
      data => {
        console.log(JSON.parse(data.body).product_categories);

        let temp: any[] = JSON.parse(data.body).product_categories;

        for (let i = 0; i < temp.length; i++) {
          if (temp[i].parent == 0) {
            if (temp[i].slug == "clothing") {
              temp[i].icon = "shirt";
            }
            if (temp[i].slug == "music") {
              temp[i].icon = "musical-notes";
            }
            if (temp[i].slug == "posters") {
              temp[i].icon = "images";
            }
            if (temp[i].slug == "mobile-accessories") {
              temp[i].icon = "filing";
            }

            this.categories.push(temp[i]);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Menu");
  }

  openCategoryPage(category) {
    // this.navCtrl.setRoot(ProductsByCategoryPage, {"category": category})
    this.childNavCtrl.setRoot(ProductsByCategoryPage, {"category": category})
  };

  openPage(pageName: string) {
    if (pageName == "signup") {
      this.navCtrl.push(SignupPage)
    } 
    if (pageName == "login") {
      this.navCtrl.push(LoginPage)
    } 



  }





}