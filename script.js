const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;


const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum nisl nec ante condimentum, a vulputate massa commodo. Phasellus sodales, justo in egestas fermentum, leo urna molestie enim, non ultricies risus arcu a metus. Duis ut fringilla magna. Vestibulum ullamcorper efficitur lorem, vel venenatis elit faucibus id. Sed id fringilla lacus. ",
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut malesuada, justo nec hendrerit vulputate, lectus ligula sollicitudin velit, nec tincidunt lectus purus et erat. Phasellus eu leo ullamcorper, fermentum massa ut, aliquam lorem. Proin quis aliquet nulla, non bibendum risus. ",
    "Integer non ullamcorper nulla, id rhoncus leo. Curabitur lacinia, sapien in dapibus aliquam, dolor odio efficitur est, at facilisis urna nisl vitae leo. Nulla facilisi. Phasellus consequat lorem odio, at pharetra justo consequat et. Curabitur vehicula risus in dolor bibendum, ut maximus eros sagittis. ",
    "Suspendisse sed nunc vestibulum, feugiat est at, euismod urna. Sed tincidunt vitae nulla a placerat. Cras vitae turpis non eros scelerisque mattis. Ut quis justo enim. Curabitur molestie efficitur risus. Integer efficitur congue nunc in ullamcorper. Sed congue sapien eu turpis venenatis, in tincidunt justo suscipit. ",
    "Fusce vel ligula metus. Phasellus molestie luctus purus, eu volutpat quam varius quis. Duis suscipit, lectus sed feugiat fermentum, orci massa auctor diam, eget euismod libero risus eget metus. Nullam at sagittis libero. Nam ac risus ut eros facilisis congue. Fusce posuere arcu at ex bibendum ullamcorper. ",
    "Donec vitae consectetur lectus. Aliquam non semper ante, a scelerisque leo. Mauris placerat, odio ac convallis placerat, ipsum lorem tempus lorem, nec pharetra mauris ligula nec metus. Sed nec velit ut urna tristique bibendum. Ut viverra, dolor nec egestas eleifend, dolor eros malesuada magna, nec egestas risus sem nec purus. ",
    "Nulla facilisi. Morbi viverra turpis ligula, eu molestie mi cursus at. Nam accumsan neque eget feugiat consectetur. Maecenas bibendum id nisi vitae consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla facilisi. Vestibulum ut ligula non erat elementum iaculis. ",
    "In lacinia bibendum urna, eget efficitur risus eleifend eget. Donec id magna sit amet enim facilisis lobortis. Integer nec sodales risus. Ut bibendum laoreet neque nec tincidunt. Sed congue massa a ante rhoncus, nec facilisis metus ultricies. In ultrices risus nec massa fermentum, eget aliquam nulla efficitur. ",
    "Quisque posuere urna a justo scelerisque, a eleifend ligula facilisis. Vivamus ultricies vestibulum sapien a fermentum. Praesent euismod, enim a consequat suscipit, ligula quam fringilla mauris, et consequat urna est id est. Morbi volutpat justo vel tortor accumsan, non dictum nulla viverra. Proin id lectus accumsan, varius metus ac, sollicitudin urna. ",
    "Phasellus fringilla est at risus convallis, eget vestibulum nulla viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In interdum ut libero eget posuere. Nam id tortor enim. Morbi at lorem sed massa commodo mollis sed nec leo. Morbi suscipit justo sit amet massa consectetur, nec sodales ligula dapibus. ",
    "Nunc maximus neque in ligula tristique dictum. Praesent bibendum libero a est blandit, quis rutrum est consectetur. Pellentesque tincidunt lectus nec tempor tincidunt. Ut a ullamcorper est. Praesent sed risus ac ipsum ultricies iaculis. Sed nec dui accumsan, lacinia turpis a, accumsan justo. ",
    "Nullam nec eros varius, pharetra mi vel, euismod risus. Fusce non ligula nec odio facilisis tincidunt. Phasellus vitae diam nec nunc fermentum tempus. Nulla facilisi. Nullam molestie efficitur metus, id malesuada odio placerat id. Vivamus suscipit, lectus nec aliquam venenatis, sapien metus faucibus odio, sit amet cursus dui neque eget magna. ",
    "Cras maximus, metus quis venenatis posuere, nisi nisi tincidunt tortor, nec dapibus tortor mauris ac eros. Suspendisse potenti. Nam vel libero massa. Sed lacinia vel justo non efficitur. Morbi euismod lacinia ligula, ut convallis ex finibus ac. Aliquam pharetra, enim in iaculis lobortis, massa mauris bibendum ante, non lobortis nisl ipsum a lorem. ",
    "Integer fermentum metus sed nisl sagittis consequat. Ut in lorem non nunc commodo eleifend nec sit amet eros. Phasellus vehicula neque id ante efficitur, quis ultrices mi volutpat. Nullam efficitur dictum tortor, eget interdum orci posuere vitae. Cras commodo facilisis justo eu euismod. In hac habitasse platea dictumst. ",
    "Maecenas nec elit odio. Nam interdum tempus orci, eget commodo risus. Vivamus in suscipit libero. Pellentesque ullamcorper diam nec arcu facilisis congue. Etiam quis quam eget tortor faucibus lacinia. Quisque euismod, velit vitae luctus pellentesque, quam lorem tempor neque, non posuere odio leo a ante. Aliquam id dolor et odio convallis tempus. ",
    "Nam cursus est sed magna volutpat, at convallis leo bibendum. Praesent consectetur lacus nec tortor iaculis tincidunt. Integer sodales viverra orci eget blandit. Fusce eget urna nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec eu augue et nunc vestibulum suscipit. ",
    "Proin non erat vel felis dictum sodales. Phasellus placerat neque non sagittis volutpat. Sed vitae eros non odio tristique efficitur et a est. Vestibulum malesuada facilisis sem in euismod. Aliquam dapibus justo in bibendum malesuada. Etiam ut ullamcorper tortor. Morbi sit amet risus quis eros ullamcorper rhoncus. ",
    "Suspendisse potenti. Mauris efficitur faucibus tellus. Aenean tincidunt tincidunt orci, a sollicitudin ante facilisis eget. Fusce auctor libero vel lacus ullamcorper venenatis. Ut sagittis, ex vel efficitur pulvinar, sem metus tincidunt magna, nec facilisis ex elit vel magna. Morbi ornare augue vel enim pharetra, eget tincidunt nisi tempor. ",
    "Vestibulum eu semper elit, eget euismod tortor. Vestibulum sollicitudin nunc a odio auctor, ut sollicitudin libero tempus. Integer viverra efficitur ante non tincidunt. Etiam vitae nisi tortor. Nam suscipit massa quis nisl dapibus, ut cursus neque accumsan. Integer non quam quis sapien posuere iaculis. Ut sit amet augue ut purus interdum vestibulum id id metus. ",
    "Nullam ut magna ligula. Nam molestie velit a turpis interdum auctor. Morbi nec nisi eget velit venenatis congue a at sem. Sed ut urna eget est fringilla mollis. Morbi ac lacus vel dui posuere euismod. Vivamus scelerisque tincidunt nisi, id pharetra ante tristique ut. Vestibulum auctor posuere nulla, ut egestas eros sollicitudin ac. ",
    "Phasellus tincidunt, lorem vitae euismod condimentum, nisl libero ultrices ante, sit amet suscipit sem nisl vel elit. Maecenas gravida tempor ipsum, et accumsan lectus commodo non. Nam auctor faucibus efficitur. Nullam feugiat nisi in ipsum interdum, eget interdum tortor dignissim. Nulla et odio tincidunt, efficitur lectus eget, auctor urna. "
];

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);