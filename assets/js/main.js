const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));


// QureHeal static website assistant
document.addEventListener("DOMContentLoaded", () => {
  const launcher = document.getElementById("qhChatLauncher");
  const panel = document.getElementById("qhChatPanel");
  const closeButton = document.getElementById("qhChatClose");
  const form = document.getElementById("qhChatForm");
  const input = document.getElementById("qhChatInput");
  const messages = document.getElementById("qhChatMessages");
  const suggestions = document.getElementById("qhChatSuggestions");

  if (!launcher || !panel || !form || !input || !messages) return;

  const answers = [
    {
      keywords: ["what is", "about", "qureheal", "platform", "product"],
      response: "QureHeal is a configurable healthcare operations platform for hospitals, clinics, and provider networks. It can support patient registration, appointments, clinical workflows, prescriptions, records, billing, reporting, and provider-specific administration."
    },
    {
      keywords: ["custom", "customized", "customised", "branding", "hospital", "clinic", "provider"],
      response: "Yes. QureHeal is designed to be configured for each provider through branding, branches, departments, roles, forms, workflows, templates, enabled modules, and integrations—without creating a completely separate codebase for every customer."
    },
    {
      keywords: ["security", "secure", "privacy", "data", "audit", "access"],
      response: "QureHeal is designed around role-based access, provider-level data isolation, audit activity, secure data handling, and controlled permissions. Final compliance and deployment controls are tailored to the provider and operating region."
    },
    {
      keywords: ["implementation", "onboard", "onboarding", "deploy", "timeline", "setup"],
      response: "A typical onboarding includes discovery, workflow mapping, provider configuration, branding, data migration planning, user setup, training, acceptance testing, and production launch. The exact timeline depends on modules and integrations."
    },
    {
      keywords: ["feature", "features", "appointment", "patient", "prescription", "billing", "records"],
      response: "Planned provider capabilities include patient management, appointments, queue and check-in, encounters, prescriptions, medical records, billing, reporting, notifications, role management, and audit history."
    },
    {
      keywords: ["price", "pricing", "cost", "quote", "subscription"],
      response: "Pricing depends on provider size, branches, selected modules, customization, integrations, data migration, support level, and whether the deployment is shared or dedicated. A short discovery call is the best way to prepare an accurate quote."
    },
    {
      keywords: ["demo", "contact", "sales", "email", "book"],
      response: 'You can request a private demonstration by emailing <a href="mailto:hello@qureheal.com?subject=QureHeal%20Demo%20Request">hello@qureheal.com</a>. Please include your organization name, location, provider type, and the workflows you want to digitize.'
    },
    {
      keywords: ["emergency", "urgent", "symptom", "diagnosis", "medicine", "medical advice"],
      response: "This website assistant cannot provide medical advice, diagnosis, prescriptions, or emergency support. For an emergency, contact your local emergency service immediately. For personal health concerns, speak with a qualified healthcare professional."
    },
    {
      keywords: ["hello", "hi", "hey", "good morning", "good evening"],
      response: "Hello! How can I help you explore QureHeal? You can ask about provider customization, features, implementation, security, pricing, or booking a demo."
    }
  ];

  const fallback = 'I can help with QureHeal features, provider customization, implementation, security, pricing, or demos. For a detailed question, email <a href="mailto:hello@qureheal.com">hello@qureheal.com</a>.';

  const openChat = () => {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    setTimeout(() => input.focus(), 80);
  };

  const closeChat = () => {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  };

  const addMessage = (content, sender) => {
    const row = document.createElement("div");
    row.className = `qh-chat__message qh-chat__message--${sender}`;
    const bubble = document.createElement("div");
    bubble.className = "qh-chat__bubble";
    sender === "bot" ? (bubble.innerHTML = content) : (bubble.textContent = content);
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  };

  const showTyping = () => {
    const row = document.createElement("div");
    row.className = "qh-chat__message qh-chat__message--bot qh-chat__typing";
    row.id = "qhChatTyping";
    row.innerHTML = '<div class="qh-chat__bubble"><i></i><i></i><i></i></div>';
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  };

  const findAnswer = (question) => {
    const normalized = question.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;
    answers.forEach((entry) => {
      const score = entry.keywords.reduce((total, keyword) =>
        total + (normalized.includes(keyword) ? 1 : 0), 0);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry.response;
      }
    });
    return bestMatch || fallback;
  };

  const processQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    addMessage(trimmed, "user");
    input.value = "";
    showTyping();
    setTimeout(() => {
      document.getElementById("qhChatTyping")?.remove();
      addMessage(findAnswer(trimmed), "bot");
    }, 650);
  };

  launcher.addEventListener("click", () => panel.hidden ? openChat() : closeChat());
  closeButton?.addEventListener("click", closeChat);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    processQuestion(input.value);
  });
  suggestions?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chat-question]");
    if (button) processQuestion(button.dataset.chatQuestion || button.textContent);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) closeChat();
  });
});
