const loadCards=()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") // Promise of Response
    .then(res=> res.json()) // Promise of json data
    .then(json => displayCard(json.data));
};

const displayCard = (cards) =>{
    // 1. Get the container & empty
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // 2. Get into every cards
    for(let card of cards){
        //3. Create Element
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                    <div class="card-body p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="badge badge-success badge-outline badge-xs p-2">
                                <span class="w-2 h-2 rounded-full bg-success mr-1"></span>
                            </span>
                            <span class="badge badge-error badge-outline text-[10px] h-5">${card.priority}</span>
                        </div>
                        <h3 class="font-bold text-sm leading-tight mb-2">${card.title}</h3>
                        <p class="text-xs text-base-content/70 line-clamp-2 mb-4">
                            ${card.description}
                        </p>
                        <div class="flex gap-2 mb-6">
                            <span class="badge badge-error badge-sm text-[10px] gap-1 opacity-70"><span class="w-1.5 h-1.5 rounded-full bg-error"></span> ${card.labels[0]}</span>
                            <span class="badge badge-warning badge-sm text-[10px] gap-1 opacity-70"><span class="w-1.5 h-1.5 rounded-full bg-warning"></span> ${card.labels[1]}</span>
                        </div>
                        <div class="border-t border-base-200 pt-3 flex flex-col gap-1">
                            <span class="text-[10px] text-base-content/50">#${card.id} by ${card.author}</span>
                            <span class="text-[10px] text-base-content/50">1/15/2024</span>
                        </div>
                    </div>
                </div>
        `
        //4. Append into container
        cardContainer.append(cardDiv);
    }
};
loadCards();

const displayLevelWord=(words)=>{
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";

    if(words.length == 0){
        wordContainer.innerHTML=`
        <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="./assets/alert-error.png">
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান।</h2>
        </div>
        `;
        manageSpinner(false);
        return;
    }

    // {
    //     "id": 82,
    //     "level": 1,
    //     "word": "Car",
    //     "meaning": "গাড়ি",
    //     "pronunciation": "কার"
    // }

    words.forEach(word =>{
        const card=document.createElement("div");
        card.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word :"শব্দ পাওয়া যায়নি।"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning :"অর্থ পাওয়া যায়নি।"} / ${word.pronunciation ? word.pronunciation :"উচ্চারণ পাওয়া যায়নি।"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
    manageSpinner(false);
};

document.getElementById("btn-search").addEventListener("click",()=>{
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(data=>{
        const allWords = data.title;
        const filterWords = allWords.filter((word)=>word.title.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    });
})