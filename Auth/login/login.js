let GetEmail = document.getElementById("email_field");
let GetPassword = document.getElementById("password_field");

let LogInButton = document.getElementById("signInButton");

const checkFields = () => {
    let Email = GetEmail.value.trim();
    let Password = GetPassword.value.trim();

    if (!Email || !Password) {
        Snackbar.show({
            showAction: false,
            text: "Please fill all the fields",
            textColor: "white",
            backgroundColor: "red",
            duration: 3000,
        });
        GetEmail.style.border = "1px solid red";
        GetPassword.style.border = "1px solid red";
        setTimeout(() => {
            GetEmail.style.border = "1px solid gray";
            GetPassword.style.border = "1px solid gray";
        }, 3000);
    } else {
        checkAuth();
    }
};

const checkAuth = () => {
    let Email = GetEmail.value.trim();
    let Password = GetPassword.value.trim();

    let user = JSON.parse(localStorage.getItem(Email));

    if (!user) {
        Snackbar.show({
            showAction: false,
            text: "Account Not Found",
            textColor: "white",
            backgroundColor: "red",
            duration: 3000,
        });
        GetEmail.style.border = "1px solid red";
        setTimeout(() => {
            GetEmail.style.border = "1px solid gray";
        }, 3000);
    } else if (user.password !== Password) {
        Snackbar.show({
            showAction: false,
            text: "Incorecct Password",
            textColor: "white",
            backgroundColor: "red",
            duration: 3000,
        });
        GetPassword.style.border = "1px solid red";
        setTimeout(() => {
            GetPassword.style.border = "1px solid gray";
        }, 3000);
    } else if (user.email == Email || user.password == Password) {
        Snackbar.show({
            showAction: false,
            text: "Success, Preparing Dashboard...",
            textColor: "white",
            backgroundColor: "#04410cff",
            duration: 3000,
        });
        GetEmail.style.border = "1px solid green";
        GetPassword.style.border = "1px solid green";
        GetEmail.disabled = true;
        GetPassword.disabled = true;
        setTimeout(() => {
            GetPassword.style.border = "1px solid gray";
            GetEmail.style.border = "1px solid gray";
        }, 3000);
        setTimeout(() => {
            location.href = '/Dashboard/0213456.html'
        }, 4000)
    }
};

LogInButton.addEventListener("click", checkFields);
window.addEventListener("keydown", (e) => {
    if (e.key == 'Enter'){
        checkFields()
    }
})