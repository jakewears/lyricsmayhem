const header = document.querySelector(".title");
const lyrics = document.querySelector(".lyrics-text");
const playBtn = document.querySelector("#play-btn");
const submitBtn = document.querySelector("#submit-btn");
const answersContainer = document.querySelector("#answers-container");

const songAnswer = document.querySelector("#song");
const albumAnswer = document.querySelector("#album");
const yearAnswer = document.querySelector("#year");

const instructionsBtn = document.querySelector("#instructions-click");
const instructionsContainer = document.querySelector("#instructions-container");
const leftPic = document.querySelector("#imgLeft");
const rightPic = document.querySelector("#imgRight");
const roundInfoText = document.querySelector("#round-info");
const roundInfo = document.querySelector("#round-container");
const roundInfoBg = document.querySelector("#round-background");
const closeOut = document.querySelector("#close-out");
const closeOut2 = document.querySelector("#close-out-2");
const songText = document.querySelector("#song-text");
const albumText = document.querySelector("#album-text");
const yearText = document.querySelector("#year-text");
const song = document.querySelector("#song-number");
const correct = "✅";
const wrong = "❌";

/* -- need to begin backend work to bring back code
const data = require("./data.json");
let highScoreText = document.querySelector("#high-score");
let highScore;
let index = Math.floor(Math.random() * 90);
*/

let scoreText = document.querySelector("#score");
let score = 0;
let points;
let index;
let usedSongs = [];
let loaded = false;
let songNumber = 0;

//begins game and kickstarts all functions
playBtn.addEventListener("click", e => {
    e.preventDefault();
    noRepeat();
    openAnswers();
    nextSong();
    swapBtn();
});

submitBtn.addEventListener("click", e => {
    e.preventDefault();
    activateRoundInfoBg();
    activateRoundInfo();
    activateData();
});

window.addEventListener("load", (e) => {
    loaded = true;
    if (loaded) {
        setTimeout(() => {
            leftPic.classList.remove("inactive"),
                rightPic.classList.remove("inactive")
        }, 100);
    } else {
        console.log(e);
    }
});

let fired = false;
window.addEventListener("keydown", function (e) {
    if (fired === false){
        if (e.key === "Enter") {
            fired = true;
            verifyAnswers();
        };
    } else {
        return;
    }
});

const endRound = () => {
    activateRoundInfoBg();
    activateRoundInfo();
    activateData();
}

closeOut.addEventListener("click", function (e) {
    closeWindow();
    nextSong();
    fired = false;
});

closeOut2.addEventListener("click", function (e) {
    hideInstructions();
});

const noRepeat = () => {
    index = Math.floor(Math.random() * swiftSongs.length);
    if (usedSongs.length >= swiftSongs.length) {
        alert(`No more songs!\nYour final score is: ${score}`);
    } else if (usedSongs.includes(index)) {
        console.log("Caught a repeat!");
        console.log(`${swiftSongs[index].lyric}`);
        nextSong();
    } else {
        usedSongs.push(index);
        return index;
    }
};

/* -- need to begin backend work to bring back code
console.log(data);

const getHighScore = () => {
    if (typeof(highScore) === 'undefined'){
        highScore = score;
        highScoreText.innerText = `High Score: ${highScore}`;
    }
}
*/

// connects to the "x" on the round info screen
const closeWindow = () => {
    deactivateRoundInfo();
    deactivateRoundInfoBg();
};

// replaces "PLAY" with "SUBMIT"
const swapBtn = () => {
    playBtn.style.display = "none";
    submitBtn.style.display = "block";
};

// changes "display" so it's no longer hidden
const openAnswers = () => {
    answersContainer.style.display = "block";
};

// checks for repeats and then calls the next unique song
const nextSong = () => {
    noRepeat();
    lyrics.innerText = swiftSongs[index].lyric;
    songNumber++;
};

// resets all of the answer inputs after "submit" is hit
const resetInputs = () => {
    songAnswer.value = "";
    albumAnswer.value = "";
    yearAnswer.value = "";
};

