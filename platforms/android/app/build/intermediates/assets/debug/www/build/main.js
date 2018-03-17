webpackJsonp([2],{

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var AuthProvider = (function () {
    function AuthProvider(http) {
        this.http = http;
        console.log('Hello AuthProvider Provider');
    }
    AuthProvider.prototype.loginUser = function (email, password) {
        return __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().signInWithEmailAndPassword(email, password);
    };
    AuthProvider.prototype.signupUser = function (email, password, firstname, lastname) {
        console.log(email, password);
        return __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (newUser) {
            console.log(newUser);
            __WEBPACK_IMPORTED_MODULE_2_firebase___default.a
                .firestore() //stores the information inside the cloud firestore
                .collection('USER')
                .doc(newUser.uid)
                .set({ userUid: newUser.uid, email: email, password: password, firstname: firstname, lastname: lastname });
        });
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.logoutUser = function () {
        return __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.auth().signOut();
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_firestore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DatabaseProvider = (function () {
    function DatabaseProvider(http) {
        this.http = http;
        this._DB = __WEBPACK_IMPORTED_MODULE_3_firebase__["firestore"]();
        console.log('Hello DatabaseProvider Provider');
    }
    DatabaseProvider.prototype.createAndPopulateDocument = function (collectionObj, docID, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB
                .collection(collectionObj)
                .doc(docID)
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider.prototype.getDocuments = function (collectionObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB.collection(collectionObj)
                .get()
                .then(function (querySnapshot) {
                var obj = [];
                querySnapshot
                    .forEach(function (doc) {
                    obj.push({
                        id: doc.id,
                        name: doc.data().name,
                        author: doc.data().author,
                        timeStart: doc.data().timeStart,
                        timeEnd: doc.data().timeEnd,
                        answers: doc.data().answers,
                        description: doc.data().description,
                        quatity: doc.data().quatity
                    });
                });
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider.prototype.addDocument = function (collectionObj, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB.collection(collectionObj).add(dataObj)
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider.prototype.deleteDocument = function (collectionObj, docID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB
                .collection(collectionObj)
                .doc(docID)
                .delete()
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider.prototype.updateDocument = function (collectionObj, docID, dataObj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._DB
                .collection(collectionObj)
                .doc(docID)
                .update(dataObj)
                .then(function (obj) {
                resolve(obj);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_email__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signup_signup__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reset_password_reset_password__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(186);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, alertCtrl, authProvider, formBuilder, afauth) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.authProvider = authProvider;
        this.formBuilder = formBuilder;
        this.afauth = afauth;
        this.loginForm = formBuilder.group({
            email: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])]
        });
    }
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        }
        else {
            console.log(this.loginForm.value);
            this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
                .then(function (authData) {
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    LoginPage.prototype.loginGoogle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afauth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_8_firebase__["auth"].GoogleAuthProvider())];
                    case 1:
                        result = _a.sent();
                        if (result)
                            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.loginFace = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afauth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_8_firebase__["auth"].FacebookAuthProvider())];
                    case 1:
                        result = _a.sent();
                        if (result)
                            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.goToSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.goToResetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__reset_password_reset_password__["a" /* ResetPasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\login\login.html"*/'<ion-content padding class="content-back">\n  <ion-content padding class="content">\n    <ion-content padding class="content-login">\n      <form [formGroup]="loginForm" (submit)="loginUser()" novalidate col-12>\n\n        <ion-row>\n          <ion-col col-12>\n            <!-- <img src="/assets/imgs/logoicon.png" alt="" class="icon-logo"> -->\n            <h2 class="tile"><img src="/assets/imgs/logo1.png" alt="" class="avatar"></h2>\n          \n          </ion-col>\n        </ion-row>\n        <ion-item class="person">\n          <ion-icon item-start ios="ios-person" md="md-person" class="icon-user" color="green1" ></ion-icon>\n          <ion-input class="btn" formControlName="email" type="email" placeholder="Your email address" [class.invalid]="!loginForm.controls.email.valid && blur"></ion-input>\n        </ion-item>\n\n        <ion-item class="pass">\n          <ion-icon item-start ios="ios-key" md="md-key" class="icon-pass" color="green1"></ion-icon>\n          <ion-input class="btn" formControlName="password" type="password" placeholder="Your password" [class.invalid]="!loginForm.controls.password.valid && blur"></ion-input>\n        </ion-item>\n\n        <button ion-button block type="submit" class="submit-btn" [disabled]="!loginForm.valid">\n          Login\n        </button>\n\n      </form>\n\n      <button ion-button block clear (click)="goToSignup()" class="signUp" style="font-weight: bold;">\n        Create a new account\n      </button>\n\n      <button ion-button block clear (click)="goToResetPassword()" class="forgotPass" style="font-weight: bold;">\n        I forgot my password\n      </button>\n\n      <ion-col>\n        <ion-icon ios="logo-google" md="logo-google" class="gg" (click)="loginGoogle()"></ion-icon>\n        <ion-icon ios="logo-facebook" md="logo-facebook" class="fb" (click)="loginFace()"></ion-icon>\n      </ion-col>\n    </ion-content>\n  </ion-content>\n</ion-content>'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailValidator; });
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.isValid = function (control) {
        var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
            .test(control.value);
        if (re) {
            return null;
        }
        return {
            "invalidEmail": true
        };
    };
    return EmailValidator;
}());

//# sourceMappingURL=email.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageSurveyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { ManageAnswerComponent } from "../../components/manage-answer/manage-answer";
/**
 * Generated class for the ManageSurveyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManageSurveyPage = (function () {
    function ManageSurveyPage(navCtrl, navParams, _FB, _DB, _ALERT, _cfr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._FB = _FB;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this._cfr = _cfr;
        this.name = '';
        this.docID = '';
        this.isEditable = false;
        this.isDisappear = false;
        this.title = "";
        this._COLL = "";
        this.timeStart = this.calculateTime('+7');
        this.timeEnd = this.calculateTime('+7');
        this._COLL = "SURVEY";
    }
    ManageSurveyPage.prototype.calculateTime = function (offset) {
        // create Date object for current location
        var d = new Date();
        // create new Date object for different city
        // using supplied offset
        var nd = new Date(d.getTime() + (3600000 * offset));
        return nd.toLocaleString();
    };
    // Determine if the client uses DST
    ManageSurveyPage.prototype.stdTimezoneOffset = function (today) {
        var jan = new Date(today.getFullYear(), 0, 1);
        var jul = new Date(today.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    };
    ManageSurveyPage.prototype.dst = function (today) {
        return today.getTimezoneOffset() < this.stdTimezoneOffset(today);
    };
    ManageSurveyPage.prototype.ngOnInit = function () {
        // throw new Error("Method not implemented.");
        this.form = this._FB.group({
            'name': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            'timeStart': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            'timeEnd': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            'answers': this._FB.array([
                this.initAnswer(),
            ])
        });
    };
    ManageSurveyPage.prototype.initAnswer = function () {
        return this._FB.group({
            answer: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required]
        });
    };
    ManageSurveyPage.prototype.addAnswer = function () {
        var control = this.form.controls['answers'];
        control.push(this.initAnswer());
    };
    ManageSurveyPage.prototype.removeAnswer = function (i) {
        var control = this.form.controls['answers'];
        control.removeAt(i);
    };
    ManageSurveyPage.prototype.saveSurvey = function (value) {
        var _this = this;
        if (this.form.controls['timeStart'].value > this.form.controls['timeEnd'].value) {
            this.compareAlert('TIME IS WRONG', 'Start time has to earlier than End time');
        }
        else {
            var getValue_1 = {
                name: this.form.controls["name"].value,
                timeStart: this.form.controls["timeStart"].value,
                timeEnd: this.form.controls["timeEnd"].value
            };
            this._DB.addDocument(this._COLL, getValue_1)
                .then(function (data) {
                data.set({
                    userUid: __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid,
                    surveyUid: data.id,
                    name: getValue_1.name,
                    timeStart: getValue_1.timeStart,
                    timeEnd: getValue_1.timeEnd
                });
                var answers = _this.form.controls["answers"].value;
                var _loop_1 = function (i) {
                    var answer = answers[i].answer;
                    _this._DB.addDocument("RESULT", { answer: answer }).then(function (dataObj) {
                        dataObj.set({
                            answerUid: dataObj.id,
                            answer: answer,
                            surveyUid: data.id
                        });
                    });
                };
                for (var i = 0; i < answers.length; i++) {
                    _loop_1(i);
                }
                _this.ngOnInit();
                _this.displayAlert('SURVEY ADDED', 'The survey ' + '"' + getValue_1.name + '"' + ' was successfully added');
            })
                .catch(function (error) {
                _this.displayAlert('Adding survey failed', error.message);
            });
        }
    };
    ManageSurveyPage.prototype.displayAlert = function (title, message) {
        this.title = "ADD A NEW SURVEY";
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: ['GOT IT!']
        });
        alert.present();
    };
    ManageSurveyPage.prototype.compareAlert = function (title, message) {
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: ['GOT IT!']
        });
        alert.present();
    };
    ManageSurveyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ManageSurveyPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('answer', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */])
    ], ManageSurveyPage.prototype, "container", void 0);
    ManageSurveyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-manage-survey',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\manage-survey\manage-survey.html"*/'<!--\n  Generated template for the ManageSurveyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title> {{ title }} </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="saveSurvey(form.value)" [disabled]="!form.valid">\n        <ion-icon ios="ios-checkmark-circle-outline" md="md-checkmark-circle-outline" color="light"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="form">\n    <ion-item>\n      <ion-label stacked>Question:</ion-label>\n      <ion-input type="text" formControlName="name"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>Time start:</ion-label>\n      <ion-datetime displayFormat="YYYY-MM-DD HH:mm A" max="2999" formControlName="timeStart"></ion-datetime>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label stacked>Time end:</ion-label>\n      <ion-datetime displayFormat="YYYY-MM-DD HH:mm A" max="2999" formControlName="timeEnd"></ion-datetime>\n    </ion-item>\n\n    <div formArrayName="answers">\n      <div *ngFor="let answer of form.controls.answers.controls; let i=index">\n        <ion-item [formGroupName]="i">\n          <ion-label stacked>Answer {{ i + 1 }}:</ion-label>\n          <ion-input type="text" formControlName="answer"></ion-input>\n          <ion-icon ios="ios-close" md="md-close" item-right *ngIf="form.controls.answers.controls.length > 1" (click)="removeAnswer(i)"></ion-icon>\n        </ion-item>\n      </div>\n\n      <button (click)="addAnswer()" end class="addAnswer">\n        <label>Add answer </label> \n        <ion-icon ios="ios-add-circle-outline" md="md-add-circle" class="iconPlus"></ion-icon>\n      </button>\n\n    </div>\n\n  </form>\n</ion-content>\n'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\manage-survey\manage-survey.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */]])
    ], ManageSurveyPage);
    return ManageSurveyPage;
}());

