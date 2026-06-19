const eventDate = new Date("2026-08-29T21:00:00-03:00");
const whatsappNumber = "5491100000000";
const invitationAudio = document.querySelector("#invitationAudio");
const audioToggle = document.querySelector("#audioToggle");
let audioIsPlaying = false;

audioToggle.addEventListener("click", async () => {
  try {
    if (audioIsPlaying) {
      invitationAudio.pause();
      audioToggle.setAttribute("aria-label", "Reproducir música");
      audioToggle.setAttribute("aria-pressed", "false");
      audioToggle.classList.remove("is-playing");
      audioIsPlaying = false;
      return;
    }

    await invitationAudio.play();
    audioToggle.setAttribute("aria-label", "Pausar música");
    audioToggle.setAttribute("aria-pressed", "true");
    audioToggle.classList.add("is-playing");
    audioIsPlaying = true;
  } catch (error) {
    audioToggle.setAttribute("aria-label", "No se pudo reproducir la música");
  }
});

invitationAudio.addEventListener("ended", () => {
  audioToggle.setAttribute("aria-label", "Reproducir música");
  audioToggle.setAttribute("aria-pressed", "false");
  audioToggle.classList.remove("is-playing");
  audioIsPlaying = false;
});

function syncAudioToggleVisibility() {
  const scrollLimit = (document.documentElement.scrollHeight - window.innerHeight) / 2;
  audioToggle.classList.toggle("is-hidden", window.scrollY > scrollLimit);
}

window.addEventListener("scroll", syncAudioToggleVisibility, { passive: true });
window.addEventListener("resize", syncAudioToggleVisibility);
syncAudioToggleVisibility();

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

const modalDialogs = [];
let lockedScrollY = 0;

function updateModalScrollLock() {
  const hasOpenModal = modalDialogs.some((dialog) => dialog.open);
  if (hasOpenModal && !document.body.classList.contains("modal-open")) {
    lockedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.classList.add("modal-open");
    return;
  }

  if (!hasOpenModal && document.body.classList.contains("modal-open")) {
    document.body.classList.remove("modal-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, lockedScrollY);
  }
}

function openDialog(dialog) {
  dialog.showModal();
  updateModalScrollLock();
}

function closeDialog(dialog) {
  dialog.close();
  updateModalScrollLock();
}

const mapUrl = "https://maps.app.goo.gl/VBSru3SuwxqLoxfn7";
const mapModal = document.querySelector("#mapModal");
const openMapModal = document.querySelector("#openMapModal");
const closeMapModal = document.querySelector("#closeMapModal");
const openExternalMap = document.querySelector("#openExternalMap");

openMapModal.addEventListener("click", () => {
  openDialog(mapModal);
});

closeMapModal.addEventListener("click", () => {
  closeDialog(mapModal);
});

openExternalMap.addEventListener("click", () => {
  window.open(mapUrl, "_blank", "noopener,noreferrer");
});

mapModal.addEventListener("click", (event) => {
  if (event.target === mapModal) {
    closeDialog(mapModal);
  }
});

const dressModal = document.querySelector("#dressModal");
const openDressModal = document.querySelector("#openDressModal");
const closeDressModal = document.querySelector("#closeDressModal");

openDressModal.addEventListener("click", () => {
  openDialog(dressModal);
});

closeDressModal.addEventListener("click", () => {
  closeDialog(dressModal);
});

dressModal.addEventListener("click", (event) => {
  if (event.target === dressModal) {
    closeDialog(dressModal);
  }
});

const giftModal = document.querySelector("#giftModal");
const openGiftModal = document.querySelector("#openGiftModal");
const closeGiftModal = document.querySelector("#closeGiftModal");
const giftAlias = document.querySelector("#giftAlias");
const copyGiftAlias = document.querySelector("#copyGiftAlias");
const copyGiftAliasStatus = document.querySelector("#copyGiftAliasStatus");

modalDialogs.push(mapModal, dressModal, giftModal);
modalDialogs.forEach((dialog) => {
  dialog.addEventListener("close", updateModalScrollLock);
});

openGiftModal.addEventListener("click", () => {
  openDialog(giftModal);
});

closeGiftModal.addEventListener("click", () => {
  closeDialog(giftModal);
});

giftModal.addEventListener("click", (event) => {
  if (event.target === giftModal) {
    closeDialog(giftModal);
  }
});

copyGiftAlias.addEventListener("click", async () => {
  const alias = giftAlias.textContent.trim();

  try {
    await navigator.clipboard.writeText(alias);
    copyGiftAliasStatus.textContent = "Alias copiado";
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = alias;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    copyGiftAliasStatus.textContent = "Alias copiado";
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
const carousel = document.querySelector(".carousel");
const carouselDots = document.querySelector(".carousel__dots");
let activeSlide = 0;

function showSlide(index, forcedDirection) {
  const nextSlide = (index + carouselSlides.length) % carouselSlides.length;
  const direction = forcedDirection || (nextSlide < activeSlide ? "prev" : "next");
  carousel.classList.toggle("is-prev", direction === "prev");
  carousel.classList.toggle("is-next", direction === "next");
  activeSlide = nextSlide;
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
  dot.addEventListener("click", () => {
    if (index !== activeSlide) {
      showSlide(index, index < activeSlide ? "prev" : "next");
    }
  });
  carouselDots.appendChild(dot);
});

document.querySelector(".carousel__arrow--prev").addEventListener("click", () => {
  showSlide(activeSlide - 1, "prev");
});

document.querySelector(".carousel__arrow--next").addEventListener("click", () => {
  showSlide(activeSlide + 1, "next");
});

showSlide(0, "next");

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
modalDialogs.push(lightbox);
lightbox.addEventListener("close", updateModalScrollLock);

document.querySelectorAll(".carousel__slide").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    openDialog(lightbox);
  });
});

document.querySelector("#closeLightbox").addEventListener("click", () => {
  closeDialog(lightbox);
});
