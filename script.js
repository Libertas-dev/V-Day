class ValentineApp {
  constructor() {
    // Дані
    this.currentScreen = 1;
    this.passwordAttempts = 0;
    this.correctPasswords = ["мишеня", "мишка", "Мишеня", "Мишка"];
    this.startDate = new Date("2023-03-19T00:00:00");
    this.timerInterval = null;
    this.gameScore = 0;
    this.gameStars = [];
    this.animationFrame = null;
    this.orientationCount = 0;

    // Фрази для кубика
    this.secrets = [
      "ти мій найкращий подарунок 🎁",
      "Я без тебе не можу ✨",
      "ти робиш мій день кращим 🌞",
      "сумую за тобою 🥺",
      "ти є і був і будеш в моєму серці 💕",
      "обіймаю тебе подумки 🫂",
      "ти найніжніша 💕",
      "з тобою я щасливий 😊",
      "ти моє сонечко ☀️",
      "мишеня ти моє... я тебе обожнюю який ти є 🐭",
      "пік... Мишеня пік-пік 🐭",
      "думаю про тебе завжди 💭",
      "ти найкраще, що зі мною сталося ✨",
      "мені так добре з тобою 🥰",
      "може хоч у ві сні ти будеш тут 🥺",
      "ми з тобою інь і янь ☯️",
      "миш ти моя віддушина в цьому дурнуватому світі ✨",
      "ти як був найдорожча людина, так і будеш!",
      "Ти там Мікі нашого погодуй і іди на своє місце спати 🤗",
      "Твоє місце завжди чекає, і плече моє яки ти віддавив 😊",
      "Цем в носюшок 💕",
    ];

    // Нагороди за зірочки
    this.rewards = [
      "💕 ти моя мрія",
      "🌸 ти ніжна квіточка",
      "🍰 ти солодка",
      "🦋 ти легка",
      "🌙 ти зірочка",
      "☀️ моє сонечко",
      "🎀 ти красуня",
      "💝 моє серденько",
      "👑 королева",
      "✨ ти чарівна",
    ];

    // Цитати для хронік
    this.quotes = [
      "ти найкраща у світі ❤️",
      "я щасливий з тобою 🥰",
      "ти мій скарб 💎",
      "ти моє натхнення ✨",
      "з тобою кожен день особливий 🌹",
    ];

    // Елементи
    this.preloader = document.getElementById("preloader");
    this.app = document.getElementById("app");
    this.screens = document.querySelectorAll(".screen");
    this.bottomMenu = document.getElementById("bottomMenu");

    // Ініціалізація
    this.init();
  }

  init() {
    // Ховаємо прелоадер
    setTimeout(() => {
      this.preloader.classList.add("fade-out");
      setTimeout(() => {
        this.preloader.style.display = "none";
      }, 500);
    }, 2000);

    // Запускаємо таймер
    this.startTimer();

    // Додаємо обробники
    this.setupEventListeners();

    // Стежимо за орієнтацією
    this.setupOrientationListener();
  }

  setupEventListeners() {
    // Екран 1
    document
      .getElementById("unlockBtn")
      .addEventListener("click", () => this.checkPassword());
    document
      .getElementById("passwordInput")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") this.checkPassword();
      });

    // Екран 2
    document
      .getElementById("chronologyQuote")
      .addEventListener("click", () => this.showRandomQuote());

    // Екран 3
    document
      .getElementById("cubeContainer")
      .addEventListener("click", (e) => this.rotateCube(e));

    // Екран 4
    this.setupGame();

    // Меню навігація
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.addEventListener("click", () => {
        const screen = parseInt(item.dataset.screen);
        this.showScreen(screen);
      });
    });
  }

  // ===== ВІБРАЦІЯ =====
  vibrate(pattern) {
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  // ===== ЕКРАН 1: ПАРОЛЬ =====
  checkPassword() {
    const input = document.getElementById("passwordInput").value.trim();
    const hintMessage = document.getElementById("hintMessage");
    const dots = document.querySelectorAll(".entry__dot");

    this.vibrate(10);

    if (this.correctPasswords.includes(input)) {
      this.vibrate([15, 20, 30]);
      this.showScreen(2); // Відразу на хроніки
      document.getElementById("passwordInput").value = "";
      this.passwordAttempts = 0;
      this.updateDots(dots);
      hintMessage.innerHTML = "💕 вітаю!";
    } else {
      this.vibrate([10, 30, 10]);
      this.passwordAttempts++;
      this.updateDots(dots);

      if (this.passwordAttempts === 1) {
        hintMessage.innerHTML = "💭 Не хвилюйся, спробуй ще";
      } else if (this.passwordAttempts === 2) {
        hintMessage.innerHTML = "🐭 мишеня?";
      } else if (this.passwordAttempts === 3) {
        hintMessage.innerHTML = "💕 мишка або мишеня";
      } else {
        this.passwordAttempts = 3;
        hintMessage.innerHTML = "🔐 пароль: мишеня";
      }
    }
  }

  updateDots(dots) {
    dots.forEach((dot, i) => {
      if (i < this.passwordAttempts) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // ===== ЕКРАН 2: ХРОНІКИ =====
  startTimer() {
    this.updateTimer();
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    const now = new Date();
    const diff = now - this.startDate;

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24),
    );
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("mainCounter").textContent =
      `${years} роки, ${days} днів`;
    document.getElementById("detailedCounter").textContent =
      `${years * 12 + Math.floor(days / 30)} міс, ${hours} год, ${minutes} хв, ${seconds} с`;
  }

  showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    const quoteEl = document.getElementById("quoteText");

    quoteEl.style.opacity = "0";
    setTimeout(() => {
      quoteEl.textContent = this.quotes[randomIndex];
      quoteEl.style.opacity = "1";
    }, 200);

    this.vibrate(10);
  }

  // ===== ЕКРАН 3: КУБИК ІСТОРІЙ =====
  rotateCube() {
    const cube = document.getElementById("magicCube");
    const messageEl = document.getElementById("cubeMessage");

    cube.classList.add("rotate");
    setTimeout(() => {
      cube.classList.remove("rotate");
    }, 800);

    const randomSecret =
      this.secrets[Math.floor(Math.random() * this.secrets.length)];
    messageEl.innerHTML = `<span class="message-text">${randomSecret}</span>`;

    this.createHearts(12);
    this.vibrate([15, 20, 30]);
  }

  createHearts(count) {
    const container = document.querySelector(".history-cube__container");
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.position = "absolute";
      heart.style.left = "50%";
      heart.style.top = "50%";
      heart.style.fontSize = `${20 + Math.random() * 20}px`;
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "1000";
      heart.style.animation = `flyHeart ${0.7 + Math.random() * 0.6}s ease-out forwards`;
      heart.style.setProperty("--angle", Math.random() * 360 + "deg");
      heart.style.setProperty("--distance", 50 + Math.random() * 150);
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 1300);
    }
  }

  // ===== ЕКРАН 4: ГРА =====
  setupGame() {
    const canvas = document.getElementById("gameCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];

      const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
      const y = (touch.clientY - rect.top) * (canvas.height / rect.height);

      this.checkStarCollision(x, y);
    });

    setInterval(() => {
      if (this.currentScreen === 4) {
        this.gameStars.push({
          x: Math.random() * canvas.width,
          y: -30,
          size: 20 + Math.random() * 30,
          speed: 1.5 + Math.random() * 2.5,
          emoji: ["✨", "🐭", "⭐", "🌸"][Math.floor(Math.random() * 4)],
          collected: false,
        });
      }
    }, 300);

    const animate = () => {
      if (this.currentScreen === 4) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#0a0a1a");
        gradient.addColorStop(1, "#1a1a3a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.gameStars = this.gameStars.filter((star) => {
          if (star.collected) return false;

          star.y += star.speed;

          if (star.y > canvas.height + 50) return false;

          ctx.font = `${star.size}px Arial`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "white";
          ctx.fillText(star.emoji, star.x, star.y);

          return true;
        });
      }

      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  checkStarCollision(x, y) {
    this.gameStars.forEach((star) => {
      if (star.collected) return;

      const size = star.size * 0.7;
      const dx = x - star.x;
      const dy = y - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < size) {
        star.collected = true;
        this.gameScore++;

        this.vibrate(5);
        document.getElementById("gameScore").textContent =
          `${this.gameScore} ⭐`;

        if (this.gameScore % 10 === 0) {
          const rewardIndex = (this.gameScore / 10 - 1) % this.rewards.length;
          const toast = document.getElementById("starReward");
          const message = document.getElementById("rewardMessage");

          message.textContent = this.rewards[rewardIndex];
          toast.classList.add("show");

          setTimeout(() => {
            toast.classList.remove("show");
          }, 2000);

          this.vibrate([15, 20, 30]);
        }
      }
    });
  }

  // ===== ЕКРАН 5: СЕКРЕТНИЙ =====
  setupOrientationListener() {
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        // Якщо ми на екрані входу - нічого не робимо
        if (this.currentScreen === 1) {
          return;
        }

        if (Math.abs(window.orientation) === 90) {
          // Ландшафтний режим
          if (this.orientationCount < 5 && this.currentScreen !== 5) {
            this.orientationCount++;
            this.showScreen(5); // Показуємо секретний екран
            this.vibrate([15, 20, 30]);
          }
        } else {
          // Портретний режим - повертаємось на той екран, звідки прийшли
          if (this.currentScreen === 5) {
            // Якщо ми на секретному екрані - повертаємось на хроніки
            this.showScreen(2);
          }
        }
      }, 100);
    });
  }

  // ===== СЕКРЕТНИЙ ЕКРАН =====
  hideSecretScreen() {
    // Просто повертаємось на хроніки
    this.showScreen(2);
  }

  // ===== НАВІГАЦІЯ =====
  showScreen(screenNumber) {
    this.screens.forEach((screen) => {
      screen.classList.remove("active");
    });

    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) {
      targetScreen.classList.add("active");
      this.currentScreen = screenNumber;

      // Оновлюємо меню (тільки для хронік)
      if (screenNumber === 2) {
        this.bottomMenu.classList.remove("hidden");
      } else {
        this.bottomMenu.classList.add("hidden");
      }

      // Якщо повертаємось на екран 1 - скидаємо лічильник поворотів
      if (screenNumber === 1) {
        this.orientationCount = 0;
      }

      // Оновлюємо активний пункт меню
      document.querySelectorAll(".menu-item").forEach((item) => {
        if (parseInt(item.dataset.screen) === screenNumber) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      this.vibrate(5);
    }
  }
}

