const msgerForm = get('.msger-inputarea');
const msgerInput = get('.msger-input');
const msgerChat = get('.msger-chat');

const BOT_MSGS = [
	'Te has sentido triste o decaído?',
	'Has tenido ganas de llorar o has llorado?',
	'Te has sentido cansado sin razon aparente?',
	'Te has sentido inquieto e intranquilo?',
	'Te has sentido más irritable que de costumbre?',
	'No te has sentido muy útil y necesario? ',
	'No has disfrutado tus actividades cotidianas?',
	'No has encontrado agradable vivir?',
	'Te has sentido atemorizado sin motivo?',
	'Te has sentido atemorizado sin motivo?',
	'Sufres fuertes dolores de cabeza y/o cuello?',
	'Sientes que el corazón late más rápido?',
	'Orino o siento ganas de orinar con mucha frecuencia?',
	'Sufres de dolores de estómago e indigestión?  ',
	'No duermes falcimente y descanso por las noches?',
	'Tienes pesadillas?',
	'No puedes conciliar el sueño la primera media hora despues de acostarte? ',
	'No puedes respirar cómodamente? ',
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = 'https://image.flaticon.com/icons/svg/327/327779.svg';
const PERSON_IMG = 'https://image.flaticon.com/icons/svg/145/145867.svg';
const BOT_NAME = 'BOT';
const PERSON_NAME = 'Sajad';

msgerForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const msgText = msgerInput.value;
	if (!msgText) return;

	appendMessage(PERSON_NAME, PERSON_IMG, 'right', msgText);
	msgerInput.value = '';

	botResponse();
});

function appendMessage(name, img, side, text) {
	//   Simple solution for small apps
	const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

	msgerChat.insertAdjacentHTML('beforeend', msgHTML);
	msgerChat.scrollTop += 500;
}

function botResponse() {
	const r = random(0, BOT_MSGS.length - 1);
	const msgText = BOT_MSGS[r];
	const delay = msgText.split(' ').length * 100;

	setTimeout(() => {
		appendMessage(BOT_NAME, BOT_IMG, 'left', msgText);
	}, delay);
}

// Utils
function get(selector, root = document) {
	return root.querySelector(selector);
}

function formatDate(date) {
	const h = '0' + date.getHours();
	const m = '0' + date.getMinutes();

	return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
