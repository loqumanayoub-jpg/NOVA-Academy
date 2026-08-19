(() => {
  const config = window.NOVA_CONFIG;
  const data = window.NOVA_DATA;
  const i18n = window.NOVA_I18N;
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [
    ...parent.querySelectorAll(selector),
  ];
  const t = (path) => i18n.t(path);
  const dynamic = (collection, index, field, fallback) =>
    i18n.dynamic(collection, index, field) ?? fallback;
  const localizedFields = (item, fields) =>
    Array.isArray(item) ? item : fields.map((field) => item[field]);
  const programMeta = (index, item) => {
    const values = {
      fr: [
        ["2 ans · Bac+2", "Bac+2"],
        ["3 ans · Bac+3", "Bac+3"],
        ["2 ans · Bac+2", "Bac+2"],
        ["3 ans · Bac+3", "Bac+3"],
        ["2 ans · Bac+2", "Bac+2"],
        ["1 an · Certifiant", "Formation courte"],
      ],
      en: [
        ["2 years · Level 2", "Level 2"],
        ["3 years · Level 3", "Level 3"],
        ["2 years · Level 2", "Level 2"],
        ["3 years · Level 3", "Level 3"],
        ["2 years · Level 2", "Level 2"],
        ["1 year · Certificate", "Short course"],
      ],
      ar: [
        ["سنتان · مستوى 2", "المستوى 2"],
        ["3 سنوات · مستوى 3", "المستوى 3"],
        ["سنتان · مستوى 2", "المستوى 2"],
        ["3 سنوات · مستوى 3", "المستوى 3"],
        ["سنتان · مستوى 2", "المستوى 2"],
        ["سنة واحدة · شهادة", "تكوين قصير"],
      ],
    };
    return values[i18n.locale][index] || [item.duration, item.level];
  };
  const whatsappUrl = () =>
    `https://wa.me/${config.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(i18n.locale === "ar" ? "مرحبًا، أود الحصول على معلومات حول أكاديمية نوفا." : i18n.locale === "en" ? "Hello, I would like more information about Nova Academy." : "Bonjour, je souhaite obtenir des informations sur Nova Academy.")}`;

  const applyStaticTranslations = () => {
    const htmlBindings = {
      ".skip-link": "labels.skip",
      ".menu-toggle b": "nav.menu",
      '.primary-nav a[href="#formations"]': "nav.programs",
      '.primary-nav a[href="#experience"]': "nav.experience",
      '.primary-nav a[href="#admissions"]': "nav.admissions",
      '.primary-nav a[href="#faq-section"]': "nav.faq",
      '.primary-nav a[href="#contact"]': "nav.contact",
      ".nav-cta": "nav.info",
      ".hero .eyebrow": "hero.eyebrow",
      ".hero h1": "hero.title",
      ".hero-lead": "hero.description",
      ".hero-actions .button-primary": "hero.primary",
      ".hero-actions .text-link": "hero.secondary",
      ".hero-note > span": "hero.community",
      ".hero-badge > span:last-child": "hero.badge",
      ".hero-caption > span:last-child": "hero.caption",
      ".scroll-cue": "hero.scroll",
      ".programs-section .eyebrow": "sections.expertise",
      ".programs-section h2": "sections.programsTitle",
      ".programs-section .section-heading > p": "sections.programsDescription",
      ".about-copy .eyebrow": "sections.experience",
      ".about-copy h2": "sections.aboutTitle",
      ".about-copy > p": "sections.aboutDescription",
      ".about-copy .text-link": "sections.approach",
      ".experience-section .eyebrow": "sections.journey",
      ".experience-section h2": "sections.journeyTitle",
      ".experience-section .section-heading > p": "sections.journeyDescription",
      ".success-section .eyebrow": "sections.studentExperience",
      ".success-section h2": "sections.studentTitle",
      ".success-section .section-heading > p": "sections.studentDescription",
      ".facilities-section .eyebrow": "sections.campus",
      ".facilities-section h2": "sections.campusTitle",
      ".facilities-section .section-heading > p": "sections.campusDescription",
      ".admissions-section .eyebrow": "sections.admissions",
      ".admissions-section h2": "sections.admissionsTitle",
      ".admissions-copy > p": "sections.admissionsDescription",
      ".admissions-copy .button": "nav.info",
      ".admissions-copy .light-link": "labels.whatsapp",
      ".testimonials-section .eyebrow": "sections.daily",
      ".testimonials-section h2": "sections.communityTitle",
      ".testimonials-section .section-heading > p":
        "sections.communityDescription",
      ".faq-intro .eyebrow": "sections.questions",
      ".faq-intro h2": "sections.faqTitle",
      ".faq-intro p": "sections.faqDescription",
      ".faq-intro .text-link": "sections.advisor",
      ".contact-copy .eyebrow": "sections.contactEyebrow",
      ".contact-copy h2": "sections.contactTitle",
      ".contact-copy > p": "sections.contactDescription",
      ".map-footer span": "sections.mapFooter",
      ".map-footer a": "sections.mapLink",
      ".form-heading > span": "labels.project",
      ".form-heading small": "labels.frontend",
      'label[for="full-name"]': "labels.fullName",
      'label[for="email"]': "labels.email",
      'label[for="phone"]': "labels.phone",
      'label[for="program"]': "labels.desiredProgram",
      'label[for="message"]': "labels.message",
      '#program option[value=""]': "labels.chooseProgram",
      ".application-form > button": "labels.sendRequest",
      ".modal-panel .eyebrow": "labels.program",
      ".modal-close": "labels.closeDetails",
      ".modal-panel [data-modal-contact]": "nav.info",
      ".footer-links > div:nth-child(1) > strong": "labels.explore",
      ".footer-links > div:nth-child(2) > strong": "labels.guide",
      ".social-links > strong": "labels.follow",
      ".newsletter > strong": "labels.stayInTouch",
      ".newsletter p": "labels.newsletter",
      ".footer-bottom > span:first-child": "labels.demoFooter",
      '.footer-bottom a[href="#"]:first-child': "labels.legal",
      '.footer-bottom a[href="#"]:last-child': "labels.privacy",
      ".footer-location": "labels.rabat",
      ".media-stamp small": "sections.campusStamp",
      ".gallery-item:nth-child(1) strong": "labels.gallery1",
      ".gallery-item:nth-child(2) strong": "labels.gallery2",
      ".gallery-item:nth-child(3) strong": "labels.gallery3",
      ".footer-brand p": "labels.footerTagline",
      "footer [data-whatsapp]": "labels.whatsapp",
    };
    Object.entries(htmlBindings).forEach(([selector, key]) => {
      const element = $(selector);
      if (element) {
        element.innerHTML = element.querySelector(".eyebrow-line")
          ? `<span class="eyebrow-line"></span> ${t(key)}`
          : t(key);
      }
    });
    $(".primary-nav").setAttribute("aria-label", t("nav.aria"));
    $(".language-switcher").setAttribute(
      "aria-label",
      t("labels.languageAria"),
    );
    $(".modal-close").setAttribute("aria-label", t("labels.closeDetails"));
    $("#email-newsletter").placeholder = t("labels.newsletterPlaceholder");
    $("[data-map-frame]").title = t("sections.mapTitle");
    $(".about-media img").alt = t("sections.campusAlt");
    $(".hero-image-wrap img").alt = t("hero.alt");
    $$("[data-locale]").forEach((button) =>
      button.setAttribute(
        "aria-selected",
        button.dataset.locale === i18n.locale,
      ),
    );
    $(".language-current").textContent = i18n.locale.toUpperCase();
  };

  const renderDynamicContent = () => {
    $("#stats-grid").innerHTML = data.stats
      .map(
        (item, index) =>
          `<div class="stat reveal"><span class="stat-value">${item.value}</span><span class="stat-label">${dynamic("stats", index, 1, item.label)}</span></div>`,
      )
      .join("");
    $("#program-grid").innerHTML = data.programs
      .map((item, index) => {
        const [duration, level] = programMeta(index, item);
        return `<article class="program-card reveal"><div class="program-icon" aria-hidden="true">${item.icon}</div><h3>${dynamic("programs", index, 0, item.title)}</h3><p>${dynamic("programs", index, 1, item.description)}</p><div class="program-tags"><span>${level}</span><span>${dynamic("programs", index, 2, item.language)}</span></div><div class="program-meta"><span>${duration}</span><button class="program-details" type="button" data-program-index="${index}" aria-label="${t("labels.details")} ${dynamic("programs", index, 0, item.title)}">${t("labels.details")} <span>→</span></button></div></article>`;
      })
      .join("");
    $("#benefit-list").innerHTML = t("benefits")
      .map(
        (item) =>
          `<div class="benefit"><i aria-hidden="true">✓</i>${item}</div>`,
      )
      .join("");
    $("#timeline").innerHTML = t("journey")
      .map((item, index) => {
        const [title, text] = localizedFields(item, ["title", "text"]);
        return `<article class="journey reveal"><span class="journey-number">0${index + 1}</span><h3>${title}</h3><p>${text}</p></article>`;
      })
      .join("");
    $("#success-grid").innerHTML = t("success")
      .map((item, index) => {
        const [name, program, quote, achievement] = localizedFields(item, [
          "name",
          "program",
          "quote",
          "achievement",
        ]);
        return `<article class="success-card reveal"><div class="person"><div class="person-avatar">0${index + 1}</div><div class="person-info"><strong>${name}</strong><span>${program}</span></div></div><p class="quote">“${quote}”</p><span class="achievement">${achievement}</span></article>`;
      })
      .join("");
    $("#process-list").innerHTML = t("process")
      .map((item, index) => {
        const [title, text] = localizedFields(item, ["title", "text"]);
        return `<div class="process-step reveal"><span class="process-num">0${index + 1}</span><div><h3>${title}</h3><p>${text}</p></div></div>`;
      })
      .join("");
    $("#testimonial-grid").innerHTML = t("testimonials")
      .map((item, index) => {
        const [name, program, quote] = localizedFields(item, [
          "name",
          "program",
          "quote",
        ]);
        return `<article class="testimonial reveal"><p class="testimonial-quote">“${quote}”</p><div class="person"><div class="person-avatar">0${index + 1}</div><div class="person-info"><strong>${name}</strong><span>${program}</span></div></div></article>`;
      })
      .join("");
    $("#faq-list").innerHTML = t("faq")
      .map((item, index) => {
        const [question, answer] = localizedFields(item, [
          "question",
          "answer",
        ]);
        return `<div class="faq-item ${index === 0 ? "open" : ""}"><button class="faq-question" type="button" aria-expanded="${index === 0}" aria-controls="answer-${index}">${question}<span aria-hidden="true">+</span></button><div class="faq-answer" id="answer-${index}"><div><p>${answer}</p></div></div></div>`;
      })
      .join("");
    $("#program").innerHTML =
      `<option value="">${t("labels.chooseProgram")}</option>${data.programs.map((item, index) => `<option value="${index}">${dynamic("programs", index, 0, item.title)}</option>`).join("")}`;
    $("#contact-details").innerHTML =
      `<div class="contact-detail"><span class="detail-icon" aria-hidden="true">↗</span><div><strong>${i18n.locale === "ar" ? "الهاتف" : i18n.locale === "en" ? "Phone" : "Téléphone"}</strong><a href="tel:${config.phone.replace(/\s/g, "")}">${config.phone}</a></div></div><div class="contact-detail"><span class="detail-icon" aria-hidden="true">@</span><div><strong>${i18n.locale === "ar" ? "البريد الإلكتروني" : "Email"}</strong><a href="mailto:${config.email}">${config.email}</a></div></div><div class="contact-detail"><span class="detail-icon" aria-hidden="true">◌</span><div><strong>${i18n.locale === "ar" ? "واتساب" : "WhatsApp"}</strong><a data-whatsapp href="#">${config.whatsapp}</a></div></div><div class="contact-detail"><span class="detail-icon" aria-hidden="true">⌖</span><div><strong>${i18n.locale === "ar" ? "العنوان" : i18n.locale === "en" ? "Address" : "Adresse"}</strong><span>${i18n.locale === "ar" ? "الرباط، المغرب" : i18n.locale === "en" ? "Rabat, Morocco" : config.address}</span></div></div><div class="contact-detail"><span class="detail-icon" aria-hidden="true">◷</span><div><strong>${i18n.locale === "ar" ? "أوقات العمل" : i18n.locale === "en" ? "Opening hours" : "Horaires"}</strong><span>${config.openingHours}</span></div></div>`;
  };

  const applyContactLinks = () => {
    $$("[data-whatsapp]").forEach((link) => {
      link.href = whatsappUrl();
      link.target = "_blank";
      link.rel = "noopener";
    });
    $("[data-map-link]").href = config.mapEmbedUrl;
    $("[data-map-link]").target = "_blank";
    $("[data-map-link]").rel = "noopener";
    $("[data-map-frame]").src = config.mapEmbedUrl;
    $$("[data-social]").forEach((link) => {
      link.href = config.social[link.dataset.social];
    });
  };

  let closeModal;
  let navObserver;
  let toastTimer;
  const bindInteractions = () => {
    const header = $("#site-header");
    const menuToggle = $(".menu-toggle");
    const nav = $("#primary-nav");
    const setHeader = () =>
      header.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", setHeader, { passive: true });
    setHeader();
    menuToggle.onclick = () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    };
    $$(".primary-nav a").forEach((link) => {
      link.onclick = () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        $$(".primary-nav > a").forEach((item) =>
          item.classList.remove("active"),
        );
        if (!link.classList.contains("nav-cta")) link.classList.add("active");
      };
    });
    if (navObserver) navObserver.disconnect();
    const navLinks = $$('a[href^="#"]', nav).filter((link) =>
      document.querySelector(link.getAttribute("href")),
    );
    navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)[0];
        if (!visible) return;
        navLinks.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${visible.target.id}`,
          ),
        );
      },
      { rootMargin: "-25% 0px -60%", threshold: [0.1, 0.4, 0.8] },
    );
    navLinks.forEach((link) =>
      navObserver.observe(document.querySelector(link.getAttribute("href"))),
    );
    $$(".faq-question").forEach((button) => {
      button.onclick = () => {
        const item = button.closest(".faq-item");
        const open = item.classList.toggle("open");
        button.setAttribute("aria-expanded", open);
      };
    });

    const modal = $("#program-modal");
    const modalTitle = $("#modal-title");
    const modalDescription = $("#modal-description");
    const modalMeta = $("#modal-meta");
    closeModal = () => {
      modal.hidden = true;
      document.body.classList.remove("modal-open");
    };
    $$(".program-details").forEach((button) => {
      button.onclick = () => {
        const index = Number(button.dataset.programIndex);
        const item = data.programs[index];
        const [duration, level] = programMeta(index, item);
        modalTitle.textContent = dynamic("programs", index, 0, item.title);
        modalDescription.textContent = dynamic(
          "programs",
          index,
          3,
          item.presentation,
        );
        modalMeta.innerHTML = `<div><strong>${t("labels.duration")}</strong><span>${duration}</span></div><div><strong>${t("labels.level")}</strong><span>${level}</span></div><div><strong>${t("labels.language")}</strong><span>${dynamic("programs", index, 2, item.language)}</span></div><div><strong>${t("labels.outcomes")}</strong><span>${dynamic("programs", index, 4, item.outcomes)}</span></div><div><strong>${t("labels.admission")}</strong><span>${dynamic("programs", index, 5, item.admission)}</span></div>`;
        modal.hidden = false;
        document.body.classList.add("modal-open");
        $(".modal-close").focus();
      };
    });
    $(".modal-close").onclick = closeModal;
    $$("[data-modal-close]").forEach(
      (element) => (element.onclick = closeModal),
    );
    $("[data-modal-contact]").onclick = closeModal;
    $("#application-form").onsubmit = validateForm;
    $(".newsletter form").onsubmit = (event) => {
      event.preventDefault();
      const button = $("button", event.currentTarget);
      button.textContent = "✓";
      button.setAttribute("aria-label", t("actions.newsletterSuccess"));
    };
  };

  const validateForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const requiredFields = [...form.querySelectorAll("[required]")];
    let valid = true;
    requiredFields.forEach((field) => {
      const error = field.parentElement.querySelector(".field-error");
      const message = field.value.trim() ? "" : t("actions.required");
      field.classList.toggle("invalid", Boolean(message));
      error.textContent = message;
      if (message) valid = false;
    });
    const email = $("#email");
    if (email.value && !email.validity.valid) {
      email.classList.add("invalid");
      email.parentElement.querySelector(".field-error").textContent =
        t("actions.validEmail");
      valid = false;
    }
    const status = $(".form-status", form);
    status.textContent = valid
      ? t("actions.formSuccess")
      : t("actions.formError");
    status.classList.toggle("success", valid);
    status.classList.toggle("error", !valid);
    if (valid) {
      form.reset();
      const toast = $("#form-toast");
      toast.textContent = t("actions.formSuccess");
      toast.hidden = false;
      toast.classList.add("visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => {
          toast.hidden = true;
        }, 250);
      }, 4200);
    }
  };

  const observeReveals = () => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    $$(".reveal").forEach((element) => observer.observe(element));
  };

  const render = () => {
    applyStaticTranslations();
    renderDynamicContent();
    applyContactLinks();
    bindInteractions();
    observeReveals();
  };
  const languageToggle = $(".language-toggle");
  const languageOptions = $(".language-options");
  languageToggle.onclick = () => {
    const open = languageOptions.classList.toggle("open");
    languageToggle.setAttribute("aria-expanded", open);
  };
  $$("[data-locale]").forEach((button) => {
    button.onclick = () => {
      i18n.setLocale(button.dataset.locale);
      languageOptions.classList.remove("open");
      languageToggle.setAttribute("aria-expanded", "false");
    };
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      languageOptions.classList.remove("open");
      languageToggle.setAttribute("aria-expanded", "false");
      if (closeModal) closeModal();
    }
  });
  document.addEventListener("nova-language-change", render);
  render();
})();
