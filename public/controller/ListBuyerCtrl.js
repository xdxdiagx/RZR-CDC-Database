'use strict';

angular.module('fvs').controller('ListBuyerCtrl', function ($firebaseArray,$scope, $timeout) {

    var modal = document.getElementById('myModal');
    var modal2 = document.getElementById('myModal2');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var accept = document.getElementById("accept");

    $("#editBtn").click(function() {
        modal.style.display = "block";
    });

    var ref = firebase.database().ref('/buyer');

    var username, email, role, id;

    $scope.clickedUser = {};

    firebase.database().ref('/buyer/').orderByChild('uid').on("value", function(snapshot) {
        console.log(snapshot.val())
        if (!localStorage.getItem('pf')) {
            if (localStorage.getItem('pf') <= 10) {
                localStorage.setItem('pf', 10)
            }
        }

        $timeout(function() {
            $scope.$apply(function() {

                var tcol = 0;
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                    // if (datetoday === item.date) {

                    //     tcol += 1 * item.total;
                    // }
                });
                $scope.data = returnArr;
                $scope.tcol = tcol;
                // console.log(returnArr)
            });
            $('#here').after(' <ul style="margin:0!important;margin-top:4px" class="pagination pagination-sm pull-right"  ><li ><a href="#buyersInfo" rel="0" id="backward"> < </a></li> <li id="nav"></li>   <li><a href="#buyersInfo" rel="0" id="forward"> > </a></li></ul>');
            var rowsShown = localStorage.getItem('pf')

            $("#pfilter").change(function() {

                rowsShown = localStorage.getItem('pf')

                var pfVal = $("#pfilter").val()


                localStorage.setItem('pf', pfVal)

                window.location.href = "#"
                window.location.href = "#ListBuyer"

                $("#pfilter").val(pfVal);


            });

            var rowsTotal = $('#data tbody tr').length;
            var numPages = rowsTotal / rowsShown;
            for (var i = 0; i < numPages; i++) {
                var pageNum = i + 1;
                $('#nav').append('<a href="#ListBuyer" rel="' + i + '">' + pageNum + '</a>');
            }

            $('#data tbody tr').hide();
            $('#data tbody tr').slice(0, rowsShown).show();
            $('#nav a:first').addClass('active');
            $('#nav a ').bind('click', function() {

                $('#nav a').removeClass('active');
                $(this).addClass('active');
                var currPage = $(this).attr('rel');
                localStorage.setItem('curp', currPage)
                var startItem = currPage * rowsShown;
                var endItem = startItem + rowsShown;
                $('#data tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                css('display', 'table-row').animate({ opacity: 1 }, 300);
                console.log($(this).attr('rel'))


            });

            $("#backward").click(function() {

                var cp = localStorage.getItem('curp');
                if (cp >= 1) {
                    cp = cp - 1;
                    localStorage.setItem('curp', cp)
                    var startItem = cp * rowsShown;
                    var endItem = startItem + rowsShown;
                    $('#data tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                    css('display', 'table-row').animate({ opacity: 1 }, 300);
                }
            });

            $("#forward").click(function() {

                var tp = $('#data tbody tr').length - 1;

                var cp = localStorage.getItem('curp');
                if (cp < tp) {
                    cp = cp * 1 + 1;
                    localStorage.setItem('curp', cp)
                    var startItem = cp * rowsShown;
                    var endItem = startItem + rowsShown;
                    $('#data tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                    css('display', 'table-row').animate({ opacity: 1 }, 300);
                }
            });

        }, 100);


    });

    // $scope.data = $firebaseArray(ref);
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
        var ref2 = firebase.database().ref("agents/" + id.$id);
        ref2.update({
            fullname: $scope.clickedUser.fullname,
            email: $scope.clickedUser.email,
            id: $scope.clickedUser.id,
            // country: $scope.clickedUser.country,
            // gender: $scope.clickedUser.gender,
            role: $scope.clickedUser.sales
        })

        modal.style.display = "none";

    };

    $scope.deleteUser = function() {
        var ref = firebase.database().ref("agents/" + id.$id);
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