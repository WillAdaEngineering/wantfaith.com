// ===========================
// ELEMENTS
// ===========================

const wrapper = document.querySelector(".wrapper");
const choices = document.querySelector(".choices");

const typingText = document.getElementById("typingText");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");


const typingSound = document.getElementById("typingSound");
const selectSound = document.getElementById("selectSound");
const noSound = document.getElementById("noSound");
const birds = document.getElementById("birds");

const particles = document.getElementById("particles");

const memoryContainer = document.getElementById("memoryContainer");
const finalMessage = document.getElementById("finalMessage");

// ===========================
// TYPEWRITER
// ===========================
const message = typingText.dataset.text;

let characterIndex = 0;

function getTypingDelay(character) {
    if (character === ".") {
        return 600;
    }

    if (character === "?") {
        return 900;
    }

    if (character === ",") {
        return 400;
    }

    if (character === " ") {
        return 40;
    }

    return 90;
}

function typeWriter() {
    if (characterIndex < message.length) {

        const character = message.charAt(characterIndex);

        typingText.textContent += character;

        if (character !== " ") {
            typingSound.currentTime = 0;
            typingSound.play()
            .catch(() => {});
        }

        characterIndex++;

        setTimeout(
            typeWriter,
            getTypingDelay(character)
        );
    } else {
        choices.classList.add("show");
    }
}

typeWriter();

// ===========================
// POLLEN
// ===========================
function createParticle() {

    const particle =
    document.createElement("div");

    particle.classList.add("pollen");

    particle.style.left =
    Math.random() * 100 + "%";

    const size =
    Math.random() * 6 + 4;

    particle.style.width =
    size + "px";

    particle.style.height =
    size + "px";

    particle.style.animationDuration =
    (Math.random() * 6 + 8) + "s";

    particle.style.animationDelay =
    Math.random() * 2 + "s";

    particles.appendChild(particle);

    particle.addEventListener(
        "animationend",
        () => {
            particle.remove();
        }
    );
}

setInterval(createParticle, 400);

// ===========================
// BIRDS AUDIO
// ===========================
function startBirds() {
    birds.volume = 0;

    birds.play()
    .catch(() => {});

    const fadeInterval =
    setInterval(() => {
        if (birds.volume < 0.3) {

            birds.volume += 0.02;

        }
        else {

            clearInterval(fadeInterval);
        }
    },100);
}

// ===========================
// MEMORY DATA
// ===========================
const memories = [
    {
        image:"images/polaroid1.png",
        top:"50%",
        left:"50%",
        rotation:"-5deg"
    },

    {
        image:"images/polaroid2.png",
        top:"25%",
        left:"25%",
        rotation:"6deg"
    },

    {
        image:"images/polaroid3.png",
        top:"30%",
        left:"75%",
        rotation:"-7deg"
    },

    {
        image:"images/polaroid4.png",
        top:"70%",
        left:"20%",
        rotation:"5deg"
    },

    {
        image:"images/polaroid5.png",
        top:"20%",
        left:"55%",
        rotation:"-4deg"
    },

    {
        image:"images/polaroid6.png",
        top:"75%",
        left:"70%",
        rotation:"8deg"
    },

    {
        image:"images/polaroid7.png",
        top:"40%",
        left:"85%",
        rotation:"-6deg"
    },

    {
        image:"images/polaroid8.png",
        top:"80%",
        left:"45%",
        rotation:"4deg"
    },

    {
        image:"images/polaroid9.png",
        top:"15%",
        left:"15%",
        rotation:"-8deg"
    },

    {
        image:"images/polaroid10.png",
        top:"55%",
        left:"85%",
        rotation:"6deg"
    },

    {
        image:"images/polaroid11.png",
        top:"45%",
        left:"55%",
        rotation:"-3deg"
    }
];

// ===========================
// CREATE MEMORY
// ===========================
function showMemory(memory) {
    const photo =
    document.createElement("img");

    photo.src =
    memory.image;

    photo.classList.add(
        "memoryPhoto"
    );

    photo.style.top =
    memory.top;

    photo.style.left =
    memory.left;

    photo.style.transform =
    `
    translate(-50%, -50%)
    rotate(${memory.rotation})
    `;

    memoryContainer.appendChild(photo);

    setTimeout(() => {
        photo.classList.add("show");
    },100);
}

// ===========================
// START MEMORY SEQUENCE
// ===========================
function startMemories() {
    memories.forEach((memory,index) => {
        setTimeout(() => {
            showMemory(memory);
        },
        4000 + (index * 7500)
        );
    });

    // Show final message after last polaroid
    setTimeout(() => {
        finalMessage.classList.add("show");
    }, 4000 + (memories.length * 7500));
}

// ===========================
// YES BUTTON
// ===========================
yesButton.addEventListener(
"click",
() => {
    selectSound.currentTime = 0;
    selectSound.play()
    .catch(() => {});

    startBirds();

    choices.classList.add(
        "menuFade"
    );

    wrapper.classList.add(
        "colorized"
    );

    // Fade question
    setTimeout(() => {
        typingText.classList.add(
            "textFade"
        );
    },500);

    // Begin memories
    setTimeout(() => {
        startMemories();
    },3000);
});

// ===========================
// NO BUTTON
// ===========================
noButton.addEventListener(
"click",
() => {
    noSound.currentTime = 0;
    noSound.play()
    .catch(() => {});
});