//# sourceMappingURL=manage-survey.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the PropertyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PropertyPage = (function () {
    function PropertyPage(navCtrl, firestore, navParams, _DB, _ALERT) {
        this.navCtrl = navCtrl;
        this.firestore = firestore;
        this.navParams = navParams;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this._COLL = '';
        this._DOC = '';
        this._COLL = "SURVEY";
        this._CONTENT = {
            name: "",
            author: "",
            timeStart: "",
            timeEnd: "",
            answers: ""
        };
    }
    PropertyPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    PropertyPage.prototype.ionViewDidEnter = function () {
        this.retrieveCollection();
    };
    PropertyPage.prototype.generateCollectionAndSurvey = function () {
        this._DB.createAndPopulateDocument(this._COLL, this._DOC, this._CONTENT)
            .then(function (data) {
            console.dir(data);
        })
            .catch(function (error) {
            console.dir(error);
        });
    };
    PropertyPage.prototype.retrieveCollection = function () {
        var _this = this;
        var userId = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser.uid;
        this.firestore.collection('SURVEY', function (ref) { return ref.where('userUid', '==', userId); }).valueChanges().subscribe(function (res) {
            if (res.length === 0) {
                _this.generateCollectionAndSurvey();
            }
            else {
                _this.surveys = res;
                _this.filterItems = res;
            }
            console.log(userId);
        });
    };
    //function search
    PropertyPage.prototype.getItems = function (input) {
        var searchKeyword = input.target.value;
        if (searchKeyword != null) {
            this.filterItems = this.surveys.filter(function (survey) { return survey.author.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1; });
            console.log(this.filterItems);
        }
        else {
            this.filterItems = this.surveys;
        }
    };
    PropertyPage.prototype.addSurvey = function () {
        this.navCtrl.push('manage-survey');
    };
    PropertyPage.prototype.updateSurvey = function (obj) {
        var params = {
            collection: this._COLL,
            survey: obj
        };
        this.navCtrl.push('manage-survey', { record: params, isEdited: true });
    };
    PropertyPage.prototype.deleteSurvey = function (obj) {
        var _this = this;
        this._DB.deleteDocument(this._COLL, obj.surveyUid)
            .then(function (data) {
            console.dir(data);
            _this.displayAlert('Success', 'The survey ' + '"' + obj.name + '"' + ' was successfully removed');
        })
            .catch(function (error) {
            _this.displayAlert('Error', error.message);
        });
    };
    // goResult(){
    //   this.navCtrl.push('chart-page');
    // }
    PropertyPage.prototype.displayAlert = function (title, message) {
        var _this = this;
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: [{
                    text: 'Got It!',
                    handler: function () {
                        _this.retrieveCollection();
                    }
                }]
        });
        alert.present();
    };
    PropertyPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PropertyPage');
    };
    PropertyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-property',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\property\property.html"*/'<!--\n  Generated template for the PropertyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="arrow-back" color="light"></ion-icon>\n    </button>\n    <ion-title>My Survey</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addSurvey()">\n        <ion-icon ios="ios-add-circle-outline" md="md-add-circle" class="avatar"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-row>\n    <ion-searchbar class="search" (ionInput)="getItems($event)"></ion-searchbar>\n  </ion-row>\n  <ion-list>\n    <ion-item-sliding *ngFor="let survey of filterItems">\n\n      <ion-item class="items" (click)="goResult()" >\n        <h2>{{ survey.name }}</h2>\n      </ion-item>\n\n      <ion-item-options side="right">\n        <ion-buttons>\n          <button ion-button icon-only (click)="deleteSurvey(survey)" color="danger" class="btn-d">\n            <ion-icon ios="ios-trash" md="md-trash"></ion-icon>\n          </button>\n        </ion-buttons>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\property\property.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], PropertyPage);
    return PropertyPage;
}());

