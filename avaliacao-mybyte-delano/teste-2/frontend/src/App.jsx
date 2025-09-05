import React, { useState } from 'react'
import { postJSON } from './api'

// input numérico simples (controlado)
function NumberInput({ label, id, value, onChange, step = '0.01', min = '0' }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step={step}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </label>
  )
}

// card de seção
function Card({ title, children }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

// formatadores p/ BR
const moneyBR = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const numbBR  = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });

// selo discreto
function Badge({ children }) {
  return <span className="badge">{children}</span>
}

// barra de progresso bem direta
function Progress({ label, now, max }) {
  const pct = Math.min(100, Math.max(0, (now / max) * 100));
  return (
    <div className="progress">
      <div className="progress__bar" style={{ width: `${pct}%` }} />
      <div className="progress__label">
        {label}: {numbBR.format(pct)}%
      </div>
    </div>
  )
}

// renderiza o resultado conforme o tipo retornado pela API
function Result({ data, error }) {
  if (error) return <p className="error">{error}</p>
  if (!data)   return <p>Preencha os campos e calcule.</p>

  const isVP = 'valor_presente' in data;
  const isJuros = 'juros' in data && 'montante' in data;

  if (isJuros) {
    const C = data.capital;
    const J = data.juros;
    const M = data.montante;
    const crescimentoPct = (J / C) * 100; // usado na barra

    return (
      <div className="resultCards">
        <div className="resultCard">
          <div className="resultCard__header">
            <h4>Montante</h4>
            <Badge>{data.formula}</Badge>
          </div>
          <div className="resultCard__value">{moneyBR.format(M)}</div>
          <ul className="resultCard__list">
            <li><strong>Capital (C):</strong> {moneyBR.format(C)}</li>
            <li><strong>Juros (J):</strong> {moneyBR.format(J)}</li>
            <li><strong>Taxa (i):</strong> {numbBR.format(data.taxa_percent)}% a.m.</li>
            <li><strong>Tempo (t):</strong> {numbBR.format(data.tempo_meses)} meses</li>
          </ul>
          <Progress label="Crescimento sobre C" now={J} max={C} />
        </div>
        <details className="resultRaw">
          <summary>Ver JSON</summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
      </div>
    );
  }

  if (isVP) {
    const VF = data.valor_futuro;
    const VP = data.valor_presente;
    const desconto = VF - VP;
    const fator = (VP / VF) * 100; 

    return (
      <div className="resultCards">
        <div className="resultCard">
          <div className="resultCard__header">
            <h4>Valor Presente</h4>
            <Badge>{data.formula}</Badge>
          </div>
          <div className="resultCard__value">{moneyBR.format(VP)}</div>
          <ul className="resultCard__list">
            <li><strong>Valor Futuro (VF):</strong> {moneyBR.format(VF)}</li>
            <li><strong>Desconto:</strong> {moneyBR.format(desconto)}</li>
            <li><strong>Taxa (i):</strong> {numbBR.format(data.taxa_percent)}% a.m.</li>
            <li><strong>Tempo (t):</strong> {numbBR.format(data.tempo_meses)} meses</li>
          </ul>
          <Progress label="Proporção VP/VF" now={VP} max={VF} />
        </div>
        <details className="resultRaw">
          <summary>Ver JSON</summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
      </div>
    );
  }


  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function App() {
  const [loading, setLoading] = useState(false)
  const [out, setOut] = useState(null)
  const [erro, setErro] = useState('')

  // estados por card
  //juros simples
  const [capitalS, setCapitalS] = useState('1000')
  const [taxaS, setTaxaS] = useState('2')
  const [tempoS, setTempoS] = useState('12')

  // juros compostos
  const [capitalC, setCapitalC] = useState('1000')
  const [taxaC, setTaxaC] = useState('2')
  const [tempoC, setTempoC] = useState('12')

  // valor presnte
  const [futuroVP, setFuturoVP] = useState('1000')
  const [taxaVP, setTaxaVP] = useState('2')
  const [tempoVP, setTempoVP] = useState('12')

  // wrapper da chamada, lida com loading/erro e guarda saída
  async function calc(path, payload) {
    try {
      setLoading(true)
      setErro('')
      setOut(await postJSON(path, payload))
    } catch (e) {
      setOut(null)
      setErro(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Cálculos Financeiros</h1>
        <p>Calcule seus juros simples, compostos ou valor presente.</p>
      </header>

      <div className="grid">
        {/* 1) Juros Simples */}
        <Card title="1) Juros Simples">
          <form onSubmit={(e) => {
            e.preventDefault()
            calc('/juros-simples', {
              capital: Number(capitalS),
              taxa: Number(taxaS),
              tempo: Number(tempoS)
            })
          }}>
            <NumberInput label="Capital (C)" id="c-s" value={capitalS} onChange={setCapitalS} />
            <NumberInput label="Taxa i (%/mês)" id="i-s" value={taxaS} onChange={setTaxaS} />
            <NumberInput label="Tempo t (meses)" id="t-s" value={tempoS} onChange={setTempoS} step="1" />
            <button disabled={loading}>{loading ? 'Calculando...' : 'Calcular'}</button>
          </form>
        </Card>

        {/* 2) Juros Compostos */}
        <Card title="2) Juros Compostos">
          <form onSubmit={(e) => {
            e.preventDefault()
            calc('/juros-compostos', {
              capital: Number(capitalC),
              taxa: Number(taxaC),
              tempo: Number(tempoC)
            })
          }}>
            <NumberInput label="Capital (C)" id="c-c" value={capitalC} onChange={setCapitalC} />
            <NumberInput label="Taxa i (%/mês)" id="i-c" value={taxaC} onChange={setTaxaC} />
            <NumberInput label="Tempo t (meses)" id="t-c" value={tempoC} onChange={setTempoC} step="1" />
            <button disabled={loading}>{loading ? 'Calculando...' : 'Calcular'}</button>
          </form>
        </Card>

        {/* 3) Valor Presente */}
        <Card title="3) Valor Presente (VP)">
          <form onSubmit={(e) => {
            e.preventDefault()
            calc('/valor-presente', {
              futuro: Number(futuroVP),
              taxa: Number(taxaVP),
              tempo: Number(tempoVP)
            })
          }}>
            <NumberInput label="Valor Futuro (VF)" id="vf" value={futuroVP} onChange={setFuturoVP} />
            <NumberInput label="Taxa i (%/mês)" id="i-vp" value={taxaVP} onChange={setTaxaVP} />
            <NumberInput label="Tempo t (meses)" id="t-vp" value={tempoVP} onChange={setTempoVP} step="1" />
            <button disabled={loading}>{loading ? 'Calculando...' : 'Calcular'}</button>
          </form>
        </Card>
      </div>

      <section className="result">
        <h3>Resultado</h3>
        <Result data={out} error={erro} />
      </section>

      <footer>
        <small>Feito por Delano Sarmento.</small>
      </footer>
    </main>
  )
}
