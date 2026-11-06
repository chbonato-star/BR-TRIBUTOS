import React, { useState } from 'react';
import { CompanyFinancialInput, LegacyTaxRates, ReformTaxRates } from '../types/tax';
import { calculateSimplesComparison, formatBRL, formatPercent } from '../lib/taxCalculations';
import { 
  Building2, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Sliders,
  Sparkles
} from 'lucide-react';

interface SimplesSimulatorProps {
  input: CompanyFinancialInput;
  legacyRates: LegacyTaxRates;
  reformRates: ReformTaxRates;
  onApplyModel?: (model: 'por_dentro' | 'hibrido') => void;
}

export const SimplesSimulator: React.FC<SimplesSimulatorProps> = ({
  input,
  legacyRates,
  reformRates,
  onApplyModel,
}) => {
  // Parâmetros de simulação específicos do Simples
  const [b2bSalesPercent, setB2bSalesPercent] = useState<number>(50); // 50% B2B, 50% B2C
  const [dasRate, setDasRate] = useState<number>(() => {
    return legacyRates.simplesEffectiveRate > 0 ? legacyRates.simplesEffectiveRate : 8.5;
  });
  const [consumptionShare, setConsumptionShare] = useState<number>(45); // 45% do DAS é ICMS/ISS/PIS/COFINS

  const analysis = calculateSimplesComparison(
    input,
    legacyRates,
    reformRates,
    b2bSalesPercent,
    dasRate,
    consumptionShare
  );

  const { porDentro, hibrido, comparison } = analysis;
  const isHibridoRecommended = comparison.recommendedModel === 'hibrido';

  return (
    <div className="space-y-6">
      
      {/* Banner Explicativo - Contexto Legal da EC 132/2023 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Simples Nacional na Reforma Tributária: Por Dentro vs. Híbrido
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Análise comparativa da opção constitucional do Art. 146-A da CF (EC 132/2023) e PLP 68/2024
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-semibold font-mono">
              Art. 146-A CF/88
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-semibold font-mono">
              PLP 68/2024
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          A Reforma Tributária garante às micro e pequenas empresas o direito de <strong>escolher como recolherão o IBS e a CBS</strong>.
          No modelo <strong>Por Dentro</strong>, o optante continua pagando a guia única do DAS, mas transfere crédito reduzido aos seus clientes PJ (~4,5%).
          No modelo <strong>Híbrido</strong>, a empresa opta por recolher o IBS e a CBS por fora no regime não-cumulativo ({reformRates.referenceRate}%),
          tomando crédito integral nas compras e transferindo 100% de crédito para seus clientes corporativos, sem perder o enquadramento no Simples para IRPJ, CSLL e CPP/INSS patronal.
        </p>
      </div>

      {/* Painel de Calibração da Simulação */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Parâmetros do Perfil Comercial & Tributário da Empresa
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Slider 1: % Vendas B2B vs B2C */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                Vendas para Empresas (B2B)
              </label>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm tabular-nums">
                {b2bSalesPercent}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={b2bSalesPercent}
              onChange={(e) => setB2bSalesPercent(parseInt(e.target.value) || 0)}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0% (Consumidor B2C)</span>
              <span>100% (Corporativo B2B)</span>
            </div>
          </div>

          {/* Slider 2: Alíquota Efetiva do DAS */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                Alíquota Efetiva do DAS Atual
              </label>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm tabular-nums">
                {dasRate.toFixed(2)}%
              </span>
            </div>
            <input
              type="range"
              min="4.0"
              max="16.0"
              step="0.25"
              value={dasRate}
              onChange={(e) => setDasRate(parseFloat(e.target.value) || 4.0)}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Faixa Inicial (4%)</span>
              <span>Sublimite (16%)</span>
            </div>
          </div>

          {/* Slider 3: Parcela de Tributos sobre Consumo no DAS */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                Fatia de Consumo no DAS (ICMS/ISS/PIS/COFINS)
              </label>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm tabular-nums">
                {consumptionShare}%
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="60"
              step="2"
              value={consumptionShare}
              onChange={(e) => setConsumptionShare(parseInt(e.target.value) || 45)}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>30% (Serviços puros)</span>
              <span>60% (Comércio/Indústria)</span>
            </div>
          </div>

        </div>
      </div>

      {/* Veredito Estratégico & Recomendação */}
      <div className={`p-5 rounded-2xl border ${
        isHibridoRecommended 
          ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' 
          : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800'
      } space-y-3`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {isHibridoRecommended ? (
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            )}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Recomendação Estratégica do Simulador:
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {isHibridoRecommended ? 'Modelo Recomendado: SIMPLES HÍBRIDO (IBS/CBS Por Fora)' : 'Modelo Recomendado: SIMPLES POR DENTRO (DAS Unificado Padrão)'}
              </h4>
            </div>
          </div>

          {onApplyModel && (
            <button
              onClick={() => onApplyModel(comparison.recommendedModel)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Aplicar no Simulador Principal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {comparison.rationale}
        </p>

        {/* Indicador de Ponto de Virada (Breakeven B2B) */}
        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-600 dark:text-slate-400">
            Ponto de Virada Comercial (Breakeven B2B): 
            <strong className="font-mono text-slate-900 dark:text-white ml-1.5">
              {comparison.b2bBreakevenPercent}% de vendas para PJ
            </strong>
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            {b2bSalesPercent >= comparison.b2bBreakevenPercent 
              ? `Vendas B2B atuais (${b2bSalesPercent}%) acima do breakeven: Híbrido compensa comercialmente`
              : `Vendas B2B atuais (${b2bSalesPercent}%) abaixo do breakeven: Por Dentro preserva mais caixa`}
          </span>
        </div>
      </div>

      {/* Comparativo Lado a Lado: Por Dentro vs. Híbrido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* CARD 1: Simples Por Dentro (Padrão) */}
        <div className={`bg-white dark:bg-slate-900 rounded-2xl border ${
          !isHibridoRecommended 
            ? 'border-amber-300 dark:border-amber-700 shadow-md ring-1 ring-amber-400/30' 
            : 'border-slate-200 dark:border-slate-800'
        } p-5 space-y-4`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Opção Tradicional
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Simples "Por Dentro" (Padrão)
              </h4>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              DAS Unificado
            </span>
          </div>

          {/* Indicadores Principais */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-400 text-[11px] block">Tributo Total Pago (DAS)</span>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {formatBRL(porDentro.dasTotalPaid)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{dasRate.toFixed(2)}% da receita bruta</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-400 text-[11px] block">Margem Líquida</span>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {formatPercent(porDentro.netMarginPercent)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{formatBRL(porDentro.operatingResult)}/ano</span>
            </div>
          </div>

          {/* Detalhamento das Características */}
          <div className="space-y-2.5 text-xs">
            
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 font-mono">
              <span className="text-slate-600 dark:text-slate-400 font-sans">Créditos Apropriados nas Compras:</span>
              <strong className="text-slate-400">R$ 0,00 (Sem crédito)</strong>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 font-mono">
              <span className="text-slate-600 dark:text-slate-400 font-sans">Crédito Gerado para Clientes PJ:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {porDentro.creditPassedToClientsRate.toFixed(2)}% ({formatBRL(porDentro.creditPassedToClientsBrl)})
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 font-mono">
              <span className="text-slate-600 dark:text-slate-400 font-sans">Desvantagem de Crédito do Cliente PJ:</span>
              <strong className="text-rose-600 dark:text-rose-400">
                -{formatBRL(porDentro.b2bClientDisadvantageBrl)}/ano
              </strong>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 font-mono">
              <span className="text-slate-600 dark:text-slate-400 font-sans">Desconto Médio Necessário p/ B2B:</span>
              <span className="text-amber-600 font-bold">
                ~{(reformRates.referenceRate - porDentro.creditPassedToClientsRate).toFixed(1)}% na nota fiscal
              </span>
            </div>

          </div>

          {/* Pontos Fortes e Fracos */}
          <div className="pt-2 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Simplicidade máxima: apenas uma guia mensal de arrecadação (DAS).</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Excelente para B2C: consumidor final pessoa física não toma crédito.</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Risco de perda de clientes B2B que exigirão crédito de {reformRates.referenceRate}%.</span>
            </div>
          </div>

        </div>

        {/* CARD 2: Simples Híbrido (IBS/CBS Por Fora) */}
        <div className={`bg-white dark:bg-slate-900 rounded-2xl border ${
          isHibridoRecommended 
            ? 'border-blue-400 dark:border-blue-600 shadow-md ring-1 ring-blue-500/30' 
            : 'border-slate-200 dark:border-slate-800'
        } p-5 space-y-4`}>
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Opção Estratégica EC 132/2023
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Simples "Híbrido" (IBS/CBS Por Fora)
              </h4>
            </div>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              IVA Não-Cumulativo
            </span>
          </div>

          {/* Indicadores Principais */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-400 text-[11px] block">Tributo Total Recolhido</span>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {formatBRL(hibrido.totalTaxesPaid)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                DAS Direto ({formatBRL(hibrido.dasSegregatedPaid)}) + IVA ({formatBRL(hibrido.netCbsIbsPaid)})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <span className="text-slate-400 text-[11px] block">Margem Líquida</span>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white tabular-nums">
                {formatPercent(hibrido.netMarginPercent)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{formatBRL(hibrido.operatingResult)}/ano</span>
            </div>
          </div>

          {/* Detalhamento das Características */}
          <div className="space-y-2.5 text-xs">
            
            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 font-mono">
              <span className="text-slate-600 dark:text-slate-400 font-sans">Créditos Apropriados nas Compras:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">
                +{formatBRL(hibrido.cbsIbsCredits)} (100% integral)
              </strong>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 font-mono">
              <span className="text-slate-600 dark:text-slate-400 font-sans">Crédito Gerado para Clientes PJ:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {hibrido.creditPassedToClientsRate.toFixed(2)}% ({formatBRL(hibrido.creditPassedToClientsBrl)})
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 font-mono">
              <span className="text-slate-600 dark:text-slate-400 font-sans">Ganho Competitivo p/ Cliente PJ:</span>
              <strong className="text-emerald-600 dark:text-emerald-400">
                +{formatBRL(hibrido.b2bClientGainBrl)}/ano transferidos
              </strong>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-slate-800 font-mono">
              <span className="text-slate-600 dark:text-slate-400 font-sans">Paridade com Grandes Empresas:</span>
              <span className="text-emerald-600 font-bold">
                100% idêntico a Lucro Real/Presumido
              </span>
            </div>

          </div>

          {/* Pontos Fortes e Fracos */}
          <div className="pt-2 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Mantém isenção de INSS patronal (CPP) do Simples na folha de pagamento.</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Gera crédito cheio ({reformRates.referenceRate}%), blindando clientes corporativos.</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Exige controle contábil de débitos e créditos fiscais de IBS/CBS.</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabela Comparativa Resumida */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Quadro Resumo: Comparativo de Impacto Financeiro
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-300">
                <th className="py-2.5 px-3 font-semibold">Rubrica / Indicador</th>
                <th className="py-2.5 px-3 font-semibold text-right">Simples "Por Dentro"</th>
                <th className="py-2.5 px-3 font-semibold text-right">Simples "Híbrido"</th>
                <th className="py-2.5 px-3 font-semibold text-right">Diferença (Híbrido vs Por Dentro)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              <tr>
                <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white">Receita Bruta Anual</td>
                <td className="py-2.5 px-3 text-right">{formatBRL(input.revenue)}</td>
                <td className="py-2.5 px-3 text-right">{formatBRL(input.revenue)}</td>
                <td className="py-2.5 px-3 text-right text-slate-400">R$ 0,00</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white">Débitos de Tributos sobre Vendas</td>
                <td className="py-2.5 px-3 text-right text-amber-600">{formatBRL(porDentro.dasTotalPaid)} (DAS)</td>
                <td className="py-2.5 px-3 text-right text-blue-600">{formatBRL(hibrido.cbsIbsDebits)} (IBS/CBS)</td>
                <td className="py-2.5 px-3 text-right">+{formatBRL(hibrido.cbsIbsDebits - porDentro.dasTotalPaid)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white">Créditos de Entrada (Compras/Insumos)</td>
                <td className="py-2.5 px-3 text-right text-slate-400">R$ 0,00</td>
                <td className="py-2.5 px-3 text-right text-emerald-600 font-semibold">-{formatBRL(hibrido.cbsIbsCredits)}</td>
                <td className="py-2.5 px-3 text-right text-emerald-600 font-semibold">+{formatBRL(hibrido.cbsIbsCredits)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white">Tributos Diretos Retidos no Simples (IRPJ/CSLL/CPP)</td>
                <td className="py-2.5 px-3 text-right text-slate-400">Incluso no DAS</td>
                <td className="py-2.5 px-3 text-right text-slate-700 dark:text-slate-300">{formatBRL(hibrido.dasSegregatedPaid)}</td>
                <td className="py-2.5 px-3 text-right">{formatBRL(hibrido.dasSegregatedPaid)}</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/30 font-bold">
                <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white">Total Efetivo de Tributos Recolhidos</td>
                <td className="py-2.5 px-3 text-right text-amber-600">{formatBRL(porDentro.dasTotalPaid)}</td>
                <td className="py-2.5 px-3 text-right text-blue-600">{formatBRL(hibrido.totalTaxesPaid)}</td>
                <td className={`py-2.5 px-3 text-right ${hibrido.totalTaxesPaid > porDentro.dasTotalPaid ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {hibrido.totalTaxesPaid > porDentro.dasTotalPaid ? '+' : ''}{formatBRL(hibrido.totalTaxesPaid - porDentro.dasTotalPaid)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white">Crédito Fiscal Entregue ao Cliente PJ</td>
                <td className="py-2.5 px-3 text-right text-amber-600 font-bold">{formatPercent(porDentro.creditPassedToClientsRate)}</td>
                <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">{formatPercent(hibrido.creditPassedToClientsRate)}</td>
                <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">
                  +{formatPercent(hibrido.creditPassedToClientsRate - porDentro.creditPassedToClientsRate)} p.p.
                </td>
              </tr>
              <tr className="bg-slate-100/60 dark:bg-slate-800/60 font-bold">
                <td className="py-2.5 px-3 font-sans text-slate-900 dark:text-white">Resultado Operacional Líquido Final</td>
                <td className="py-2.5 px-3 text-right text-slate-900 dark:text-white">{formatBRL(porDentro.operatingResult)} ({formatPercent(porDentro.netMarginPercent)})</td>
                <td className="py-2.5 px-3 text-right text-slate-900 dark:text-white">{formatBRL(hibrido.operatingResult)} ({formatPercent(hibrido.netMarginPercent)})</td>
                <td className={`py-2.5 px-3 text-right ${comparison.operatingResultDifferenceBrl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {comparison.operatingResultDifferenceBrl >= 0 ? '+' : ''}{formatBRL(comparison.operatingResultDifferenceBrl)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