//# sourceMappingURL=property.js.map

/***/ }),

/***/ 224:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 224;

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/anwser/anwser.module": [
		268
	],
	"../pages/login/login.module": [
		775,
		1
	],
	"../pages/manage-survey/manage-survey.module": [
		332
	],
	"../pages/property/property.module": [
		776,
		0
	],
	"../pages/result/result.module": [
		333
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 267;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnwserPageModule", function() { return AnwserPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__anwser__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AnwserPageModule = (function () {
    function AnwserPageModule() {
    }
    AnwserPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__anwser__["a" /* AnwserPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__anwser__["a" /* AnwserPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], AnwserPageModule);
    return AnwserPageModule;
}());

//# sourceMappingURL=anwser.module.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__manage_survey_manage_survey__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    DashboardPage.prototype.findAll = function () {
        this.properties = [];
    };
    DashboardPage.prototype.pushSurvey = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__manage_survey_manage_survey__["a" /* ManageSurveyPage */]);
    };
    // pushRes() {
    //   this.navCtrl.push(ResPage);
    // }
    DashboardPage.prototype.goLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    DashboardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-dashboard',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\dashboard\dashboard.html"*/'<!--\n  Generated template for the DashboardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="content">\n  <ion-card class="card-wallpaper">\n    <div class="info">\n      <img src="/assets/imgs/obama.png" alt="" class="avatar">\n      <div class="userinfo">\n        <h2 class="name">Obama</h2>\n        <p>obamab@dxc.com</p>\n      </div>\n    </div>\n  </ion-card>\n  <!-- end ion-card -->\n\n  <!-- start option -->\n  <div class="option">\n    <ion-grid>\n      <ion-row class="ionrow-list">\n        <ion-col col-12 class="ioncol-list">\n          <h2 (click)="pushSurvey()" class="assets">\n            <ion-icon ios="ios-list-outline" md="md-list" class="ioncol-icon"></ion-icon>\n            My Survey\n          </h2>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n  <!-- end option -->\n\n  <ion-row class="ionrow-list">\n    <ion-col col-12 class="ioncol-list">\n      <h2 class="assets" (click)="goLogin()" >\n        <ion-icon ios="ios-log-out" md="md-log-out" class="ioncol-icon"></ion-icon>\n        Log out\n      </h2>\n    </ion-col>\n  </ion-row>\n</ion-content>\n\n'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\dashboard\dashboard.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], DashboardPage);
    return DashboardPage;
}());

