

document.addEventListener("DOMContentLoaded", () => {
  const phrases = [
    "Who am I?",
    "My name is Nutthawit Morkkaew.",
    "A passionate developer.",
    "I build things for the web."
  ];

  const el = document.getElementById("typewriter");
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const current = phrases[phraseIndex];
    el.textContent = current.substring(0, charIndex);

    if (!isDeleting) {
      if (charIndex < current.length) {
        charIndex++;
      } else {
        setTimeout(() => {
          isDeleting = true;
          type();
        }, 1500);
        return;
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, isDeleting ? 40 : 100);
  }

  el.classList.add('fade-in');
  type();
});
