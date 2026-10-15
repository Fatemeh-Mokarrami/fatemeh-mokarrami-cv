/**
 * Fatemeh Mokarrami Portfolio - Interactive Vanilla JS
 * Ready for GitHub Pages Drag & Drop deployment
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  function openMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.remove('translate-x-full');
      mobileMenuOverlay?.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.add('translate-x-full');
      mobileMenuOverlay?.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  closeMobileMenuBtn?.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

  // 2. Toast Notification Helper
  window.showToast = function(message, duration = 3500) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'fixed bottom-6 left-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-gray-900 text-white shadow-2xl transition-all duration-300 font-fa text-sm';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[#90f4e9] text-[20px]">check_circle</span>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  // 3. Telegram Direct Ordering & Inquiry System
  const telegramModal = document.getElementById('telegramOrderModal');
  const closeTelegramModalBtn = document.getElementById('closeTelegramModalBtn');
  const cancelTelegramModalBtn = document.getElementById('cancelTelegramModalBtn');
  const telegramOrderForm = document.getElementById('telegramOrderForm');
  const targetProductInput = document.getElementById('orderProductName');
  const targetProductBadge = document.getElementById('orderProductBadge');

  window.openTelegramOrder = function(productName, productCategory = 'محصول / کتاب') {
    if (targetProductInput) {
      targetProductInput.value = productName;
    }
    if (targetProductBadge) {
      targetProductBadge.textContent = `${productCategory}: ${productName}`;
    }
    if (telegramModal) {
      telegramModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeTelegramModal() {
    if (telegramModal) {
      telegramModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  closeTelegramModalBtn?.addEventListener('click', closeTelegramModal);
  cancelTelegramModalBtn?.addEventListener('click', closeTelegramModal);
  telegramModal?.addEventListener('click', (e) => {
    if (e.target === telegramModal) closeTelegramModal();
  });

  telegramOrderForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('orderProductName')?.value || 'استعلام عمومی';
    const customerName = document.getElementById('customerName')?.value || '';
    const customerPhone = document.getElementById('customerPhone')?.value || '';
    const orderQuantity = document.getElementById('orderQuantity')?.value || '۱ عدد / درخواست همکاری';
    const customerNotes = document.getElementById('customerNotes')?.value || '';

    // Create formatted Persian message for Telegram
    const message = 
`سلام و احترام سرکار خانم مکررمی،
درخواست ثبت‌شده از طریق وب‌سایت شخصی:

📌 عنوان درخواست/محصول: ${productName}
👤 نام متقاضی: ${customerName}
📞 تماس / تلگرام: ${customerPhone}
📦 تعداد / نوع تقاضا: ${orderQuantity}
📝 یادداشت و توضیحات:
${customerNotes || 'توضیحات تکمیلی ندارد.'}

با تشکر`;

    const encodedMessage = encodeURIComponent(message);
    // You can set the target Telegram username or phone number (e.g., Fatemeh Mokarrami)
    const telegramUrl = `https://t.me/fatemeh_mokarrami?text=${encodedMessage}`;

    // Open Telegram in new window/tab
    window.open(telegramUrl, '_blank');
    closeTelegramModal();
    window.showToast('درخواست شما آماده و به تلگرام منتقل شد!');
  });

  // 4. Citation Copy Helper (BibTeX)
  window.copyCitation = function(bibtex, paperTitle) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bibtex).then(() => {
        window.showToast(`استناد مقاله «${paperTitle || ''}» در کلیپ‌بورد کپی شد.`);
      }).catch(() => {
        fallbackCopyTextToClipboard(bibtex, paperTitle);
      });
    } else {
      fallbackCopyTextToClipboard(bibtex, paperTitle);
    }
  };

  function fallbackCopyTextToClipboard(text, title) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      window.showToast(`استناد مقاله کپی شد.`);
    } catch (err) {
      window.showToast('امکان کپی خودکار فراهم نشد.');
    }
    document.body.removeChild(textArea);
  }

  // 5. Reference Dossier Modal (Academic Verification)
  const dossierModalBtn = document.getElementById('dossierModalBtn');
  const dossierModal = document.getElementById('dossierModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const dossierForm = document.getElementById('dossierForm');

  dossierModalBtn?.addEventListener('click', () => {
    if (dossierModal) {
      dossierModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  function closeDossierModal() {
    if (dossierModal) {
      dossierModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  closeModalBtn?.addEventListener('click', closeDossierModal);
  cancelModalBtn?.addEventListener('click', closeDossierModal);
  dossierModal?.addEventListener('click', (e) => {
    if (e.target === dossierModal) closeDossierModal();
  });

  dossierForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    closeDossierModal();
    window.showToast('درخواست پرونده تحصیلی ثبت شد. تاییدیه طی ۴۸ ساعت کاری ارسال می‌گردد.');
  });

  // 6. Interactive Research Search & Filters (Live Engine)
  const searchInput = document.getElementById('researchSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const domainBtns = document.querySelectorAll('.domain-filter-btn');
  const statusBtns = document.querySelectorAll('.status-filter-btn');
  const researchCards = document.querySelectorAll('.research-card');
  const countLabel = document.getElementById('activeCountLabel');
  const noResults = document.getElementById('noResultsState');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  if (researchCards.length > 0) {
    let currentDomain = 'all';
    let currentStatus = 'all';
    let searchQuery = '';

    function filterResearch() {
      let count = 0;
      researchCards.forEach(card => {
        const domain = card.getAttribute('data-domain') || '';
        const status = card.getAttribute('data-status') || '';
        const content = (card.innerText || '').toLowerCase();
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();

        const matchDomain = (currentDomain === 'all') || domain.includes(currentDomain);
        const matchStatus = (currentStatus === 'all') || status.includes(currentStatus);
        const matchSearch = (searchQuery.trim() === '') || content.includes(searchQuery.toLowerCase().trim()) || keywords.includes(searchQuery.toLowerCase().trim());

        if (matchDomain && matchStatus && matchSearch) {
          card.classList.remove('hidden');
          count++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (countLabel) {
        countLabel.textContent = `نمایش ${count} از ${researchCards.length} پروژه و پروتکل بالینی فعال`;
      }
      if (noResults) {
        if (count === 0) {
          noResults.classList.remove('hidden');
        } else {
          noResults.classList.add('hidden');
        }
      }
    }

    domainBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        domainBtns.forEach(b => {
          b.classList.remove('bg-secondary', 'text-white', 'shadow-sm');
          b.classList.add('bg-slate-100', 'text-slate-700');
        });
        btn.classList.remove('bg-slate-100', 'text-slate-700');
        btn.classList.add('bg-secondary', 'text-white', 'shadow-sm');
        currentDomain = btn.getAttribute('data-filter-domain') || 'all';
        filterResearch();
      });
    });

    statusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        statusBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white', 'shadow-sm');
          b.classList.add('bg-slate-100', 'text-slate-700');
        });
        btn.classList.remove('bg-slate-100', 'text-slate-700');
        btn.classList.add('bg-primary', 'text-white', 'shadow-sm');
        currentStatus = btn.getAttribute('data-filter-status') || 'all';
        filterResearch();
      });
    });

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchQuery.length > 0) {
        clearBtn?.classList.remove('hidden');
      } else {
        clearBtn?.classList.add('hidden');
      }
      filterResearch();
    });

    clearBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearBtn?.classList.add('hidden');
      searchInput?.focus();
      filterResearch();
    });

    resetFiltersBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearBtn?.classList.add('hidden');

      domainBtns.forEach((b, idx) => {
        if (idx === 0) {
          b.classList.add('bg-secondary', 'text-white', 'shadow-sm');
          b.classList.remove('bg-slate-100', 'text-slate-700');
        } else {
          b.classList.remove('bg-secondary', 'text-white', 'shadow-sm');
          b.classList.add('bg-slate-100', 'text-slate-700');
        }
      });
      currentDomain = 'all';

      statusBtns.forEach((b, idx) => {
        if (idx === 0) {
          b.classList.add('bg-primary', 'text-white', 'shadow-sm');
          b.classList.remove('bg-slate-100', 'text-slate-700');
        } else {
          b.classList.remove('bg-primary', 'text-white', 'shadow-sm');
          b.classList.add('bg-slate-100', 'text-slate-700');
        }
      });
      currentStatus = 'all';

      filterResearch();
    });
  }

  // 7. Interactive Clinical SOAP Demo tabs
  window.switchSoapTab = function(tabName) {
    const tabs = ['s', 'o', 'a', 'p'];
    tabs.forEach(t => {
      const el = document.getElementById(`soap-box-${t}`);
      const btn = document.getElementById(`soap-btn-${t}`);
      if (t === tabName || tabName === 'all') {
        el?.classList.remove('opacity-40', 'scale-[0.98]');
        btn?.classList.add('bg-primary', 'text-white');
      } else {
        el?.classList.add('opacity-40', 'scale-[0.98]');
        btn?.classList.remove('bg-primary', 'text-white');
      }
    });
  };

  // 8. Contact Form Handler (Direct message sending simulation with Telegram option)
  const contactForm = document.getElementById('academicContactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || '';
    const email = document.getElementById('contactEmail')?.value || '';
    const subject = document.getElementById('contactSubject')?.value || 'همکاری پژوهشی';
    const message = document.getElementById('contactMessage')?.value || '';

    // If user opts to send via Telegram:
    const sendViaTelegram = document.getElementById('sendViaTelegramCheckbox')?.checked;
    if (sendViaTelegram) {
      const tgMsg = encodeURIComponent(`پیام جدید از فرم تماس وب‌سایت:\nنام: ${name}\nایمیل: ${email}\nموضوع: ${subject}\nمتن پیام:\n${message}`);
      window.open(`https://t.me/fatemeh_mokarrami?text=${tgMsg}`, '_blank');
    }

    contactForm.reset();
    window.showToast('پیام شما با موفقیت ارسال شد و در اسرع وقت پاسخ داده خواهد شد.');
  });
});
