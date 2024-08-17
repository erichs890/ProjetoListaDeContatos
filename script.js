const form = document.querySelector("#form")
const inputNome = document.querySelector("#nome")
const inputNumero = document.querySelector("#numero")
const inputEmail = document.querySelector("#email")
const botaoEnviar = document.querySelector("#botao")
const contatosDiv = document.querySelector("#contatos")
let contatosLista = JSON.parse(localStorage.getItem("lista")) || []
let id = contatosLista.length > 0 ? contatosLista[contatosLista.length - 1].id + 1 : 1

function criarContato(pessoaContato){ 
    const novoContato = document.createElement("div")

    const nomeContato = document.createElement("h2")
    nomeContato.textContent = `Nome: ${pessoaContato.nome}`

    const numeroContato = document.createElement("p")
    numeroContato.textContent = `Número: ${pessoaContato.numero}`

    const emailContato = document.createElement("p")
    emailContato.textContent = `E-mail: ${pessoaContato.email}`

    const divBotao = document.createElement("div")
    divBotao.classList.add("divBotoes")

    const editar = document.createElement("p")
    editar.classList.add("botoesDiv")
    editar.textContent = "Editar"

    const excluir = document.createElement("p")
    excluir.classList.add("botoesDiv")
    excluir.textContent = "Excluir"

    editar.addEventListener("click",()=>{ 
        contatosLista.forEach((pessoaDaVez)=>{
            if(pessoaContato.id === pessoaDaVez.id){
                const posicao = contatosLista.indexOf(pessoaDaVez)
                inputNome.value = pessoaDaVez.nome
                inputNumero.value = pessoaDaVez.numero
                inputEmail.value = pessoaDaVez.email
                botaoEnviar.textContent = "Editar"
                localStorage.setItem("idDoEditado", pessoaContato.id)
            }
        })
    })

    excluir.addEventListener("click",()=>{ 
        contatosLista.forEach((pessoaDaVez, index)=>{
            if(pessoaContato.id === pessoaDaVez.id){
                contatosLista.splice(index, 1)
                localStorage.setItem("lista", JSON.stringify(contatosLista))
                contatosDiv.innerHTML = ""
                buscarBanco()
            }
        })
    })

    divBotao.append(editar,excluir)
    novoContato.append(nomeContato,numeroContato,emailContato,divBotao)
    novoContato.classList.add("caixa")
    contatosDiv.append(novoContato)
}

function buscarBanco(){ 
    contatosDiv.innerHTML = ""
    contatosLista.forEach((pessoaDaVez)=>{
        criarContato(pessoaDaVez)
    })
}

function cadastrarContato(e){ 
    e.preventDefault()
    if(botaoEnviar.textContent === "Editar"){ 
        contatosLista.forEach((pessoaDaVez)=>{
            if(pessoaDaVez.id === JSON.parse(localStorage.getItem("idDoEditado"))){
                pessoaDaVez.nome = inputNome.value
                pessoaDaVez.numero = inputNumero.value
                pessoaDaVez.email = inputEmail.value
                localStorage.setItem("lista", JSON.stringify(contatosLista))
                window.location.reload()
                botaoEnviar.textContent = "Cadastrar"
                inputNome.value = ""
                inputNumero.value = ""
                inputEmail.value = ""
                inputNome.focus()
            }
        })
    }else{
        const pessoa = {
            id: id,
            nome: inputNome.value,
            numero: inputNumero.value,
            email: inputEmail.value
        }
        id++
        contatosLista.push(pessoa)
        localStorage.setItem("lista", JSON.stringify(contatosLista))
        criarContato(pessoa)
        inputNome.value = ""
        inputNumero.value = ""
        inputEmail.value = ""
        inputNome.focus()
    }
}

buscarBanco()
form.addEventListener("submit",cadastrarContato)