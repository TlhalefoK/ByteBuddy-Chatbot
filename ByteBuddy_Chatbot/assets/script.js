const chatbotToggle = document.querySelector(".chatbot-toggle"),
      tryItOutBtn = document.querySelector(".view_more_btn");
      closeButton = document.querySelector(".close-btn"),
      chatBox = document.querySelector(".chatbox"),
      chatInput = document.querySelector(".chat-input textarea"),
      sendChatButton = document.querySelector(".chat-input span"),

      navId = document.getElementById("nav_menu"),
      ToggleBtnId = document.getElementById("toggle_btn"),
      CloseBtnId = document.getElementById("close_btn");


// ===== CHATBOT === //
let userMessage = null;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Loading...", "incoming");
        chatBox.appendChild(incomingChatLi);
        chatBox.scrollTo(0, chatBox.scrollHeight);
        generateResponse(incomingChatLi);

    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatButton.addEventListener("click", handleChat);
closeButton.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggle.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
tryItOutBtn.addEventListener("click", toggleChatbot);
function toggleChatbot() {
    document.body.classList.toggle('show-chatbot');
}



// === LANDING PAGE === //
ToggleBtnId.addEventListener("click", () => {
    navId.classList.add("show");
});
CloseBtnId.addEventListener("click", () => {
    navId.classList.remove("show");
});
AOS.init();
gsap.from(".logo", {
    opacity: 0,
    y: -10,
    delay: 1,
    duration: 0.5,
});
gsap.from(".nav_menu_list .nav_menu_item", {
    opacity: 0,
    y: -10,
    delay: 1.4,
    duration: 0.5,
    stagger: 0.3,
});
gsap.from(".toggle_btn", {
    opacity: 0,
    y: -10,
    delay: 1.4,
    duration: 0.5,
});
gsap.from(".main-heading", {
    opacity: 0,
    y: 20,
    delay: 2.4,
    duration: 1,
});
gsap.from(".info-text", {
    opacity: 0,
    y: 20,
    delay: 2.8,
    duration: 1,
  });
gsap.from(".btn_wrapper", {
    opacity: 0,
    y: 20,
    delay: 2.8,
    duration: 1,
});
gsap.from(".team_img_wrapper img", {
    opacity: 0,
    y: 20,
    delay: 3,
    duration: 1,
});