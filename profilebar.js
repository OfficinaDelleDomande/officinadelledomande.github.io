/* ============================================================================
   L'Officina delle Domande — Barra profilo CONDIVISA tra tutte le officine.
   Un solo punto di verità: modifica qui e cambia ovunque.
   I FONT sono fissi e identici ovunque (Fraunces + carattere di sistema).
   I COLORI li passa ogni officina (inkColor / bgColor / softColor) così la
   barra si integra con il tema, ma la tipografia resta sempre la stessa.
   Props: { profile:{name,avatar,color}, onOpenTaccuino, onSwitch,
            inkColor, bgColor, softColor }
   ============================================================================ */
(function () {
  var R = window.React;
  if (!R) return;
  var h = R.createElement;

  var FONT_NAME = "'Fraunces', Georgia, serif";
  var FONT_UI = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

  function ProfileBar(props) {
    var profile = props.profile;
    if (!profile) return null;
    var ink = props.inkColor || '#211b12';
    var bg = props.bgColor || '#f5efe0';
    var soft = props.softColor || '#8a8275';

    var btn = {
      background: 'transparent', border: '1.5px solid ' + ink, borderRadius: 4,
      padding: '6px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
      color: ink, fontFamily: FONT_UI, textDecoration: 'none',
      display: 'inline-flex', alignItems: 'center', lineHeight: 1,
    };

    return h('div', { style: { position: 'sticky', top: 0, zIndex: 50, background: bg, paddingTop: 8, marginBottom: 16 } },
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', background: '#ffffff', border: '2px solid ' + ink, borderRadius: 8, padding: '8px 12px', boxShadow: '0 3px 0 ' + ink } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
          h('div', { style: { width: 38, height: 38, borderRadius: '50%', background: profile.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: '2px solid ' + ink } }, profile.avatar),
          h('div', null,
            h('div', { style: { fontFamily: FONT_UI, fontSize: 10, fontWeight: 700, color: soft, letterSpacing: 1, textTransform: 'uppercase' } }, 'Stai esplorando come'),
            h('div', { style: { fontFamily: FONT_NAME, fontWeight: 700, fontSize: 18, color: ink, lineHeight: 1 } }, profile.name)
          )
        ),
        h('div', { style: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } },
          h('a', { href: 'index.html', style: btn }, '\u2190 officine'),
          h('a', { href: 'chi-sono.html', style: btn }, "chi c'\u00e8 dietro"),
          h('button', { onClick: props.onOpenTaccuino, style: btn }, 'taccuino'),
          h('button', { onClick: props.onSwitch, style: btn }, 'cambia')
        )
      )
    );
  }

  window.ProfileBar = ProfileBar;
})();