//# sourceMappingURL=dashboard.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// @IonicPage({
//   name: 'signup'
// })
var SignupPage = (function () {
    function SignupPage(navCtrl, authProvider, formBuilder, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.signupForm = formBuilder.group({
            email: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
            password: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])],
            firstname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])],
            lastname: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])]
        });
    }
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.authProvider.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.firstname, this.signupForm.value.lastname)
                .then(function () {
                _this.loading.dismiss().then(function () {
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                });
            }, function (error) {
                _this.loading.dismiss().then(function () {
                    var alert = _this.alertCtrl.create({
                        message: error.message,
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                });
            });
            this.loading = this.loadingCtrl.create();
            this.loading.present();
        }
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\signup\signup.html"*/'<ion-content padding>\n  <form [formGroup]="signupForm" (submit)="signupUser()" novalidate>\n\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input formControlName="email" type="email" placeholder="Your email address" [class.invalid]="!signupForm.controls.email.valid && blur">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>Password</ion-label>\n      <ion-input formControlName="password" type="password" placeholder="Your password" [class.invalid]="!signupForm.controls.password.valid && blur">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>First name</ion-label>\n      <ion-input formControlName="firstname" type="text" placeholder="Your firstname" [class.invalid]="!signupForm.controls.firstname.valid && blur">\n      </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label stacked>Last name</ion-label>\n      <ion-input formControlName="lastname" type="text" placeholder="Your lastname" [class.invalid]="!signupForm.controls.lastname.valid && blur">\n      </ion-input>\n    </ion-item>\n\n    <button ion-button block type="submit" [disabled]="!signupForm.valid">\n      Create an Account\n    </button>\n  </form>\n</ion-content>'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_email__ = __webpack_require__(184);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// @IonicPage({
//   name: 'reset-password'
// })
var ResetPasswordPage = (function () {
    function ResetPasswordPage(navCtrl, authProvider, formBuilder, alertCtrl) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.resetPasswordForm = formBuilder.group({
            email: ['',
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_4__validators_email__["a" /* EmailValidator */].isValid])],
        });
    }
    ResetPasswordPage.prototype.resetPassword = function () {
        var _this = this;
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        }
        else {
            this.authProvider.resetPassword(this.resetPasswordForm.value.email)
                .then(function (user) {
                var alert = _this.alertCtrl.create({
                    message: "We sent you a reset link to your email",
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel',
                            handler: function () { _this.navCtrl.pop(); }
                        }
                    ]
                });
                alert.present();
            }, function (error) {
                var errorMessage = error.message;
                var errorAlert = _this.alertCtrl.create({
                    message: errorMessage,
                    buttons: [{ text: "Ok", role: 'cancel' }]
                });
                errorAlert.present();
            });
        }
    };
    ResetPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-reset-password',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\reset-password\reset-password.html"*/'<ion-content padding>\n  <form [formGroup]="resetPasswordForm" (submit)="resetPassword()" novalidate>\n\n    <ion-item>\n      <ion-label stacked>Email</ion-label>\n      <ion-input formControlName="email" type="email" placeholder="Your email address" [class.invalid]="!resetPasswordForm.controls.email.valid && blur">\n      </ion-input>\n    </ion-item>\n\n    <button ion-button block type="submit" [disabled]="!resetPasswordForm.valid">\n      Reset your Password\n    </button>\n\n  </form>\n</ion-content>  '/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\reset-password\reset-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ResetPasswordPage);
    return ResetPasswordPage;
}());

//# sourceMappingURL=reset-password.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageSurveyPageModule", function() { return ManageSurveyPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_survey__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ManageSurveyPageModule = (function () {
    function ManageSurveyPageModule() {
    }
    ManageSurveyPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__manage_survey__["a" /* ManageSurveyPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__manage_survey__["a" /* ManageSurveyPage */]),
            ],
        })
    ], ManageSurveyPageModule);
    return ManageSurveyPageModule;
}());

//# sourceMappingURL=manage-survey.module.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultPageModule", function() { return ResultPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__result__ = __webpack_require__(696);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ResultPageModule = (function () {
    function ResultPageModule() {
    }
    ResultPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__result__["a" /* ResultPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__result__["a" /* ResultPage */]),
            ],
        })
    ], ResultPageModule);
    return ResultPageModule;
}());

