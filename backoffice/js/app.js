/* ============================================================
   APROV BLACK — BACKOFFICE SHARED JS
   ============================================================ */

const Aprov = (() => {

  /* ── BALANCE ── */
  let balance = parseFloat(localStorage.getItem('aprov_balance') || '0');

  function formatBRL(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function getBalance() { return balance; }

  function saveBalance(v) {
    balance = v;
    localStorage.setItem('aprov_balance', v.toString());
    document.querySelectorAll('[data-balance]').forEach(el => {
      el.textContent = formatBRL(v);
    });
  }

  function addBalance(v) { saveBalance(balance + v); }
  function deductBalance(v) { saveBalance(balance - v); }

  /* ── AUTH ── */
  function initAuth() {
    const raw = localStorage.getItem('aprov_user_auth');
    if (!raw) { window.location.href = '/login'; return null; }
    try {
      const user = JSON.parse(raw);
      const name = user.name || user.email?.split('@')[0].replace(/\./g,' ').toUpperCase() || 'USUÁRIO';
      const initials = name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
      const el = document.getElementById('userName');
      const av = document.getElementById('userAvatar');
      if (el) el.textContent = name;
      if (av) av.textContent = initials;
      return user;
    } catch(e) { return null; }
  }

  function logout() {
    if (confirm('Deseja sair da sua conta Aprov Black?')) {
      localStorage.removeItem('aprov_user_auth');
      window.location.href = '/login';
    }
  }

  /* ── TOAST ── */
  function toast(msg, duration = 3000) {
    let el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => el.classList.remove('show'), duration);
  }

  /* ── SIDEBAR MOBILE ── */
  function toggleSidebar() {
    const s = document.getElementById('sidebar');
    const o = document.getElementById('sidebarOverlay');
    if (!s) return;
    s.classList.toggle('open');
    if (o) o.style.display = s.classList.contains('open') ? 'block' : 'none';
  }

  function closeSidebar() {
    const s = document.getElementById('sidebar');
    const o = document.getElementById('sidebarOverlay');
    if (s) s.classList.remove('open');
    if (o) o.style.display = 'none';
  }

  /* ── MODAL HELPERS ── */
  function openModal(id)  { document.getElementById(id)?.classList.add('active'); }
  function closeModal(id) { document.getElementById(id)?.classList.remove('active'); }

  /* ── CNPJ MASK ── */
  function cnpjMask(input) {
    input.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'').slice(0,14);
      v = v.replace(/^(\d{2})(\d)/,'$1.$2')
           .replace(/^(\d{2})\.(\d{3})(\d)/,'$1.$2.$3')
           .replace(/\.(\d{3})(\d)/,'.$1/$2')
           .replace(/(\d{4})(\d)/,'$1-$2');
      this.value = v;
    });
  }

  /* ── CPF MASK ── */
  function cpfMask(input) {
    input.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'').slice(0,11);
      v = v.replace(/(\d{3})(\d)/,'$1.$2')
           .replace(/(\d{3})\.(\d{3})(\d)/,'$1.$2.$3')
           .replace(/\.(\d{3})(\d)/,'.$1-$2');
      this.value = v;
    });
  }

  /* ── PHONE MASK ── */
  function phoneMask(input) {
    input.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'').slice(0,11);
      if (v.length <= 10) {
        v = v.replace(/^(\d{2})(\d{4})(\d)/,'($1) $2-$3');
      } else {
        v = v.replace(/^(\d{2})(\d{5})(\d)/,'($1) $2-$3');
      }
      this.value = v;
    });
  }

  /* ── CURRENCY MASK ── */
  function currencyMask(input) {
    input.addEventListener('input', function() {
      let v = this.value.replace(/\D/g,'');
      v = (parseInt(v) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      this.value = v;
    });
  }

  /* ── INIT ── */
  function init() {
    initAuth();
    saveBalance(balance); // sync UI

    // Logout on profile click
    document.getElementById('userProfileBtn')?.addEventListener('click', logout);

    // Mobile sidebar
    document.getElementById('mobileMenuBtn')?.addEventListener('click', toggleSidebar);
    document.getElementById('sidebarOverlay')?.addEventListener('click', closeSidebar);
  }

  return {
    formatBRL, getBalance, saveBalance, addBalance, deductBalance,
    initAuth, logout, toast,
    toggleSidebar, closeSidebar,
    openModal, closeModal,
    cnpjMask, cpfMask, phoneMask, currencyMask,
    init
  };

})();

document.addEventListener('DOMContentLoaded', () => Aprov.init());
