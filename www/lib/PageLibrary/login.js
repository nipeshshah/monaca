/*Login Page*/
function LoginPageLoad() {
    apiServices.User.getOrCreate("asdas3", "n.s@gmail.com", "AMITAB", "Bachhan").then(function (resp2) {
        console.log(resp2);
        console.log(JSON.stringify(resp2));
        $('#accNo').text(resp2.user.AccountNumber);
    });
}
/*Login Page*/