//# sourceMappingURL=result.module.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyD_A4zAdiwsYY4hT3nRkZMc2_ppnAni_I4",
        authDomain: "project-survey-database.firebaseapp.com",
        databaseURL: "https://project-survey-database.firebaseio.com",
        projectId: "project-survey-database",
        storageBucket: "project-survey-database.appspot.com",
        messagingSenderId: "414613044698"
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(520);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(761);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_property_property__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_database_database__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_dashboard_dashboard__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_auth_auth__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_reset_password_reset_password__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_manage_survey_manage_survey_module__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__environments_environment__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_facebook__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_angularfire2_firestore__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_anwser_anwser_module__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_manage_answer_manage_answer__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_result_result_module__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_upload_service_upload_service__ = __webpack_require__(774);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_property_property__["a" /* PropertyPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_reset_password_reset_password__["a" /* ResetPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_24__components_manage_answer_manage_answer__["a" /* ManageAnswerComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/anwser/anwser.module#AnwserPageModule', name: 'answer-page', segment: 'anwser', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#Login1PageModule', name: 'login', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/manage-survey/manage-survey.module#ManageSurveyPageModule', name: 'manage-survey', segment: 'manage-survey', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/property/property.module#PropertyPageModule', name: 'PropertyPage', segment: 'property', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/result/result.module#ResultPageModule', name: 'chart-page', segment: 'result', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_17__pages_manage_survey_manage_survey_module__["ManageSurveyPageModule"],
                __WEBPACK_IMPORTED_MODULE_19_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_20__environments_environment__["a" /* environment */].firebase),
                __WEBPACK_IMPORTED_MODULE_16__angular_forms__["g" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_22_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_23__pages_anwser_anwser_module__["AnwserPageModule"],
                __WEBPACK_IMPORTED_MODULE_25__pages_result_result_module__["ResultPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_property_property__["a" /* PropertyPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_dashboard_dashboard__["a" /* DashboardPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_reset_password_reset_password__["a" /* ResetPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_24__components_manage_answer_manage_answer__["a" /* ManageAnswerComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_18_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_26__providers_upload_service_upload_service__["a" /* UploadServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnwserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AnwserPage = (function () {
    function AnwserPage(navCtrl, navParams, firestore) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firestore = firestore;
        this.answerForm = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormGroup */]({
            "listanswer": new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */]({ value: 'rust', disabled: false })
        });
    }
    AnwserPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad AnwserPage');
        this.nameSurvey = this.navParams.get('name');
        this.resultId = this.navParams.get('id');
        console.log(this.nameSurvey);
        var firestores = this.firestore.collection('RESULT');
        firestores.valueChanges().subscribe(function (res) {
            _this.result = res.filter(function (ele) { return ele.surveyUid == _this.resultId; });
            console.log(_this.result);
        });
    };
    AnwserPage.prototype.addAnswer = function (tAnswer) {
        var userId = __WEBPACK_IMPORTED_MODULE_4_firebase__["auth"]().currentUser.uid;
        if (tAnswer.count === undefined) {
            tAnswer.count = 1;
        }
        else {
            tAnswer.count += 1;
        }
        var tempHistory = {
            userId: userId,
            surveyUid: tAnswer.surveyUid
        };
        this.firestore.collection('HISTORY').add(tempHistory);
        this.firestore.doc("RESULT/" + tAnswer.answerUid).update(tAnswer);
    };
    AnwserPage.prototype.getValueradio = function (dataAnswer, surveyId) {
        var sourceAnswer = new Array();
        dataAnswer.forEach(function (e) {
            sourceAnswer.push(e);
        });
        sourceAnswer = sourceAnswer.filter(function (ans) { return ans.surveyUid === surveyId; });
        // console.log(surveyId, sourceAnswer[0].answers);
        return sourceAnswer[0].answers;
    };
    AnwserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-anwser',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\anwser\anwser.html"*/'<!--\n  Generated template for the AnwserPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>ANSWER</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<!-- (submit)="doSubmit($event)" -->\n<ion-content padding>\n  <!-- <div class="formAnswer"> -->\n  <ion-item calss="formQuestion">\n    <div>\n      <label class="question">\n        Q: {{nameSurvey}}\n      </label>\n    </div>\n    <hr>\n    <!-- </div> -->\n    <form [formGroup]="answerForm">\n      <ion-list radio-group formControlName="listanswer" [(ngModel)]="theanswer">\n        <ion-item *ngFor="let ans of result">\n          <ion-label>{{ans.answer}} </ion-label>\n          <ion-radio [value]="ans"></ion-radio>\n        </ion-item>\n      </ion-list>\n      <button block outline ion-button (click)="addAnswer(theanswer)">Vote</button>\n    </form>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\anwser\anwser.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], AnwserPage);
    return AnwserPage;
}());

//# sourceMappingURL=anwser.js.map

/***/ }),

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_anwser_filter_pages_anwser_filter__ = __webpack_require__(685);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__pages_anwser_filter_pages_anwser_filter__["a" /* PagesAnwserFilterPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__pages_anwser_filter_pages_anwser_filter__["a" /* PagesAnwserFilterPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagesAnwserFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the PagesAnwserFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var PagesAnwserFilterPipe = (function () {
    function PagesAnwserFilterPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    PagesAnwserFilterPipe.prototype.transform = function (value) {
        if (value) {
            console.log("pepepepeppepepep", value);
        }
        return value;
    };
    PagesAnwserFilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'pagesAnwserFilter',
        })
    ], PagesAnwserFilterPipe);
    return PagesAnwserFilterPipe;
}());

//# sourceMappingURL=pages-anwser-filter.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResultPage = (function () {
    function ResultPage(navCtrl, navParams, firestore) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.firestore = firestore;
    }
    ResultPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.resultId = this.navParams.get('id');
        this.nameSurvey = this.navParams.get('name');
        this.answer = this.navParams.get('answer');
        console.log(this.nameSurvey);
        var firestores = this.firestore.collection('RESULT');
        firestores.valueChanges().subscribe(function (res) {
            _this.result = res.filter(function (ele) { return ele.surveyUid == _this.resultId; });
            console.log(_this.result);
            _this.getPieChart(_this.result);
        });
    };
    ResultPage.prototype.getChart = function (context, chartType, data, options) {
        return new __WEBPACK_IMPORTED_MODULE_2_chart_js__["Chart"](context, {
            type: chartType,
            data: data,
            options: options
        });
    };
    ResultPage.prototype.getPieChart = function (dataPie) {
        var sourceCount = new Array();
        var sourceAnswer = new Array();
        dataPie.forEach(function (e) {
            sourceAnswer.push(e.answer);
            sourceCount.push(e.count);
        });
        console.log(sourceCount);
        var data = {
            labels: sourceAnswer,
            datasets: [
                {
                    data: sourceCount,
                    backgroundColor: ["#FF6384", "#E84162", "#FF6354", "#36A2EB", "#FFEF49", "#FFCE56", "#000", "#FF8D47", "#2CF6DB", "#E85B4E"],
                }
            ]
        };
        return this.getChart(this.pieCanvas.nativeElement, "pie", data);
    };
    ResultPage.prototype.goHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('pieCanvas'),
        __metadata("design:type", Object)
    ], ResultPage.prototype, "pieCanvas", void 0);
    ResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-result',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\result\result.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Result</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <label>\n      Q: {{nameSurvey}}\n    </label>\n    <ion-card-content>\n      <canvas #pieCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-list>\n    <ion-item *ngFor="let item of result">\n      <ion-item>\n        {{item.answer}}: {{item.count?item.count:0}}\n      </ion-item>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\result\result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */]])
    ], ResultPage);
    return ResultPage;
}());

