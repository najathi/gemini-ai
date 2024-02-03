const generativeChatFrm = document.querySelector('#generative-chat-frm');
const chatHistory = document.querySelector('.chat-history');

generativeChatFrm.addEventListener('submit', function (e) {
  e.preventDefault();
  var formData = new FormData(this);
  var formDataObj = Object.fromEntries(formData.entries());

  displayMessage('human', formDataObj.prompt);
  requestGeminiChat(formDataObj).then(function (data) {
    displayMessage('ai', data.text);
    generativeChatFrm.reset();
  });
});

function displayMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', `chat-message-${sender}`);
  let formattedMessage = message.replace(/\n/g, '<br>');
  formattedMessage = formattedMessage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  messageElement.innerHTML = formattedMessage;
  chatHistory.appendChild(messageElement);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function requestGeminiChat(formData) {
  var response = await fetch('/api/gemini/multi-turn-conversations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  return response.json();
}