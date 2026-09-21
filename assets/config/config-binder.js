/**
 * ==========================================================================
 * VINCULADOR DE CONFIGURAÇÃO DINÂMICA (config-binder.js)
 * Aplica os valores de window.SITE_CONFIG aos elementos via data-attributes.
 * ==========================================================================
 */
(function() {
  function getNestedValue(obj, path) {
    if (!obj || !path) return undefined;
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
      if (current === null || current === undefined) return undefined;
      current = current[keys[i]];
    }
    return current;
  }

  function applyConfig() {
    const config = window.SITE_CONFIG;
    if (!config) {
      console.warn('[config-binder] window.SITE_CONFIG não encontrado.');
      return;
    }

    const currentYear = new Date().getFullYear().toString();

    // 1. Textos: [data-cfg]
    document.querySelectorAll('[data-cfg]').forEach(function(el) {
      const path = el.getAttribute('data-cfg');
      const val = getNestedValue(config, path);
      if (val === undefined) {
        console.warn('[config-binder] Chave inexistente para data-cfg="' + path + '"', el);
        return;
      }
      let finalVal = String(val).replace(/\{ANO\}/g, currentYear);
      el.textContent = finalVal;

      if (/\{[A-Z0-9_]+\}/.test(finalVal)) {
        console.warn('[config-binder] Placeholder não preenchido em data-cfg="' + path + '":', finalVal);
      }
    });

    // 2. Links href: [data-cfg-href]
    document.querySelectorAll('[data-cfg-href]').forEach(function(el) {
      const path = el.getAttribute('data-cfg-href');
      const val = getNestedValue(config, path);
      if (val === undefined) {
        console.warn('[config-binder] Chave inexistente para data-cfg-href="' + path + '"', el);
        return;
      }
      el.setAttribute('href', val);

      if (/\{[A-Z0-9_]+\}/.test(val)) {
        console.warn('[config-binder] Placeholder não preenchido em data-cfg-href="' + path + '":', val);
      }
    });

    // 3. Links de WhatsApp: [data-cfg-whatsapp]
    document.querySelectorAll('[data-cfg-whatsapp]').forEach(function(el) {
      const path = el.getAttribute('data-cfg-whatsapp') || 'contact.whatsappDigits';
      const val = getNestedValue(config, path);
      if (val) {
        const cleanDigits = String(val).replace(/\D/g, '');
        if (cleanDigits && cleanDigits.length >= 10) {
          el.setAttribute('href', 'https://wa.me/' + cleanDigits);
        } else {
          el.setAttribute('href', 'https://wa.me/' + val);
          console.warn('[config-binder] Número de WhatsApp contém placeholders ou dígitos incompletos:', val);
        }
      }
    });

    // 4. Links de E-mail: [data-cfg-mailto]
    document.querySelectorAll('[data-cfg-mailto]').forEach(function(el) {
      const path = el.getAttribute('data-cfg-mailto') || 'contact.email';
      const val = getNestedValue(config, path);
      if (val) {
        el.setAttribute('href', 'mailto:' + val);
        if (/\{[A-Z0-9_]+\}/.test(val)) {
          console.warn('[config-binder] E-mail contém placeholder não preenchido:', val);
        }
      }
    });
  }

  // Exportar para permitir atualização dinâmica
  window.applySiteConfig = applyConfig;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyConfig);
  } else {
    applyConfig();
  }
})();
