/* --------------------------------- Cursor --------------------------------- */

window.addEventListener("mousemove", (e) => {
    gsap.to("#cursor", {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        ease: 'elastic.out'
    })
})

let MobileNav = document.getElementById("mobileNav");

function openMobileMenu() {
    MobileNav.style.transform = "translateX(0%)";
}

function closeMobileMenu() {
    MobileNav.style.transform = "translateX(100%)";
}

tippy('#lock-icon', {
    content: 'We provide Secure storage to each user',
    animation: 'scale',
    followCursor: true,
    theme: 'material'
});

tippy('#magic-icon', {
    content: 'Feel the Dynamic Updates on Dashboard',
    animation: 'scale',
    followCursor: true,
    theme: 'material'
});

tippy('#facebook', {
    content: 'Facebook',
    animation: 'scale',
    followCursor: true,
});

tippy('#telegram', {
    content: 'Telegram',
    animation: 'scale',
    followCursor: true,
    theme: 'material'
});


tippy('#instagram', {
    content: 'Instagram',
    animation: 'scale',
    followCursor: true,
    theme: 'material'
});


tippy('#linkedin', {
    content: 'Linked-in',
    animation: 'scale',
    followCursor: true,
    theme: 'material'
});

// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
});