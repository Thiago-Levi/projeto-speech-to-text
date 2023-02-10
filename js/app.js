const buttonOfPlay = document.querySelector('[data-js="buttonOfPlay" ]');
const buttonOfPause = document.querySelector('[data-js="buttonOfPause"]');
const buttonOfRemove = document.querySelector('[data-js="buttonOfRemove"]');
const textArea = document.querySelector('[data-js="texteArea"]');

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const verifyCompatibility = () => typeof SpeechRecognition === "function";

const showIfThatsIncompatible = () => {
  if (!verifyCompatibility())
    textArea.value =
      "Infelizmente esse browser é incompatível com a Speech API. Teste no Chrome ou no Edge :(";
};

showIfThatsIncompatible();

const speechIntance = new SpeechRecognition();

const createRecognition = () => {
  speechIntance.continuous = true;
  speechIntance.lang = "pt-BR";
  speechIntance.start();
};

const renderTextResult = () => {
  speechIntance.onresult = (event) => {
    const resultIndex = event.resultIndex;
    const outputText = event.results[resultIndex][0].transcript;
    textArea.value += `${outputText} `;
  };
};

const buttonsInStateOfPlay = () => {
  buttonOfPlay.disabled = true;
  buttonOfPause.disabled = false;
};

const buttonsInStateOfPause = () => {
  buttonOfPlay.disabled = false;
  buttonOfPause.disabled = true;
};

buttonOfPlay.addEventListener("click", () => {
  createRecognition();
  renderTextResult();
  buttonsInStateOfPlay();
});

buttonOfPause.addEventListener("click", () => {
  speechIntance.stop();
  buttonsInStateOfPause();
});

buttonOfRemove.addEventListener("click", () => {
  textArea.value = "";
});
