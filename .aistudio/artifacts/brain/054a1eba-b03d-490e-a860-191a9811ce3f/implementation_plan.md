# TributaBR - Simulador e Analisador da Reforma Tributária (IBS, CBS e IS)

Plataforma analítica e comparativa desenvolvida para simular em tempo real o impacto tributário, financeiro e operacional da Emenda Constitucional nº 132/2023 e seus Projetos de Lei Complementar (PLP 68/2024 e PLP 108/2024), confrontando o sistema tributário atual com o novo modelo de IVA Dual brasileiro.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões confirmadas com o usuário:**
> - **Foco da Análise**: Comparativo completo e aprofundado do regime atual (PIS/COFINS, ICMS, ISS, IPI) versus novo regime (IBS, CBS e Imposto Seletivo).
> - **Perfil Prioritário**: Empresas de Comércio, Serviços e Indústria em geral, permitindo modelar tanto operações com créditos plenos quanto regimes diferenciados e alíquotas reduzidas.
> - **Escopo de IA**: Sem assistente de chat ou IA generativa; foco 100% em cálculos tributários precisos, matrizes de DRE comparativas, gráficos interativos e projeção do cronograma de transição 2026–2033.

---

## 1. Overview & Core Concept

### O Que a Aplicação Faz
A **TributaBR** é uma suíte analítica financeira e tributária corporativa. O usuário insere os dados da empresa (faturamento, despesas operacionais, compras de insumos, energia/bens de capital, folha de pagamento, regime atual e segmento) e a plataforma gera:
1. **DRE Comparativa Automatizada**: Carga tributária atual vs. nova carga tributária estimada (com apropriação ampla de créditos do IVA Dual).
2. **Impacto no Preço de Venda e Margem**: Demonstração de cálculo "por fora" (base limpa) contra o cálculo "por dentro" do sistema legado.
3. **Cronograma Evolutivo 2026–2033**: Simulação ano a ano da transição (fase de teste 2026 com 0,9% CBS e 0,1% IBS; extinção de PIS/Cofins em 2027; redução progressiva do ICMS/ISS de 2029 a 2032 e consolidação definitiva em 2033).
4. **Calculadora de Split Payment & Capital de Giro**: Avaliação do impacto financeiro do recolhimento imediato na liquidação eletrônica sobre o fluxo de caixa.
5. **Matriz de Cenários e Sensibilidade**: Ajuste interativo da alíquota de referência (25% a 28,5%), regimes de alíquota reduzida (-60% para saúde/educação/transporte, -30% para profissões regulamentadas, alíquota zero para cesta básica) e Imposto Seletivo.

### Público-Alvo
- Empresários, diretores financeiros (CFOs), controllers e contadores de empresas comerciais, industriais e prestadoras de serviços.
- Consultores fiscais e advogados tributaristas preparando clientes para o novo modelo tributário nacional.

### Valor Principal
Previsibilidade orçamentária e estratégica: identificar com clareza quais elos da cadeia produtiva ganharão margem com a não-cumulatividade ampla e quais precisarão rever precificação e fornecedores antes de 2026/2027.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Seleção de Perfil Rápido ou Personalizado**:
   - Presets prontos para: *Comércio Varejista/Atacadista*, *Prestador de Serviços (Lucro Presumido)*, *Indústria de Transformação*, *Serviços com Alíquota Reduzida (Saúde/Educação)* e *Empresa do Simples Nacional avaliando migração*.
2. **Entrada de Parâmetros Tributários & Operacionais**:
   - Painel estruturado com validação de dados: Faturamento Bruto Anual/Mensal, Compras com direito a crédito (insumos, mercadorias para revenda, energia, telecom, serviços tomados), Alíquotas atuais (ICMS médio, ISS municipal, PIS/COFINS cumulativo ou não-cumulativo, IPI).
   - Configurações da Reforma: Alíquota padrão CBS/IBS (default 26,5% - CBS 8,8% e IBS 17,7%), enquadramento em redução de alíquota (0%, 30%, 60% ou 100% de isenção) e incidência de Imposto Seletivo.
3. **Painel de Resultados e Gráficos Comparativos**:
   - Cartões com métricas-chave em números tabulares (`font-mono tabular-nums`): Carga Tributária Efetiva Atual vs. Nova, Saldo Líquido de Tributos, Créditos Apropriados, Variação no Ebitda / Lucro Líquido.
   - Gráfico de barras comparativo lado a lado de composição tributária.
   - Gráfico de evolução temporal 2026 a 2033.
4. **Módulos Especializados em Abas**:
   - *Comparativo Geral*: DRE detalhada e breakdown de tributos.
   - *Linha do Tempo (Transição)*: Visão anual detalhada da convivência entre os dois sistemas.
   - *Split Payment & Fluxo de Caixa*: Simulação de dias de caixa e retenção imediata.
   - *Simulador de Cadeia & Fornecedores*: Comparativo de compra de optantes do Simples vs. regime normal.