// Додаємо стилі для анімацій
const style = document.createElement("style");
style.textContent = `
    @keyframes flyHeart {
        0% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0) rotate(var(--angle)) translateY(calc(var(--distance) * -1px));
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Запуск
document.addEventListener("DOMContentLoaded", () => {
  window.app = new ValentineApp();
});

// ========== МУЗИКА З ПЛЕЙЛИСТОМ ==========
document.addEventListener("DOMContentLoaded", function () {
  // Масив з піснями (додай свої файли)
  const playlist = [
    "assets/song1.mp3",
    "assets/song2.mp3",
    "assets/song3.mp3",
    "assets/song4.mp3",
  ];

  let currentTrack = 0;
  let isPlaying = false;

  const audio = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicToggle");

  if (!audio || !musicBtn) return;

  audio.volume = 0.3;

  // Коли пісня закінчується - вмикаємо наступну
  audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    audio.src = playlist[currentTrack];
    if (isPlaying) {
      audio.play().catch((e) => console.log("Не вдалося відтворити"));
    }
    showTrackNotification(currentTrack);
  });

  // Створюємо сповіщення про зміну треку
  const notification = document.createElement("div");
  notification.className = "track-notification";
  notification.id = "trackNotification";
  document.body.appendChild(notification);

  // Функція показу сповіщення
  function showTrackNotification(trackIndex) {
    const notif = document.getElementById("trackNotification");
    const trackNames = ["💕 Пісня 1", "✨ Пісня 2", "🎵 Пісня 3", "❤️ Пісня 4"];
    notif.textContent = trackNames[trackIndex] || "🎵 Наступна пісня";
    notif.classList.add("show");

    setTimeout(() => {
      notif.classList.remove("show");
    }, 2000);
  }

  // Функція запуску музики
  function playMusic() {
    if (isPlaying) return;

    if (!audio.src || audio.src === "") {
      audio.src = playlist[0];
    }

    audio
      .play()
      .then(() => {
        musicBtn.classList.add("playing");
        musicBtn.querySelector(".music-icon").textContent = "🎶";
        isPlaying = true;
      })
      .catch((e) => console.log("Автовідтворення заблоковано"));
  }

  // Функція зупинки музики
  function pauseMusic() {
    audio.pause();
    musicBtn.classList.remove("playing");
    musicBtn.querySelector(".music-icon").textContent = "🎵";
    isPlaying = false;
  }

  // Функція перемикання на наступну пісню
  function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    audio.src = playlist[currentTrack];

    if (isPlaying) {
      audio.play().catch((e) => console.log("Не вдалося відтворити"));
    }

    showTrackNotification(currentTrack);
    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate(15);
    }
  }

  // Клік по кнопці (ввімкнути/вимкнути)
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }

    if (window.navigator && window.navigator.vibrate) {
      navigator.vibrate(10);
    }
  });

  // Подвійний клік - наступна пісня
  musicBtn.addEventListener("dblclick", (e) => {
    e.preventDefault();
    e.stopPropagation();
    nextTrack();
  });

  // ===== АВТОМАТИЧНИЙ ЗАПУСК =====

  // Спроба 1: Через 1 секунду
  setTimeout(playMusic, 1000);

  // Спроба 2: При першому дотику
  const startOnTouch = () => {
    playMusic();
    document.removeEventListener("touchstart", startOnTouch);
    document.removeEventListener("click", startOnTouch);
  };

  document.addEventListener("touchstart", startOnTouch, { once: true });
  document.addEventListener("click", startOnTouch, { once: true });

  // Спроба 3: Після введення пароля
  const checkInterval = setInterval(() => {
    if (window.app && window.app.currentScreen === 2 && !isPlaying) {
      playMusic();
      clearInterval(checkInterval);
    }
  }, 500);
});
