const vitrine                 = document.querySelector('#lista-vitrine');
const vitrineCarrinho         = document.querySelector('.lista-carrinho');
let divCarrinho               = document.querySelector('.carrinho');
let preco                     = document.querySelector('#info-valor');
let quantidade                = document.querySelector('#info-qtd');
let buscaButton               = document.querySelector('#buscar');
let inputBusca                = document.querySelector('#busca');
let menuTodos                 = document.querySelector('#todos');
let menuCanecas               = document.querySelector('#canecas');
let menuActionFigures         = document.querySelector('#action-figures');
let menuDecoracoes            = document.querySelector('#decoracoes')

function createCard(element){

    let tagLi = document.createElement('li');

    let tagImg = document.createElement('img')
    tagImg.src = element.img;
    tagImg.alt = ''

    let tagSpan = document.createElement('span');
    tagSpan.innerText = element.tag;

    let tagTitulo = document.createElement('h1')
    tagTitulo.innerText = element.nameItem;

    let tagDescricao = document.createElement('p');
    tagDescricao.classList.add('descricao')
    tagDescricao.innerText = element.description;

    let tagPreco = document.createElement('p');
    tagPreco.classList.add('preco');
    tagPreco.innerText = `R$${element.value},00`;

    let button = document.createElement('button');
    button.id = element.id;
    button.innerText = element.addCart;

    tagLi.append(tagImg, tagSpan, tagTitulo, tagDescricao, tagPreco, button);

    return tagLi;
}

function insertCard(data, vitrine){
    vitrine.innerHTML = '';
    if (data.length >= 1) {
        for(let i = 0; i < data.length; i++) {
            let card = createCard(data[i]);
    
            vitrine.appendChild(card)
        }
    } else {
        let message = document.createElement('h2');
        message.innerText = 'Não encontramos resultados para sua pesquisa :('
        vitrine.appendChild(message)
    }
}

insertCard(data, vitrine);

let carrinho = [];

vitrine.addEventListener('click', (event) => {
    let buttonAdd = event.target;

    if (buttonAdd.tagName == 'BUTTON') {
        let id = buttonAdd.id
        let produto = data.find(function(produto){
            if (produto.id == id) {
                return produto;
            }
        })

        carrinho.push(produto);

        insertCardCarrinho(carrinho, vitrineCarrinho)

        preco.innerText = totalSum(carrinho)

        quantidade.innerText = quantidadeDeProdutos(carrinho)

        carrinhoVazio(carrinho)
    }

})

function createCardCarrinho(element) {
    let tagLi = document.createElement('li');

    let tagImg = document.createElement('img');
    tagImg.src = element.img;
    tagImg.alt = ''

    let div = document.createElement('div');

    let tagTitulo = document.createElement('h3');
    tagTitulo.innerText = element.nameItem;

    let tagPreco = document.createElement('span');
    tagPreco.innerText = `R$${element.value},00`;

    let button = document.createElement('button');
    button.innerText = 'Remover produto'
    button.id = element.id;

    div.append(tagTitulo, tagPreco, button);

    tagLi.append(tagImg, div);

    return tagLi;
}

function insertCardCarrinho(carrinho, vitrineCarrinho) {
    vitrineCarrinho.innerHTML = ''

    for (let i = 0; i < carrinho.length; i++) {
        let card = createCardCarrinho(carrinho[i]);

        vitrineCarrinho.appendChild(card, carrinho);
    }

}

vitrineCarrinho.addEventListener('click', (event) =>{
    let buttonRemove = event.target;

    if(buttonRemove.tagName == 'BUTTON') {
        let id = buttonRemove.id;
        let produto = data.find(function(produto){
            if (produto.id == id) {
                return produto;
            }
        })

        let index = carrinho.indexOf(produto)
        carrinho.splice(index, 1);

        insertCardCarrinho(carrinho, vitrineCarrinho)

        preco.innerText = totalSum(carrinho)

        quantidade.innerText = quantidadeDeProdutos(carrinho)

        carrinhoVazio(carrinho)
    }
})


function totalSum(array) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum += array[i].value;
    }

    return `R$${sum},00`;
}

function quantidadeDeProdutos(array) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum = array.length;
    }

    return sum;
}

function carrinhoVazio (array) {
    if (array.length > 0) {
        divCarrinho.removeAttribute("hidden")
    } else if (array.length === 0) {
        divCarrinho.setAttribute("hidden", "hidden")
    }
}

buscaButton.addEventListener('click', (event) =>{
    event.preventDefault();
    

    let inputSearchValue = inputBusca.value.trim();
    let searchResult = search(inputSearchValue, data);
    insertCard(searchResult, vitrine);

    if(inputSearchValue == '') {
        insertCard(data, vitrine)
    }
    
    inputBusca.value = ''
})

function search(input ,array) {
    let result = [];

    input.toLowerCase();

    for (let i = 0; i < array.length; i++) {
        let produto = array[i].nameItem.toLowerCase();
        
        if (produto.includes(input)) {
            result.push(array[i]);
        }
    }

    return result;
}

menuTodos.addEventListener('click', () =>{
    insertCard(data, vitrine)
})

menuCanecas.addEventListener('click', () =>{
    let filteredArray = data.filter((element) =>{
        if (element.tag == 'Canecas') {
            return element;
        }
    })

    insertCard(filteredArray, vitrine)
})

menuActionFigures.addEventListener('click', () =>{
    let filteredArray = data.filter((element) =>{
        if (element.tag == 'Action Figures') {
            return element;
        }
    })

    insertCard(filteredArray, vitrine)
})

menuDecoracoes.addEventListener('click', () =>{
    let filteredArray = data.filter((element) =>{
        if (element.tag == 'Decoração') {
            return element;
        }
    })

    insertCard(filteredArray, vitrine)
})

