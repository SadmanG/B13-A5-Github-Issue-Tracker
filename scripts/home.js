const loadCards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") // Promise of Response
        .then(res => res.json()) // Promise of json data
        .then(json => displayCard(json.data));
};

const displayCard = (cards) => {
    // 1. Get the container & empty
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    // 2. Get into every cards
    for (let card of cards) {
        //3. Create Element
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                    <div class="card-body p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span>
  ${card.status === "open"
                ? '<img src="../assets/Open-Status.png" alt="Open-Status">'
                : '<img src="../assets/Closed-Status.png" alt="Closed-Status">'
            }
</span>
                            <span class="badge badge-soft uppercase ${card.priority === 'high' ? 'badge-error' :
                card.priority === 'low' ? 'badge-success' :
                    'badge-warning'
            } text-[10px] h-5">
  ${card.priority}
</span>
                        </div>
                        <h3 class="font-bold text-sm leading-tight mb-2">${card.title}</h3>
                        <p class="text-xs text-base-content/70 line-clamp-2 mb-4">
                            ${card.description}
                        </p>
                        <div class="flex gap-2 mb-6">
                            <span class="badge
                            uppercase badge-outline
                            ${card.labels[0] === 'bug' ? 'badge-error' :
                card.labels[0] === 'enhancement' ? 'badge-success' :
                    card.labels[0] === 'help wanted' ?
                    'badge-warning' : 'badge-info'
            }
                            badge-sm text-[10px] gap-1 opacity-70"><span class="w-1.5 h-1.5 rounded-full
                            ${card.labels[0] === 'bug' ? 'bg-error' :
                card.labels[0] === 'enhancement' ? 'bg-success' :
                    card.labels[0] === 'help wanted' ?
                    'bg-warning' : 'bg-info'
            }
                            "></span> ${card.labels[0]}</span>
                            ${card.labels[1] ? `<span class="badge badge-outline uppercase
                            ${card.labels[1] === 'bug' ? 'badge-error' :
                card.labels[1] === 'enhancement' ? 'badge-success' :
                    card.labels[1] === 'help wanted' ?
                    'badge-warning' : 'badge-info'
            }
                            badge-sm text-[10px] gap-1 opacity-70"><span class="w-1.5 h-1.5 rounded-full
                            ${card.labels[1] === 'bug' ? 'bg-error' :
                card.labels[1] === 'enhancement' ? 'bg-success' :
                    card.labels[1] === 'help wanted' ?
                    'bg-warning' : 'bg-info'
            }
                            "></span> ${card.labels[1]}</span>` : ''}
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

const loadWordDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetail(details.data);
};

const displayWordDetail = (word) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="">
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="text-2xl font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="text-2xl font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="text-2xl font-bold">Synonyms</h2>
        <div class="">${createElements(word.synonyms)}</div>
      </div>
    `;
    document.getElementById("word_modal").showModal();
};