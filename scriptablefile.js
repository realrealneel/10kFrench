let url = "https://raw.githubusercontent.com/realrealneel/FrenchWords/main/french_midfreq_nouns_1000.json";

let req = new Request(url);
let words = await req.loadJSON();

function cleanWord(str) {
  return str.replace(/[\s\d]+[a-z]?$/i, '').trim(); //Needed because of some funky stuff
}

let word = words[Math.floor(Math.random() * words.length)];

let frenchClean = cleanWord(word.word);
let englishClean = cleanWord(word.translation);
let article = "";
if (word.gender === "m") {
  article = "(le/un)";
} else if (word.gender === "f") {
  article = "(la/une)";
} else {
  article = "(?)"; //Shouldn't happen after checking json
}

let widget = new ListWidget();
widget.backgroundColor = new Color("#ffffff");
widget.setPadding(16, 16, 16, 16);

let title = widget.addText(`${article} ${frenchClean}`);
title.font = Font.boldSystemFont(24);
title.textColor = new Color("#1a1a1a");
title.centerAlignText();
widget.addSpacer(6);
let subtitle = widget.addText(englishClean);
subtitle.font = Font.systemFont(16);
subtitle.textColor = new Color("#666666");
subtitle.centerAlignText();

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentSmall();
}

Script.complete();
