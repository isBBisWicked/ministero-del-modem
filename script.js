const form = document.getElementById("certificateForm");

const citizenName = document.getElementById("citizenName");
const department = document.getElementById("department");
const reason = document.getElementById("reason");
const severity = document.getElementById("severity");

const progressSection = document.getElementById("progressSection");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const certificateSection = document.getElementById("certificateSection");
const certificateName = document.getElementById("certificateName");
const certificateDate = document.getElementById("certificateDate");
const certificateDepartment = document.getElementById("certificateDepartment");
const certificateReason = document.getElementById("certificateReason");
const certificateSeverity = document.getElementById("certificateSeverity");
const certificateProtocol = document.getElementById("certificateProtocol");
const certificateClosing = document.getElementById("certificateClosing");

const randomButton = document.getElementById("randomButton");
const printButton = document.getElementById("printButton");
const copyButton = document.getElementById("copyButton");
const resetButton = document.getElementById("resetButton");
const resultMessage = document.getElementById("resultMessage");
const clock = document.getElementById("clock");

const appWindow = document.getElementById("appWindow");
const dragHandle = document.getElementById("dragHandle");

const reasons = {
  computer_non_collabora: [
    "il computer ha manifestato una persistente indisponibilità al dialogo operativo.",
    "il dispositivo informatico ha rifiutato di collaborare con modalità non meglio specificate.",
    "il sistema ha deciso autonomamente di rallentare proprio nel momento meno opportuno."
  ],
  modem_strano: [
    "il modem ha emesso rumori inquietanti, incompatibili con un sereno svolgimento delle attività.",
    "la connessione ha prodotto segnali acustici che il cittadino ha ritenuto prudentemente non approfondire.",
    "l'apparato di rete ha mostrato un comportamento tecnicamente inspiegabile e moralmente preoccupante."
  ],
  wifi_spirituale: [
    "la rete Wi-Fi è risultata disponibile unicamente sul piano spirituale.",
    "la connessione risultava visibile, ma non concretamente utilizzabile in questa dimensione.",
    "il segnale wireless ha preferito mantenere le distanze."
  ],
  voglia_smarrita: [
    "è stata riscontrata l'improvvisa e non autorizzata scomparsa della voglia di fare.",
    "il cittadino ha cercato la motivazione personale senza trovarla nei luoghi abitualmente frequentati.",
    "la produttività è risultata irreperibile nonostante ripetuti tentativi di chiamata."
  ],
  aggiornamento_infinito: [
    "un aggiornamento di sistema ha assunto una durata incompatibile con la vita umana.",
    "il dispositivo ha richiesto pazienza aggiuntiva senza fornire una stima credibile dei tempi.",
    "il sistema operativo ha dichiarato di stare lavorando, senza ulteriori prove."
  ],
  stampante_offesa: [
    "la stampante ha interrotto ogni comunicazione con l'ufficio competente.",
    "il dispositivo di stampa ha scelto di non elaborare il documento per ragioni personali.",
    "la stampante ha manifestato un chiaro dissenso nei confronti dell'intera pratica."
  ],
  caffe_emergenza: [
    "si è resa necessaria una pausa caffè di emergenza, non ulteriormente differibile.",
    "il livello di caffeina è risultato inferiore ai parametri minimi previsti dalla ragionevolezza.",
    "la prosecuzione delle attività senza bevanda calda avrebbe potuto generare decisioni affrettate."
  ],
  troppi_tab: [
    "il browser conteneva un numero di schede incompatibile con il buon senso.",
    "la memoria del dispositivo è stata occupata da troppe finestre aperte contemporaneamente.",
    "il cittadino ha perso la scheda corretta dopo averne aperte soltanto trentadue."
  ]
};

const severityLabels = {
  basso: "Livello 1 - Gestibile con un caffè",
  medio: "Livello 2 - Serve una pausa tecnica",
  alto: "Livello 3 - Situazione delicata",
  critico: "Livello 4 - Chiamare qualcuno che ne capisce"
};

const closingLines = [
  "Il presente documento ha validità fino al ripristino della connessione, della pazienza o della voglia di affrontare la giornata.",
  "Il certificato decade automaticamente quando il cittadino riprende improvvisamente ad essere produttivo.",
  "La validità della presente attestazione termina non appena qualcuno pronuncia la frase: “hai provato a spegnere e riaccendere?”.",
  "Il documento resta valido fino a nuovo ordine, pausa pranzo o aggiornamento imprevisto del sistema."
];

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function generateProtocol() {
  const number = Math.floor(10000 + Math.random() * 89999);
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  return `MDM-2003-${number}-${letter}`;
}

function formatDate() {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date());
}

function getSelectedText(selectElement) {
  return selectElement.options[selectElement.selectedIndex].text;
}

