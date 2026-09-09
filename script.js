// Branching Story Project
// Run with: node script.js
//
// Your job has two parts:
//   1. Write your story in the storyNodes object below
//   2. Implement the four functions marked with TODO
//
// The console input/output is handled for you at the bottom of the file.
// You do not need to touch anything in the "do not modify" section.
//
// Read PLAN.md before starting.

// -------------------------------------------------------
// YOUR STORY DATA
//
// Fill out the storyNodes with the appropriate data.
// Keep the same structure - only the text and ids change.
//
// Scene shape:
//   id        - a unique string key, kebab-case (e.g. "dark-hallway")
//   text      - the paragraph the player reads when they arrive here
//   choices   - array of choice objects ({ text, nextId })
//   isEnding  - false for regular scenes, true for ending scenes
//
// Ending scenes also need:
//   endingTitle - a short title shown when this ending is reached
//   choices: [] - an empty array (required, not optional)
//
// Rules:
//   - Every nextId must exactly match a real scene key in this object
//   - Use kebab-case for all ids
//   - You need at least 8 scenes total and at least 2 distinct endings
// -------------------------------------------------------
const storyNodes = {
  start: {
    id: "start",
    text: "Hello! It seems that you have been misplaced in time. Not sure how that happened. Anyway, welcome to Captain Bellamy's ship, The Widow. He's not aware you're here yet which is probably for the best. However, if you'd like to depart back to your boring time, you'll need to get ahold of his spyglass. Yes, his spyglass. For some reason, this will instantly transport you back. Don't ask me how. The writers haven't worked out that particular plothole yet. You're currently on the gun deck. See all the cannons? Yep, well... Good luck! Argh I guess.",
    choices: [
      { text: "Crew's Quarters", nextId: "crews-quarters" },
      { text: "The Hold", nextId: "hold" },
    ],
    isEnding: false,
  },
  "gun-deck": {
    id: "gun-deck",
    text: "You have reached the gun deck again. This is where you started. Unless you find something new, this is almost pointless.",
    choices: [
      { text: "Ascend to the crews' quarters", nextId: "crews-quarters" },
      { text: "Descend to the Hold", nextId: "hold" },
    ],
    isEnding: false,
  },
  hold: {
    id: "hold",
    text: "You're in the hold surrounded by barrels and supplies. Boring. Go back up to the gun deck. What a waste of time...",
    choices: [{ text: "Ascend to the gun deck", nextId: "gun-deck" }],
    isEnding: false,
  },
  "captain-quarters": {
    id: "captain-quarters",
    text: "You have somehow entered the room of Captain Bellamy. He's not the cleanest man. Fabrics, presumably blankets and clothes, are strewn about the rum. There are jugs of rum and candlesticks. A map sits on a table near the wall and there is a porthole letting in some light.",
    choices: [
      { text: "Return to the main deck", nextId: "main-deck" },
      { text: "Search the blankets", nextId: "blanket-search" },
    ],
    isEnding: false,
  },
  "main-deck": {
    id: "main-deck",
    text: "You're on the main deck, exposed to the elements. The wind rustles your hair and the smell of the sea wafts past your nose and most miraculously, you're still alone. Easiest game ever. Excuse the amateur programmer. You do have quite a few options from here. Don't mess up!",
    choices: [
      { text: "Jump into the ocean", nextId: "ocean" },
      { text: "Climb the crow's nest", nextId: "crows-nest" },
      { text: "Enter the galley", nextId: "galley" },
      { text: "Ascend to the helm", nextId: "helm" },
      {
        text: "Head back down to the crews' quarters",
        nextId: "crews-quarters",
      },
    ],
    isEnding: false,
  },
  "crows-nest": {
    id: "crows-nest",
    text: "Woah, you're kind of high up. It's still kind of strange you haven't stumbled upon crew but we'll disregard that plothole for now. You see the captain talking with the helmsman at the helm. You might want to steer clear of there (ha. get it?).",
    choices: [{ text: "Climb ladder down to main deck", nextId: "main-deck" }],
    isEnding: false,
  },
  "crews-quarters": {
    id: "crews-quarters",
    text: "Welcome to the crews' quarters. Just as you'd expect; there are hammocks hanging everywhere, some cots on the ground. There are some overturned boxes surrounding what looks like the middle of a card game.",
    choices: [
      { text: "Ascend to the main deck", nextId: "main-deck" },
      { text: "Go down to the gun deck", nextId: "gun-deck" },
    ],
    isEnding: false,
  },
  galley: {
    id: "galley",
    text: "You found the equivalent of a kitchen! Not much of a kitchen but it's something. Here you'll find dried and salted meats, stale bread, and absolutely nothing fresh. Not sure what you could want in here but do as you wish.",
    choices: [
      { text: "Go back out to the main deck", nextId: "main-deck" },
      { text: "Search the cupboards", nextId: "search-cupboards" },
    ],
    isEnding: false,
  },
  "search-barrels": {
    id: "search-barrels",
    text: "Using the flat chisel and NOTHING BUT the flat chisel and no experience whatsoever, you remove the rings and head from a barrel and it opens to reveal a single key covered in some gunpowder dusting. Is this key important? Who knows? Well, I do. But you don't.",
    choices: [{ text: "Ascend to the gun deck", nextId: "gun-deck" }],
    newItem: "key",
    isEnding: false,
  },
  "search-cupboards": {
    id: "search-cupboards",
    text: "You search the cupboards. Find some familiar spices but they look a little more coarse and without labels. There are some weird odors but most importantly you find a flat chisel. Huh. Wonder what this does?",
    choices: [{ text: "Go back out to the main deck", nextId: "main-deck" }],
    newItem: "flat chisel",
    isEnding: false,
  },
  "blanket-search": {
    id: "blanket-search",
    text: "You found Captain Bellamy's spyglass! I honestly didn't think you capable but hold on tight. It's a little sickening traveling in time.",
    choices: [],
    isEnding: true,
    endingTitle: "Traveled back to 2026.",
  },
  helm: {
    id: "helm",
    text: "Captain Bellamy was occupied in a conversation with the helmsman when you arrived. As an intruder and without question, he ended your life with his cutlass.",
    choices: [],
    isEnding: true,
    endingTitle: "Died in 1724 by stabbing. Bummmer.",
  },
  ocean: {
    id: "ocean",
    text: "I'm not sure if you expected to be saved here but that was kind of dumb. You drowned or got eaten by a shark. Who knows but it's kind of the ocean. You were always going to die with this choice.",
    choices: [],
    isEnding: true,
    endingTitle: "Died in 1724 by ocean. Bummmer.",
  },
};

