/*const lista = [
   {
      "nome":"Bahia",
      "url":"https://www.thesportsdb.com/team/134293-bahia",
      "img":"https://r2.thesportsdb.com/images/media/team/badge/xuvtsv1473539308.png/small"
   },
   {
      "nome":"Botafogo",
      "url":"https://www.thesportsdb.com/team/134285-botafogo",
      "img":"https://r2.thesportsdb.com/images/media/team/badge/bs5mbw1733004596.png/small"
   },
   {
      "nome":"Bragantino",
      "url":"https://www.thesportsdb.com/team/134736-bragantino",
      "img":"https://r2.thesportsdb.com/images/media/team/badge/2p7tl41701423595.png/small"
   },
   {
      "nome":"Corinthians",
      "url":"https://www.thesportsdb.com/team/134284-corinthians",
      "img":"https://r2.thesportsdb.com/images/media/team/badge/vvuvps1473538042.png/small"
   },
   {
      "nome":"Cruzeiro",
      "url":"https://www.thesportsdb.com/team/134294-cruzeiro",
      "img":"https://r2.thesportsdb.com/images/media/team/badge/upsvvu1473538059.png/small"
   },
   {
      "nome":"Cuiaba",
      "url":"https://www.thesportsdb.com/team/136831-cuiab%c3%a1",
      "img":"https://r2.thesportsdb.com/images/media/team/badge/ma6ltv1618954231.png/small"
   },
   {
      "nome":"Criciuma",
      "url":"https://www.thesportsdb.com/team/134292-crici%c3%bama",
      "img":"https://r2.thesportsdb.com/images/media/team/badge/kbjtv31644929836.png/small"
   }
];*/

function processarListaTimes(block) {
    let listaTimes = [];

    [...block.children].forEach((row) => {
        const cols = [...row.children]
        listaTimes.push({
            "nome": cols[0].children[0].innerHTML,
            "url": cols[1].children[0].innerHTML,
            "img": cols[2].children[0].innerHTML
        });
    });
    return listaTimes;
}

function renderizarInputFiltro(block, listaTimes = []) {
    // Container para organização e para aplicar melhor o CSS
    const containerInputFiltro = document.createElement('div');
    containerInputFiltro.className = "container-cp015-13-teams-search";
    
    const inputFiltro = document.createElement('input');
    inputFiltro.type = "text";
    inputFiltro.className = "cp015-13-teams-search";
    inputFiltro.id = "searchTeam";
    inputFiltro.placeholder = "Pesquisar time...";
    inputFiltro.addEventListener("input", () => {
        console.log("Entrou event");
        renderizarTimes(block, listaTimes, inputFiltro.value);
    });
    
    containerInputFiltro.appendChild(inputFiltro);
    block.appendChild(containerInputFiltro);
}

function renderizarTimes(block, lista = [], filtro = "") {
    // Container para organização, aplicação do CSS e limpeza
    let containerBtnsTimes = document.querySelector('.container-btns-teams');
    if (containerBtnsTimes == null) {
        containerBtnsTimes = document.createElement('div');
        containerBtnsTimes.className = "container-btns-teams";
        block.appendChild(containerBtnsTimes);
    }
    containerBtnsTimes.innerHTML = "";

    const termo = filtro.trim().toLowerCase();

    const filtrados = termo
        ? lista.filter(team => team.nome.toLowerCase().includes(termo))
        : lista;

    filtrados.forEach(team => {
        const link = document.createElement('a');
        link.className = "team-btn";
        link.href = team.url;
        link.target = "_blank";

        const img = document.createElement('img');
        img.src = team.img;
        img.alt = team.nome;

        const span = document.createElement('span');
        span.textContent = team.nome;

        link.appendChild(img);
        link.appendChild(span);

        containerBtnsTimes.appendChild(link);
    });

    // Botão "Mais Times"
    const moreBtn = document.createElement('a');
    moreBtn.className = "team-btn more-btn";
    moreBtn.href = "https://www.thesportsdb.com/";
    moreBtn.target = "_blank";
    moreBtn.textContent = "Mais Times";
    containerBtnsTimes.appendChild(moreBtn);
}

export default function decorate(block) {
    // Forma padrão (?) de se iterar pelas linhas/colunas da tabela, extraindo o conteúdo informado!!!
    // Me parece útil...:
    /*[...block.children].forEach((row) => {
        [...row.children].forEach((col) => {
            console.log(col.children[0].innerHTML);
        });
    });*/

    const listaTimes = processarListaTimes(block);
    
    block.innerHTML = ""; // limpa TUDO. Remove a tabela com os dados originais!! Processe a lista de times ANTES dessa etapa!!

    // Render inicial
    renderizarInputFiltro(block, listaTimes);
    renderizarTimes(block, listaTimes);
    

}