5. **Exportação Executiva**:
   - Exportação em formato tabular limpo / CSV ou visualização para impressão/PDF do relatório gerencial.

### Identidade Visual & Diretrizes de Design (Frontend Design SaaS Guidelines)
- **Aesthetic Direction**: Interface executiva, sóbria e analítica com precisão financeira (sem estética genérica de IA).
- **Paleta de Cores (Regra 60-30-10)**:
  - *Neutros (60%)*: Slate refinado (modo escuro `#0f172a` / `#1e293b`; modo claro `#ffffff` / `#f8fafc`).
  - *Superfícies Estruturais (30%)*: Cartões com bordas sutis (`border-slate-200 dark:border-slate-800`), separadores tipográficos limpos, zero pills estáticas para metadados.
  - *Acentos (10%)*: Azul institucional (`#2563eb`) para ações principais; Esmeralda (`#16a34a`) para créditos e ganhos de margem; Carmim/Âmbar (`#dc2626` / `#d97706`) estritamente para aumentos de carga tributária e alertas de retenção.
- **Tipografia**:
  - Títulos e interface: `Plus Jakarta Sans` ou display sans contemporâneo com `text-wrap: balance`.
  - Dados monetários e percentuais: `JetBrains Mono` / `font-mono tabular-nums` para alinhamento vertical rigoroso.
- **Anti-Slop Discipline**:
  - Sem badges estáticas empilhadas, sem emojis decorativos nos rótulos de dados, sem pontinhos verdes piscando desnecessariamente.
  - Botões com ações claras e diretas em português formal ("Recalcular", "Exportar Relatório", "Restaurar Padrões").

---

## 3. Key Product Decisions & Trade-Offs

### Decisão 1: Modelo Matemático Fiel à EC 132/2023 e PLP 68/2024
- **Abordagem**: Implementar com fidelidade as fórmulas de cálculo por fora (sem tributo na sua própria base nem na base dos outros) e crédito amplo integral sobre aquisições tributadas.
- **Por quê**: A maior distorção percebida nas análises preliminares é comparar a alíquota nominal de 26,5% por fora com as alíquotas nominais do sistema atual que são cobradas por dentro (onde 18% de ICMS + 9,25% PIS/COFINS representam uma carga efetiva muito superior à soma simples). A aplicação deixará essa diferença transparente.

### Decisão 2: Preservação de Estado Local e Performance Client-side
- **Abordagem**: Motor de cálculo reativo puro em TypeScript executado diretamente no cliente, com persistência automática de cenários salvos em `localStorage`.
- **Por quê**: Velocidade instantânea (<50ms para recalcular todas as tabelas e gráficos ao mover sliders ou trocar números), segurança total dos dados financeiros da empresa (sem envio para servidores externos) e facilidade de criação de múltiplos cenários.

### Decisão 3: Gráficos Nativos e Interativos SVG/Tailwind
- **Abordagem**: Componentes de gráficos de barras empilhadas, comparativos antes/depois e curva de transição construídos em SVG responsivo com animações suaves e tooltips precisos.
- **Por quê**: Zero overhead de pacotes pesados, total responsividade, renderização sem quebra em qualquer resolução (desktop 1440px baseline) e controle absoluto de contraste e acessibilidade.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TRIBUTABR - ARQUITETURA                        │
└────────────────────────────────────────────────────────────────────────┘

 ┌──────────────────────────────────────────────────────────────────────┐
 │                           Interface (UI)                             │
 │  ┌───────────────────┐  ┌──────────────────────────────────────────┐ │
 │  │ TopBar Contract   │  │ Modos de Visualização (Segmented Tabs)   │ │
 │  │ Wordmark + Ações  │  │ • DRE Comparativa  • Transição 2026-2033 │ │
 │  │                   │  │ • Split Payment    • Cadeia/Fornecedores │ │
 │  └───────────────────┘  └──────────────────────────────────────────┘ │
 └──────────────────────────────────┬───────────────────────────────────┘
                                    │
                                    ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │                     Camada de Entradas & Parâmetros                  │
 │  ┌───────────────────────┐  ┌──────────────────────────────────────┐ │
 │  │ Presets de Setor      │  │ Formulários Operacionais             │ │
 │  │ • Comércio Varejo/Atac│  │ • Faturamento, Compras & Insumos     │ │
 │  │ • Serviços / Indústria│  │ • Alíquotas Legadas (ICMS, ISS, etc.) │ │
 │  │ • Simples Nacional    │  │ • Alíquotas da Reforma & Reduções    │ │
 │  └───────────────────────┘  └──────────────────────────────────────┘ │
 └──────────────────────────────────┬───────────────────────────────────┘
                                    │
                                    ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │                     Motor de Cálculo Tributário                      │
 │  ┌─────────────────────────────┐  ┌────────────────────────────────┐ │
 │  │ Motor Legado (Atual)        │  │ Motor Reforma (IBS / CBS / IS) │ │
 │  │ • PIS/COFINS (Cum/Não-Cum)  │  │ • Cálculo "Por Fora"           │ │
 │  │ • ICMS + ISS + IPI          │  │ • Créditos Não-Cumulativos     │ │
 │  │ • Carga Efetiva "Por Dentro"│  │ • Alíquotas Diferenciadas      │ │
 │  └─────────────────────────────┘  └────────────────────────────────┘ │
 │                                  │                                   │
 │  ┌───────────────────────────────┴────────────────────────────────┐  │
 │  │ Simulador Cronograma 2026-2033 & Split Payment Cash-Flow Engine│  │
 │  └────────────────────────────────────────────────────────────────┘  │
 └──────────────────────────────────┬───────────────────────────────────┘
                                    │
                                    ▼
 ┌──────────────────────────────────────────────────────────────────────┐
 │                     Camada de Saída & Visualização                   │
 │  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐ │
 │  │ KPIs Comparativos │  │ Gráficos SVG      │  │ Exportador        │ │
 │  │ Carga %, Saldo R$ │  │ Barras / Linhas   │  │ Impressão / CSV   │ │
 │  └───────────────────┘  └───────────────────┘  └───────────────────┘ │
 └──────────────────────────────────────────────────────────────────────┘
