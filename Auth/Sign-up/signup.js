let GetUsername = document.getElementById("username")
let GetEmail = document.getElementById("email_field");
let GetPassword = document.getElementById("password_field");
let GetRepeatPassword = document.getElementById("repeat_password");

let signUpButton = document.getElementById("signUpButton");

window.addEventListener("mousemove", (e) => {
    gsap.to(".cursor", {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        ease: 'power3.out'
    })
})

const ValidateFields = () => {
    let Username = GetUsername.value.trim()
    let Email = GetEmail.value.trim();
    let Password = GetPassword.value.trim();
    let RepeatPassword = GetRepeatPassword.value.trim();


    if (!Username || !Email || !Password || !RepeatPassword) {
        Snackbar.show({
            showAction: false,
            text: "Please Fill all the Fields",
            textColor: "white",
            backgroundColor: "red",
            duration: 3000,
        });
        let ErrorSound = new Audio()
        ErrorSound.src = "../../Assets/Sound/error.mp3"
        ErrorSound.play()
        GetUsername.style.border = "1px solid red"
        GetEmail.style.border = "1px solid red";
        GetPassword.style.border = "1px solid red";
        GetRepeatPassword.style.border = "1px solid red";
        setTimeout(() => {
            GetUsername.style.border = "1px solid gray"
            GetEmail.style.border = "1px solid gray";
            GetPassword.style.border = "1px solid gray";
            GetRepeatPassword.style.border = "1px solid gray";
        }, 3000);
    } else if (Username.length <= 5) {
        Snackbar.show({
            showAction: false,
            text: "Enter a Valid Username",
            textColor: "white",
            backgroundColor: "red",
            duration: 3000,
        });
        let ErrorSound = new Audio()
        ErrorSound.src = "../../Assets/Sound/error.mp3"
        ErrorSound.play()
        GetUsername.style.border = "1px solid red";
        setTimeout(() => {
            GetUsername.style.border = "1px solid gray";
        }, 3000);
    }
    else if (!Email.includes("@") || Email.length < 8) {
        Snackbar.show({
            showAction: false,
            text: "Enter a Valid Email",
            textColor: "white",
            backgroundColor: "red",
            duration: 3000,
        });
        let ErrorSound = new Audio()
        ErrorSound.src = "../../Assets/Sound/error.mp3"
        ErrorSound.play()
        GetEmail.style.border = "2px solid red";
        setTimeout(() => {
            GetEmail.style.border = "1px solid gray";
        }, 3000);
    } else if (Password.length < 8) {
        Snackbar.show({
            showAction: false,
            text: "Password must be more than 8 Character",
            textColor: "white",
            backgroundColor: "red",
            duration: 3000,
        });
        let ErrorSound = new Audio()
        ErrorSound.src = "../../Assets/Sound/error.mp3"
        ErrorSound.play()
        GetPassword.style.border = "2px solid red";
        GetRepeatPassword.style.border = "2px solid red";
        setTimeout(() => {
            GetPassword.style.border = "1px solid gray";
            GetRepeatPassword.style.border = "1px solid gray";
        }, 3000);
    } else if (Password !== RepeatPassword) {
        Snackbar.show({
            showAction: false,
            text: "Password Didn't Match",
            textColor: "white",
            backgroundColor: "red",
            duration: 3000,
        });
        let ErrorSound = new Audio()
        ErrorSound.src = "../../Assets/Sound/error.mp3"
        ErrorSound.play()
        GetPassword.style.border = "1px solid red";
        GetRepeatPassword.style.border = "1px solid red";
        setTimeout(() => {
            GetPassword.style.border = "1px solid gray";
            GetRepeatPassword.style.border = "1px solid gray";
        }, 3000);
    } else {
        GetEmail.disabled = true;
        GetPassword.disabled = true;
        GetRepeatPassword.disabled = true;
        let SuccessSound = new Audio()
        SuccessSound.src = "../../Assets/Sound/success.mp3"
        SuccessSound.play()
        GetEmail.style.border = "2px solid #10b981"
        GetPassword.style.border = "2px solid #10b981"
        GetRepeatPassword.style.border = "2px solid #10b981"
        Snackbar.show({
            showAction: false,
            text: "Creating Account...",
            textColor: "white",
            backgroundColor: "#04410cff",
            duration: 3000,
        });
        setTimeout(() => {
            saveData();
        }, 4000);
    }
};

const saveData = () => {
    let Username = GetUsername.value.trim()
    let Email = GetEmail.value.trim();
    let Password = GetPassword.value.trim();
    localStorage.setItem("user",
        JSON.stringify({
            Username: Username,
            email: Email,
            password: Password,
        })
    );
    Snackbar.show({
        showAction: false,
        text: "Account Saved",
        textColor: "white",
        backgroundColor: "#04410cff",
        duration: 3000,
    });
    setTimeout(() => {
        location.href = '/Dashboard/0213456.html'
    }, 2000)
};

signUpButton.addEventListener("click", ValidateFields);
window.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {
        ValidateFields()
    }
})