//# sourceMappingURL=result.js.map

/***/ }),

/***/ 725:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 340,
	"./af.js": 340,
	"./ar": 341,
	"./ar-dz": 342,
	"./ar-dz.js": 342,
	"./ar-kw": 343,
	"./ar-kw.js": 343,
	"./ar-ly": 344,
	"./ar-ly.js": 344,
	"./ar-ma": 345,
	"./ar-ma.js": 345,
	"./ar-sa": 346,
	"./ar-sa.js": 346,
	"./ar-tn": 347,
	"./ar-tn.js": 347,
	"./ar.js": 341,
	"./az": 348,
	"./az.js": 348,
	"./be": 349,
	"./be.js": 349,
	"./bg": 350,
	"./bg.js": 350,
	"./bm": 351,
	"./bm.js": 351,
	"./bn": 352,
	"./bn.js": 352,
	"./bo": 353,
	"./bo.js": 353,
	"./br": 354,
	"./br.js": 354,
	"./bs": 355,
	"./bs.js": 355,
	"./ca": 356,
	"./ca.js": 356,
	"./cs": 357,
	"./cs.js": 357,
	"./cv": 358,
	"./cv.js": 358,
	"./cy": 359,
	"./cy.js": 359,
	"./da": 360,
	"./da.js": 360,
	"./de": 361,
	"./de-at": 362,
	"./de-at.js": 362,
	"./de-ch": 363,
	"./de-ch.js": 363,
	"./de.js": 361,
	"./dv": 364,
	"./dv.js": 364,
	"./el": 365,
	"./el.js": 365,
	"./en-au": 366,
	"./en-au.js": 366,
	"./en-ca": 367,
	"./en-ca.js": 367,
	"./en-gb": 368,
	"./en-gb.js": 368,
	"./en-ie": 369,
	"./en-ie.js": 369,
	"./en-il": 370,
	"./en-il.js": 370,
	"./en-nz": 371,
	"./en-nz.js": 371,
	"./eo": 372,
	"./eo.js": 372,
	"./es": 373,
	"./es-do": 374,
	"./es-do.js": 374,
	"./es-us": 375,
	"./es-us.js": 375,
	"./es.js": 373,
	"./et": 376,
	"./et.js": 376,
	"./eu": 377,
	"./eu.js": 377,
	"./fa": 378,
	"./fa.js": 378,
	"./fi": 379,
	"./fi.js": 379,
	"./fo": 380,
	"./fo.js": 380,
	"./fr": 381,
	"./fr-ca": 382,
	"./fr-ca.js": 382,
	"./fr-ch": 383,
	"./fr-ch.js": 383,
	"./fr.js": 381,
	"./fy": 384,
	"./fy.js": 384,
	"./gd": 385,
	"./gd.js": 385,
	"./gl": 386,
	"./gl.js": 386,
	"./gom-latn": 387,
	"./gom-latn.js": 387,
	"./gu": 388,
	"./gu.js": 388,
	"./he": 389,
	"./he.js": 389,
	"./hi": 390,
	"./hi.js": 390,
	"./hr": 391,
	"./hr.js": 391,
	"./hu": 392,
	"./hu.js": 392,
	"./hy-am": 393,
	"./hy-am.js": 393,
	"./id": 394,
	"./id.js": 394,
	"./is": 395,
	"./is.js": 395,
	"./it": 396,
	"./it.js": 396,
	"./ja": 397,
	"./ja.js": 397,
	"./jv": 398,
	"./jv.js": 398,
	"./ka": 399,
	"./ka.js": 399,
	"./kk": 400,
	"./kk.js": 400,
	"./km": 401,
	"./km.js": 401,
	"./kn": 402,
	"./kn.js": 402,
	"./ko": 403,
	"./ko.js": 403,
	"./ky": 404,
	"./ky.js": 404,
	"./lb": 405,
	"./lb.js": 405,
	"./lo": 406,
	"./lo.js": 406,
	"./lt": 407,
	"./lt.js": 407,
	"./lv": 408,
	"./lv.js": 408,
	"./me": 409,
	"./me.js": 409,
	"./mi": 410,
	"./mi.js": 410,
	"./mk": 411,
	"./mk.js": 411,
	"./ml": 412,
	"./ml.js": 412,
	"./mr": 413,
	"./mr.js": 413,
	"./ms": 414,
	"./ms-my": 415,
	"./ms-my.js": 415,
	"./ms.js": 414,
	"./mt": 416,
	"./mt.js": 416,
	"./my": 417,
	"./my.js": 417,
	"./nb": 418,
	"./nb.js": 418,
	"./ne": 419,
	"./ne.js": 419,
	"./nl": 420,
	"./nl-be": 421,
	"./nl-be.js": 421,
	"./nl.js": 420,
	"./nn": 422,
	"./nn.js": 422,
	"./pa-in": 423,
	"./pa-in.js": 423,
	"./pl": 424,
	"./pl.js": 424,
	"./pt": 425,
	"./pt-br": 426,
	"./pt-br.js": 426,
	"./pt.js": 425,
	"./ro": 427,
	"./ro.js": 427,
	"./ru": 428,
	"./ru.js": 428,
	"./sd": 429,
	"./sd.js": 429,
	"./se": 430,
	"./se.js": 430,
	"./si": 431,
	"./si.js": 431,
	"./sk": 432,
	"./sk.js": 432,
	"./sl": 433,
	"./sl.js": 433,
	"./sq": 434,
	"./sq.js": 434,
	"./sr": 435,
	"./sr-cyrl": 436,
	"./sr-cyrl.js": 436,
	"./sr.js": 435,
	"./ss": 437,
	"./ss.js": 437,
	"./sv": 438,
	"./sv.js": 438,
	"./sw": 439,
	"./sw.js": 439,
	"./ta": 440,
	"./ta.js": 440,
	"./te": 441,
	"./te.js": 441,
	"./tet": 442,
	"./tet.js": 442,
	"./tg": 443,
	"./tg.js": 443,
	"./th": 444,
	"./th.js": 444,
	"./tl-ph": 445,
	"./tl-ph.js": 445,
	"./tlh": 446,
	"./tlh.js": 446,
	"./tr": 447,
	"./tr.js": 447,
	"./tzl": 448,
	"./tzl.js": 448,
	"./tzm": 449,
	"./tzm-latn": 450,
	"./tzm-latn.js": 450,
	"./tzm.js": 449,
	"./ug-cn": 451,
	"./ug-cn.js": 451,
	"./uk": 452,
	"./uk.js": 452,
	"./ur": 453,
	"./ur.js": 453,
	"./uz": 454,
	"./uz-latn": 455,
	"./uz-latn.js": 455,
	"./uz.js": 454,
	"./vi": 456,
	"./vi.js": 456,
	"./x-pseudo": 457,
	"./x-pseudo.js": 457,
	"./yo": 458,
	"./yo.js": 458,
	"./zh-cn": 459,
	"./zh-cn.js": 459,
	"./zh-hk": 460,
	"./zh-hk.js": 460,
	"./zh-tw": 461,
	"./zh-tw.js": 461
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 725;

