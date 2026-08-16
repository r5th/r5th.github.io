(function(){
"use strict";
var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
var finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
var $ = function(s, c){ return (c||document).querySelector(s); };
var $$ = function(s, c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); };

/* ---------- Theme toggle ---------- */
$('#themeBtn').addEventListener('click', function(){
  var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('afif-theme', next); } catch(e){}
});

/* ---------- Sticky scroll-aware nav ---------- */
var nav = $('#nav');
function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 8); }
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

/* ---------- Mobile drawer ---------- */
var drawer = $('#drawer'), scrim = $('#scrim'), burger = $('#burger');
function setDrawer(open){
  drawer.classList.toggle('open', open);
  scrim.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if(open) $('#drawerClose').focus(); else burger.focus();
}
burger.addEventListener('click', function(){ setDrawer(!drawer.classList.contains('open')); });
$('#drawerClose').addEventListener('click', function(){ setDrawer(false); });
scrim.addEventListener('click', function(){ setDrawer(false); });
document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });
$$('#drawer nav a').forEach(function(a){ a.addEventListener('click', function(){ setDrawer(false); }); });

/* ---------- Placeholder links (fill in real URLs when porting) ---------- */
$$('a[data-todo]').forEach(function(a){
  a.setAttribute('title', 'Add real URL when publishing');
  a.addEventListener('click', function(e){ e.preventDefault(); });
});

