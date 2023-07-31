var baseURL = '<Your Experience Site Base URL>';
var redirectURL = '<Your Experience Site Base URL>/services/apexrest/code/extraction';
var clientId = '<Connected App Client Id>';
var clientSecret = '<Connected App Client Secret>';

function validateEmailAddress(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function startLogin() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    if (!validateEmailAddress(username.value) || username.value == '' ) {
        $("#result").text("Please fill correct username.");
        $("#result").css("color", "red");
        return false;
    }
    if(password.value == '') {
        $("#result").text("Please fill correct password.");
        $("#result").css("color", "red");
        return false;
    }
    var encodedUNP = btoa(username.value + ':' + password.value);
    var client = new XMLHttpRequest();
    client.open("GET", baseURL + "/services/oauth2/authorize?response_type=code_credentials&client_id="+clientId + "&redirect_uri=" + redirectURL, true);
    client.setRequestHeader("Auth-Request-Type", "Named-User");
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.setRequestHeader("Authorization", "Basic " + encodedUNP);
    client.send();
    client.onreadystatechange = function() {
        if(this.readyState == 3) {
            console.log("here");
            console.log(client.response);
            response = JSON.parse(client.response);
            if (response.success) {
                console.log('response :::',response);
                doCodeExchange(response);
            }
        }
    }
    return false;
}
function doCodeExchange(authorizeResponse) {
    var client = new XMLHttpRequest();
    client.open("POST", authorizeResponse.sfdc_community_url + "/services/oauth2/token", true);
    client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    client.send("code=" + authorizeResponse.code + "&grant_type=authorization_code&client_id=" + clientId +"&client_secret="+ clientSecret +"&redirect_uri=" + redirectURL);
    client.onreadystatechange = function() {
        if(this.readyState == 3) {
            response = JSON.parse(client.response);
            getUserInfo(response.access_token, response.sfdc_community_url)
        }
    }
 }
 
function getUserInfo(accessToken, userInfoBaseURL) {
    var client = new XMLHttpRequest();
    client.open("GET", userInfoBaseURL + "/services/oauth2/userinfo", true);
    client.setRequestHeader("Content-Type", "application/json");
    client.setRequestHeader("Authorization", "Bearer " + accessToken);
    client.send();
    client.onreadystatechange = function() {
        if(this.readyState == 3) {
            response = JSON.parse(client.response);
            response.access_token = accessToken;
            $("#result").text('Data successfully Retrieved : '+response.user_id);
            $("#result").css("color", "green");
        }
    }
 }
 