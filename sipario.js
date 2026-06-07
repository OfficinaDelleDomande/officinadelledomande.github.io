/* ============================================================================
   L'Officina delle Domande — SIPARIO d'ingresso CONDIVISO tra le officine.
   Un solo punto di verita': modifica qui e cambia in ogni officina (presente e futura).
   Ogni officina passa la PROPRIA mascotte e il PROPRIO tema.

   Uso:
     React.createElement(window.SiparioOfficina, {
       nome: "Mattia",                       // saluto per nome (dal profilo)
       titolo: "Officina dei Bit",           // "Benvenuto nell'<titolo>"
       renderAvatar: size => React.createElement(MiaMascotte, { size: size }),
       bg: '#f5efe0',                         // colore della tenda (sfondo officina)
       ink: '#211b12', inkSoft: '#7a6a48',    // testo
       fontDisplay: "'Fraunces', serif",
       fontMono: "'Courier Prime', monospace",
       onFine: () => { ... }                  // chiamata a fine sipario (o subito se reduced-motion)
     })

   Durate (ms): D_CALA (l'occhio cala), D_SALUTO (resta e saluta), D_ALZA (la tenda si alza).
   Saltabile (tap). Rispetta prefers-reduced-motion (compare e basta).
   ============================================================================ */
(function () {
  var R = window.React;
  if (!R) return;
  var h = R.createElement;

  var D_CALA = 750;
  var D_SALUTO = 1800;
  var D_ALZA = 700;

  function SiparioOfficina(props) {
    var nome = props.nome;
    var titolo = props.titolo || "l'Officina";
    var renderAvatar = props.renderAvatar;
    var bg = props.bg || '#f2e8d3';
    var ink = props.ink || '#211b12';
    var inkSoft = props.inkSoft || '#7a6a48';
    var fontDisplay = props.fontDisplay || "'Fraunces', Georgia, serif";
    var fontMono = props.fontMono || "'Courier Prime', 'Courier New', monospace";
    var onFine = props.onFine;

    var reduce = typeof window !== 'undefined' && window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var st = R.useState('cala'); // cala -> saluta -> alza -> via
    var fase = st[0], setFase = st[1];

    var BIG = (typeof window !== 'undefined')
      ? Math.min(window.innerWidth * 0.55, window.innerHeight * 0.45, 320) : 220;
    var CAP = (typeof window !== 'undefined')
      ? Math.min(window.innerWidth * 0.1, 48) : 38;

    R.useLayoutEffect(function () {
      if (reduce) { if (onFine) onFine(); return; }
      var t1 = setTimeout(function () { setFase('saluta'); }, D_CALA);
      var t2 = setTimeout(function () { setFase('alza'); }, D_CALA + D_SALUTO);
      var t3 = setTimeout(function () { setFase('via'); if (onFine) onFine(); }, D_CALA + D_SALUTO + D_ALZA);
      return function () { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    if (reduce || fase === 'via') return null;
    var lift = fase === 'alza';
    var parla = fase === 'saluta' || fase === 'alza';
    var salta = function () { setFase('via'); if (onFine) onFine(); };

    return h(R.Fragment, null,
      h('div', {
        onClick: salta,
        style: {
          position: 'fixed', inset: 0, zIndex: 9998, background: bg,
          transform: lift ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform ' + D_ALZA + 'ms cubic-bezier(.6,0,.3,1)',
          cursor: 'pointer'
        }
      }),
      h('div', {
        onClick: salta,
        style: {
          position: 'fixed', inset: 0, zIndex: 9999, display: 'flex',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 16, padding: 24, textAlign: 'center',
          opacity: lift ? 0 : 1, transform: lift ? 'translateY(-48px)' : 'none',
          transition: 'opacity 480ms ease, transform ' + D_ALZA + 'ms ease',
          pointerEvents: lift ? 'none' : 'auto', cursor: 'pointer'
        }
      },
        h('div', { style: { animation: 'siparioEye 750ms cubic-bezier(.2,.8,.3,1) both' } },
          renderAvatar ? renderAvatar(BIG) : null),
        h('div', {
          style: {
            fontFamily: fontDisplay, fontWeight: 800, fontSize: CAP, color: ink, lineHeight: 1.05,
            opacity: parla ? 1 : 0, transform: parla ? 'none' : 'translateY(8px)',
            transition: 'opacity 380ms ease, transform 380ms ease'
          }
        }, "Ciao, ", nome || "esploratore", "!"),
        h('div', {
          style: {
            fontFamily: fontMono, fontSize: 13, letterSpacing: 1.5, color: inkSoft, textTransform: 'uppercase',
            opacity: parla ? 1 : 0, transition: 'opacity 380ms ease 120ms'
          }
        }, "Benvenuto nell'" + titolo),
        h('div', {
          style: {
            fontFamily: fontMono, fontSize: 11, color: inkSoft, marginTop: 8,
            opacity: parla ? 0.7 : 0, transition: 'opacity 380ms ease 240ms'
          }
        }, "(tocca per entrare)")
      ),
      h('style', null,
        "@keyframes siparioEye { from { opacity: 0; transform: translateY(-64px) scale(.7); } to { opacity: 1; transform: translateY(0) scale(1); } }" +
        " @media (prefers-reduced-motion: reduce) { @keyframes siparioEye { from { opacity: 1; transform: none; } to { opacity: 1; transform: none; } } }")
    );
  }

  window.SiparioOfficina = SiparioOfficina;
})();