const activateRoundInfoBg = () => {
    roundInfoBg.style.display = "block";
};
const activateRoundInfo = () => {
    roundInfo.style.display = "block";
};
const deactivateRoundInfoBg = () => {
    roundInfoBg.style.display = "none";
    resetInputs();
};
const deactivateRoundInfo = () => {
    roundInfo.style.display = "none";
};

instructionsBtn.addEventListener("click", function (e) {
    displayInstructions();
});

const displayInstructions = () => {
    instructionsContainer.style.display = "block";
};

const hideInstructions = () => {
    instructionsContainer.style.display = "none";
};

const activateData = () => {
    scoreText.innerText = score;
    roundInfoText.display = "block";
    songText.innerText = `${swiftSongs[index].name[0]} ${swiftSongs[index].name.includes(songAnswer.value.toLowerCase()) ? correct : wrong}`;
    albumText.innerText = `${swiftSongs[index].album[0]} ${swiftSongs[index].album.includes(albumAnswer.value.toLowerCase()) ? correct : wrong}`
    yearText.innerText = `${swiftSongs[index].year} ${yearAnswer.value === swiftSongs[index].year ? correct : wrong}`;
    song.innerText = `${songNumber}`;
};

// verifies answers and awards points
const verifyAnswers = () => {
    if (swiftSongs[index].name.includes(songAnswer.value.toLowerCase()) && swiftSongs[index].album.includes(albumAnswer.value.toLowerCase()) && yearAnswer.value === swiftSongs[index].year) {
        points = 3;
        score += points;
    } else if (swiftSongs[index].name.includes(songAnswer.value.toLowerCase()) && swiftSongs[index].album.includes(albumAnswer.value.toLowerCase())) {
        points = 2;
        score += points;
    } else if (swiftSongs[index].name.includes(songAnswer.value.toLowerCase()) && yearAnswer.value === swiftSongs[index].year) {
        points = 2;
        score += points;
    } else if (swiftSongs[index].name.includes(songAnswer.value.toLowerCase())) {
        points = 1;
        score += points;
    } else if (!swiftSongs[index].name.includes(songAnswer.value)) {
        points = 0;
        score += points;
        scoreText.innerText = score;
    } else {
        alert("Something went terribly wrong...");
    };
    // getHighScore(); -- backend
};

