document.getElementById("sign-in-btn").addEventListener("click", function(){
    // 1. Get the Username Input
    const userNameInput = document.getElementById("username-input");
    const userName = userNameInput.value;
    console.log(userName);

    // 2. Get the Password Input
    const passwordInput = document.getElementById("password-input");
    const password = passwordInput.value;
    console.log(password);

    // 3. Match UserName & Password
    if(userName=="admin" && password=="admin123"){
        // 3-1. true:::>> alert> Homepage
        alert("Sign-In Successful");
        // window.location.replace("/home.html");
        window.location.assign("/home.html");
    }else{
        // 3-2. false:::>> alert> Return
        alert("Sign-In Failed");
        return;
    }
});