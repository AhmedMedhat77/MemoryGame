// select game button
document.querySelector(".control-buttons span").onclick = function () {
  // prompt widnow to ask for name
  let yourName = prompt("what's your name ?");
  if (yourName == null || yourName == "") {
    // if name is empty
    document.querySelector(".name span").innerHTML = "unKnown";
  } else {
    // if name is not empty
    document.querySelector(".name span").innerHTML = yourName;
  }
  // remove the splash screen
  document.querySelector(".control-buttons").remove();
};

// effect duration

let duration = 1000;

//select blocks container
let blocksContainer = document.querySelector(".memory-game-blocks");
//create array from game blocks
let blocks = Array.from(blocksContainer.children);
// create range of keys
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

// let orderRange = Array.from(Array(blocks.length).keys());

blocks.forEach((block, index) => {
  //add order css property to game block
  block.style.order = orderRange[index];

  //add click event
  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

// Shuffle Funtction

function shuffle(array) {
  //setting vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);
    //decrease length by one
    current--;

    //[1] save current element in stash
    temp = array[current];
    //[2] current element = random element
    array[current] = array[random];
    //[3] random element = get element from stash
    array[random] = temp;
  }
  return array;
}

// Stop clicking function

function stopClicking() {
  // add class no clicking on main container
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    //remove the class no clicking after the duration
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Create flip block  function
function flipBlock(selectedBlock) {
  //add flipped class
  selectedBlock.classList.add("is-flipped");
  // collect all flipped cards
  let allFlippedBlocks = blocks.filter((allFlippedBlock) =>
    allFlippedBlock.classList.contains("is-flipped")
  );
  // if there is two selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking();
    // check matched block funtion
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// check matched blocks

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology == secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}
