/**
 * APROV / WINDEN - DASHBOARD CONTROLLER (dashboard.js)
 * Gerenciamento de Estado, Integração de Crédito, Birôs e Interatividade
 */

const APROV_KEYS = {
  WALLET: 'aprov_wallet_data',
  CRM: 'aprov_crm_leads',
  PROPOSALS: 'aprov_proposals_list',
  DIAGNOSTICS: 'aprov_diagnostics_list',
  PROFILE: 'aprov_user_profile'
};

const AprovStorage = {
  getWallet() {
    const raw = localStorage.getItem(APROV_KEYS.WALLET);
    if (!raw) {
      const initial = {
        saldoDisponivel: 14850.00,
        volumeMes: 1840000.00,
        comissoesMes: 26400.00,
        taxaAprovacao: '84.6%',
        extrato: [
          { id: 'TX-9481', data: 'Hoje, 11:30', tipo: 'entrada', desc: 'Comissão 40% - Diagnóstico + Rating PJ', valor: 880.00, status: 'Creditado' },
          { id: 'TX-9480', data: 'Ontem, 16:15', tipo: 'entrada', desc: 'Comissão Capital de Giro FGI Peac', valor: 3600.00, status: 'Creditado' },
          { id: 'TX-9472', data: '21/09/2026', tipo: 'saida', desc: 'Saque PIX para Conta PJ Inter', valor: 5000.00, status: 'PIX Concluído' },
          { id: 'TX-9465', data: '18/09/2026', tipo: 'entrada', desc: 'Comissão Home Equity R$ 600k', valor: 6000.00, status: 'Creditado' }
        ]
      };
      this.saveWallet(initial);
      return initial;
    }
    return JSON.parse(raw);
  },

  saveWallet(data) {
    localStorage.setItem(APROV_KEYS.WALLET, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('aprovWalletUpdated', { detail: data }));
  },

  requestWithdraw(amount, pixKey) {
    const wallet = this.getWallet();
    if (wallet.saldoDisponivel < amount) {
      return { success: false, message: 'Saldo insuficiente para realizar este saque.' };
    }
    wallet.saldoDisponivel -= amount;
    wallet.extrato.unshift({
      id: 'TX-' + Math.floor(Math.random() * 9000 + 1000),
      data: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      tipo: 'saida',
      desc: 'Saque PIX (' + pixKey + ')',
      valor: amount,
      status: 'PIX Concluído'
    });
    this.saveWallet(wallet);
    return { success: true, saldoRestante: wallet.saldoDisponivel };
  },

  getDiagnostics() {
    const raw = localStorage.getItem(APROV_KEYS.DIAGNOSTICS);
    if (!raw) {
      const initial = [
        { protocolo: 'DG-7821', empresa: 'Logística Transval Ltda', cnpj: '34.892.128/0001-40', score: 780, rating: 'Rating A', restricoes: 'Nada Consta', data: '23/09/2026', status: 'Laudo Pronto' },
        { protocolo: 'DG-7820', empresa: 'Metalúrgica Aliança S/A', cnpj: '18.442.901/0001-22', score: 540, rating: 'Rating B', restricoes: '1 Cheque s/ Fundo', data: '22/09/2026', status: 'Em Análise' },
        { protocolo: 'DG-7815', empresa: 'Comércio de Alimentos Silva', cnpj: '08.231.879/0001-09', score: 320, rating: 'Rating D', restricoes: '3 Apontamentos SCR', data: '21/09/2026', status: 'Reabilitando' }
      ];
      this.saveDiagnostics(initial);
      return initial;
    }
    return JSON.parse(raw);
  },

  saveDiagnostics(list) {
    localStorage.setItem(APROV_KEYS.DIAGNOSTICS, JSON.stringify(list));
  },

  addDiagnostic(diag) {
    const list = this.getDiagnostics();
    list.unshift(diag);
    this.saveDiagnostics(list);
    return diag;
  }
};