function setProgress(value, text) {
  progressFill.style.width = `${value}%`;
  progressText.textContent = text;
}

function generateCertificate() {
  const name = citizenName.value.trim() || "Cittadino non identificato";
  const selectedReason = reasons[reason.value];
  const generatedReason = getRandomItem(selectedReason);

  certificateName.textContent = name;
  certificateDate.textContent = formatDate();
  certificateDepartment.textContent = getSelectedText(department);
  certificateReason.textContent = generatedReason;
  certificateSeverity.textContent = severityLabels[severity.value];
  certificateProtocol.textContent = generateProtocol();
  certificateClosing.textContent = getRandomItem(closingLines);
}

function runProcess() {
  progressSection.hidden = false;
  certificateSection.hidden = true;
  resultMessage.textContent = "";

  const steps = [
    [8, "Connessione al Ministero in corso..."],
    [25, "Verifica disponibilità del modem..."],
    [48, "Consultazione archivio delle scuse plausibili..."],
    [72, "Applicazione timbro digitale quasi autentico..."],
    [92, "Registrazione protocollo presso l'ufficio competente..."],
    [100, "Pratica completata con successo."]
  ];

  let currentStep = 0;

  setProgress(0, "Inizializzazione del protocollo...");

  const interval = setInterval(() => {
    const [value, text] = steps[currentStep];
    setProgress(value, text);
    currentStep += 1;

    if (currentStep === steps.length) {
      clearInterval(interval);

      setTimeout(() => {
        generateCertificate();
        certificateSection.hidden = false;
        certificateSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 450);
    }
  }, 420);
}

function randomizeForm() {
  const reasonOptions = [...reason.options];
  const severityOptions = [...severity.options];
  const departmentOptions = [...department.options];

  reason.value = getRandomItem(reasonOptions).value;
  severity.value = getRandomItem(severityOptions).value;
  department.value = getRandomItem(departmentOptions).value;

  citizenName.value = getRandomItem([
    "Cittadino in difficoltà",
    "Utente temporaneamente operativo",
    "Giuseppe Tiano",
    "Navigatore non identificato",
    "Funzionario fuori servizio"
  ]);
}

async function copyCertificateText() {
  const text = [
    "REPUBBLICA TELEMATICA ITALIANA",
    "CERTIFICATO PROVVISORIO DI IMPEDIMENTO DIGITALE",
    `Protocollo: ${certificateProtocol.textContent}`,
    "",
    `Si attesta che il cittadino ${certificateName.textContent}, in data ${certificateDate.textContent}, ha presentato formale segnalazione presso ${certificateDepartment.textContent}.`,
    "",
    `Motivazione: ${certificateReason.textContent}`,
    `Livello di gravità: ${certificateSeverity.textContent}`,
    "",
    certificateClosing.textContent,
    "",
    "Firmato: Il Funzionario del Modem"
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
    resultMessage.textContent = "Testo copiato negli appunti. Ora puoi inviarlo dove non dovrebbe essere inviato.";
  } catch {
    resultMessage.textContent = "Impossibile copiare automaticamente il testo. Il Ministero si scusa, ma non troppo.";
  }
}

function updateClock() {
  const now = new Date();

  clock.textContent = now.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  runProcess();
});

randomButton.addEventListener("click", () => {
  randomizeForm();
  resultMessage.textContent = "Caso estratto casualmente. La pratica ora appare molto più seria.";
});

printButton.addEventListener("click", () => {
  window.print();
});

copyButton.addEventListener("click", () => {
  copyCertificateText();
});

resetButton.addEventListener("click", () => {
  form.reset();
  citizenName.value = "";
  progressSection.hidden = true;
  certificateSection.hidden = true;
  progressFill.style.width = "0%";
  resultMessage.textContent = "Nuova pratica pronta. Il Ministero non giudica.";
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

let isDragging = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

dragHandle.addEventListener("pointerdown", (event) => {
  if (window.innerWidth < 700) return;

  isDragging = true;
  startX = event.clientX - currentX;
  startY = event.clientY - currentY;

  dragHandle.setPointerCapture(event.pointerId);
});

dragHandle.addEventListener("pointermove", (event) => {
  if (!isDragging) return;

  currentX = event.clientX - startX;
  currentY = event.clientY - startY;

  const maxX = Math.max(0, (window.innerWidth - appWindow.offsetWidth) / 2 - 10);
  const maxY = 90;

  currentX = Math.max(-maxX, Math.min(maxX, currentX));
  currentY = Math.max(-maxY, Math.min(maxY, currentY));

  appWindow.style.transform = `translate(${currentX}px, ${currentY}px)`;
});

dragHandle.addEventListener("pointerup", () => {
  isDragging = false;
});

dragHandle.addEventListener("pointercancel", () => {
  isDragging = false;
});

updateClock();
setInterval(updateClock, 1000);