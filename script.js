const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const leftBox = document.getElementById('left-box'); 

let searchedWords = [];

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inpword").value.trim().toLowerCase(); 

    if (inpWord && !searchedWords.includes(inpWord)) {
        fetch(`${url}${inpWord}`)
            .then((response) => response.json())
            .then((data) => {
                result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic || ''}/</p>
                </div>
                <p class="meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
                
                sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
                addWordToLeftBox(inpWord);
            })
            .catch(() => {
                result.innerHTML = `<p class="error">Error fetching the word! Please try again.</p>`;
            });
    } else if (searchedWords.includes(inpWord)) {
        result.innerHTML = `<p class="error">You have already searched for this word.</p>`;
    } else {
        result.innerHTML = `<p class="error">Please enter a word to search!</p>`;
    }
    document.getElementById("inpword").value = ''; 
});
let i = 0;
function addWordToLeftBox(word) {
    const p = document.createElement('p'); 
    i++;
    p.textContent = i + '. ' + word;
    leftBox.appendChild(p); 
    searchedWords.push(word);
}

function playSound() {
    sound.play();
}
