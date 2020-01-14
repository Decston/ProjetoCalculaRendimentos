var aplicacoes = []; //criação de vetor global de aplicações
var modoEditar = false; //variavel para setar modo editar desativado
var indice = 0; 

//FUNÇÕES UTILITÁRIAS

function id(id) { //recebe o ID do campo e return seu HTML.
    return document.getElementById(id);
}

function getValorFloat(id) { //recebe um ID busca o valor no HTML e retorna em Float. 
    var valor = document.getElementById(id).value.replace(',', '.');
    return parseFloat(valor);
}

function getTexto(id) { //recebe um ID busca o valor no HTML e retorna em Texto.
    var texto = document.getElementById(id).value;
    return texto;
}

function formatToMoney(valor) { //recebe um valor e retorna formatado para Real Brasileiro.
    valorFormatado = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    return valorFormatado;
}

function formatToPercent(valor) { //recebe um valor e retorna formatado com um simbolo de porcentagem.
    valorFormatado = valor+"%";
    return valorFormatado;
}

function calcularRend() { //calcula o valor do rendimento buscando valor e porcentagem no HTML.
    var rendimento = getValorFloat("valor") * (getValorFloat("porc")/100);
    id("resultado").value = rendimento;
}

function validaCampo(campo) { //recebe um ID e testa se tem Texto ou Número e retorna falso se estiver vazio e verdadeiro se preenchido. 
    if (getTexto(campo)=="" || getValorFloat(campo)=="") {
        return false;
    } else { 
        return true;
    }
}

function somaAplicacoes(aplicacoes) { //receber o vetor aplicações, itera o vetor e soma o valor de todos e inseri o resultado em uma mensagem no html.
    var soma = 0;
    for(var i=0; i<aplicacoes.length; i++) {
        soma = soma + aplicacoes[i].valor;
    }
    somaFormatada = formatToMoney(soma);
    mostraMsg("#msgTotalAplicacao",somaFormatada);
}

function somaRendimentos(aplicacoes) { //recebe o vetor aplicações, itera o vetor e soma o rendimento de todos e inseri o resultado em uma mensagem no html.
    var soma = 0;
    for(var i=0; i<aplicacoes.length; i++) {
        soma = soma + aplicacoes[i].result;
    }
    somaFormatada = formatToMoney(soma);
    mostraMsg("#msgTotalRendimento",somaFormatada);
}

/*function criarElemento(elemento) {
    //var createElement = document.createElement('p');
    var createElement = document.createTextNode(elemento);
    var msg = document.querySelector("#msg");
    msg.appendChild(createElement);
}*/

//FUNÇÕES DE MANIPULAÇÃO DA DOM
function mostraMsg(id, mensagem) { //recebe um ID e uma mensagem para ser inserida em uma campo do HTML.
    document.querySelector(id).innerHTML = mensagem;
}

function limpaElementoMsg() { //limpa o elemento MSG inserindo uma String vazia no campo do HTML.
    elemento = document.getElementById("msg");
    text = "";
    elemento.innerHTML = text;
}

function limparDados() { //limpa os valores dos dados no formulario.
    id("data").value = "";
    id("desc").value = "";
    id("valor").value = "";
    id("porc").value = "";
    id("resultado").value = "";
}

function renderTbAplicacoes(arrayAplicacoes) { //recebe o vetor aplicações e renderiza a tabela com os valores cadastrados no vetor.
    dados = "";
    for(i=0; i<arrayAplicacoes.length; i++){
        dados += "<tr>";
        dados += "<td>"+arrayAplicacoes[i].data+"</td>";
        dados += "<td>"+arrayAplicacoes[i].desc+"</td>";
        dados += "<td>"+formatToMoney(arrayAplicacoes[i].valor)+"</td>";
        dados += "<td>"+formatToPercent(arrayAplicacoes[i].tipo)+"</td>";
        dados += "<td>"+formatToMoney(arrayAplicacoes[i].result)+"</td>";
        dados += "<td> <a href='#' onclick='excluirAplicacao("+i+")'>Excluir</a> </td>";
        dados += "<td> <a href='#' onclick='editarAplicacao("+i+")'>Editar</a> </td>";
        dados += "</tr>";
    }   
    document.getElementById("tbAplicacoes").innerHTML = dados;
}

//FUNÇÕES CRUD
function cadastrar() {
    if(modoEditar == true) {
        aplicacoes[indice].data = getTexto("data");
        aplicacoes[indice].desc = getTexto("desc");
        aplicacoes[indice].valor = getValorFloat("valor");
        aplicacoes[indice].tipo = getValorFloat("porc");
        aplicacoes[indice].result = getValorFloat("resultado");

        modoEditar = false;
    } else {
        limpaElementoMsg();
        if(validaCampo("data") == false) {
            mostraMsg("#msg","O campo Data é obrigatório!");
        } else if (validaCampo("desc") == false){
            mostraMsg("#msg","O campo Descrição é obrigatório!");
        } else if (validaCampo("valor") == false) {
            mostraMsg("#msg","O campo Valor é obrigatório!");
        } else if (validaCampo("porc") == false) {
            mostraMsg("#msg","O campo Porcentagem é obrigatório!");
        } else {
            var aplicacao = {
                data: getTexto("data"),
                desc: getTexto("desc"),
                valor: getValorFloat("valor"),
                tipo: getValorFloat("porc"),
                result: getValorFloat("resultado")
            }
            aplicacoes.push(aplicacao);
        }
    }
    renderTbAplicacoes(aplicacoes);
    somaAplicacoes(aplicacoes);
    somaRendimentos(aplicacoes);
    limparDados();
}

function excluirAplicacao(i) {
    aplicacoes.splice(i, 1);
    renderTbAplicacoes(aplicacoes);
    somaAplicacoes(aplicacoes);
    somaRendimentos(aplicacoes);
    limparDados();
    modoEditar = false;
}

function editarAplicacao(i) {
    modoEditar = true;
    id("data").value = aplicacoes[i].data;
    id("desc").value = aplicacoes[i].desc;
    id("valor").value = aplicacoes[i].valor;
    id("porc").value = aplicacoes[i].tipo;
    id("resultado").value = aplicacoes[i].result;
    indice = i;
}