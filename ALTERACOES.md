# Plano de Alterações — Hero Section (Landing Page AprovBLack)

> **Data:** 25/09/2026  
> **Solicitante:** Tiago Villas  
> **Arquivo alvo:** `index.html`  
> **Seção afetada:** `<section class="sec sec-hero">` (linhas ~387–880)

---

## Alteração 01 — Reestruturação dos textos do Hero

### Contexto (mensagens do Tiago)
- A headline e o subtítulo do hero devem ser reescritos para um novo posicionamento de copy.
- O parágrafo explicativo sobre a consultoria deve ser substituído por uma frase menor que direciona ao vídeo (VSL) logo abaixo.
- Os botões "Agendar consultoria" e "Como funciona" são **removidos** da posição atual (antes do video player).

### Estado Atual (Linha 409)

| Elemento | Conteúdo atual |
|---|---|
| `<h1 class="top-title">` | **Crédito negado** |
| `<h1 class="bottom-title">` | **tem explicação** |
| `<p class="hero-paragraph">` | Consultoria com especialista que lê o SCR e o Rating Bancário do seu CNPJ e mostra o que trava o crédito da sua empresa. |
| Botão primário | "Agendar consultoria" → abre checkout |
| Botão secundário | "Como funciona" → ancora em `#como-funciona` |

### Novo Conteúdo

| Elemento | Novo conteúdo |
|---|---|
| `<h1>` (frase principal, uma única tag) | **O banco tem recurso disponível. A questão é: sua empresa está preparada para acessá-lo?** |
| `<p>` (letras menores, abaixo do h1) | Se sua empresa precisa de crédito, mas está encontrando dificuldades para acessá-lo, assista ao vídeo abaixo. |
| Botões "Agendar consultoria" e "Como funciona" | **Removidos** (a CTA agora é o próprio VSL/video player imediatamente abaixo) |

### Ações Técnicas

1. **Substituir** o bloco `<div class="hero-title">` (que contém dois `<h1>`) por um único `<h1>` com a nova frase principal.
2. **Substituir** o conteúdo de `<p class="hero-paragraph">` pela frase menor que direciona ao vídeo.
3. **Remover** o bloco `<div class="hero-cta">` inteiro (linhas 409–413), que contém os botões "Agendar consultoria" e "Como funciona".
4. O **video player** (`<div class="hero-action hero-showcase-container">`, linhas 419–880) permanece inalterado na posição logo abaixo do novo subtítulo.

### Referência Visual (fluxo desejado)

```
┌─────────────────────────────────────────────┐
│  [HERO BACKGROUND]                          │
│                                             │
│  O banco tem recurso disponível.            │
│  A questão é: sua empresa está              │
│  preparada para acessá-lo?                  │
│                                             │
│  (letras menores)                           │
│  Se sua empresa precisa de crédito, mas     │
│  está encontrando dificuldades para         │
│  acessá-lo, assista ao vídeo abaixo.        │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │       ▶ VIDEO PLAYER (VSL)          │    │
│  │   (Clique para assistir ao vídeo)   │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ✓ Reunião individual de 30 min...          │
│  ✓ Sigilo garantido pela LGPD              │
│  ✓ Sem promessas milagrosas                │
└─────────────────────────────────────────────┘
```

---

## Alteração 02 — Trust Triggers (tempo da reunião)

### Estado Atual (Linha 415)

```
✓ Reunião individual de 60min via Google Meet
✓ Sigilo garantido pela LGPD
✓ Sem promessas milagrosas
```

### Novo Conteúdo

```
✓ Reunião individual de 30 minutos com especialista*
✓ Sigilo garantido pela LGPD
✓ Sem promessas milagrosas
```

### Ação Técnica

- Na linha 415, substituir o texto `Reunião individual de 60min via Google Meet` por `Reunião individual de 30 minutos com especialista*`.

---

## Alteração 03 — Card "Diagnóstico completo do seu CNPJ" (subtítulo)

### Estado Atual (Linha 1365)

| Elemento | Conteúdo atual |
|---|---|
| `<h3 class="card-title">` | Diagnóstico completo do seu CNPJ |
| `<p class="text-balance">` | SCR, rating e restrições em um só relatório, com os dados reais da sua empresa. |

### Novo Conteúdo

| Elemento | Novo conteúdo |
|---|---|
| `<h3 class="card-title">` | Diagnóstico completo do seu CNPJ *(mantém)* |
| `<p class="text-balance">` | **SCR, Rating, histórico financeiro completo da sua empresa e como o banco avalia.** |

### Ação Técnica

- Na linha 1365, substituir o texto do `<p>`:
  - **De:** `SCR, rating e restrições em um só relatório, com os dados reais da sua empresa.`
  - **Para:** `SCR, Rating, histórico financeiro completo da sua empresa e como o banco avalia.`