```

### Entidades de Dados Principais
- `CompanyTaxProfile`: Regime tributário (`lucro_real`, `lucro_presumido`, `simples_nacional`), setor econômico (`comercio`, `servicos`, `industria`, `servicos_especiais`), receita bruta anual/mensal, compras tributadas, folha de pagamento, margem operacional atual.
- `LegacyTaxRates`: Alíquotas atuais de ICMS (origem e destino), ISS, PIS, COFINS, IPI e percentual de aproveitamento de crédito atual.
- `ReformTaxRates`: Alíquota de referência IBS e CBS, regime diferenciado (redução 60%, 30%, isenção total), alíquota do Imposto Seletivo (se aplicável), e % de compras originadas de optantes do Simples Nacional.
- `SimulationResult`: DRE comparativa (Receita Bruta, Impostos sobre Vendas, Receita Líquida, Custos com crédito, Créditos Fiscais auferidos, Carga Tributária Efetiva em R$ e %, Variação no Resultado e Impacto no Preço Final para manter a margem).
- `TransitionTimelinePoint`: Ano de referência (2026 a 2033), alíquotas de teste, fator de transição do ICMS/ISS (100% a 0%) e alíquota combinada do período.

---

## 5. Plano de Implementação Passo a Passo (Após Aprovação)

1. **Configuração de Metadados e Estilos**:
   - Atualizar `metadata.json` com nome oficial ("TributaBR - Analisador da Reforma Tributária") e descrição.
   - Atualizar `index.html` com título e meta tags adequadas.
   - Configurar fontes de alta legibilidade no HTML e `@custom-variant dark` em `src/index.css`.
2. **Desenvolvimento do Motor de Cálculo (`src/lib/taxCalculations.ts`)**:
   - Modelagem das equações fiscais do sistema legado e do novo modelo IBS/CBS/IS (EC 132/2023).
   - Simulação dos anos de transição (2026 até 2033).
   - Cálculo de split payment e impacto no capital de giro.
3. **Desenvolvimento dos Componentes de Interface**:
   - `Header`: Top Bar em estrita conformidade com o Top Bar Contract (Wordmark limpo, navegação clara, botão de alternar tema e ação de exportação).
   - `PresetSelector`: Seleção de perfis econômicos para preenchimento ágil.
   - `TaxInputForm`: Controles deslizantes e campos monetários precisos com formatação em Reais (`R$`).
   - `ComparisonSummary`: Cards de métricas com números tabulares e indicadores de variação percentual.
   - `ComparativeDRE`: Tabela de DRE interativa confrontando linha a linha o modelo Atual vs. Reforma.
   - `TransitionTimelineView`: Visualização cronológica detalhada da evolução tributária ano a ano de 2026 a 2033.
   - `SplitPaymentSimulator`: Painel demonstrando o efeito do split payment no fluxo de caixa e capital de giro.
   - `InteractiveCharts`: Gráficos SVG responsivos mostrando a decomposição da carga tributária e o ponto de equilíbrio.
4. **Verificação & Testes**:
   - Execução de `compile_applet` e `lint_applet` garantindo integridade e ausência de erros.