const AprovApp = {
  valuesHidden: false,

  init() {
    this.syncWalletUI();
    this.bindEvents();
  },

  bindEvents() {
    window.addEventListener('aprovWalletUpdated', () => this.syncWalletUI());
  },

  formatCurrency(val) {
    return 'R$ ' + Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  toggleHideValues() {
    this.valuesHidden = !this.valuesHidden;
    const elements = document.querySelectorAll('.financial-val, .topbar-wallet-val');
    elements.forEach(el => {
      if (this.valuesHidden) {
        if (!el.dataset.realVal) el.dataset.realVal = el.innerText;
        el.innerText = 'R$ •••,••';
      } else {
        if (el.dataset.realVal) el.innerText = el.dataset.realVal;
      }
    });
    this.showToast(this.valuesHidden ? 'Valores financeiros ocultados' : 'Valores visíveis', 'info');
  },

  toggleNotifications() {
    const pop = document.getElementById('notifications-popover');
    if (pop) {
      pop.style.display = pop.style.display === 'none' || !pop.style.display ? 'block' : 'none';
    }
  },

  clearNotifications() {
    const pop = document.getElementById('notifications-popover');
    if (pop) pop.style.display = 'none';
    const badge = document.querySelector('.notification-badge');
    if (badge) badge.style.display = 'none';
    this.showToast('Todas as notificações foram marcadas como lidas.', 'info');
  },

  openWithdrawModal() {
    const modal = document.getElementById('modal-saque-pix');
    if (modal) {
      const wallet = AprovStorage.getWallet();
      const balEl = document.getElementById('modal-balance-display');
      if (balEl) balEl.innerText = this.formatCurrency(wallet.saldoDisponivel);
      modal.style.display = 'flex';
    }
  },

  closeWithdrawModal() {
    const modal = document.getElementById('modal-saque-pix');
    if (modal) modal.style.display = 'none';
  },

  confirmWithdraw(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('saque-amount').value);
    const pix = document.getElementById('saque-pix-key').value.trim();

    if (isNaN(amount) || amount <= 0) {
      this.showToast('Insira um valor válido para o saque.', 'warning');
      return;
    }

    const res = AprovStorage.requestWithdraw(amount, pix);
    if (!res.success) {
      this.showToast(res.message, 'error');
      return;
    }

    this.closeWithdrawModal();
    this.showToast('Saque PIX de ' + this.formatCurrency(amount) + ' transferido com sucesso!', 'success');
  },

  openDiagnosticModal() {
    const modal = document.getElementById('modal-novo-diagnostico');
    if (modal) modal.style.display = 'flex';
  },

  closeDiagnosticModal() {
    const modal = document.getElementById('modal-novo-diagnostico');
    if (modal) modal.style.display = 'none';
  },

  confirmDiagnostic(e) {
    e.preventDefault();
    const empresa = document.getElementById('diag-empresa').value.trim();
    const cnpj = document.getElementById('diag-cnpj').value.trim();
    const proto = 'DG-' + Math.floor(Math.random() * 9000 + 1000);

    AprovStorage.addDiagnostic({
      protocolo: proto,
      empresa: empresa,
      cnpj: cnpj,
      score: 720,
      rating: 'Rating A',
      restricoes: 'Em Análise nos Birôs',
      data: 'Hoje',
      status: 'Processando'
    });

    this.closeDiagnosticModal();
    this.showToast('Diagnóstico ' + proto + ' iniciado com sucesso! Consultando birôs...', 'success');
    
    // Atualiza tabela se existir na tela
    const tbody = document.getElementById('diagnosticos-table-body');
    if (tbody) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td><strong style="color:var(--brand-highlight);">' + proto + '</strong></td>' +
        '<td><strong>' + empresa + '</strong><br><span style="font-size:0.75rem; color:rgba(255,255,255,0.4);">' + cnpj + '</span></td>' +
        '<td><span class="status-pill brand">Rating A (720)</span></td>' +
        '<td><span class="status-pill warning">Em Processamento</span></td>' +
        '<td>Hoje</td>' +
        '<td><button class="btn-outline" style="height:32px; padding:0 10px; font-size:0.75rem;" onclick="AprovApp.showToast(\\'Gerando laudo pericial em PDF...\\', \\'info\\')">Ver Laudo</button></td>';
      tbody.prepend(tr);
    }
  },

  syncWalletUI() {
    const wallet = AprovStorage.getWallet();
    const formatted = this.formatCurrency(wallet.saldoDisponivel);

    const topbarVal = document.querySelector('.topbar-wallet-val');
    if (topbarVal) {
      topbarVal.innerText = formatted;
      topbarVal.dataset.realVal = formatted;
    }

    const cardBalance = document.getElementById('dash-saldo-disponivel');
    if (cardBalance) {
      cardBalance.innerText = formatted;
      cardBalance.dataset.realVal = formatted;
    }
  },

  toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar-shell');
    if (sidebar) {
      sidebar.classList.toggle('mobile-open');
    }
  },

  showToast(message, type = 'info') {
    let container = document.getElementById('aprov-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'aprov-toast-container';
      container.style.cssText = 'position:fixed; bottom:24px; right:24px; z-index:99999; display:flex; flex-direction:column; gap:10px; pointer-events:none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const border = type === 'success' ? '#10b981' : (type === 'warning' ? '#f59e0b' : (type === 'error' ? '#ef4444' : 'var(--brand-highlight)'));
    const bg = '#0b0f17';

    toast.style.cssText = 'background:' + bg + '; border:1px solid ' + border + '; color:#fff; font-family:var(--font-heading); font-size:0.85rem; font-weight:700; padding:14px 22px; border-radius:14px; box-shadow:0 12px 36px rgba(0,0,0,0.7), 0 0 16px ' + border + '40; pointer-events:auto; transition:all 0.3s cubic-bezier(0.16,1,0.3,1); opacity:0; transform:translateY(12px);';
    toast.innerText = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AprovApp.init();
});