---

## Alteração 04 — Card "Radar de Crédito" → "Para quem é nossa consultoria?"

### Estado Atual (Linha 1675)

| Elemento | Conteúdo atual |
|---|---|
| `<h3 class="card-title row-title">` | **Radar de Crédito** |
| `<p class="text-balance">` | Acompanhamos seu SCR e seu rating e avisamos quando algo muda ou surge uma nova linha elegível. Monitoramento contínuo, sem planilha. |

### Novo Conteúdo

O card inteiro deve ser substituído por uma seção de qualificação com checklist:

| Elemento | Novo conteúdo |
|---|---|
| `<h3>` | **Para quem é nossa consultoria?** |
| Lista | ✓ Possuem CNPJ ativo há mais de 12 meses |
| | ✓ Faturam a partir de R$ 30 mil por mês |
| | ✓ Possuem ponto físico ou operação empresarial estabelecida |
| | ✓ Buscam ampliar seu acesso a crédito nos bancos |

### Ações Técnicas

1. **Substituir** título `Radar de Crédito` por `Para quem é nossa consultoria?`
2. **Substituir** o `<p class="text-balance">` por uma lista de checklist (`<ul>` com 4 `<li>` ou divs com ícone ✓)
3. A **ilustração lateral** (gráfico SVG com "Banco A / Parcela atrasada") pode ser mantida ou removida conforme decisão visual.

---

## Alteração 05 — Seção "ACOMPANHAMENTO" → Seção de Números/Estatísticas

### Estado Atual (Linhas 2577–2608)

A seção contém:
- Badge: `ACOMPANHAMENTO`
- Título: `Você não decide sozinho / o próximo passo do seu crédito`
- 3 feature cards:
  - **Suporte por WhatsApp e E-mail** — "Tire dúvidas sobre sua análise..."
  - **Materiais de Apoio Inclusos** — "Checklists e modelos para organizar..."
  - **Especialista Dedicado** — "Um profissional do time acompanha o seu caso."

### Novo Conteúdo

**Remover toda a seção atual** e substituir por uma seção de números animados (contagem crescente):

| Métrica | Valor |
|---|---|
| Taxa de aprovação | **97%** |
| Instituições na rede de relacionamento | **+40** |
| Anos de experiência do time administrativo | **+7** |

### Layout sugerido

```
┌───────────────────────────────────────────────────────┐
│                                                       │
│         97%              +40             +7           │
│   de aprovação     instituições      anos de          │
│                   em nossa rede    experiência do      │
│                  de relacionamento  nosso time         │
│                                   administrativo      │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### Ações Técnicas

1. **Remover** todo o bloco `<section class="sec">` que contém a badge "ACOMPANHAMENTO", o título, e os 3 feat-cards (linhas 2577–2608).
2. **Inserir no lugar** uma nova `<section>` com 3 colunas de números usando animação de contagem (counter-up) no estilo do design system amber/obsidian.
3. Os números devem crescer de 0 até o valor final ao entrar na viewport (efeito `countUp` com `IntersectionObserver`).

---

## Resumo das Alterações

| # | O que muda | Onde (linha) | Tipo | Status |
|---|---|---|---|---|
| 01a | Headline do hero: nova frase principal | Hero | Substituição de texto | ✅ Concluído |
| 01b | Subtítulo do hero: nova frase menor | Hero | Substituição de texto | ✅ Concluído |
| 01c | Remoção dos botões CTA (Agendar / Como funciona) | Hero | Remoção de HTML | ✅ Concluído |
| 02 | Trust trigger: 60min → 30 minutos com especialista* | Abaixo do vídeo | Atualização e reposicionamento | ✅ Concluído |
| 03 | Card "Diagnóstico CNPJ": novo subtítulo | Card CNPJ | Substituição de texto | ✅ Concluído |
| 04 | Card "Radar de Crédito" → "Para quem é nossa consultoria?" | Card Qualificação | Substituição por checklist | ✅ Concluído |
| 05 | Seção "ACOMPANHAMENTO" → Seção de números animados | Seção Estatísticas | Contadores animados (97%, +40, +7) | ✅ Concluído |

---

## Observações

- O navbar mantém o botão "Agendar consultoria" (linha 387) — **preservado**.
- O video player e lightbox (VSL) **preservados e funcionais**.
- Os botões de oferta na seção `#pricing` e dados da Cakto **preservados e atualizados**.
- O card "Mapa de Linhas de Crédito" **preservado**.
- O card "Baseado no SCR do Banco Central" **preservado**.
- Todas as alterações executadas com sucesso. Pronto para commit, push e deploy.