/***/ }),

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_property_property__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environments_environment__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_manage_survey_manage_survey__ = __webpack_require__(185);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










// import { AngularFirestore } from 'angularfire2/firestore';
var MyApp = (function () {
    function MyApp(menu, platform, statusBar, splashScreen) {
        var _this = this;
        this.menu = menu;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Quickpoll', component: __WEBPACK_IMPORTED_MODULE_9__pages_manage_survey_manage_survey__["a" /* ManageSurveyPage */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */] }
        ];
        //1
        var unsubscribe = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.auth().onAuthStateChanged(function (user) {
            if (!user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
                unsubscribe();
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
                unsubscribe();
            }
            _this.username = user.email;
        });
    }
    MyApp.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
    };
    MyApp.prototype.ionViewWillLeave = function () {
        this.menu.swipeEnable(true);
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_6__environments_environment__["a" /* environment */].firebase);
    };
    // openPage(page) {
    //   // Reset the content nav to have just this page
    //   // we wouldn't want the back button to show in this scenario
    //   this.nav.setRoot(page.component);
    // }
    MyApp.prototype.goSurvey = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_property_property__["a" /* PropertyPage */]);
        this.menu.close();
        this.menu.swipeEnable(false);
    };
    MyApp.prototype.goLogin = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]);
        this.menu.close();
        this.menu.swipeEnable(false);
    };
    MyApp.prototype.goHome = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]);
        this.menu.close();
        this.menu.swipeEnable(false);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-app',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="content">\n    <ion-card class="card-wallpaper">\n      <div class="info">\n        <img src="/assets/imgs/obama.png" alt="" class="avatar">\n        <div class="userinfo">\n          <h2 class="name"> {{ username }} </h2>\n          <!-- <p>obamab@dxc.com</p> -->\n        </div>\n      </div>\n    </ion-card>\n    <!-- end ion-card -->\n    <div class="option">\n      <ion-grid>\n        <ion-row class="ionrow-list">\n          <ion-col col-12 class="ioncol-list">\n            <h2 class="assets" (click)="goHome()">\n              <ion-icon ios="ios-home-outline" md="md-home" class="ioncol-icon"></ion-icon>\n              Home </h2>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    <!-- start option -->\n    <div class="option">\n      <ion-grid>\n        <ion-row class="ionrow-list">\n          <ion-col col-12 class="ioncol-list">\n            <h2 class="assets" (click)="goSurvey()">\n              <ion-icon ios="ios-list-outline" md="md-list" class="ioncol-icon"></ion-icon>\n              My Survey\n            </h2>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    <!-- end option -->\n\n    <ion-row class="ionrow-list">\n      <ion-col col-12 class="ioncol-list">\n        <h2 class="assets" (click)="goLogin()">\n          <ion-icon ios="ios-log-out" md="md-log-out" class="ioncol-icon"></ion-icon>\n          Log out\n        </h2>\n      </ion-col>\n    </ion-row>\n  </ion-content>\n\n</ion-menu>\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var User = (function () {
    function User(name, email) {
        this.name = name;
        this.email = this.email;
    }
    return User;
}());

