$(document).ready(function () {
    console.log(document.getElementById('trabajador').checked);
    console.log(document.getElementById('solicitante').checked);
    $.getJSON('https://geolocation-db.com/json/')
        .done(function (location) {
            console.log(location);
            /**$('#country').html(location.country_name);
            $('#state').html(location.state);
            $('#city').html(location.city);
            $('#latitude').html(location.latitude);
            $('#longitude').html(location.longitude);
            $('#ip').html(location.IPv4);**/
        });
});
$(function () {
    ///date input 18 years
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;// jan=0; feb=1 .......
    var day = dtToday.getDate();
    var year = dtToday.getFullYear() - 18;
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var minDate = year + '-' + month + '-' + day;
    var maxDate = year + '-' + month + '-' + day;
    $('#dob').attr('max', maxDate);
});
var showPass = 0;
$('.btn-show-pass').on('click', function () {
    if (showPass == 0) {
        $(this).next('input').attr('type', 'text');
        $(this).find('i').removeClass('mdi-eye');
        $(this).find('i').addClass('mdi-eye-off');
        showPass = 1;
    }
    else {
        $(this).next('input').attr('type', 'password');
        $(this).find('i').addClass('mdi-eye');
        $(this).find('i').removeClass('mdi-eye-off');
        showPass = 0;
    }

});
///INPUT Telefono
var input = document.querySelector("#phone");
window.intlTelInput(input, {
    // any initialisation options go here
    // initial country
    initialCountry: "mx",
    //preferredCountries: ["mx","us" ],
    onlyCountries: ["mx"]
});






////DOM form  LogIn
const formLogIn = document.forms['loginForm'];
////DOM form  LogIn event  submit on button LogIn
formLogIn.addEventListener('submit', (e) => {
    e.preventDefault();
    ///print test
    console.log(formLogIn['email'].value + "  " + formLogIn['password'].value);
    ////Data
    let email = formLogIn['email'].value;
    let password = formLogIn['password'].value;
    ///signIn With Email And Password
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        ///SAVE key current user on localStorage
        localStorage.removeItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af");
        localStorage.setItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af", cred.user.uid);
        ///update user data on database firebase
        return db.collection('cuentasusuarios').doc(cred.user.uid).update({
            "estado": parseInt(1)
        }).then(function (result) {
            db.collection('cuentasusuarios').doc(cred.user.uid).get().then(doc => {
                if (doc.data().tipo === 0) {
                    window.location.href = "solicitante.html";
                } else if (doc.data().tipo === 1) {
                    window.location.href = "trabajador.html";
                }
            });
        }).catch(function (error) {
            floatingMessage(error.code, "", "firebase");
        });
    }).catch(err => {
        floatingMessage(err.code, "", "firebase");
    });

});


////DOM form  LogIn
const formRegister = document.forms['registerForm'];
////DOM form  LogIn event  submit on button LogIn
formRegister.addEventListener('submit', (e) => {
    e.preventDefault();

});