// -------------------------------------------------------
// GAME STATE
// These variables are used by your functions below.
// Do not rename them - the game loop at the bottom depends on them.
// -------------------------------------------------------

let currentSceneId = "start";
const visitedScenes = [];
let inventory = [];

// -------------------------------------------------------
// YOUR FUNCTIONS
// Implement each function using the TODO comments as a guide.
// None of these functions should ask for input or deal with readline.
// They only read data, update state, and log to the console.
// -------------------------------------------------------

// getCurrentScene(sceneId)
// Returns the scene object for the given id.
function getCurrentScene(sceneId) {
  return storyNodes[sceneId];
}

// displayScene(sceneId)
// Logs the scene text and numbered choices to the console.
// For endings, logs the endingTitle instead of choices.
// Do not call any input functions here - the game loop handles that.
function displayScene(sceneId) {
  const scene = getCurrentScene(sceneId);
  console.log("___________");
  console.log(scene.text);
  console.log(`Your inventory: ${inventory}`);

  //inventory updates to script
  if (inventory.includes("flat chisel") && sceneId === "hold") {
    scene.choices.push({
      text: "Search the barrels",
      nextId: "search-barrels",
    });
    scene.text =
      "You're in the hold surrounded by barrels and supplies. Boring. Go back up to the gun deck or I guess with this lousy flat chisel, you could investigate the barrels...";
  }

  if (inventory.includes("key") && sceneId === "main-deck") {
    scene.choices.push({ text: "Enter the captain's quarters", nextId: "captain-quarters" });
    scene.text =
      "You're on the main deck, exposed to the elements. The wind rustles your hair and the smell of the sea wafts past your nose and most miraculously, you're still alone. Easiest game ever. Excuse the amateur programmer. Positive note is you could access the captain's quarters with that handy key you have...";
  }

  //print choices
  if (scene.isEnding) {
    console.log(`-- ${scene.endingTitle} --`);
  } else {
    for (let i = 0; i < scene.choices.length; i++) {
      console.log(`${i + 1}. ${scene.choices[i].text}`);
    }
  }
}

// makeChoice(sceneId, choiceNumber)
// Handles a player selecting one of the numbered choices.
// Returns the nextId of the chosen scene.
function makeChoice(sceneId, choiceNumber) {
  const scene = getCurrentScene(sceneId);
  const selectedChoice = scene.choices[choiceNumber - 1];
  visitedScenes.push(sceneId);

  if (scene.newItem !== null) {
    inventory.push(scene.newItem);
  }

  return selectedChoice.nextId;
}

// restartGame()
// Resets all state back to the beginning.
// Do not call displayScene here - the game loop handles that after restart.
function restartGame() {
  currentSceneId = "start";
  visitedScenes.length = 0;
  inventory = [];
}

// -------------------------------------------------------
// GAME LOOP - DO NOT MODIFY
// This section handles all console input and output.
// It calls your functions above to run the game.
// -------------------------------------------------------

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runGame() {
  displayScene(currentSceneId);

  const scene = getCurrentScene(currentSceneId);

  if (scene.isEnding) {
    askAfterEnding();
  } else {
    const quitNumber = scene.choices.length + 1;
    console.log(quitNumber + ". Quit");
    askForInput();
  }
}

function askForInput() {
  rl.question("\nEnter your choice: ", function (answer) {
    const choiceNumber = parseInt(answer);
    const scene = getCurrentScene(currentSceneId);
    const quitNumber = scene.choices.length + 1;

    if (isNaN(choiceNumber) || choiceNumber < 1 || choiceNumber > quitNumber) {
      console.log("Please enter a number between 1 and " + quitNumber + ".");
      askForInput();
      return;
    }

    if (choiceNumber === quitNumber) {
      console.log("\nGoodbye.");
      rl.close();
      process.exit(0);
    }

    currentSceneId = makeChoice(currentSceneId, choiceNumber);
    runGame();
  });
}

function askAfterEnding() {
  console.log("\n1. Play Again");
  console.log("2. Quit");

  rl.question("\nEnter your choice: ", function (answer) {
    const choiceNumber = parseInt(answer);

    if (choiceNumber === 1) {
      restartGame();
      runGame();
      return;
    }

    if (choiceNumber === 2) {
      console.log("\nThanks for playing.");
      rl.close();
      process.exit(0);
    }

    console.log("Please enter 1 or 2.");
    askAfterEnding();
  });
}

runGame();
