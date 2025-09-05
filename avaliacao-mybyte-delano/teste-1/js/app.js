// refs do DOM
const form = document.getElementById('form-contato');
const btnEnviar = document.getElementById('btn-enviar');
const statusBox = document.getElementById('mensagens');

// campos obrigatórios
const campos = {
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  mensagem: document.getElementById('mensagem'),
  termos: document.getElementById('termos'),
};

// habilita botão quando tudo ok
function atualizaEstadoBotao() {
  const nomeOk = campos.nome.value.trim().length >= 2;
  const emailOk = campos.email.validity.valid && campos.email.value.trim().length > 3;
  const msgOk = campos.mensagem.value.trim().length >= 5;
  const termosOk = campos.termos.checked;

  const habilitar = nomeOk && emailOk && msgOk && termosOk;
  btnEnviar.disabled = !habilitar;

  // marca inválidos (ARIA)
  campos.nome.setAttribute('aria-invalid', String(!nomeOk));
  campos.email.setAttribute('aria-invalid', String(!emailOk));
  campos.mensagem.setAttribute('aria-invalid', String(!msgOk));
}

// revalida enquanto digita/muda
Object.values(campos).forEach(el => {
  el.addEventListener('input', atualizaEstadoBotao);
  el.addEventListener('change', atualizaEstadoBotao);
});

atualizaEstadoBotao(); // estado inicial

// sem submit real; só feedback na tela
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // mensagem de sucesso fake
  statusBox.textContent = 'Formulário respondido com sucesso!';
  statusBox.style.color = '#9be9a8';

  // feedback no botão
  btnEnviar.textContent = 'Pronto!';
  btnEnviar.disabled = true;

  // limpa depois de um tempinho
  setTimeout(() => {
    form.reset();
    btnEnviar.textContent = 'Enviar';
    statusBox.textContent = '';
    statusBox.style.color = '';
    atualizaEstadoBotao();
  }, 1500);
});
