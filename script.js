function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

const botVoice = "Hi, I'm CleanCommute! Ask me about our mission, services, or how we started."

const toggleChat = () => {
  const chat = document.getElementById("chat-window");
  chat.style.display = chat.style.display === "none" ? "block" : "none";
};

const sendMessage = async () => {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (!message) return;

  const messagesDiv = document.getElementById("chat-messages");
  messagesDiv.innerHTML += `<div><b>You:</b> ${message}</div>`;

  input.value = "Thinking...";
  input.disabled = true;

  const response = await fetch("https://api.puter.com/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system: `You're the founder of CleanCommute, a green urban mobility startup. You speak in a warm, visionary voice. Answer all questions about your mission, services, or story.`,
      message: message
    })
  });

  const data = await response.json();
  const reply = data.reply || "I'm not sure, but I'll get better with time!";

  messagesDiv.innerHTML += `<div><b>CleanCommute:</b> ${reply}</div>`;
  input.value = "";
  input.disabled = false;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};