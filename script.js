// Função para alternar o tema
function alternarTema() {
    var body = document.body;
    body.classList.toggle('tema-escuro');
    var temaAtual = body.classList.contains('tema-escuro') ? 'escuro' : 'claro';
    localStorage.setItem('tema', temaAtual);
}

// Adiciona o evento de clique ao botão de alternar tema
document.getElementById('botaoTema').onclick = alternarTema;

// Aplica o tema salvo no localStorage ao carregar a página
window.onload = function() {
    carregarTarefas();
    var temaSalvo = localStorage.getItem('tema') || 'claro';
    if (temaSalvo === 'escuro') {
        document.body.classList.add('tema-escuro');
    }
};

// Função para adicionar uma nova tarefa à lista
function executar() {
    var tarefa = document.getElementById('tarefa').value;

    // Verifica se a tarefa está vazia ou excede o limite de caracteres
    if (tarefa.trim() === "") {
        alert("Por favor, insira uma tarefa.");
        return;
    }
    if (tarefa.length > 20) {
        alert("A tarefa não pode exceder 20 caracteres.");
        return;
    }

    var lista = document.getElementById('lista');
    var remover = document.createElement('button');
    var item = document.createElement('li');
    
    item.innerHTML = tarefa;
    remover.innerHTML = 'Concluído';

    remover.style.marginLeft = '10px';
    remover.style.backgroundColor = 'green';
    remover.style.color = 'white';
    remover.style.border = '1px solid #00000000';
    remover.style.borderRadius = '5px';
    remover.style.padding = '5px';
    remover.style.cursor = 'pointer';
    
    item.style.listStyle = 'none';
    item.style.marginTop = '10px';
    item.style.padding = '5px';
    item.style.border = '1px solid #00000000';
    item.style.borderRadius = '5px';
    item.style.display = 'flex';
    item.style.justifyContent = 'space-between';
    item.style.alignItems = 'center';
    item.style.marginLeft = 'auto';
    item.style.marginRight = 'auto';
    item.style.backgroundColor = '#f7b2b236';
    item.style.boxShadow = '4px 4px 5px #000000a9';
    item.appendChild(remover);
    lista.appendChild(item);

    remover.onclick = function() {
        lista.removeChild(item);
        salvarTarefas();
    };

    salvarTarefas();
    document.getElementById('tarefa').value = ""; // Limpa o campo de entrada
}

function salvarTarefas() {
    var lista = document.getElementById('lista');
    var tarefas = [];
    for (var i = 0; i < lista.children.length; i++) {
        tarefas.push(lista.children[i].innerText.replace('Concluído', '').trim());
    }
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    var tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    for (var i = 0; i < tarefas.length; i++) {
        var tarefa = tarefas[i];
        var lista = document.getElementById('lista');
        var remover = document.createElement('button');
        var item = document.createElement('li');

        item.innerHTML = tarefa;
        remover.innerHTML = 'Concluído';

        remover.style.marginLeft = '10px';
        remover.style.backgroundColor = 'green';
        remover.style.color = 'white';
        remover.style.border = '1px solid #00000000';
        remover.style.borderRadius = '5px';
        remover.style.padding = '5px';
        remover.style.cursor = 'pointer';

        item.style.listStyle = 'none';
        item.style.marginTop = '10px';
        item.style.padding = '5px';
        item.style.border = '1px solid #00000000';
        item.style.borderRadius = '5px';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.width = '50%';
        item.style.marginLeft = 'auto';
        item.style.marginRight = 'auto';
        item.style.backgroundColor = '#f7b2b236';
        item.style.boxShadow = '4px 4px 5px #000000a9';

        remover.onclick = function() {
            lista.removeChild(item);
            salvarTarefas();
        };

        item.appendChild(remover);
        lista.appendChild(item);
    }
}

function removerTodos() {
    var lista = document.getElementById('lista');
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    salvarTarefas();
}
