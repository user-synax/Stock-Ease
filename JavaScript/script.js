/* --------------------------------- Cursor --------------------------------- */

window.addEventListener("mousemove", (e) => {
    gsap.to("#cursor", {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        ease: "elastic.out",
    });
});

let MobileNav = document.getElementById("mobileNav");

function openMobileMenu() {
    MobileNav.style.transform = "translateX(0%)";
}

function closeMobileMenu() {
    MobileNav.style.transform = "translateX(100%)";
}

tippy("#lock-icon", {
    content: "We provide Secure storage to each user",
    animation: "scale",
    followCursor: true,
    theme: "material",
});

tippy("#magic-icon", {
    content: "Feel the Dynamic Updates on Dashboard",
    animation: "scale",
    followCursor: true,
    theme: "material",
});

tippy("#whatsapp", {
    content: "Whatsapp",
    animation: "scale",
    followCursor: true,
});

tippy("#telegram", {
    content: "Telegram",
    animation: "scale",
    followCursor: true,
    theme: "material",
});

tippy("#instagram", {
    content: "Instagram",
    animation: "scale",
    followCursor: true,
    theme: "material",
});

tippy("#github", {
    content: "GitHub",
    animation: "scale",
    followCursor: true,
    theme: "material",
});

// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
});

let Tl = gsap.timeline();

Tl.from("nav", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "Power4.Out",
    filter: `blur(20px)`,
});

// Text Animations

let split = SplitText.create(".split", { type: "words, chars" });

gsap.from(split.chars, {
    duration: 2,
    y: 100,
    autoAlpha: 0,
    stagger: 0.05,

});

SplitText.create(".hero-section .text", {
    type: "lines, words",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
        return gsap.from(self.words, {
            duration: 1.8,
            y: 100,
            autoAlpha: 0,
            stagger: 0.05,
            ease: 'power4.inOut'
        });
    },
});

SplitText.create(".hero-section p", {
    type: "lines, words",
    mask: "words",
    autoSplit: true,
    onSplit(self) {
        return gsap.from(self.words, {
            delay: 0.5,
            duration: 1.5,
            filter: `blur(100px)`,
            autoAlpha: 0,
            stagger: 0.05,
        });
    },
});