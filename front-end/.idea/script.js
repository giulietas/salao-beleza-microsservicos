const URL_CLIENTES = "http://localhost:8081/clientes";
const URL_AGENDAS = "http://localhost:8082/agendas";

function mostrarTela(nomeTela, botao) {

    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(nomeTela).classList.add("ativa");

    document.querySelectorAll(".menu").forEach(menu => {
        menu.classList.remove("active");
    });

    botao.classList.add("active");
}

// ========================= CLIENTES =========================

async function salvarCliente() {

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !telefone || !email) {
        alert("Preencha todos os campos.");
        return;
    }

    const cliente = {
        nome,
        telefone,
        email
    };

    try {

        const resposta = await fetch(URL_CLIENTES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao salvar cliente.");
        }

        limparFormularioCliente();
        await listarClientes();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao cadastrar cliente.");
    }

}

function limparFormularioCliente() {

    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";

}

async function listarClientes() {

    try {

        const resposta = await fetch(URL_CLIENTES);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar clientes.");
        }

        const clientes = await resposta.json();

        const tabela = document.getElementById("listaClientes");
        tabela.innerHTML = "";

        const select = document.getElementById("clienteSelect");
        select.innerHTML = '<option value="">Selecione um cliente</option>';

        clientes.forEach(cliente => {

            tabela.innerHTML += `
                <tr>
                    <td>${cliente.id}</td>
                    <td>${cliente.nome}</td>
                    <td>${cliente.telefone}</td>
                    <td>${cliente.email}</td>
                    <td>
                        <button
                            class="excluir"
                            onclick="excluirCliente(${cliente.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;

            select.innerHTML += `
                <option value="${cliente.id}">
                    ${cliente.nome}
                </option>
            `;

        });

    } catch (erro) {

        console.error(erro);
        alert("Erro ao listar clientes.");

    }

}

async function excluirCliente(id) {

    if (!confirm("Deseja excluir este cliente?")) {
        return;
    }

    try {

        const resposta = await fetch(`${URL_CLIENTES}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir cliente.");
        }

        await listarClientes();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao excluir cliente.");

    }

}

// ========================= AGENDAS =========================

async function salvarAgenda() {

    const clienteId = document.getElementById("clienteSelect").value;
    const procedimento = document.getElementById("procedimento").value.trim();
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;

    if (!clienteId || !procedimento || !data || !hora) {
        alert("Preencha todos os campos.");
        return;
    }

    const agenda = {
        clienteId: Number(clienteId),
        procedimento: procedimento,
        dataHora: `${data}T${hora}:00`,
        status: "Agendado"
    };

    try {

        const resposta = await fetch(URL_AGENDAS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(agenda)
        });

        if (!resposta.ok) {

            const mensagem = await resposta.text();
            console.error("Erro da API:", mensagem);

            throw new Error("Erro ao salvar agenda.");
        }

        document.getElementById("clienteSelect").value = "";
        document.getElementById("procedimento").value = "";
        document.getElementById("data").value = "";
        document.getElementById("hora").value = "";

        await listarAgendas();

        alert("Agendamento cadastrado com sucesso!");

    } catch (erro) {

        console.error(erro);
        alert("Erro ao cadastrar agenda.");

    }

}

async function listarAgendas() {

    try {

        const resposta = await fetch(URL_AGENDAS);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar agendamentos.");
        }

        const agendas = await resposta.json();

        const tabela = document.getElementById("listaAgendas");
        tabela.innerHTML = "";

        for (const agenda of agendas) {

            let nomeCliente = "Não encontrado";

            try {

                const respostaCliente = await fetch(
                    `${URL_CLIENTES}/${agenda.clienteId}`
                );

                if (respostaCliente.ok) {

                    const cliente = await respostaCliente.json();
                    nomeCliente = cliente.nome;

                }

            } catch (erro) {

                console.error("Erro ao buscar cliente:", erro);

            }

            const dataHora = new Date(agenda.dataHora);

            tabela.innerHTML += `
                <tr>
                    <td>${agenda.id}</td>
                    <td>${nomeCliente}</td>
                    <td>${agenda.procedimento}</td>
                    <td>${dataHora.toLocaleDateString("pt-BR")}</td>
                    <td>${dataHora.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
            })}</td>
                    <td>${agenda.status}</td>
                    <td>
                        <button
                            class="excluir"
                            onclick="excluirAgenda(${agenda.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;

        }

    } catch (erro) {

        console.error(erro);
        alert("Erro ao listar agendamentos.");

    }

}

async function excluirAgenda(id) {

    if (!confirm("Deseja excluir este agendamento?")) {
        return;
    }

    try {

        const resposta = await fetch(`${URL_AGENDAS}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir agendamento.");
        }

        await listarAgendas();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao excluir agendamento.");

    }

}

window.onload = async function () {

    await listarClientes();
    await listarAgendas();

};