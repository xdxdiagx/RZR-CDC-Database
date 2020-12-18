'use strict';

angular.module('fvs').controller('NewBuyerCtrl', function ($scope) {

    var commissionIncentiveText;
    var commissionBase, downPayment, balance, monthlyAmortization, monthlyAmortizationRoundOFF, buyersGrossIncome, 
    agencyTotal, agencyWitholdingTax, agencyBrokersTax,salesAgentTotal, salesAgentWitholdingTax, salesAgentBrokersTax, BMTotal, BMWitholdingTax, BMBrokersTax, 
    LBTotal, LBWitholdingTax, LBBrokersTax;
    var PBRateLessThan = true;

    $scope.myFunc = function () {
        // var payment = document.getElementById("payment");
        var payment = $('#payment').val();
        if (payment == "Cash") {
            console.log("Cash");
            $('#monthly').hide();
            $('#cash').show();
        } else if (payment == "Monthly Installment") {
            console.log("Monthly Installment");
            $('#cash').hide();
            $('#monthly').show();
        }
    };

    $scope.myFunc2 = function () {
        // var payment = document.getElementById("payment");
        var status = $('#status').val();
        if (status == "New Reservation") {
            commissionIncentiveText = "For Incentive Billing";
            document.getElementById("textSuccess").innerHTML = "For Incentive Billing";
            document.getElementById("textDanger").innerHTML = "";
            $('#dpInstallment').hide();
            $('#dpStatus').hide();
            $('#lpStatus').hide();
            $('#reason').hide();
        } else if (status == "Cash Downpayment") {
            commissionIncentiveText = "For Full Commission Blling";
            document.getElementById("textSuccess").innerHTML = "For Full Commission Blling";
            document.getElementById("textDanger").innerHTML = "";
            $('#dpInstallment').hide();
            $('#dpStatus').hide();
            $('#lpStatus').hide();
            $('#reason').hide();
        } else if (status == "DP Installment") {
            // commissionIncentiveText = "For Partial Commission Blling";
            // document.getElementById("textSuccess").innerHTML = "For Partial Commission Blling";
            $('#dpInstallment').show();
            $('#dpStatus').hide();
            $('#lpStatus').hide();
            $('#reason').hide();
        } else if (status == "Loan Processing") {
            commissionIncentiveText = "";
            document.getElementById("textSuccess").innerHTML = "";
            document.getElementById("textDanger").innerHTML = "";
            $('#dpInstallment').hide();
            $('#lpStatus').show();
            $('#dpStatus').hide();
            $('#reason').hide();
        } else if (status == "Release") {
            commissionIncentiveText = "For Full Commission Blling";
            document.getElementById("textSuccess").innerHTML = "For Full Commission Blling";
            document.getElementById("textDanger").innerHTML = "";
            $('#dpInstallment').hide();
            $('#dpStatus').hide();
            $('#lpStatus').hide();
            $('#reason').hide();
        }
    };

    $scope.myFunc3 = function () {
        // var payment = document.getElementById("payment");
        var dpInstallment = $('#DPInstallmentStatus').val();
        if (dpInstallment == "Deliquent") {
            commissionIncentiveText = "For Compliance";
            document.getElementById("textDanger").innerHTML = "For Compliance";
            document.getElementById("textSuccess").innerHTML = "";
            // $('#monthly').hide();
            $('#reason').show();
        } else if (dpInstallment == "Updated") {
            commissionIncentiveText = "For Partial Commission Blling";
            document.getElementById("textSuccess").innerHTML = "For Partial Commission Blling";
            document.getElementById("textDanger").innerHTML = "";
            $('#reason').hide();
        } else if (dpInstallment == "Cancelled") {
            commissionIncentiveText = "Unbillable";
            document.getElementById("textDanger").innerHTML = "Unbillable";
            document.getElementById("textSuccess").innerHTML = "";
            $('#reason').hide();
        } else if (dpInstallment == "Back-out") {
            commissionIncentiveText = "Unbillable";
            document.getElementById("textDanger").innerHTML = "Unbillable";
            document.getElementById("textSuccess").innerHTML = "";
            $('#reason').hide();
        }
    };

    $scope.NDIFactor = function () {
        // var payment = document.getElementById("payment");
        var ndiFactor = $('#ndiFactor').val();
        if (ndiFactor == ".30") {
            buyersGrossIncome = monthlyAmortizationRoundOFF / .30;
            // console.log(buyersGrossIncome.toFixed(2));
            $("#buyersNetDisposableIncome").val(buyersGrossIncome.toFixed(2));

        } else if (ndiFactor == ".35") {
            buyersGrossIncome = monthlyAmortizationRoundOFF / .35;
            // console.log(buyersGrossIncome.toFixed(2));
            $("#buyersNetDisposableIncome").val(buyersGrossIncome.toFixed(2));
        } else if (ndiFactor == ".40") {
            buyersGrossIncome = monthlyAmortizationRoundOFF / .40;
            // console.log(buyersGrossIncome.toFixed(2));
            $("#buyersNetDisposableIncome").val(buyersGrossIncome.toFixed(2));
        }
    };

    $scope.projectBasedRate = function () {
        // var payment = document.getElementById("payment");
        var agencyRate = $('#agencyRate').val();
        if (agencyRate == "3.5") {
            PBRateLessThan = true;
            agencyTotal = commissionBase * 0.035;
            agencyWitholdingTax = agencyTotal * 0.1;
            agencyBrokersTax = agencyTotal * 0.03;
            // console.log(agencyTotal.toFixed(2));
            $("#agencyTotal").val(agencyTotal.toFixed(2));
            $("#agencyWitholdingTax").val(agencyWitholdingTax.toFixed(2));
            $("#agencyBrokersTax").val(agencyBrokersTax.toFixed(2));

        } else if (agencyRate == "5.0") {
            PBRateLessThan = true;
            agencyTotal = commissionBase * 0.05;
            agencyWitholdingTax = agencyTotal * 0.1;
            agencyBrokersTax = agencyTotal * 0.03;
            // console.log(agencyTotal.toFixed(2));
            $("#agencyTotal").val(agencyTotal.toFixed(2));
            $("#agencyWitholdingTax").val(agencyWitholdingTax.toFixed(2));
            $("#agencyBrokersTax").val(agencyBrokersTax.toFixed(2));
        } else if (agencyRate == "6") {
            PBRateLessThan = true;
            agencyTotal = commissionBase * 0.06;
            agencyWitholdingTax = agencyTotal * 0.1;
            agencyBrokersTax = agencyTotal * 0.03;
            // console.log(agencyTotal.toFixed(2));
            $("#agencyTotal").val(agencyTotal.toFixed(2));
            $("#agencyWitholdingTax").val(agencyWitholdingTax.toFixed(2));
            $("#agencyBrokersTax").val(agencyBrokersTax.toFixed(2));
        } else if (agencyRate == "6.5") {
            PBRateLessThan = false;
            agencyTotal = commissionBase * 0.065;
            agencyWitholdingTax = agencyTotal * 0.15;
            agencyBrokersTax = agencyTotal * 0.03;
            // console.log(agencyTotal.toFixed(2));
            $("#agencyTotal").val(agencyTotal.toFixed(2));
            $("#agencyWitholdingTax").val(agencyWitholdingTax.toFixed(2));
            $("#agencyBrokersTax").val(agencyBrokersTax.toFixed(2));
        }
    };

    $("#DP").on("keyup", function() {
        calculateSum();
    });
    $("#commissionBase").on("keyup", function() {
        calculateSum();
        commissionBase = $("#commissionBase").val();
        $("#commissionBase2").val(commissionBase);
    });
    $("#factorRate").on("keyup", function() {
        // calculateSum();
        var factorRate = $("#factorRate").val();
        monthlyAmortization = balance * factorRate;
        // console.log(Math.round(monthlyAmortization));
        $("#monthlyAmortization").val(Math.round(monthlyAmortization));
        monthlyAmortizationRoundOFF = Math.round(monthlyAmortization);
    });
    $("#salesPersonCommisionRate").on("keyup", function() {
        // calculateSum();
        var salesPersonCommisionRate = $("#salesPersonCommisionRate").val();
        var convertedSPCommissionRate = salesPersonCommisionRate / 100;
        var toReceive;
        salesAgentTotal =  convertedSPCommissionRate * commissionBase;
        if(PBRateLessThan){
            salesAgentWitholdingTax = salesAgentTotal * 0.1;
            salesAgentBrokersTax = salesAgentTotal * 0.03;
            toReceive = salesAgentTotal - salesAgentWitholdingTax - salesAgentBrokersTax;
        } else {
            salesAgentWitholdingTax = salesAgentTotal * 0.15;
            salesAgentBrokersTax = salesAgentTotal * 0.03;
            toReceive = salesAgentTotal - salesAgentWitholdingTax - salesAgentBrokersTax;
        }
        // console.log(agencyTotal.toFixed(2));
        $("#salespersonTotal").val(salesAgentTotal.toFixed(2));
        $("#salespersonWitholdingTax").val(salesAgentWitholdingTax.toFixed(2));
        $("#salespersonBrokersTax").val(salesAgentBrokersTax.toFixed(2));
        $("#salesPersonAfterTax").val(toReceive.toFixed(2));

        // $("#commissionBase2").val(commissionBase);
        // $("#commissionBase2").val(commissionBase);
    });
    $("#branchManagerCommisionRate").on("keyup", function() {
        // calculateSum();
        var branchManagerCommisionRate = $("#branchManagerCommisionRate").val();
        var convertedBMCommissionRate = branchManagerCommisionRate / 100;
        var toReceive;
        BMTotal =  convertedBMCommissionRate * commissionBase;
        if(PBRateLessThan){
            BMWitholdingTax = BMTotal * 0.1;
            BMBrokersTax = BMTotal * 0.03;
            toReceive = BMTotal - BMWitholdingTax - BMBrokersTax;
        } else {
            BMWitholdingTax = BMTotal * 0.15;
            BMBrokersTax = BMTotal * 0.03;
            toReceive = BMTotal - BMWitholdingTax - BMBrokersTax;
        }
        // console.log(agencyTotal.toFixed(2));
        $("#branchManagerTotal").val(BMTotal.toFixed(2));
        $("#branchManagerWitholdingTax").val(BMWitholdingTax.toFixed(2));
        $("#branchManagerBrokersTax").val(BMBrokersTax.toFixed(2));
        $("#branchManagerAfterTax").val(toReceive.toFixed(2));

        // $("#commissionBase2").val(commissionBase);
        // $("#commissionBase2").val(commissionBase);
    });
    $("#leadBrokerCommisionRate").on("keyup", function() {
        // calculateSum();
        var leadBrokerCommisionRate = $("#leadBrokerCommisionRate").val();
        var convertedLBCommissionRate = leadBrokerCommisionRate / 100;
        var toReceive;
        LBTotal =  convertedLBCommissionRate * commissionBase;
        if(PBRateLessThan){
            LBWitholdingTax = LBTotal * 0.1;
            LBBrokersTax = LBTotal * 0.03;
            toReceive = LBTotal - LBWitholdingTax - LBBrokersTax;
        } else {
            LBWitholdingTax = LBTotal * 0.15;
            LBBrokersTax = LBTotal * 0.03;
            toReceive = LBTotal - LBWitholdingTax - LBBrokersTax;
        }
        // console.log(agencyTotal.toFixed(2));
        $("#leadBrokerTotal").val(LBTotal.toFixed(2));
        $("#leadBrokerWitholdingTax").val(LBWitholdingTax.toFixed(2));
        $("#leadBrokerBrokersTax").val(LBBrokersTax.toFixed(2));
        $("#leadBrokerAfterTax").val(toReceive.toFixed(2));

        // $("#commissionBase2").val(commissionBase);
        // $("#commissionBase2").val(commissionBase);
    });

    function calculateSum() {
        var total = 100;

        var dp = $("#DP").val();

        dp = total - dp;

        $("#balance").val(dp);
        // downPayment = dp;
        balance = commissionBase * ("." + dp);
        // console.log(balance);

        // $("#sum3").html(sum.toFixed(2));
        // console.log(dp);
    }

    $scope.addBuyerSubmit = function () {
        var ref2 = firebase.database().ref("/buyer");
        var current = firebase.auth().currentUser;
        var fName = $("#fName").val();
        var surName = $("#surName").val();
        var commission;
        var projName = $("#projName").val();
        // var middlename = $("#mName").val();
        // var surname = $("#surName").val();
        // var sufficesname = $("#sufName").val();
        // var cellNo = $("#cellNo").val();

        if (projName == "Camella") {
            commission = 0.3;
        } else if (projName == "Deca") {
            commission = 0.5;
        } else if (projName == "Imperial") {
            commission = 0.5;
        } else if (projName == "Parkview") {
            commission = 0.5;
        }

        if (fName && surName) {
            ref2.push({
                    firstname: $("#fName").val(),
                    surname: $("#surName").val(),
                    middlename: $("#mName").val(),
                    suffices: $("#sufName").val(),
                    cellphoneNo: $("#cellNo").val(),
                    telephoneNo: $("#telNo").val(),
                    fbname: $("#fbName").val(),
                    email: $("#emailAdd").val(),
                    address1: $("#add1").val(),
                    address2: $("#add2").val(),
                    employer: $("#employer").val(),
                    companyName: $("#companyName").val(),
                    companyPosition: $("#position").val(),
                    numberOfYears: $("#noOfYears").val(),
                    monthlyIncome: $("#monthlyIncome").val(),
                    allowance: $("#allowance").val(),
                    businessName: $("#businessName").val(),
                    businessType: $("#businessType").val(),
                    registration: $("#registration").val(),
                    monthlyGrossIncome: $("#monthlyGrossIncome").val(),
                    descriptionSelfEmployed: $("#descripSelfEmployed").val(),
                    monthlyGrossIncome2: $("#monthlyGrossIncome2").val(),
                    otherSources: $("#otherSources").val(),
                    monthlyGrossIncome3: $("#monthlyGrossIncome3").val(),
                    representativeName: $("#repName").val(),
                    representativeAdd: $("#repAdd").val(),
                    representativeOccupation: $("#repJob").val(),
                    representativeRelation: $("#repRelation").val(),
                    projectName: $("#projName").val(),
                    projectAdd: $("#projAdd").val(),
                    nameOfHead: $("#nameHead").val(),
                    nameHeadContactNo: $("#nameHeadContactNo").val(),





                    sellingPrice: $("#sellingPrice").val(),
                    contractPrice: $("#contractPrice").val(),
                    commissionBase: $("#commissionBase").val(),
                })
                .then(function (ref) {
                    console.log(ref.key);
                    ref2.child(ref.key).update({
                        key: ref.key
                    })

                    console.log('Added to database');
                    document.getElementById("success").innerHTML = "Data have been saved!";

                    setTimeout(() => {
                        document.getElementById("success").innerHTML = "";
                        window.location.href = "#"
                        window.location.href = "#NewBuyer"
                    }, 3000);

                    // $("#buyerLog").show();
                    // $("#buyerInfo").hide();
                    // $("#addBuyer").hide();
                });
        } else {
            document.getElementById("messages").innerHTML = "You need to fill up the form to submit!";

            setTimeout(() => {
                document.getElementById("messages").innerHTML = "";

            }, 5000);
        }




    };

    // addNew.onclick = function () {
    //     addNewUser();
    // }

    // newAgent.onsubmit = function () {
    //     addNewAgent();
    //     // console.log("test");
    //     return false;
    // }


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