var AuthServiceProvider = (function () {
    function AuthServiceProvider() {
    }
    AuthServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.name === null) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].create(function (observer) {
                var access = (credentials.password === "123" && credentials.email === "phuong");
                _this.currentUser = new User("Obama", "obamab@gmail.com");
                observer.next(access);
                observer.complete();
            });
        }
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageAnswerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ManageAnswerComponent = (function () {
    function ManageAnswerComponent() {
        console.log('Hello ManageAnswerComponent Component');
        this.text = 'Hello World';
    }
    ManageAnswerComponent.prototype.removeAnswer = function () {
        this._ref.destroy();
    };
    ManageAnswerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'manage-answer',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\components\manage-answer\manage-answer.html"*/'<ion-item>\n    <ion-label stacked>Answer:</ion-label>\n    <ion-input type="text" formControlName="answer" [(ngModel)]="answer"></ion-input>\n    <ion-icon ios="ios-close" md="md-close" item-right (click)="removeAnswer()"></ion-icon>\n</ion-item>'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\components\manage-answer\manage-answer.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ManageAnswerComponent);
    return ManageAnswerComponent;
}());

//# sourceMappingURL=manage-answer.js.map

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the UploadServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UploadServiceProvider = (function () {
    function UploadServiceProvider(http) {
        this.http = http;
        console.log('Hello UploadServiceProvider Provider');
    }
    UploadServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], UploadServiceProvider);
    return UploadServiceProvider;
}());

//# sourceMappingURL=upload-service.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, firestore, navParams, _DB, _ALERT) {
        this.navCtrl = navCtrl;
        this.firestore = firestore;
        this.navParams = navParams;
        this._DB = _DB;
        this._ALERT = _ALERT;
        this._COLL = '';
        this._DOC = '';
        this._COLL = "SURVEY";
        this._CONTENT = {
            name: "",
            timeStart: "",
            timeEnd: "",
            id: ""
        };
    }
    HomePage.prototype.goAnswer = function (id, name) {
        var _this = this;
        console.log(name);
        var userId = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.uid;
        this.firestore.collection('HISTORY').valueChanges().subscribe(function (res) {
            var filter = res.find(function (ele) {
                if (ele.surveyUid.indexOf(id) > -1 && ele.userId == userId) {
                    return true;
                }
            });
            if (filter) {
                _this.navCtrl.setRoot('chart-page', { id: id, name: name });
            }
            else {
                _this.navCtrl.push('answer-page', { id: id, name: name });
            }
        });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        this.getUsers();
        this.retrieveCollection();
    };
    //function search
    HomePage.prototype.getItems = function (input) {
        var searchKeyword = input.target.value;
        if (searchKeyword != null) {
            this.filterItems = this.surveys.filter(function (survey) { return survey.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1; });
        }
        else {
            this.filterItems = this.surveys;
        }
    };
    HomePage.prototype.getUsers = function () {
        var _this = this;
        this.firestore.collection('USER').valueChanges().subscribe(function (users) {
            _this.users = users;
        });
    };
    HomePage.prototype.generateCollectionAndSurvey = function () {
        this._DB.createAndPopulateDocument(this._COLL, this._DOC, this._CONTENT)
            .then(function (data) {
            console.dir(data);
        })
            .catch(function (error) {
            console.dir(error);
        });
    };
    HomePage.prototype.retrieveCollection = function () {
        var _this = this;
        this.firestore.collection('SURVEY').valueChanges().subscribe(function (surveys) {
            var sourceSurveys = surveys.map(function (survey) {
                var author = _this.users.find(function (user) {
                    return user.userUid.indexOf(survey.userUid) > -1;
                });
                console.log({ data: survey });
                return { data: survey, author: author };
            });
            _this.filterItems = sourceSurveys;
            _this.surveys = sourceSurveys;
        });
    };
    HomePage.prototype.addSurvey = function () {
        this.navCtrl.push('manage-survey');
    };
    HomePage.prototype.updateSurvey = function (obj) {
        var params = {
            collection: this._COLL,
            survey: obj
        };
        this.navCtrl.push('answer', { record: params, isEdited: true });
    };
    HomePage.prototype.deleteSurvey = function (obj) {
        var _this = this;
        this._DB.deleteDocument(this._COLL, obj.id)
            .then(function (data) {
            _this.retrieveCollection();
            // this.displayAlert('Success', 'The survey ' + '"' + obj.name + '"' + ' was successfully removed');
        })
            .catch(function (error) {
            _this.displayAlert('Error', error.message);
        });
    };
    HomePage.prototype.displayAlert = function (title, message) {
        var _this = this;
        var alert = this._ALERT.create({
            title: title,
            subTitle: message,
            buttons: [{
                    text: 'Got It!',
                    handler: function () {
                        _this.retrieveCollection();
                    }
                }]
        });
        alert.present();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PropertyPage');
    };
    HomePage.prototype.goDashboardPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__dashboard_dashboard__["a" /* DashboardPage */]);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\DXC\surveyCloudFinal\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title class="title">T-SURVEY</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addSurvey()">\n        <ion-icon ios="ios-add-circle-outline" md="md-add-circle" class="avatar"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-row>\n    <ion-searchbar class="search" (ionInput)="getItems($event)"></ion-searchbar>\n  </ion-row>\n  <ion-list>\n    <ion-item-sliding *ngFor="let survey of filterItems">\n      <ion-item class="items" (click)="goAnswer(survey.data?.surveyUid ,survey.data?.name)">\n        <h2>{{ survey.data?.name }}</h2>\n        <p>\n          Author: {{ survey.author?.email }}\n        </p>\n      </ion-item>\n    </ion-item-sliding>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"D:\DXC\surveyCloudFinal\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[505]);
//# sourceMappingURL=main.js.map