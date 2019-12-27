var aplicacoes = [];
var modoEditar = false;
var indice = 0;

//FUNÇÕES UTILITÁRIAS
function id(campo) {
    return document.getElementById(campo);
}

function getValor(input) {
    var valor = document.getElementById(input).value.replace(',', '.');
    return parseFloat(valor);
}

function getTexto(input) {
    var texto = document.getElementById(input).value;
    return texto;
}

function formatToMoney(valor) {
    valorFormatado = valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
    return valorFormatado;
}

function formatToPercent(valor) {
    valorFormatado = valor+"%";
    return valorFormatado;
}

function calcularRend() {
    var rendimento = getValor("valor") * (getValor("porc")/100);
    id("resultado").value = rendimento;
}

function validaCampo(campo) {
    if (getTexto(campo)=="" || getValor(campo)=="") {
        return false;
    } else { 
        return true;
    }
}

function somaAplicacoes(aplicacoes) {
    var soma = 0;
    for(var i=0; i<aplicacoes.length; i++) {
        soma = soma + aplicacoes[i].valor;
    }
    somaFormatada = formatToMoney(soma);
    document.querySelector("#msgTotalAplicacao").innerHTML = somaFormatada;
}

function somaRendimentos(aplicacoes) {
    var soma = 0;
    for(var i=0; i<aplicacoes.length; i++) {
        soma = soma + aplicacoes[i].result;
    }
    somaFormatada = formatToMoney(soma);
    document.querySelector("#msgTotalRendimento").innerHTML = somaFormatada;
}

function criarElemento(elemento) {
    var createElement = document.createElement('p');
    var createElement = document.createTextNode(elemento);
    var msg = document.querySelector("#msg");
    msg.appendChild(createElement);
}

function limparElemento() {
    elemento = document.getElementById("msg");
    text = "";
    elemento.innerHTML = text;
}

//FUNÇÕES DE MANIPULAÇÃO A DOM
function limparDados() {
    document.getElementById("data").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("porc").value = "";
    document.getElementById("resultado").value = "";
}

function renderTbAplicacoes(arrayAplicacoes) {
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
        aplicacoes[indice].valor = getValor("valor");
        aplicacoes[indice].tipo = getValor("porc");
        aplicacoes[indice].result = getValor("resultado");

        modoEditar = false;
    } else {
        limparElemento();
        if(validaCampo("data") == false) {
            criarElemento("O campo Data é obrigatório!");
        } else if (validaCampo("desc") == false){
            criarElemento("O campo Descrição é obrigatório!");
        } else if (validaCampo("valor") == false) {
            criarElemento("O campo Valor é obrigatório!");
        } else if (validaCampo("porc") == false) {
            criarElemento("O campo Porcentagem é obrigatório!");
        } else {
            var aplicacao = {
                data: getTexto("data"),
                desc: getTexto("desc"),
                valor: getValor("valor"),
                tipo: getValor("porc"),
                result: getValor("resultado")
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
