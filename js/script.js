const playersSection = document.querySelector(".players");

if (playersSection) {
  const cards = [...playersSection.querySelectorAll(".player-card")];
  const counter = playersSection.querySelector(".slider__counter");
  const prevButton = playersSection.querySelector(".slider__button--prev");
  const nextButton = playersSection.querySelector(".slider__button--next");
  const desktopQuery = window.matchMedia("(min-width: 1366px)");
  const intervalDelay = 4000;
  let currentIndex = 0;
  let timerId;

  const getVisibleCount = () => (desktopQuery.matches ? 3 : 1);

  const renderPlayers = () => {
    const visibleCount = getVisibleCount();

    cards.forEach((card, index) => {
      const offset = (index - currentIndex + cards.length) % cards.length;
      card.classList.toggle("is-hidden", offset >= visibleCount);
      card.style.order = offset;
    });

    counter.textContent = `${currentIndex + 1} / ${cards.length}`;
  };

  const showPlayer = (direction) => {
    currentIndex = (currentIndex + direction + cards.length) % cards.length;
    renderPlayers();
  };

  const startCarousel = () => {
    window.clearInterval(timerId);
    timerId = window.setInterval(() => showPlayer(1), intervalDelay);
  };

  prevButton.addEventListener("click", () => {
    showPlayer(-1);
    startCarousel();
  });

  nextButton.addEventListener("click", () => {
    showPlayer(1);
    startCarousel();
  });

  desktopQuery.addEventListener("change", renderPlayers);
  renderPlayers();
  startCarousel();
}

const stagesSection = document.querySelector(".stages");

if (stagesSection) {
  const cards = [...stagesSection.querySelectorAll(".stages__item")];
  const dotsBox = stagesSection.querySelector(".stages__dots");
  const prevButton = stagesSection.querySelector(".stages__button--prev");
  const nextButton = stagesSection.querySelector(".stages__button--next");
  const mobileQuery = window.matchMedia("(max-width: 1365px)");
  const slides = [[0, 1], [2], [3, 4], [5], [6]];
  let currentIndex = 0;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("span");
    dot.className = "stages__dot";
    dot.dataset.index = index;
    dotsBox.append(dot);
    return dot;
  });

  const renderStages = () => {
    if (!mobileQuery.matches) {
      cards.forEach((card) => card.classList.remove("is-hidden"));
      dots.forEach((dot) => dot.classList.remove("is-active"));
      return;
    }

    cards.forEach((card, index) => {
      card.classList.toggle("is-hidden", !slides[currentIndex].includes(index));
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
  };

  const showStage = (direction) => {
    currentIndex = Math.min(Math.max(currentIndex + direction, 0), slides.length - 1);
    renderStages();
  };

  prevButton.addEventListener("click", () => showStage(-1));
  nextButton.addEventListener("click", () => showStage(1));
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      renderStages();
    });
  });

  mobileQuery.addEventListener("change", renderStages);
  renderStages();
}
/* End */
