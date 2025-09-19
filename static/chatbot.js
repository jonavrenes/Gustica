// chatbot.js
const chatbox = document.getElementById("chatbox");
const chatLogo = document.getElementById("chatbot-logo");
const chatClose = document.getElementById("chatbox-close");
const chat = document.getElementById("chat-messages");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

let userName = null;

const productos = {
  "chatbot": { nombre: "Chatbot Inteligente", precio: "$125.9", img: "static/chatbot.jpg", video: "video_chatbot.mp4" },
  "web": { nombre: "Página Web", precio: "$199.9", img: "static/webdesign.jpg", video: "video_web.mp4" },
  "automatizacion": { nombre: "Automatización Empresarial", precio: "$259.9", img: "static/automation.jpg", video: "video_automatizacion.mp4" }
};

// Mostrar u ocultar chat al hacer click en el logo
chatLogo.addEventListener("click", () => {
  chatbox.style.display = chatbox.style.display === "none" ? "flex" : "none";
  if(chatbox.style.display === "flex" && chat.innerHTML.trim() === ""){
    initChat();
  }
});

// Cerrar chat al hacer click en la X
if(chatClose){
  chatClose.addEventListener("click", () => {
    chatbox.style.display = "none";
  });
}

// Agregar mensaje al chat
function addMessage(sender, htmlContent) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerHTML = htmlContent;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// Inicializar chat
function initChat() {
  addMessage("bot", "¡Hola! 👋 Soy el asistente de <b>AI Connect</b>.");
  addMessage("bot", "¿Cuál es tu nombre?");
}

// Manejar input del usuario
function handleInput() {
  const msg = input.value.trim();
  if (!msg) return;
  addMessage("user", msg);
  input.value = "";

  if (!userName) {
    userName = msg;
    addMessage("bot", `¡Encantado de conocerte, <b>${userName}</b>!`);
    showInitialOptions();
  }
}

// Opciones iniciales
function showInitialOptions() {
  addMessage("bot", `
    <p>${userName}, ¿Deseas hablar con un asesor o ver nuestros productos?</p>
    <div class="option-button" onclick="contactAsesor()">Hablar con asesor</div>
    <div class="option-button" onclick="showProducts()">Ver productos</div>
  `);
}

// Contactar a un asesor
function contactAsesor(producto = null) {
  let mensaje = producto 
      ? `Hola quiero información sobre ${producto}` 
      : "Hola quiero hacerte una consulta";

  addMessage("bot", `
    <p>Selecciona la plataforma para contactar a un asesor${producto ? ` sobre <b>${producto}</b>` : ''}:</p>
    <div class="contact-buttons">
      <a href="https://wa.me/50660021483?text=${encodeURIComponent(mensaje)}" target="_blank">
        <img src="static/whatsapp.png" alt="WhatsApp">
      </a>
      <a href="https://www.facebook.com/share/1CwHCKScQZ/?mibextid=wwXIfr" target="_blank">
        <img src="static/facebook.png" alt="Facebook">
      </a>
      <a href="https://www.instagram.com/aic_onnect?igsh=MXZwbnFuY3RjbWU3Yw==" target="_blank">
        <img src="static/instagram.png" alt="Instagram">
      </a>
    </div>
    <div class="option-button" onclick="restart()">Volver</div>
  `);
}

// Mostrar productos
function showProducts() {
  addMessage("bot", `<p>Selecciona un producto:</p>`);
  Object.keys(productos).forEach(key => {
    const prod = productos[key];
    const card = document.createElement("div");
    card.className = "product-card bot";
    card.innerHTML = `<img src="${prod.img}" alt="${prod.nombre}"><strong>${prod.nombre}</strong>`;
    card.onclick = () => showProductOptions(key);
    chat.appendChild(card);
  });
  chat.scrollTop = chat.scrollHeight;
}

// Opciones de un producto
function showProductOptions(key) {
  const prod = productos[key];
  addMessage("bot", `
    <p><b>${prod.nombre}</b> - Precio: ${prod.precio}</p>
    <div class="option-button" onclick="showVideo('${prod.video}')">¿Qué es?</div>
    <div class="option-button" onclick="contactAsesor('${prod.nombre}')">Contactar a un asesor</div>
  `);
}

// Mostrar video de producto
function showVideo(videoFile) {
  const videoPath = `static/${videoFile}`;
  addMessage("bot", `<video controls src="${videoPath}"></video>`);
}

// Reiniciar chat
function restart() {
  addMessage("bot", "<hr>");
  showInitialOptions();
}

// ======= Conectar botón y Enter al handleInput =======
sendBtn.addEventListener("click", handleInput);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleInput();
  }
});
