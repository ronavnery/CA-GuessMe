var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = 'Guess-DB'

function createQuestsTree() {
    if (!gQuestsTree) {
        console.log('entering');
        gQuestsTree = createQuest('Is your character real?');

        gQuestsTree.yes = createQuest('Is it Madonna?');
        gQuestsTree.no = createQuest('Is it God?');

        gCurrQuest = gQuestsTree;

        gPrevQuest = null;
    }
}

function createQuest(txt) {
    return {
        text: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    console.log('previous question was:', gPrevQuest);
    if (gLastRes === 'yes') gCurrQuest = gCurrQuest.yes
    else gCurrQuest = gCurrQuest.no;
    console.log('current question is now', gCurrQuest);
}

function addGuess(newGuessTxt, newQuestTxt, res) {
    gPrevQuest[res] = createQuest(newQuestTxt)
    gPrevQuest[res].yes = createQuest(newGuessTxt)
    gPrevQuest[res].no = gCurrQuest;
}

function restartGame() {
    gCurrQuest = gQuestsTree;
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gQuestsTree))
}

function loadFromLocalStorage() {
    gQuestsTree = JSON.parse(localStorage.getItem(STORAGE_KEY));
    gCurrQuest = gQuestsTree;
    console.log('loading from local storage:', gQuestsTree);
}
