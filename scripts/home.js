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
        <div class="border border-base-300 rounded-2xl border-t-10 border-l-0 border-r-0 border-b-0 
        ${card.status === "open"
                ? 'border-green-600'
                : 'border-purple-600'}">
         <div class="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
                    <div onclick="loadCardDetail(${card.id})" class="card-body p-5">
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
                            uppercase badge-soft
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
                            ${card.labels[1] ? `<span class="badge badge-soft uppercase
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
        </div>
        `
        //4. Append into container
        cardContainer.append(cardDiv);
    }
};
loadCards();

const loadCardDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayCardDetail(details.data);
};

const displayCardDetail = (card) => {
    console.log(card);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <!-- Header -->
    <h2 class="text-3xl font-bold mb-4" id="modal-title">${card.title}</h2>
    
    <!-- Status & Info Row -->
    <div class="flex items-center gap-2 mb-6">
      <div id="modal-status" class="uppercase badge rounded-xl text-white ${card.status === "open"
                ? 'bg-[#00A96E]'
                : 'bg-[#A855F7]'
            }">
         ${card.status}
      </div>
      <span class="text-gray-500 text-sm">• Opened by <span class="font-semibold text-gray-800" id="modal-author">${card.author}</span> • 22/02/2026</span>
    </div>

    <!-- Labels Row -->
    <div id="modal-labels" class="flex gap-2 mb-8">
      <span class="badge
                            uppercase badge-soft
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
                            ${card.labels[1] ? `<span class="badge badge-soft uppercase
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

    <!-- Description -->
    <p class="text-gray-600 leading-relaxed mb-10" id="modal-description">
      ${card.description}
    </p>

    <!-- Details Grid -->
    <div class="grid grid-cols-2 gap-8 mb-4">
      <div>
        <p class="text-gray-400 text-sm mb-2">Assignee:</p>
        <p class="font-bold text-lg" id="modal-assignee">${card.assignee === "" ? "None" : card.assignee}</p>
      </div>
      <div>
        <p class="text-gray-400 text-sm mb-2">Priority:</p>
        <span class="badge
        ${card.priority === 'high' ? 'badge-error' :
                card.priority === 'low' ? 'badge-success' :
                    'badge-warning'
            } 
        h-8 px-4 text-white font-bold uppercase text-xs rounded-full" id="modal-priority">${card.priority}</span>
      </div>
    </div>

    <!-- Action Button -->
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-primary bg-blue-700 border-none px-8 text-white hover:bg-blue-800">Close</button>
      </form>
    </div>
    `;
    document.getElementById("card_modal").showModal();
};