// object group of every Taylor Swift song
let swiftSongs = [
    {
        index: 0,
        lyric: "couldn't take the heat",
        name: ["out of the woods"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 1,
        lyric: "been saying yes instead of no",
        name: ["the 1", "the one"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 2,
        lyric: "dress up like hipsters",
        name: ["22"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 3,
        lyric: "it's not what i meant",
        name: ["afterglow"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 4,
        lyric: "some dude whose name i cannot remember now",
        name: ["all of the girls you've loved before"],
        album: [undefined],
        year: "2023"
    },
    {
        index: 5,
        lyric: "dancing around the kitchen in the refrigerator light",
        name: ["all too well"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 6,
        lyric: "had me in the palm of your hand",
        name: ["all you had to do was stay"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 7,
        lyric: "midnights become my afternoons",
        name: ["anti-hero"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 8,
        lyric: "they see right through me",
        name: ["the archer"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 9,
        lyric: "your back beneath the sun",
        name: ["august"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 10,
        lyric: "what a shame",
        name: ["babe"],
        album: ["red (taylor's version)", "red"],
        year: "2021"
    },
    {
        index: 11,
        lyric: "freedom ain't nothing but missing you",
        name: ["back to december"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 12,
        lyric: "did you think we'd be fine",
        name: ["bad blood"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 13,
        lyric: "on a wednesday in the café",
        name: ["begin again"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 14,
        lyric: "did all the extra credit",
        name: ["bejeweled"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 15,
        lyric: "i don't know why all the trees change in the fall",
        name: ["the best day"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 16,
        lyric: "i just miss you",
        name: ["better man"],
        album: ["red (taylor's version)", "red"],
        year: "2021"
    },
    {
        index: 17,
        lyric: "i never saw it coming, nor would i have suspected it",
        name: ["better than revenge"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 18,
        lyric: "if i just showed up at your party",
        name: ["betty"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 19,
        lyric: "salt streams out my eyes and into my ears",
        name: ["bigger than the whole sky"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 20,
        lyric: "magic, madness, heaven, sin",
        name: ["blank space"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 21,
        lyric: "music starts playin' like the end of a sad movie",
        name: ["breathe"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 22,
        lyric: "this is the last time i'll drive this way again",
        name: ["bye bye baby"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 23,
        lyric: "walking with his head down",
        name: ["call it what you want"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 24,
        lyric: "under someone's bed",
        name: ["cardigan"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 25,
        lyric: "i fear i have fallen from grace",
        name: ["castles crumbling"],
        album: ["speak now (taylor's version)", "speak now"],
        year: "2023"
    },
    {
        index: 26,
        lyric: "sit there in this hurt",
        name: ["champagne problems"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 27,
        lyric: "gone was every trace of you",
        name: ["clean"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 28,
        lyric: "pots and pans",
        name: ["closure"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 29,
        lyric: "now that i'm sitting here thinking it through",
        name: ["cold as you"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 30,
        lyric: "this is when the feeling sets in",
        name: ["come back... be here", "come back be here"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 31,
        lyric: "i could stand up and sing you a song",
        name: ["come in with the rain"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2009"
    },
    {
        index: 32,
        lyric: "sorry for not making you my centerfold",
        name: ["coney island"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 33,
        lyric: "we were a fresh page on the desk",
        name: ["cornelia street"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 34,
        lyric: 'but i said, "dancing is a dangerous game"',
        name: ["cowboy like me"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 35,
        lyric: "so cut the headlights, summer's a knife",
        name: ["cruel summer"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 36,
        lyric: "deep blue, but you painted me golden",
        name: ["dancing with our hands tied"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 37,
        lyric: "i'll tell you the truth, but never goodbye",
        name: ["daylight"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 38,
        lyric: "i get drunk, but it's not enough",
        name: ["death by a thousand cuts"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 39,
        lyric: "praying the floor won't fall through again",
        name: ["dear john"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 40,
        lyric: "burn all the files, desert all your past lives",
        name: ["dear reader"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 41,
        lyric: "handsome, you're a mansion with a view",
        name: ["delicate"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 42,
        lyric: "my name is whatever you decide",
        name: ["don't blame me"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 43,
        lyric: "I've tried, but that's just somethin' i can't do",
        name: ["don't you"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2023"
    },
    {
        index: 44,
        lyric: "honey, making a lark of the misery",
        name: ["dorothea"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 45,
        lyric: "everyone thinks that they know us",
        name: ["dress"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 46,
        lyric: "i've been left in the rain lost and pining",
        name: ["electric touch"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2023"
    },
    {
        index: 47,
        lyric: "the lingering question kept me up",
        name: ["enchanted"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 48,
        lyric: "i'm so stoked, i need a toast",
        name: ["end game"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 49,
        lyric: "just a flesh wound, here's your rifle",
        name: ["epiphany"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 50,
        lyric: "trying to find the one where i went wrong",
        name: ["evermore"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 51,
        lyric: "i just wanna know you better",
        name: ["everything has changed"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 52,
        lyric: "laughin', but the joke's not funny at all",
        name: ["exile"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 53,
        lyric: "they all warned us about times like this",
        name: ["false god"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 54,
        lyric: "there's a glow off the pavement",
        name: ["fearless"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 55,
        lyric: "you say hi to your friends you ain't seen in awhile",
        name: ["fifteen", "15"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 56,
        lyric: "chances are, tonight, you've already got plans",
        name: ["foolish one"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2023"
    },
    {
        index: 57,
        lyric: "here's to silence, that cuts me to the core",
        name: ["forever and always", "forever & always"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 58,
        lyric: "i pull at every thread, tryna solve the puzzles in his head",
        name: ["forever winter"],
        album: ["red", "red (taylor's version)"],
        year: "2021"
    },
    {
        index: 59,
        lyric: "i wanted to leave him, i needed a reason",
        name: ["getaway car"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 60,
        lyric: "but honey, i am no-one's exception",
        name: ["girl at home"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 61,
        lyric: "i'd go back to wanting dudes who give nothing",
        name: ["glitch"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 62,
        lyric: "what must it be like\nto grow up that beautiful?",
        name: ["gold rush"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 63,
        lyric: "whisky on ice, sunset and vine",
        name: ["gorgeous"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 64,
        lyric: "all that bloodshed, crimson clover",
        name: ["the great war"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 65,
        lyric: "showed you all of my hiding spots",
        name: ["happiness"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 66,
        lyric: "something's made your eyes go cold",
        name: ["haunted"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 67,
        lyric: "of all the girls tossing rocks at your window",
        name: ["hey stephen", "hey, stephen"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 68,
        lyric: "i didn't know you were keeping count",
        name: ["high infidelity"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 69,
        lyric: "i used to switch out these kens, i'd just ghost",
        name: ["hits different"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 70,
        lyric: "you know i left a part of me back in new york",
        name: ["hoax"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 71,
        lyric: "back when you fit my poems like a perfect rhyme",
        name: ["holy ground"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 72,
        lyric: "i want you for worse or for better",
        name: ["how you get the girl"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 73,
        lyric: "you're sittin' in your chair by the window",
        name: ["i almost do"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 74,
        lyric: "silver spoon gated community",
        name: ["i bet you think about me"],
        album: ["red", "red (taylor's version)"],
        year: "2021"
    },
    {
        index: 75,
        lyric: "they keep watchful eyes on us",
        name: ["i can see you"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2023"
    },
    {
        index: 76,
        lyric: "burning all the witches",
        name: ["i did something bad"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 77,
        lyric: "in my feelings more than Drake",
        name: ["i forgot that you existed"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 78,
        lyric: "he'll never see you cry",
        name: ["i knew you were trouble"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 79,
        lyric: "you stand with your hand on my waistline",
        name: ["i know places"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 80,
        lyric: "i am an architect, i'm drawing up the plans",
        name: ["i think he knows"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 81,
        lyric: "i'd never forget you as long as i'd live",
        name: ["i wish you would"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 82,
        lyric: "you dream of my mouth before it called you a lying traitor",
        name: ["is it over now?", "is it over now"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2023"
    },
    {
        index: 83,
        lyric: "i was playing back a thousand memories, baby",
        name: ["if this was a movie"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 84,
        lyric: "leave the perfume on the shelf",
        name: ["illicit affairs"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 85,
        lyric: "wasn't it easier in your lunchbox days?",
        name: ["innocent"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 86,
        lyric: "you can't see me wantin' you the way you want her",
        name: ["invisible"],
        album: ["taylor swift", "debut"],
        year: "2007"
    },
    {
        index: 87,
        lyric: "bad was the blood of the song in the cab",
        name: ["invisible string"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 88,
        lyric: "you've been stressed out lately? yeah, me too",
        name: ["it's nice to have a friend"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 89,
        lyric: "then the son of the boss gets the spot that was yours",
        name: ["it's time to go"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 90,
        lyric: "you and i are painting pictures in the sky",
        name: ["i'm only me when i'm with you"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 91,
        lyric: "your touch brought forth an incandescent glow",
        name: ["ivy"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 92,
        lyric: "well, i like the way your hair falls in your face",
        name: ["jump then fall"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2009"
    },
    {
        index: 93,
        lyric: "weave your little webs of opacity",
        name: ["karma"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 94,
        lyric: "facts",
        name: ["karma"],
        album: ["midnights", "midnights (the til dawn edition)", "midnights (the late night edition)"],
        year: "2023"
    },
    {
        index: 95,
        lyric: "late in the night, the city's asleep",
        name: ["king of my heart"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 96,
        lyric: "i'll be getting over you my whole life",
        name: ["labyrinth"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 97,
        lyric: "tell me what are my words worth",
        name: ["the lakes"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 98,
        lyric: "bitch pack friends",
        name: ["the last great american dynasty"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 99,
        lyric: "fresh on the pavement, i ran off the plane",
        name: ["last kiss"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 100,
        lyric: "run fast, nowhere to hide",
        name: ["the last time"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 101,
        lyric: "talk your talk and go viral",
        name: ["lavendar haze"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 102,
        lyric: '"this is absurd"',
        name: ["long live"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 103,
        lyric: "if the shoe fits, walk in it 'til your high heels break",
        name: ["long story short"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 104,
        lyric: "but something happened, i heard him laughing",
        name: ["london boy"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 105,
        lyric: "the role you made me play of the fool",
        name: ["look what you made me do"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 106,
        lyric: "so i sneak out to the garden to see you",
        name: ["love story"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 107,
        lyric: "all's well that ends well to end up with you",
        name: ["lover"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 108,
        lyric: "you had it figured out since you were in school",
        name: ["the lucky one", "the lucky 1"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 109,
        lyric: "this is the first time i've felt the need to confess",
        name: ["mastermind"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 110,
        lyric: "my cannons all firin' at your yacht",
        name: ["mad woman"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 111,
        lyric: "they paint me out to be bad",
        name: ["the man"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 112,
        lyric: "long limbs and frozen swims",
        name: ["marjorie"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 113,
        lyric: "you were standin' hollow-eyed in the hallway",
        name: ["maroon"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 114,
        lyric: "take me back when our world was one block wide",
        name: ["mary's song (oh my my my)", "mary's song"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 115,
        lyric: "i never leave well enough alone",
        name: ["me!", "me"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 116,
        lyric: "drunk and grumbling on about how i can't sing",
        name: ["mean"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 117,
        lyric: "'cause you could be the one that I love",
        name: ["message in a bottle"],
        album: ["red", "red (taylor's version)"],
        year: "2021"
    },
    {
        index: 118,
        lyric: "picture perfect, shiny family",
        name: ["midnight rain"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 119,
        lyric: "i was a flight risk, with a fear of fallin'",
        name: ["mine"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 120,
        lyric: "you'll find me on my tallest tiptoes",
        name: ["mirrorball"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 121,
        lyric: "no cameras catch my pageant smile",
        name: ["miss americana & the heartbreak prince", "miss americana and the heartbreak prince"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 122,
        lyric: "a million little shining stars had just aligned",
        name: ["the moment i knew"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 123,
        lyric: "it takes everything in me just to get up each day",
        name: ["mr. perfectly fine", "mr perfectly fine"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2021"
    },
    {
        index: 124,
        lyric: "you know i didn't want to have to haunt you",
        name: ["my tears ricochet"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 125,
        lyric: "you're in the car on the way to the movies",
        name: ["never grow up"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 126,
        lyric: "the lights and noise are blinding",
        name: ["new romantics"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 127,
        lyric: "i can tell that it's gonna be a long road",
        name: ["new year's day"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 128,
        lyric: "Tuesday night at Olive Garden",
        name: ["no body, no crime"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 129,
        lyric: "it's like i can feel time moving",
        name: ["nothing new"],
        album: ["red", "red (taylor's version)"],
        year: "2021"
    },
    {
        index: 130,
        lyric: "i don't have to pretend i like acid rock",
        name: ["now that we don't talk"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2023"
    },
    {
        index: 131,
        lyric: 'i said, "Leave", but all i really want is you',
        name: ["the other side of the door"],
        album: ["fearless", "fearless (taylor's version)", "fearless (platinum edition)"],
        year: "2009"
    },
    {
        index: 132,
        lyric: "sneakin' out late, tapping on your window",
        name: ["our song"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 133,
        lyric: "the jury's out, but my choice is you",
        name: ["ours"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 134,
        lyric: "we were built to fall apart",
        name: ["out of the woods"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 135,
        lyric: "and baby i've got nowhere to go",
        name: ["the outside"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 136,
        lyric: "i want your complications too",
        name: ["paper rings"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 137,
        lyric: "i'm so in love that i might stop breathing",
        name: ["paris"],
        album: ["midnights (3am edition)", "midnights"],
        year: "2022"
    },
    {
        index: 138,
        lyric: "if your cascade ocean wave blues come",
        name: ["peace"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 139,
        lyric: "how do i get it back the way it was before",
        name: ["a perfectly good heart", "perfectly good heart"],
        album: ["taylor swift (deluxe edition)", "debut", "taylor swift"],
        year: "2007"
    },
    {
        index: 140,
        lyric: "you're a redneck heartbreak who's really bad at lying",
        name: ["picture to burn"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 141,
        lyric: "trying to see through the rain coming down",
        name: ["a place in this world", "place in this world"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 142,
        lyric: "half-moon eyes, bad surprise",
        name: ["question...?", "question"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 143,
        lyric: "but if i'm a thief, then he can join the heist",
        name: ["...ready for it?", "ready for it?", "ready for it"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 144,
        lyric: "loving him is like trying to change your mind",
        name: ["red"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 145,
        lyric: "help, i'm still at the restaurant",
        name: ["right where you left me"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 146,
        lyric: "i remember you dancing before bedtime",
        name: ["ronan"],
        album: ["red", "red (taylor's version)"],
        year: "2021"
    },
    {
        index: 147,
        lyric: "i'd drive away before i let you go",
        name: ["run"],
        album: ["red", "red (taylor's version)"],
        year: "2021"
    },
    {
        index: 148,
        lyric: "we had a beautiful magic love there",
        name: ["sad beautiful tragic"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 149,
        lyric: "why'd you have to lead me on?",
        name: ["say don't go"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2023"
    },
    {
        index: 150,
        lyric: "sweet tea in the summer",
        name: ["seven", "7"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 151,
        lyric: "my ex-man brought his new girlfriend",
        name: ["shake it off"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 152,
        lyric: "you shouldn't be beggin' for forgiveness at my feet",
        name: ["should've said no"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 153,
        lyric: "moonlit swimming pool",
        name: ['"slut!"', "slut!", "slut"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2023"
    },
    {
        index: 154,
        lyric: "life is emotionally abusive",
        name: ["snow on the beach"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 155,
        lyric: "trippin', trip-trippin' when you're gone",
        name: ["so it goes...", "so it goes"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 156,
        lyric: "holy orange bottles, each night I pray to you",
        name: ["soon you'll get better"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 157,
        lyric: "you're the kind of reckless that should send me running",
        name: ["sparks fly"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 158,
        lyric: "i sneak in and see your friends",
        name: ["speak now"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 159,
        lyric: "i met Bobby on the boardwalk summer of '45",
        name: ["starlight"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 160,
        lyric: "you come around and the armor falls",
        name: ["state of grace"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 161,
        lyric: "i hope your love leads you back to my door",
        name: ["stay beautiful"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 162,
        lyric: "i threw my phone across the room at you",
        name: ["stay stay stay"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 163,
        lyric: "so many things that i wish you knew",
        name: ["the story of us"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 164,
        lyric: "he can't keep his wild eyes on the road",
        name: ["style"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 165,
        lyric: "you were so magnetic it was almost obnoxious",
        name: ["suburban legends"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2023"
    },
    {
        index: 166,
        lyric: "he's got his mothers eyes, his father's ambition",
        name: ["superman"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2010"
    },
    {
        index: 167,
        lyric: "give me a photograph to hang on my wall",
        name: ["superstar"],
        album: ["fearless", "fearless (taylor's version)", "fearless (platinum edition)"],
        year: "2009"
    },
    {
        index: 168,
        lyric: "industry disruptors and soul deconstructors",
        name: ["sweet nothing"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 169,
        lyric: "you never saw it coming, slipped when you started running",
        name: ["sweeter than fiction"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2023"
    },
    {
        index: 170,
        lyric: "she better hold him tight, give him all her love",
        name: ["teardrops on my guitar"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 171,
        lyric: "i'm sick and tired of your attitude",
        name: ["tell me why"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 172,
        lyric: "laughin' when i was cryin'",
        name: ["that's when"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2021"
    },
    {
        index: 173,
        lyric: "pulled the car off the road to the lookout",
        name: ["this is me trying"],
        album: ["folklore"],
        year: "2020"
    },
    {
        index: 174,
        lyric: "i can't even say it with a straight face!",
        name: ["this is why we can't have nice things"],
        album: ["reputation"],
        year: "2017"
    },
    {
        index: 175,
        lyric: "currents swept you out again",
        name: ["this love"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 176,
        lyric: "the water's high, you're jumping into it",
        name: ["tied together with a smile"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 177,
        lyric: "just a boy in a Chevy truck",
        name: ["tim mcgraw"],
        album: ["taylor swift", "debut"],
        year: "2006"
    },
    {
        index: 178,
        lyric: "on a crowded street in 1944",
        name: ["timeless"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2023"
    },
    {
        index: 179,
        lyric: "you could call me babe for the weekend",
        name: ["'tis the damn season"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 180,
        lyric: "i used to be a damsel in distress",
        name: ["today was a fairytale"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2021"
    },
    {
        index: 181,
        lyric: "i greet you with a battle hero's welcome",
        name: ["tolerate it"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 182,
        lyric: "two headlights shine through the sleepless night",
        name: ["treacherous"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 183,
        lyric: "in the middle of the night, when i'm in this dream",
        name: ["untouchable"],
        album: ["fearless", "fearless (taylor's version)", "fearless (platinum edition)"],
        year: "2009"
    },
    {
        index: 184,
        lyric: "and so it goes, every weekend, the same party",
        name: ["the very first night"],
        album: ["red", "red (taylor's version)"],
        year: "2021"
    },
    {
        index: 185,
        lyric: "sometimes i wonder which one will be your last lie",
        name: ["vigilante shit"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 186,
        lyric: "and all my single friends are jealous",
        name: ["the way i loved you"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 187,
        lyric: "i'm really gonna miss you picking fights",
        name: ["we are never ever getting back together"],
        album: ["red", "red (taylor's version)"],
        year: "2012"
    },
    {
        index: 188,
        lyric: "it's been waitin' for you",
        name: ["welcome to new york"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 189,
        lyric: "when it was good, baby, it was good, baby",
        name: ["we were happy"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2021"
    },
    {
        index: 190,
        lyric: "and to tell you the truth, sometimes i wish i was her",
        name: ["when emma falls in love"],
        album: ["speak now", "speak now (taylor's version)"],
        year: "2023"
    },
    {
        index: 191,
        lyric: "stupid girl, i shoulda known, i shoulda known",
        name: ["white horse"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 192,
        lyric: "i thought Heaven can't help me now",
        name: ["wildest dreams"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 193,
        lyric: "lost in your current like a priceless wine",
        name: ["willow"],
        album: ["evermore"],
        year: "2020"
    },
    {
        index: 194,
        lyric: "'cause nothing's as it seems",
        name: ["wonderland"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 195,
        lyric: "memories feel like weapons",
        name: ["would've, could've, should've"],
        album: ["midnights (3am edition)", "midnights"],
        year: "2022"
    },
    {
        index: 196,
        lyric: "the way the tires turn stones, on old county roads",
        name: ["you all over me"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2021"
    },
    {
        index: 197,
        lyric: "you two are dancing in a snow globe, 'round and 'round",
        name: ["you are in love"],
        album: ["1989", "1989 (taylor's version)"],
        year: "2014"
    },
    {
        index: 198,
        lyric: "it's a typical Tuesday night",
        name: ["you belong with me"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 199,
        lyric: "i'm getting tired even for a phoenix",
        name: ["you're losing me"],
        album: ["midnights (the late night edition)", "midnights"],
        year: "2023"
    },
    {
        index: 200,
        lyric: "you're smoking with your boys",
        name: ["you're on your own kid"],
        album: ["midnights"],
        year: "2022"
    },
    {
        index: 201,
        lyric: "snakes and stones never broke my bones",
        name: ["you need to calm down"],
        album: ["lover"],
        year: "2019"
    },
    {
        index: 202,
        lyric: "you don't have to call anymore",
        name: ["you're not sorry"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 203,
        lyric: "i remember you said don't leave me here alone",
        name: ["safe & sound", "safe and sound"],
        album: ["the hunger games"],
        year: "2011"
    },
    {
        index: 204,
        lyric: "the game was rigged, the ref got tricked",
        name: ["only the young"],
        album: [undefined],
        year: "2020"
    },
    {
        index: 205,
        lyric: "he's broken every human law, he breaks the law of gravity",
        name: ["macavity"],
        album: ["cats", "musical"],
        year: "2019"
    },
    {
        index: 206,
        lyric: "wake up and smell the break up",
        name: ["i heart ?", "i heart"],
        album: ["beautiful eyes"],
        year: "2008"
    },
    {
        index: 207,
        lyric: "wondering if i dodged a bullet or just lost the love of my life",
        name: ["i don't wanna live forever"],
        album: ["fifty shades darker", "50 shades darker", "50 shades", "fifty shades"],
        year: "2016"
    },
    {
        index: 208,
        lyric: "the tricky thing is yesterday we were just children",
        name: ["eyes open"],
        album: ["the hunger games"],
        year: "2012"
    },
    {
        index: 209,
        lyric: "i'd never gone with the wind, just let it flow",
        name: ["crazier"],
        album: ["hannah montana: the movie", "hannah montana"],
        year: "2009"
    },
    {
        index: 210,
        lyric: "sweet dreams of holly and ribbon",
        name: ["christmas tree farm"],
        album: [undefined],
        year: "2019"
    },
    {
        index: 211,
        lyric: "you know it's all the same, another time and place",
        name: ["change"],
        album: ["fearless", "fearless (taylor's version)"],
        year: "2008"
    },
    {
        index: 212,
        lyric: "free as these birds, light as whispers",
        name: ["carolina"],
        album: ["where the crawdads sings", "crawdads"],
        year: "2022"
    },
    {
        index: 213,
        lyric: "too young to wander London streets",
        name: ["beautiful ghosts"],
        album: ["cats", "musical"],
        year: "2019"
    },
    {
        index: 214,
        lyric: "i wanna be somewhere where you are",
        name: ["beautiful eyes"],
        album: ["beautiful eyes"],
        year: "2008"
    },
    /*
        {
            index: 215,
            lyric: "may your days be merry and bright",
            name: "white christmas",
            album: "sounds of the season",
            year: "2007"
        },
        {
            index: 216,
            lyric: "round young virgin mother and child",
            name: "silent night",
            album: "sounds of the season",
            year: "2007"
        },
        {
            index: 217,
            lyric: "so hurry down the chimney tonight",
            name: "santa baby",
            album: "sounds of the season",
            year: "2007"
        },
        {
            index: 218,
            lyric: "once bitten and twice shy",
            name: "last christmas",
            album: "sounds of the season",
            year: "2007"
        },
        {
            index: 219,
            lyric: "what would happen if Christmas carols told a lie",
            name: "christmas must be something more",
            album: "sounds of the season",
            year: "2007"
        },
        {
            index: 220,
            lyric: "please take down the mistletoe",
            name: "christmases when you were mine",
            album: "sounds of the season",
            year: "2007"
        }
    */
]