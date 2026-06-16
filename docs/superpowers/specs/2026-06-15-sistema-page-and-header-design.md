# Página `/sistema` + Header global — Design

**Data:** 2026-06-15
**Branch:** feat/crm-preview-section

## Contexto

O site (`lp1`) posiciona a oferta como **um sistema único — "Grovva Sales"** — com 3 pilares:
Geração de Demanda (growth/tráfego), Força de Vendas (CRM + IA) e Inteligência de
Crescimento (dashboard). O preview interativo do CRM hoje vive como uma **seção da home**
(`<ToolPreview/>` entre o hero e a Solution).

**Modelo de negócio (confirmado com o cliente):** híbrido — a oferta-mãe é
sistema + marketing juntos, mas o cliente pode contratar cada parte separadamente.

## Decisão de arquitetura

**Um site só, com "duas portas" de aprofundamento** (Sistema e Growth), em vez de um
produto/site separado de verdade. Justificativa: preservar a história de oferta única
que o site já conta bem, evitar duplicação de marca/manutenção, e ainda assim dar uma
página dedicada para quem quer entender (ou contratar) só o sistema.

Nesta entrega construímos **apenas a porta do Sistema**. A porta de Growth já está
representada pela home; um `/growth` dedicado pode vir depois se necessário.

### Rotas
- `/` — home (história combinada). **Remove** o `<ToolPreview/>` e ganha um **teaser**
  curto linkando para `/sistema`.
- `/sistema` — **nova página**: aprofundamento do sistema + preview interativo central.
- Header global novo, presente nas duas páginas (via `layout.tsx`).

## Header (`src/components/layout/Header.tsx`)

- Sticky, tema escuro translúcido (casa com o hero `bg-grovva-dark`), com blur ao rolar.
- Conteúdo: logo (→ `/`) · **O Sistema** (`/sistema`) · **Growth** (âncora para a seção
  da home) · **Cases** (âncora) · botão **"Quero mais informações"** (`data-contact-cta`
  — reusa o modal de contato existente).
- Mobile: menu compacto (drawer/disclosure) com os mesmos links + CTA.
- Como o header passa a ter o logo, o **logo central redundante do `HeroV2` é removido**.

## Página `/sistema` — seções

1. **Hero do sistema** — headline "Um sistema de vendas feito sob medida pra sua
   operação" + subhead + preview interativo (`<PreviewApp/>` dentro do chrome de
   browser) em destaque logo abaixo.
2. **Único por cliente** — nada de template genérico; cada operação tem o seu (campos,
   etapas, telas, regras).
3. **Cresce com você** — modular: adiciona funcionalidades conforme a necessidade.
4. **Automações com IA de encaixe** — IA que se encaixa na operação: follow-up,
   agendamento, recuperação de lead, cobrança, qualificação.
5. **Diferenciais do sistema** — *a preencher depois de ler `../crm-template-estetica`*
   (recursos realmente interessantes/diferentes além da personalização).
6. **CTA final** — faixa de conversão (`data-contact-cta`).

Reuso: `ToolPreview` é refatorado — a "casca de seção" da landing vira o hero da nova
página; o miolo (`PreviewApp`, chrome de browser) é preservado.

## Sequência de trabalho (3 checkpoints)

1. **Estrutura** (esta entrega): header global + `/sistema` com seções 1–4 e 6 +
   preview movido + teaser na home. Revisão do cliente.
2. **Conteúdo**: ler `../crm-template-estetica` e preencher a seção 5 (diferenciais reais).
3. **Layout do preview**: atualizar o layout do preview ("mudamos bastante").

## Style / convenções

- Reusa tokens do tema (`grovva-green`, `grovva-dark`, `grovva-ink`, `font-heading`,
  classes `.btn-primary`, `.eyebrow`, `.em-serif`), componente `Reveal`, e o padrão
  `data-contact-cta` para abrir o modal.
- O **interior do preview** continua fiel ao CRM real (não segue o design system da
  landing) — isolado via constantes de cor próprias, como já é hoje.

## Fora de escopo (YAGNI)

- Subdomínio / identidade visual separada para o produto.
- Página `/growth` dedicada (a home cobre por enquanto).
- Pricing / checkout self-serve.
