# Central de Controle do Site — Guia de Customização (LEIA-ME)

Bem-vindo! Este projeto foi estruturado com uma **Central de Controle** separada em dois arquivos simples, para que você possa alterar cores, fontes, contatos, preços e links da empresa sem precisar mexer em códigos complexos de HTML ou CSS.

---

## 📁 Arquivos da Central de Controle (`/assets/config/`)

| Arquivo | Para que serve |
|---|---|
| **`tokens.css`** | **Visual do site**: Paleta de cores, fontes, bordas e sombras. |
| **`site-config.js`** | **Informações e Links**: Preço, WhatsApp, CNPJ, links de pagamento e termos. |
| **`painel.html`** | **Painel Visual Interativo**: Teste cores ao vivo com prévia e copie o código pronto. |

---

## ⚠️ AVISO DE SEGURANÇA IMPORTANTE
> **O arquivo `site-config.js` é 100% PÚBLICO!**
> Ele é executado diretamente no navegador do visitante. **NUNCA** insira senhas, chaves de API secretas ou credenciais confidenciais nele.

---

## 🎨 1. Como Trocar a Cor Principal

Abra o arquivo [`assets/config/tokens.css`](file:///c:/Users/Maca%2004/Desktop/NYLO%20TESTES/Pessoal/Site/Winden%20-%20Lading%20page/assets/config/tokens.css):

Localize a linha:
```css
--brand-primary: #e5a163;
```
Troque o código hexadecimal pela cor da sua marca (ex: `#22c55e` para verde, `#3b82f6` para azul, `#8b5cf6` para roxo).

### O que acontece quando você muda `--brand-primary`:
1. **Botões principais**: Atualizam a tonalidade do gradiente e do brilho.
2. **Ícones e detalhes**: Os traços de destaque do logo e das ilustrações assumem a nova cor.
3. **Efeito visual fluido de fundo (Shader WebGL)**: O efeito animado no topo da página e na oferta lê dinamicamente essa variável e muda de cor automaticamente!

---

## 🔤 2. Como Trocar a Fonte do Site

1. Acesse o [Google Fonts](https://fonts.google.com/) e escolha a fonte desejada (exemplo: **Plus Jakarta Sans** ou **Inter**).
2. Selecione os pesos desejados (400, 500, 600, 700) e copie a tag `<link>` gerada.
3. Abra o arquivo [`index.html`](file:///c:/Users/Maca%2004/Desktop/NYLO%20TESTES/Pessoal/Site/Winden%20-%20Lading%20page/index.html) e cole a tag dentro de `<head>`.
4. Abra o [`assets/config/tokens.css`](file:///c:/Users/Maca%2004/Desktop/NYLO%20TESTES/Pessoal/Site/Winden%20-%20Lading%20page/assets/config/tokens.css) e atualize as variáveis:
   ```css
   --font-heading: 'Plus Jakarta Sans', sans-serif;
   --font-body: 'Plus Jakarta Sans', sans-serif;
   ```

---

## 💼 3. Como Trocar Preço, WhatsApp, CNPJ e Link de Pagamento

Abra o arquivo [`assets/config/site-config.js`](file:///c:/Users/Maca%2004/Desktop/NYLO%20TESTES/Pessoal/Site/Winden%20-%20Lading%20page/assets/config/site-config.js):

### A. Preço da Consultoria
```javascript
offer: {
  price: "R$97",         // Preço promocional (atualiza a página e o popup)
  oldPrice: "R$497",     // Preço riscado
  discountLabel: "80% OFF" // Selo de desconto
}
```

### B. WhatsApp de Atendimento
```javascript
contact: {
  whatsappDigits: "5511999999999", // Apenas números: 55 + DDD + Telefone
  email: "contato@suaempresa.com.br"
}
```

### C. Razão Social e CNPJ
```javascript
brand: {
  name: "Aprov",
  legalName: "Sua Empresa Soluções Ltda",
  cnpj: "12.345.678/0001-90"
}
```

### D. Link de Pagamento (Checkout)
```javascript
links: {
  checkout: "https://pay.kiwify.com.br/seulink", // Seu link na Hotmart, Kiwify, Eduzz, etc.
  leadWebhook: "" // Opcional: webhook para salvar o lead antes do pagamento
}
```

---

## 🚫 4. O Que NÃO Editar

- **Não altere os títulos e textos das seções diretamente no JavaScript**: Eles são mantidos diretamente no arquivo `index.html` para garantir indexação rápida nos motores de busca (Google / SEO) e evitar que o texto "pisque" ao carregar.
- **Não apague os arquivos originais**: As imagens originais ficam seguras na pasta `assets/images/`.

---

## 💻 5. Usando o Painel de Controle Visual (`painel.html`)

Para testar cores visualmente sem editar código na mão:
1. Com o servidor local ativo, acerte o endereço:
   `http://127.0.0.1:3000/assets/config/painel.html`
2. Você verá seletores visuais de cores à esquerda e o site carregando em tempo real à direita.
3. Escolha as cores desejadas e clique em **"Copiar tokens.css"**.
4. Cole o código copiado dentro de `assets/config/tokens.css` e salve.

---

## 📋 6. Checklist Antes de Publicar o Site

Abra o site no navegador, abra o console de desenvolvedor (**tecla F12**):
- [ ] O console exibe algum aviso `[config-binder]` em amarelo? Se sim, confira se não esqueceu nenhum placeholder como `{CNPJ}` ou `{CHECKOUT_URL}`.
- [ ] Teste o clique nos botões "Agendar consultoria" e "Garantir Consultoria": o modal de compra abre normalmente?
- [ ] Teste o envio do formulário: ele redireciona para a URL de pagamento correta?
- [ ] Verifique no celular (ou redimensione a tela) se o menu e o botão estão perfeitamente ajustados.
- [ ] Limpe o cache do navegador com **Ctrl + F5** para garantir que está vendo a versão mais recente.
