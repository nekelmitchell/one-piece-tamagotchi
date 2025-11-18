// Screen and song data
const screens = {
  home: "ipodhomescreen.png",
  characters: [
    "character1.png", // Luffy
    "character2.png", // Zoro
    "character3.png", // Nami
    "character4.png", // Usopp
    "character5.png", // Sanji
    "character6.png", // Chopper
    "character7.png", // Robin
    "character8.png", // Franky
    "character9.png", // Brooke
    "character10.png" // Jimbei
  ]
};

// Song data per character
const songs = {
  Luffy: [
    { cover: "luffysong1.png", file: "song1-1.mp3", title: "Mayonaka no Door / Stay With Me" },
    { cover: "luffysong2.png", file: "song1-2.mp3", title: "Unwritten" }
  ],
  Zoro: [
    { cover: "zorosong1.png", file: "song2-1.mp3", title: "Meiko Nakahara" },
    { cover: "zorosong2.png", file: "song2-2.mp3", title: "Mask Off" }
  ],
  Nami: [
    { cover: "namisong1.png", file: "song3-1.mp3", title: "Tabun" },
    { cover: "namisong2.png", file: "song3-2.mp3", title: "Rich Girl" }
  ],
  Usopp: [
    { cover: "usoppsong1.png", file: "song4-1.mp3", title: "Anri" },
    { cover: "usoppsong2.png", file: "song4-2.mp3", title: "Iron Man" }
  ],
  Sanji: [
    { cover: "sanjisong1.png", file: "song5-1.mp3", title: "Plastic Love" },
    { cover: "sanjisong2.png", file: "song5-2.mp3", title: "Suit & Tie" }
  ],
  Chopper: [
    { cover: "choppersong1.png", file: "song6-1.mp3", title: "Dress Down" },
    { cover: "choppersong2.png", file: "song6-2.mp3", title: "Tell Me" }
  ],
  Robin: [
    { cover: "robinsong1.png", file: "song7-1.mp3", title: "Yashua" },
    { cover: "robinsong2.png", file: "song7-2.mp3", title: "God is a woman" }
  ],
  Franky: [
    { cover: "frankysong1.png", file: "song8-1.mp3", title: "Junko Yagami" },
    { cover: "frankysong2.png", file: "song8-2.mp3", title: "Party in the U.S.A" }
  ],
  Brooke: [
    { cover: "brookesong1.png", file: "song9-1.mp3", title: "Tatsuro Yamashita" },
    { cover: "brookesong2.png", file: "song9-2.mp3", title: "Clair De Lune" }
  ],
  Jimbei: [
    { cover: "jimbeisong1.png", file: "song10-1.mp3", title: "Midnight Pretenders" },
    { cover: "jimbeisong2.png", file: "song10-2.mp3", title: "O-o-h Child" }
  ]
};

// Navigation state
let currentScreen = "home";
let currentCharacterIndex = 0;
let currentSongIndex = 0;

// Element references
const screenImage = document.getElementById("screenImage");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const middleBtn = document.getElementById("middleBtn");

// Audio player
const audio = new Audio();

// Character names
const characterNames = [
  "Luffy", 
  "Zoro", 
  "Nami", 
  "Usopp", 
  "Sanji",
  "Chopper", 
  "Robin", 
  "Franky", 
  "Brooke", 
  "Jimbei"
];


// MIDDLE button behavior
middleBtn.addEventListener("click", () => {
  if (currentScreen === "home") {
    // Go to character selection
    currentScreen = "characters";
    screenImage.src = screens.characters[currentCharacterIndex];
  } 
  else if (currentScreen === "characters") {
    // Confirm selected character and show song 1
    currentScreen = "songs";
    loadSong(characterNames[currentCharacterIndex], 0);
  } 
  else if (currentScreen === "songs") {
    // Go back to home screen
    stopSong();
    currentScreen = "home";
    screenImage.src = screens.home;
  }
});

// LEFT button behavior
leftBtn.addEventListener("click", () => {
  if (currentScreen === "characters") {
    // Cycle left through characters
    currentCharacterIndex = (currentCharacterIndex - 1 + screens.characters.length) % screens.characters.length;
    screenImage.src = screens.characters[currentCharacterIndex];
  } 
  else if (currentScreen === "songs") {
    // Previous song
    changeSong(-1);
  }
});

// RIGHT button behavior
rightBtn.addEventListener("click", () => {
  if (currentScreen === "characters") {
    // Cycle right through characters
    currentCharacterIndex = (currentCharacterIndex + 1) % screens.characters.length;
    screenImage.src = screens.characters[currentCharacterIndex];
  } 
  else if (currentScreen === "songs") {
    // Next song
    changeSong(1);
  }
});

// Load song
function loadSong(characterName, songIndex) {
  const song = songs[characterName][songIndex];
  if (!song) return;

  screenImage.src = song.cover;
  audio.src = `songs/${song.file}`;
  audio.play();

  currentSongIndex = songIndex;
}

// Change song (next or previous)
function changeSong(direction) {
  const currentCharacter = characterNames[currentCharacterIndex];
  const totalSongs = songs[currentCharacter].length;
  currentSongIndex = (currentSongIndex + direction + totalSongs) % totalSongs;
  loadSong(currentCharacter, currentSongIndex);
}

// Stop song when exiting
function stopSong() {
  audio.pause();
  audio.currentTime = 0;
}

