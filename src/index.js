import * as bootstrap from 'bootstrap'
import html2pdf from 'html2pdf.js'

import * as Print from './public/js/print.js'
import * as Data from './public/js/data.js'
import alertModal from './public/js/alert.js'



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

  savePdf.addEventListener('click', function(e){
    e.preventDefault()
    
    var worker = html2pdf()
    var element = Print.generatePrint(values)
    var filename = Print.filename("ficha")

    worker.from(element).saveAs(filename)
  })
})


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(new URL("./sw.js", import.meta.url))
      .then(() => console.log("Service Worker registrado"))
      .catch(err => console.error("Erro:", err));
  });
}