/* ---------- Blur-fade reveal ---------- */
var io = null;
function initReveal(){
  var els = $$('.rv');
  // Stagger: siblings that are .rv within the same parent get 80ms steps
  var groups = new Map();
  els.forEach(function(el){
    var p = el.parentElement;
    if(!groups.has(p)) groups.set(p, 0);
    var i = groups.get(p);
    el.style.setProperty('--d', (i * 80) + 'ms');
    groups.set(p, i + 1);
  });
  if(reduced || !('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  els.forEach(function(el){ io.observe(el); });
}

/* ---------- Variable-font cursor bulge on titles ---------- */
var titles = [];
var px = -9999, py = -9999;
var RADIUS = 110;
function splitTitle(el){
  var text = el.textContent;
  // read this title's own base axes from computed style so the spring rests at its designed weight
  var fvs = getComputedStyle(el).fontVariationSettings || '';
  var mw = fvs.match(/"wght"\s+([\d.]+)/), md = fvs.match(/"wdth"\s+([\d.]+)/);
  var baseW = mw ? parseFloat(mw[1]) : 620;
  var baseD = md ? parseFloat(md[1]) : 105;
  var maxW = Math.min(baseW + 260, 900), maxD = 125;
  el.setAttribute('aria-label', text);
  el.textContent = '';
  var glyphs = [];
  var words = text.split(' ');
  words.forEach(function(word, wi){
    var wordEl = document.createElement('span');
    wordEl.style.display = 'inline-block';
    wordEl.style.whiteSpace = 'nowrap';
    wordEl.setAttribute('aria-hidden', 'true');
    for(var i = 0; i < word.length; i++){
      var s = document.createElement('span');
      s.className = 'g';
      s.textContent = word[i];
      wordEl.appendChild(s);
      glyphs.push({ el: s, w: baseW, vw: 0, d: baseD, vd: 0, tw: baseW, td: baseD });
    }
    el.appendChild(wordEl);
    if(wi < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
  titles.push({ el: el, glyphs: glyphs, baseW: baseW, baseD: baseD, maxW: maxW, maxD: maxD });
}
function bulgeFrame(){
  var anyLive = false;
  for(var t = 0; t < titles.length; t++){
    var T = titles[t];
    if(!T.el.offsetParent){ continue; } // hidden page
    var r = T.el.getBoundingClientRect();
    var near = px > r.left - 160 && px < r.right + 160 && py > r.top - 160 && py < r.bottom + 160;
    var g, G;
    if(near){
      for(g = 0; g < T.glyphs.length; g++){
        G = T.glyphs[g];
        var gr = G.el.getBoundingClientRect();
        var dx = px - (gr.left + gr.width / 2);
        var dy = (py - (gr.top + gr.height / 2)) * 1.6;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var f = Math.exp(-(dist * dist) / (2 * RADIUS * RADIUS));
        G.tw = T.baseW + f * (T.maxW - T.baseW);
        G.td = T.baseD + f * (T.maxD - T.baseD);
      }
    } else {
      for(g = 0; g < T.glyphs.length; g++){ T.glyphs[g].tw = T.baseW; T.glyphs[g].td = T.baseD; }
    }
    for(g = 0; g < T.glyphs.length; g++){
      G = T.glyphs[g];
      // spring toward target
      G.vw = G.vw * 0.68 + (G.tw - G.w) * 0.16;
      G.vd = G.vd * 0.68 + (G.td - G.d) * 0.16;
      G.w += G.vw; G.d += G.vd;
      if(Math.abs(G.vw) > 0.05 || Math.abs(G.tw - G.w) > 0.05){
        anyLive = true;
        G.el.style.fontVariationSettings = '"wght" ' + G.w.toFixed(1) + ', "wdth" ' + G.d.toFixed(2);
      }
    }
  }
  if(anyLive || pointerMoving){ requestAnimationFrame(bulgeFrame); rafLive = true; }
  else { rafLive = false; }
}
var rafLive = false, pointerMoving = false, moveTimer = null;
function initBulge(){
  if(!finePointer || reduced) return; // touch: static weight fallback
  $$('[data-bulge]').forEach(splitTitle);
  document.addEventListener('pointermove', function(e){
    px = e.clientX; py = e.clientY;
    pointerMoving = true;
    clearTimeout(moveTimer);
    moveTimer = setTimeout(function(){ pointerMoving = false; }, 120);
    if(!rafLive){ rafLive = true; requestAnimationFrame(bulgeFrame); }
  }, { passive: true });
}

/* Nav uses real page links + in-page anchors (#work/#about/#contact);
   projects are their own pages now, so no hash router is needed. */

/* ---------- Loading screen: scramble + shimmer ---------- */
function runLoader(done){
  var loader = $('#loader');
  var nameEl = $('#loaderName');
  var FINAL = nameEl.getAttribute('data-text');
  if(reduced){
    setTimeout(function(){ loader.classList.add('out'); done(); setTimeout(function(){ loader.remove(); }, 600); }, 350);
    return;
  }
  var CHARS = '!<>-_\\/[]{}=+*^?#ABCDEFGHKMNPRSTUVWXYZ0123456789';
  var spans = FINAL.split('').map(function(ch){
    var s = document.createElement('span');
    s.className = 'u';
    s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
    return s;
  });
  nameEl.textContent = '';
  spans.forEach(function(s){ nameEl.appendChild(s); });
  var start = performance.now();
  var resolveAt = spans.map(function(_, i){ return 260 + i * 150; });
  var frame = 0;
  function tick(now){
    var t = now - start;
    var allDone = true;
    frame++;
    spans.forEach(function(s, i){
      if(t >= resolveAt[i]){
        if(s.className){ s.className = ''; s.textContent = FINAL[i]; }
      } else {
        allDone = false;
        if(frame % 2 === 0) s.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    });
    if(!allDone){ requestAnimationFrame(tick); return; }
    // resolved: flatten to plain text, start shimmer sweep
    nameEl.textContent = FINAL;
    nameEl.classList.add('sheen');
    setTimeout(function(){
      loader.classList.add('out');
      done();
      setTimeout(function(){ loader.remove(); }, 600);
    }, 950);
  }
  requestAnimationFrame(tick);
}

/* ---------- Boot ---------- */
function boot(){
  document.body.style.overflow = '';
  initReveal();
  initBulge();
}
if($('#loader')){
  document.body.style.overflow = 'hidden';
  runLoader(boot);
} else {
  boot();
}
})();
