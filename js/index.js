import * as bootstrap from 'bootstrap'
import generatePrint from './print.js'
import * as Data from './data.js'
import alertModal from './alert.js'


const btnSave = document.querySelector("#salvar-btn");

const modalHTML = document.querySelector("#modal")
const modal = new bootstrap.Modal(modalHTML)
const msgModal = modalHTML.querySelector(".mensagem")
const savePdf = modalHTML.querySelector("#gerar-pdf");


btnSave.addEventListener('click', function (e) {
  e.preventDefault()

  var values = Data.captureData();
  var info = Data.verifyFields(values)

  msgModal.innerHTML = info;

  modal.show();
});

