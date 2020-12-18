'use strict';

angular.module('fvs').controller('ListUserCtrl', function ($firebaseArray,$scope) {

    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var accept = document.getElementById("accept");

    $("#editBtn").click(function() {
        modal.style.display = "block";
    });

    var ref = firebase.database().ref('/users');

    var username, email, role, id;

    $scope.clickedUser = {};

    $scope.data = $firebaseArray(ref);
    ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // var childKey = childSnapshot.key();
            var childData = childSnapshot.val();
            // $scope.data = childSnapshot.val();
            // console.log($scope.data);

            username = childSnapshot.child('username').val();
            // fullname = childSnapshot.child('fullname').val();
            // address = childSnapshot.child('address').val();
            // country = childSnapshot.child('country').val();
            // number = childSnapshot.child('number').val();
            email = childSnapshot.child('email').val();
            role = childSnapshot.child('role').val();

        })
    });

    $scope.selectUser = function(users) {
        // console.log(users);
        $scope.clickedUser = users;
        id = users;
        // modal.style.display = "block";
        $('#myModal').modal('show');
    };

    $scope.selectUser2 = function(users) {
        // console.log(users);
        $scope.clickedUser = users;
        id = users;
        // modal2.style.display = "block";
        $('#myModal2').modal('show');
    };

    $scope.updateUser = function() {
        var ref2 = firebase.database().ref("users/" + id.$id);
        ref2.update({
            fullname: $scope.clickedUser.fullname,
            email: $scope.clickedUser.email,
            id: $scope.clickedUser.id,
            // country: $scope.clickedUser.country,
            // gender: $scope.clickedUser.gender,
            role: $scope.clickedUser.role
        })

        modal.style.display = "none";

    };

    $scope.deleteUser = function() {
        var ref = firebase.database().ref("users/" + id.$id);
        ref.remove();
        // modal2.style.display = "none";
        $('#myModal2').modal('hide');
    };

    $scope.close = function() {
        // modal.style.display = "none";
        $('#myModal').modal('hide');
    };

    $scope.close2 = function() {
        // modal2.style.display = "none";
        $('#myModal2').modal('hide');
    };


    // console.log(email);

    $(document).ready(function () {
        // $("#myInput").on("keyup", function() {
        //   var value = $(this).val().toLowerCase();
        //   $("#myTable tr").filter(function() {
        //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        //   });
        // });

        $("#service").change(function () {
            $scope.select();
        });
        $("#search").keyup(function () {
            $scope.select();
        });
        $("#status").change(function () {
            $scope.select();
        });

        $scope.select = function () {
            var service = $("#service").val().toLowerCase();
            var search = $("#search").val().toLowerCase();
            var status = $("#status").val().toLowerCase();
            // $(".box").hide();
            var boxes = $("#myTable tr").filter(function (index) {

                return $(this).toggle((service === 'all' || $(this).text().toLowerCase().indexOf(service) >= 0) &&
                    (!search || $(this).text().toLowerCase().indexOf(search) >= 0) &&
                    (status === 'all' || $(this).text().toLowerCase().indexOf(status) >= 0));
            });

        }
    });

});