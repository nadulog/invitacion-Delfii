const eventDate = new Date("2026-11-21T21:00:00-03:00");
const whatsappNumber = "5491100000000";
const invitationAudio = document.querySelector("#invitationAudio");
const audioToggle = document.querySelector("#audioToggle");
let audioIsPlaying = false;

audioToggle.addEventListener("click", async () => {
  try {
    if (audioIsPlaying) {
      invitationAudio.pause();
      audioToggle.setAttribute("aria-label", "Reproducir musica");
      audioToggle.setAttribute("aria-pressed", "false");
      audioToggle.classList.remove("is-playing");
      audioIsPlaying = false;
      return;
    }

    await invitationAudio.play();
    audioToggle.setAttribute("aria-label", "Pausar musica");
    audioToggle.setAttribute("aria-pressed", "true");
    audioToggle.classList.add("is-playing");
    audioIsPlaying = true;
  } catch (error) {
    audioToggle.setAttribute("aria-label", "No se pudo reproducir la musica");
  }
});

invitationAudio.addEventListener("ended", () => {
  audioToggle.setAttribute("aria-label", "Reproducir musica");
  audioToggle.setAttribute("aria-pressed", "false");
  audioToggle.classList.remove("is-playing");
  audioIsPlaying = false;
});

const countdownFields = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCountdown() {
  const diff = Math.max(eventDate.getTime() - Date.now(), 0);
  const seconds = Math.floor(diff / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  countdownFields.days.textContent = days;
  countdownFields.hours.textContent = String(hours).padStart(2, "0");
  countdownFields.minutes.textContent = String(minutes).padStart(2, "0");
  countdownFields.seconds.textContent = String(remainingSeconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const heroPhotos = [...document.querySelectorAll(".hero__photo")];
let currentPhoto = 0;

setInterval(() => {
  heroPhotos[currentPhoto].classList.remove("active");
  currentPhoto = (currentPhoto + 1) % heroPhotos.length;
  heroPhotos[currentPhoto].classList.add("active");
}, 4200);

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".detail-btn[data-url]").forEach((button) => {
  button.addEventListener("click", () => {
    window.open(button.dataset.url, "_blank", "noopener,noreferrer");
  });
});

const giftModal = document.querySelector("#giftModal");
const openGiftModal = document.querySelector("#openGiftModal");
const closeGiftModal = document.querySelector("#closeGiftModal");

openGiftModal.addEventListener("click", () => {
  giftModal.showModal();
});

closeGiftModal.addEventListener("click", () => {
  giftModal.close();
});

giftModal.addEventListener("click", (event) => {
  if (event.target === giftModal) {
    giftModal.close();
  }
});

const giftSection = document.querySelector("#regalos");

if ("IntersectionObserver" in window) {
  const giftObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        giftSection.classList.add("is-visible");
        giftObserver.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  giftObserver.observe(giftSection);
} else {
  giftSection.classList.add("is-visible");
}

const carouselSlides = [...document.querySelectorAll(".carousel__slide")];
const carouselDots = document.querySelector(".carousel__dots");
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + carouselSlides.length) % carouselSlides.length;
  carouselSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === activeSlide);
  });
  document.querySelectorAll(".carousel__dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeSlide);
  });
}

carouselSlides.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "carousel__dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Ver foto ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  carouselDots.appendChild(dot);
});

document.querySelector(".carousel__arrow--prev").addEventListener("click", () => {
  showSlide(activeSlide - 1);
});

document.querySelector(".carousel__arrow--next").addEventListener("click", () => {
  showSlide(activeSlide + 1);
});

showSlide(0);

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");

document.querySelectorAll(".carousel__slide").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.showModal();
  });
});

document.querySelector("#closeLightbox").addEventListener("click", () => {
  lightbox.close();
});
