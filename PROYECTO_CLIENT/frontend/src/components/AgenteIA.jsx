import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `Eres FrenoBot, el asistente inteligente del taller mecánico FRENOMAX.
Ayudas a los usuarios con preguntas sobre servicios del taller, gestión de vehículos, mecánica básica y uso del sistema.
Responde siempre en español, de forma clara y concisa (máximo 3 oraciones por respuesta).
Si no sabes algo específico del negocio, sugiere contactar al administrador.`

export default function AgenteIA() {
  const [abierto, setAbierto]     = useState(false)
  const [mensajes, setMensajes]   = useState([
    { rol: 'asistente', texto: '¡Hola! Soy FrenoBot 🤖 ¿En qué te puedo ayudar hoy?' }
  ])
  const [input, setInput]         = useState('')
  const [cargando, setCargando]   = useState(false)
  const bottomRef                 = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, abierto])

  const enviar = async () => {
    const texto = input.trim()
    if (!texto || cargando) return

    const nuevosMensajes = [...mensajes, { rol: 'usuario', texto }]
    setMensajes(nuevosMensajes)
    setInput('')
    setCargando(true)

    try {
      const historial = nuevosMensajes.slice(1).map(m => ({
        role: m.rol === 'usuario' ? 'user' : 'assistant',
        content: m.texto,
      }))

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: historial,
        }),
      })

      const data = await res.json()
      const respuesta = data.content?.map(b => b.text || '').join('') || 'Sin respuesta.'
      setMensajes(prev => [...prev, { rol: 'asistente', texto: respuesta }])
    } catch {
      setMensajes(prev => [...prev, { rol: 'asistente', texto: '⚠️ Error de conexión. Intenta de nuevo.' }])
    } finally {
      setCargando(false)
    }
  }

  const keyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }

  return (
    <>
      {/* Botón flotante */}
      <button onClick={() => setAbierto(!abierto)} style={s.fab} title="FrenoBot — Asistente IA">
        {abierto ? '✕' : '🤖'}
      </button>

      {/* Ventana del chat */}
      {abierto && (
        <div style={s.ventana}>
          <div style={s.header}>
            <span>🤖 FrenoBot</span>
            <span style={s.badge}>IA</span>
          </div>

          <div style={s.mensajes}>
            {mensajes.map((m, i) => (
              <div key={i} style={m.rol === 'usuario' ? s.burbuja.usuario : s.burbuja.asistente}>
                {m.texto}
              </div>
            ))}
            {cargando && (
              <div style={s.burbuja.asistente}>
                <span style={s.puntos}>● ● ●</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={s.inputArea}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={keyDown}
              placeholder="Escribe tu pregunta…"
              style={s.inputEl}
              disabled={cargando}
            />
            <button onClick={enviar} style={s.enviarBtn} disabled={cargando || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const s = {
  fab: {
    position: 'fixed', bottom: '28px', right: '28px',
    width: '56px', height: '56px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #0ef, #c800ff)',
    border: 'none', fontSize: '24px', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(0,255,255,0.4)', zIndex: 9999,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  ventana: {
    position: 'fixed', bottom: '94px', right: '28px',
    width: '340px', height: '460px',
    background: '#0d2538', border: '2px solid #0ef',
    borderRadius: '16px', display: 'flex', flexDirection: 'column',
    boxShadow: '0 8px 40px rgba(0,255,255,0.2)', zIndex: 9998, overflow: 'hidden',
  },
  header: {
    background: 'linear-gradient(90deg, #0ef2, #c800ff33)',
    padding: '12px 16px', display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', borderBottom: '1px solid #0ef4',
    color: '#0ef', fontWeight: '700', fontSize: '15px',
  },
  badge: {
    background: 'linear-gradient(45deg, #0ef, #c800ff)',
    color: '#fff', fontSize: '10px', padding: '2px 8px',
    borderRadius: '10px', fontWeight: '700',
  },
  mensajes: {
    flex: 1, overflowY: 'auto', padding: '14px',
    display: 'flex', flexDirection: 'column', gap: '10px',
  },
  burbuja: {
    usuario: {
      alignSelf: 'flex-end', background: 'linear-gradient(135deg, #0ef3, #c800ff33)',
      border: '1px solid #0ef5', color: '#e0f7fa',
      padding: '10px 14px', borderRadius: '14px 14px 4px 14px',
      maxWidth: '80%', fontSize: '14px', lineHeight: '1.4',
    },
    asistente: {
      alignSelf: 'flex-start', background: '#1a3a50',
      border: '1px solid #0ef3', color: '#cceeff',
      padding: '10px 14px', borderRadius: '14px 14px 14px 4px',
      maxWidth: '85%', fontSize: '14px', lineHeight: '1.4',
    },
  },
  puntos: { letterSpacing: '4px', color: '#0ef', animation: 'pulse 1s infinite' },
  inputArea: {
    display: 'flex', gap: '8px', padding: '12px',
    borderTop: '1px solid #0ef3',
  },
  inputEl: {
    flex: 1, background: '#0a1e2e', border: '1px solid #0ef4',
    borderRadius: '8px', color: '#0ef', padding: '8px 12px',
    fontSize: '13px', outline: 'none',
  },
  enviarBtn: {
    background: 'linear-gradient(45deg, #0ef, #c800ff)',
    border: 'none', borderRadius: '8px', color: '#fff',
    width: '38px', fontSize: '16px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
}
