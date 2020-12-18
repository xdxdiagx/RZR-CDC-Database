'use strict';

angular.module('fvs').controller('NewUsersCtrl', function ($scope) {

    var Base64 = {


        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


        encode: function (pwd) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            pwd = Base64._utf8_encode(pwd);

            while (i < pwd.length) {

                chr1 = pwd.charCodeAt(i++);
                chr2 = pwd.charCodeAt(i++);
                chr3 = pwd.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr
                    .charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },


        decode: function (pwd) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            pwd = pwd.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < pwd.length) {

                enc1 = this._keyStr.indexOf(pwd.charAt(i++));
                enc2 = this._keyStr.indexOf(pwd.charAt(i++));
                enc3 = this._keyStr.indexOf(pwd.charAt(i++));
                enc4 = this._keyStr.indexOf(pwd.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },

        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    }

    // addNew.onclick = function () {
    //     addNewUser();
    // }

    newAgent.onsubmit = function () {
        addNewAgent();
        // console.log("test");
        return false;
    }


    function addNewAgent() {

        var fullname = $('#fullname').val();
        var email = $('#email').val();
        var salesID = $('#salesID').val();
        var password = $('#password').val();
        var confirmPass = $('#confirmPass').val();


        if (password == confirmPass) {
            // console.log("Password Match")
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function (regUser) {

                    // console.log(regUser.user.email);

                    var ref = firebase.database().ref("users");
                    var ref2 = firebase.database().ref("agents");
                    ref.orderByChild("email").equalTo(regUser.user.email).once("value")
                        .then(function (snapshot) {

                            //Check if email is already exist in real time database
                            var exist = snapshot.exists();
                            if (!exist) {

                                var user = firebase.auth().currentUser;
                                var userId = user.uid;

                                ref.once("value")
                                    .then(function (snapshot) {
                                        //check if exist
                                        var r = snapshot.child(userId).exists();
                                        if (r !== true) {
                                            ref.child(userId).set({
                                                fullname: fullname,
                                                id: salesID,
                                                email: email,
                                                role: "agent"

                                            });
                                            ref2.child(userId).set({
                                                fullname: fullname,
                                                id: salesID,
                                                email: email

                                            });
                                            document.getElementById("success").innerHTML =
                                                "Data have been saved!";

                                            setTimeout(() => {

                                                document.getElementById("success").innerHTML =
                                                "";

                                                document.getElementById("fullname").value = "";
                                                document.getElementById("email").value = "";
                                                document.getElementById("salesID").value = "";
                                                document.getElementById("password").value = "";
                                                document.getElementById("confirmPass").value = "";

                                                // window.location.href = './index.html#/newUser';
                                            }, 3000);

                                        }
                                        return;

                                    });

                                // console.log("Account Doesn't exist!")
                                // window.location.href = './completion.html';
                            } else {

                                console.log("Email Already exist!")

                            }


                        });
                    // console.log(user.uid);
                    // $('#registerStyle').hide();
                    // $('#forgotStyle').hide();
                    // $('#loginStyle').show();
                    // document.getElementById("username").innerHTML = " ";
                    // document.getElementById("email").innerHTML = " ";
                    // document.getElementById("password").innerHTML = " ";
                    // window.location.href = './index.html';
                    // username = "";
                    // email = "";
                    // password = "";
                }).catch(function (error) {
                    console.log(error.code);
                    console.log(error.message);
                    document.getElementById("messages").innerHTML = error.message;

                    setTimeout(() => {
                        document.getElementById("messages").innerHTML = "";
                    }, 5000);
                });
        } else {
            // console.log("Password don't match");
            document.getElementById("messages").innerHTML = "Password don't match";

            setTimeout(() => {
                document.getElementById("messages").innerHTML = "";
            }, 5000);
        }

    }


});