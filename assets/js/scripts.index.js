// alert("oi");
class Equipe{
    constructor(nome, titulares){
        this.id = this.gerarId();
        this.nome = nome;
        this.titulares = titulares;
        this.reservas = this.calcularReservas();
        this.totalJogadores = this.calcularTotalJogadores();
    }
    gerarId(){
        return Math.floor(Math.random() * 1000);
    }
    calcularReservas(){
        return Math.floor(this.titulares / 2);
    }
    calcularTotalJogadores(){
        return this.titulares + this.reservas;
    }
}
class EquipeService{
    constructor(){
        this.equipes = [];
    }
    // CRUD = Create, Read, Update, Delete
    // C = Create
    adicionarEquipe(parametro){
        this.equipes.push(parametro);
    }
    //R =  Read
    listarEquipes(){
        return this.equipes;
    }
    listarEquipesPorID(parametro){
        return this.equipes.find((equipe) => equipe.id == parametro)
    }
    //U = update
    atualizarEquipe(id, nome, titulares){
        const equipe = this.listarEquipesPorID(id);

        equipe.nome = nome;
        equipe.titulares = titulares;
        equipe.reservas = equipe.calcularReservas();
        equipe.totalJogadores = equipe.calcularTotalJogadores();

        return equipe
    }
    //D = delete
    deletarEquipe(parametro){
        return (this.equipes = this.equipes.filter((equipe) => equipe.id != parametro));
    }
}
const equipeService = new EquipeService();

function criarEquipe(){
    const nome = document.getElementById("nomeDaEquipe").value;
    const titulares = Number(document.getElementById("quantidade").value);

    const novaEquipe = new Equipe(nome, titulares);
    equipeService.adicionarEquipe(novaEquipe);

    // console.log(equipeService.equipes);
    listarEquipes();
    limparInputs();
}
function listarEquipes(){
    const equipes = equipeService.listarEquipes();
    const elementoLista = document.getElementById("listarEquipes"); 
    let content = '';
    elementoLista.innerHTML = "";
    equipes.forEach((equipe) => {
        content +=   `
        <div onclick="listarEquipesPorID(${equipe.id})">
        <p>Nome: ${equipe.nome}</p>
        </div>
       `
      
    });
    elementoLista.innerHTML = content;
}
function listarEquipesPorID(id){
    const equipe = equipeService.listarEquipesPorID(id);
    console.log(equipe);
    const elementoLista = document.getElementById("listarEquipeUnica");
    document.getElementById("listarEquipeUnica").classList.remove("hidden");


    elementoLista.innerHTML = "";

    let content = `
    <div>
    <p>ID: ${equipe.id}</p>
    <p>Nome: ${equipe.nome}</p>
    <p>Total de Jogadores: ${equipe.totalJogadores}</p>
    <p>Titulares: ${equipe.titulares}</p>
    <p>Reserva: ${equipe.reservas}</p>
    </div>
    <button onclick="atualizarEquipe(${equipe.id})">Editar</button>
    <button onclick="deletarEquipe(${equipe.id})">Deletar</button>`;
    
    elementoLista.innerHTML = content;
}
let aux = null;

function atualizarEquipe(id){
    const equipe = equipeService.listarEquipesPorID(id);

     document.getElementById("nomeDaEquipe").value = equipe.nome;
     document.getElementById("quantidade").value = equipe.titulares;

     document.getElementById("botaoCadastrar").classList.add("hidden");
     document.getElementById("botaoEditar").classList.remove("hidden");

     aux = id;
}
function editarEquipe(){
    const nome = document.getElementById("nomeDaEquipe").value;
    const titulares = Number(document.getElementById("quantidade").value);

    equipeService.atualizarEquipe(aux, nome, titulares);

    listarEquipes();

    document.getElementById("botaoCadastrar").classList.remove("hidden");
     document.getElementById("botaoEditar").classList.add("hidden");

     limparInputs();
}
function limparInputs(){
    document.getElementById("nomeDaEquipe").value = "";
    document.getElementById("quantidade").value = "";
}
function deletarEquipe(id){
    equipeService.deletarEquipe(id);

    listarEquipes();

    document.getElementById("listarEquipeUnica").classList.add("hidden");
}