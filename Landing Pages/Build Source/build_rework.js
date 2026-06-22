/* Enel Health landing rework generator (v2).
   27 pages: 3 studies (peptide, fasting, circadian) x 3 palettes (Navy, Petrol, Mint) x 3 page types.
   Palettes match the archetype landing pages EXACTLY (peptide_join = Petrol, circadian_landing = Mint,
   dark starfield circadian = Navy). One accent per palette, as the archetypes do.
   Brand-guide font only: Georgia/Gelasio serif headings + Inter body. Launch-style hooks from the June 21
   Instagram copy. Celestial element (starfield + gold shooting star) on dark areas top, teal waves at the
   bottom. No em/en dashes, no emoji, original SVG iconography. */

const fs = require('fs');
const path = require('path');
const OUT = process.argv[2] || path.join(__dirname, 'out');

/* starfield dot layers, lifted from the archetype Navy hero */
const STAR = `radial-gradient(1.3px 1.3px at 12% 20%,#dce9ff 99%,transparent),radial-gradient(1px 1px at 27% 62%,#cfe0ff 99%,transparent),radial-gradient(1px 1px at 46% 16%,#dce9ff 99%,transparent),radial-gradient(1.4px 1.4px at 62% 46%,#bcd2ff 99%,transparent),radial-gradient(1px 1px at 77% 26%,#dce9ff 99%,transparent),radial-gradient(1px 1px at 88% 64%,#cfe0ff 99%,transparent),radial-gradient(1.2px 1.2px at 35% 84%,#dce9ff 99%,transparent),radial-gradient(1px 1px at 69% 80%,#cfe0ff 99%,transparent),radial-gradient(1px 1px at 92% 12%,#dce9ff 99%,transparent),radial-gradient(1px 1px at 7% 76%,#cfe0ff 99%,transparent),radial-gradient(1px 1px at 54% 70%,#dce9ff 99%,transparent),radial-gradient(1.2px 1.2px at 18% 44%,#bcd2ff 99%,transparent)`;
const STAR_WARM = `radial-gradient(1.3px 1.3px at 14% 18%,#ffe9c0 99%,transparent),radial-gradient(1px 1px at 30% 60%,#f6dcae 99%,transparent),radial-gradient(1px 1px at 48% 14%,#ffe9c0 99%,transparent),radial-gradient(1.3px 1.3px at 64% 44%,#f2d199 99%,transparent),radial-gradient(1px 1px at 79% 24%,#ffe9c0 99%,transparent),radial-gradient(1px 1px at 89% 62%,#f6dcae 99%,transparent),radial-gradient(1px 1px at 36% 82%,#ffe9c0 99%,transparent),radial-gradient(1px 1px at 70% 78%,#f6dcae 99%,transparent),radial-gradient(1px 1px at 20% 42%,#f2d199 99%,transparent)`;

/* original line iconography */
const ICON = {
  vial:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6.5L6.5 16a3.2 3.2 0 0 0 2.9 4.6h5.2A3.2 3.2 0 0 0 17.5 16L14 9.5V3"/><path d="M7.7 14h8.6"/></svg>`,
  clock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.6 1.6M9 2h6"/></svg>`,
  sunrise:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M6.5 18a5.5 5.5 0 0 1 11 0M12 3v4M5 7l2 2M19 7l-2 2M2.5 12.5h2M19.5 12.5h2"/></svg>`,
  check:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.4l2.6 2.6L16 9.4"/></svg>`,
  shield:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>`,
  community:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M17 8a3 3 0 0 1 0 6M16.5 19a5.5 5.5 0 0 0-2-3.9"/></svg>`,
  lock:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
  google:`<svg viewBox="0 0 24 24" width="17" height="17"><path fill="#4285F4" d="M22.5 12.2c0-.7-.06-1.4-.18-2.06H12v3.9h5.9a5 5 0 0 1-2.18 3.3v2.74h3.52c2.06-1.9 3.26-4.7 3.26-7.88z"/><path fill="#34A853" d="M12 23c2.94 0 5.42-.97 7.22-2.63l-3.52-2.74c-.98.66-2.23 1.05-3.7 1.05-2.84 0-5.25-1.92-6.11-4.5H2.25v2.83A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.89 14.18a6.6 6.6 0 0 1 0-4.2V7.15H2.25a11 11 0 0 0 0 9.86z"/><path fill="#EA4335" d="M12 5.5c1.6 0 3.04.55 4.17 1.62l3.12-3.12C17.42 2.25 14.94 1.25 12 1.25A11 11 0 0 0 2.25 7.15l3.64 2.83C6.75 7.42 9.16 5.5 12 5.5z"/></svg>`,
  apple:`<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M16.36 12.78c.02 2.6 2.28 3.46 2.3 3.47-.02.06-.36 1.24-1.19 2.46-.72 1.06-1.47 2.1-2.65 2.12-1.16.02-1.53-.69-2.86-.69-1.33 0-1.74.67-2.84.71-1.14.04-2-1.15-2.73-2.2-1.49-2.16-2.63-6.11-1.1-8.78a4.25 4.25 0 0 1 3.59-2.19c1.12-.02 2.17.75 2.86.75.68 0 1.96-.93 3.31-.79.56.02 2.15.23 3.17 1.71-.08.05-1.89 1.1-1.87 3.29zM14.19 4.6c.61-.74 1.02-1.77.91-2.8-.88.04-1.94.59-2.57 1.33-.56.65-1.06 1.7-.93 2.7.98.08 1.98-.5 2.59-1.23z"/></svg>`,
  enel:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 13 0 0 0 0 18M12 3a9 13 0 0 1 0 18M3.4 9h17.2M3.4 15h17.2"/></svg>`,
  instagram:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.6" cy="7.4" r="1" fill="currentColor" stroke="none"/></svg>`,
  tiktok:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.2a3.3 3.3 0 1 1-3-3.28"/><path d="M14 4.4c.5 2.2 2.1 3.7 4.4 3.9"/></svg>`,
  meta:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15.5c1.2-6.3 4.2-7 6.6-2.4C12 17.6 14 18 15.4 16M21 15.5c-1.2-6.3-4.2-7-6.6-2.4"/></svg>`
};

/* palettes match the archetype source files exactly */
const PALETTES = [
  ['Navy', {
    mode:'dark', star:STAR, shoot:'#C99A2E', shootOp:'1',
    '--bg':'#070c18','--bg2':'#0a1426','--fg':'#EAF1F8','--fg-dim':'#8b9cb0','--line':'rgba(234,241,248,.12)',
    '--card':'#FFFBEB','--card-fg':'#0c1626','--card-dim':'#4a5b6c','--card-line':'rgba(8,19,40,.12)','--card-shadow':'0 34px 80px -34px rgba(0,0,0,.82)',
    '--accent':'#5DCAA5','--accent-deep':'#2C8270','--on-accent':'#04140e','--eyebrow':'#C99A2E','--hook':'#C99A2E','--scrim':'#070c18',
    '--hero-base':`${STAR},linear-gradient(180deg,#04070d 0%,#070c18 58%,#0a1426 100%)`,'--hero-fg':'#F6FAFE','--hero-dim':'#8b9cb0',
    '--cta-base':`${STAR},linear-gradient(180deg,#0a1426 0%,#04070d 100%)`,'--cta-fg':'#F6FAFE',
    '--nav-fg':'#F6FAFE','--foot-bg':'#FFFBEB','--foot-fg':'#0c1626','--foot-line':'rgba(8,19,40,.12)'
  }],
  ['Petrol', {
    mode:'editorial', star:STAR_WARM, shoot:'#C99A2E', shootOp:'.9',
    '--bg':'#F2EDE1','--bg2':'#EAE3D2','--fg':'#1f2c3a','--fg-dim':'#6d6557','--line':'rgba(31,44,58,.14)',
    '--card':'#FAF6EC','--card-fg':'#1c2a3a','--card-dim':'#6b6456','--card-line':'rgba(28,42,58,.13)','--card-shadow':'0 24px 60px -32px rgba(13,42,44,.42)',
    '--accent':'#C05A38','--accent-deep':'#9E4326','--on-accent':'#FBF7EE','--eyebrow':'#C0A468','--hook':'#C05A38','--scrim':'#0d2a2c',
    '--hero-base':`${STAR_WARM},radial-gradient(130% 100% at 82% 18%,#1c5a5c 0%,transparent 58%),radial-gradient(90% 80% at 100% 100%,rgba(192,90,56,.22) 0%,transparent 55%),linear-gradient(150deg,#1c5a5c 0%,#134043 52%,#0d2a2c 100%)`,'--hero-fg':'#F3EEE2','--hero-dim':'#9bb2af',
    '--cta-base':`${STAR_WARM},radial-gradient(120% 140% at 50% 0%,#1c5a5c 0%,#0d2a2c 70%)`,'--cta-fg':'#F3EEE2',
    '--nav-fg':'#F3EEE2','--foot-bg':'#0d2a2c','--foot-fg':'#9bb2af','--foot-line':'rgba(243,238,226,.14)'
  }],
  ['Mint', {
    mode:'light', star:'', shoot:'#2A8585', shootOp:'.32',
    '--bg':'#FAF6EC','--bg2':'#EEF5F1','--fg':'#16243A','--fg-dim':'#4a5862','--line':'rgba(22,36,58,.13)',
    '--card':'#FFFFFF','--card-fg':'#16243A','--card-dim':'#4a5862','--card-line':'rgba(22,36,58,.14)','--card-shadow':'0 18px 46px -28px rgba(22,36,58,.34)',
    '--accent':'#2A8585','--accent-deep':'#1d6f6f','--on-accent':'#FBF7EE','--eyebrow':'#2A8585','--hook':'#2A8585','--scrim':'#FAF6EC',
    '--hero-base':'linear-gradient(170deg,#EAF4EE 0%,#FAF6EC 62%)','--hero-fg':'#16243A','--hero-dim':'#4a5862',
    '--cta-base':`${STAR},linear-gradient(160deg,#1d7570 0%,#13524E 100%)`,'--cta-fg':'#EAF4EE',
    '--nav-fg':'#16243A','--foot-bg':'#13524E','--foot-fg':'#bfe0d6','--foot-line':'rgba(234,244,238,.16)'
  }]
];

const KICKER = 'Now open &middot; Real-world evidence';

const STUDIES = {
  peptide: {
    label:'Peptides', name:'Peptide Study', glyph:'vial',
    hook:'The Peptide Study',
    tagline:'Thousands of data points above the noise.',
    caption:'"Peptide" as a search term is up over 600% this year, but AI just gives us recycled information. Our studies answer the questions the internet cannot.',
    ctaMicro:'Joining is free, we cover the cost of the testing, and the performance dashboard stays yours to keep.',
    brkLine:'We are gathering thousands of honest data points so the answer can finally come from the evidence, not the marketing.',
    heroImg:'peptide-hero.jpg',
    vc:{pct:69,label:'About 7 in 10 reported a measurable change.',a:'Measurable change 69%',b:'No change 31%',code:'STUDY 0001 &middot; effect index +0.42 &middot; 95% CI [0.36, 0.48]'},
    benefits:[
      ['check','An answer on what you paid for.','See whether the peptide is actually doing something, measured against where you started, instead of taking it on faith.'],
      ['shield','A read nobody is selling you.','An independent result, with no brand, creator, or seller standing behind the number.'],
      ['community','A say in the question your whole category is arguing about.','Your data helps settle whether these compounds work, and founding members get first access to every study and finding that follows.']
    ],
    faqs:[
      ['What do I actually have to do, and how long does it run?','Pick the protocol closest to what you already take, then spend about a minute a day on a short check-in covering energy, sleep, recovery, mood, and any side effects. Most protocols run 28 to 56 days. That is the whole commitment, so report honestly and let the numbers build against your own starting point.'],
      ['Do I keep my own peptide and dose, or does the study change it?','You keep your own. This is an observational study, so we watch what you are already doing rather than telling you to start, stop, or adjust a dose. You report it, and we measure it against where you began.'],
      ['Do you supply the peptide, or prescribe anything?','No, and we never will. You report only what you are already using, or planning to use under a physician supervision, and the study never sells or sources a thing. Having no stake in what you take is exactly what keeps the read honest.'],
      ['Is it safe, and should I involve my doctor?','Involve your doctor, because this is a decision to make with a clinician rather than with us. Peptides vary widely in quality, legality, and safety, and many are not cleared by the Food and Drug Administration. Please do not take part if you are pregnant, breastfeeding, trying to conceive, under 18, or in active cancer treatment without your oncologist clearance.']
    ],
    joinHead:'Report what you take. We measure what it does.',
    joinCaption:'You report the peptide you already use, we cover the cost of measuring it against your own baseline, and the performance dashboard is yours to keep.',
    steps:[
      ['Bring what you already take','Joining is free. You tell us the peptide and dose you are already using, and the study forms around what you actually do, rather than a protocol we hand you.'],
      ['We measure the baseline, and cover the cost','At no cost to you, we capture objective data before you start and again at the end, so the result rests on numbers instead of the marketing.'],
      ['The verdict is yours to keep','You walk away with your own dashboard and raw data, and we publish the effect and its interval for the whole cohort, including the cases where nothing moved.']
    ],
    protocols:[
      ['BPC-157','INTERMEDIATE &middot; 28 DAYS','A body-protective compound used for recovery and gut support.'],
      ['TB-500 (Thymosin Beta-4)','INTERMEDIATE &middot; 28 DAYS','Tissue repair and mobility.'],
      ['CJC-1295 with Ipamorelin','ADVANCED &middot; 28 DAYS','A growth-hormone secretagogue stack.'],
      ['GLP-1 agonist','INTERMEDIATE &middot; 56 DAYS','The semaglutide and tirzepatide appetite and metabolic class.'],
      ['GHK-Cu','BEGINNER &middot; 28 DAYS','A copper peptide for skin, hair, and tissue signaling.'],
      ['Add a custom protocol','CUSTOM','Describe what you are already doing and we will track it against your baseline.']
    ],
    interests:['Recovery','Longevity','Performance','Weight and metabolism','Skin and hair','Energy'],
    wishChips:['Does BPC-157 actually speed recovery?','Is my GLP-1 dose doing anything?','Are copper peptides worth it for skin?','How long until I should see a change?'],
    consent:'Report only what you are already using, or planning to use under a physician supervision. Do not take part if you are pregnant, breastfeeding, trying to conceive, under 18, or in active cancer treatment without oncology clearance. Many peptides are not approved by the Food and Drug Administration. This study is observational, and it is not medical advice, a diagnosis, or an endorsement. You can withdraw at any time.',
    payHook:'A first look at the peptide data.',
    payCaption:'These are early reads from the field, drawn from real-world data rather than marketing. Your own verdict and the full library open up the moment you join, and the cost is on us.',
    dataCards:[
      {tag:'Market signal', viz:'trend', title:'Demand is outrunning the evidence.', rows:[['Global market, 2025','$52.6B'],['GLP-1 share of US Rx spend','~14%'],['Search trajectory','Rising sharply']], note:'Market and prescription data, 2025.'},
      {tag:'Regulation', viz:'gauge', title:'The rules are being rewritten.', rows:[['FDA compounding review','Jul 2026'],['Peptides under review','7'],['Named in review','BPC-157, TB-500']], note:'Pending advisory committee decision.'},
      {tag:'Real-world reports', viz:'bars', title:'Strong demand, weak quality control.', rows:[['Most-cited goals','Recovery, appetite'],['Independent purity tests','Mislabeled dose found'],['Human outcome data','Scarce']], note:'Why a measured read matters.'}
    ],
    finalH:'See your peptide measured against the data, not the marketing.',
    finalP:'Join the study at no cost and watch your own results take shape alongside thousands of others, with a performance dashboard that stays yours to keep.'
  },

  fasting: {
    label:'Fasting', name:'Fasting Study', glyph:'clock',
    hook:'Does sugar fasting really change your life?',
    caption:'Most people who cut sugar say it changed their life, while a smaller number say it did nothing, and no one has measured why or for whom it works best. We are following thousands through the fasting they already practice, so the answer comes from the data, not the loudest comment.',
    ctaMicro:'Joining is free, we cover the cost of the measuring, and your result stays yours to keep.',
    brkLine:'We are following thousands of real people so the truth about the fast can come from the data, not the loudest comment.',
    heroImg:'fasting-hero.jpg',
    vc:{pct:61,label:'About 6 in 10 reported a measurable change.',a:'Measurable change 61%',b:'No change 39%',code:'STUDY 0002 &middot; effect index +0.30 &middot; 95% CI [0.18, 0.42]'},
    benefits:[
      ['check','Proof the discipline is worth it.','Find out what cutting sugar and tightening your eating window actually change for you, measured against where you started.'],
      ['shield','Your own answer, not the internet version.','An independent read, free of coaches, apps, and one-size protocols.'],
      ['community','A result you can keep.','Your data, published in full and yours to keep, with founding members first in line for everything that comes next.']
    ],
    faqs:[
      ['Do I follow my own schedule, or does the study set one?','You follow your own. Choose the pattern closest to what you already do, whether that is a daily eating window, cutting added sugar, or a couple of lighter days each week. We measure it against your baseline rather than handing you a plan.'],
      ['Do I have to change what or how I eat?','No. This is observational, so you report the eating pattern you already keep and we read the result against where you started. Nothing here tells you to start or stop eating a particular way.'],
      ['Is fasting safe for me?','For many adults it is, but it is not for everyone. Please talk to your clinician first if you take medication for blood sugar or blood pressure, are pregnant or breastfeeding, are under 18, or have a history of disordered eating. Stop and check in with a professional if anything feels wrong.'],
      ['What do I track, and do I need a device?','About a minute a day on how you feel covers it: energy, digestion and bloating, skin, sleep, and mood. No wearable is required, though you are welcome to fold one in if you already own it.']
    ],
    joinHead:'Report your fast. We measure what it changes.',
    joinCaption:'You keep the discipline, we cover the cost of measuring it against your own baseline, and the result is yours to keep, uninfluenced by anyone selling a plan.',
    steps:[
      ['Keep the pattern you already follow','Joining is free. You report the fasting or sugar-cutting routine you already practice, and we read it against your own baseline rather than putting you on a plan.'],
      ['We measure the change, and cover the cost','At no cost to you, we capture where you start and where you end, so the answer comes from the data and not from a coach or an app.'],
      ['The result is yours to keep','You keep your own numbers and dashboard, and we publish the effect across the whole cohort, including the people for whom it changed nothing.']
    ],
    protocols:[
      ['16:8 time-restricted eating','BEGINNER &middot; 28 DAYS','An eight-hour daily eating window.'],
      ['14:10 time-restricted eating','BEGINNER &middot; 28 DAYS','A gentler ten-hour window.'],
      ['Added-sugar fast','BEGINNER &middot; 28 DAYS','Cutting added and refined sugar from the day.'],
      ['Low-glycemic eating','INTERMEDIATE &middot; 28 DAYS','Holding the glycemic load down across meals.'],
      ['5:2 pattern','INTERMEDIATE &middot; 56 DAYS','Two lighter days across the week.'],
      ['Add a custom protocol','CUSTOM','Describe what you are already doing and we will track it against your baseline.']
    ],
    interests:['Weight and body fat','Skin','Bloating and digestion','Energy','Blood sugar','Appetite'],
    wishChips:['Does cutting sugar really clear skin?','Is 16:8 better than just eating less?','Why am I less bloated some weeks?','Does fasting actually help my energy?'],
    consent:'Take part only with an eating pattern that is safe for you. Talk to your clinician first if you take medication for blood sugar or blood pressure, are pregnant or breastfeeding, are under 18, or have a history of disordered eating. This study is observational, and it is not medical advice, a diagnosis, or a meal plan. You can withdraw at any time.',
    payHook:'A first look at the fasting data.',
    payCaption:'These are early reads from the trials and the field, the kind of pattern this study is built to confirm at scale. Your own verdict and the full library open up the moment you join, and the cost is on us.',
    dataCards:[
      {tag:'Expected effects', viz:'bars', title:'What the trials have shown.', rows:[['16:8 eating','Less fat, better insulin'],['Low-glycemic diet','Fewer acne lesions, lower IGF-1'],['Timeframe','Within 2 weeks']], note:'Randomized controlled trials.'},
      {tag:'What people chase', viz:'split', title:'The reasons people cut sugar.', rows:[['Bloating','Fewer heavy days'],['Energy','Steadier through the day'],['Skin','Clearer for many']], note:'Self-reported across cohorts.'},
      {tag:'The honest catch', viz:'gauge', title:'It does not work for everyone.', rows:[['Weight benefit','Needs fewer calories too'],['Response','Varies widely'],['We publish','The non-responders too']], note:'Real-world evidence, in full.'}
    ],
    finalH:'Find out whether the fast is changing your life, or just your feed.',
    finalP:'Join the study at no cost, measure your fast against where you started, and add your data to the largest real-world answer yet.'
  },

  circadian: {
    label:'Circadian', name:'Circadian Study', glyph:'sunrise',
    hook:'Will resetting your internal clock stop depression?',
    caption:'Light is the strongest signal for setting your internal clock, and small studies suggest resetting it can ease depression and anxiety and deepen sleep. No one has measured it across thousands of ordinary lives. That is what this study does, and the answer will belong to everyone.',
    ctaMicro:'Joining is free, we cover the cost of the measuring, and the data stays yours to keep.',
    brkLine:'We are measuring thousands of ordinary days so the effect of light can finally be known, not just believed.',
    heroImg:'circadian-hero.jpg',
    vc:{pct:58,label:'Almost 6 in 10 reported a measurable change.',a:'Measurable change 58%',b:'No change 42%',code:'STUDY 0003 &middot; effect index +0.24 &middot; 95% CI [0.11, 0.37]'},
    benefits:[
      ['check','Know if the rhythm is worth keeping.','See whether morning light and a dark evening really change how you feel and sleep, measured against your own baseline.'],
      ['shield','Your own answer, not a wellness trend.','An independent read, free of coaches, apps, and gadgets.'],
      ['community','A place in answering it for everyone.','Help build real evidence on what circadian alignment does, and as a founding member get early access to every study that follows.']
    ],
    faqs:[
      ['What do I actually have to do, and how long does it run?','Pick the habits closest to what you already do, such as morning daylight, a steady wake time, and a darker evening, then spend about a minute a day logging sleep, energy, and mood. Most protocols run 14 to 30 days, so report honestly and let the numbers build against your own starting point.'],
      ['Do I need special lights, glasses, or a device?','No. Morning daylight and ordinary evening dimming are enough. If you already own light-therapy gear or a wearable you are welcome to fold it in, but the study runs fine without any of it.'],
      ['Is this safe, and what if I have a sleep or mood condition?','This study is for education and information only, not medical advice. Please talk to your clinician first, especially if you have a diagnosed sleep disorder, bipolar disorder, or take related medication, since changing light timing can affect mood and sleep. You can withdraw at any time.'],
      ['What if my schedule is irregular, or I work shifts?','You can still take part. You report what your days actually look like, and irregular or shift schedules are exactly the kind of real-world pattern the study is built to read, measured against your own baseline.']
    ],
    joinHead:'Set your clock by the light. We measure what changes.',
    joinCaption:'Morning sun, a steady wake time, a dark evening. You keep the rhythm, we cover the cost of measuring it against your own baseline, and the data is yours to keep.',
    steps:[
      ['Keep the routine you already follow','Joining is free. You report the light and sleep habits you already keep, and we measure them against your own baseline instead of assigning a regimen.'],
      ['We measure the shift, and cover the cost','At no cost to you, we capture where you start and where you land, so the read rests on objective data rather than advice anyone is selling.'],
      ['The verdict is yours to keep','You keep your own dashboard and data, and we publish the effect across the whole cohort, including the nights and the people where nothing changed.']
    ],
    protocols:[
      ['Morning daylight','BEGINNER &middot; 14 DAYS','Ten to thirty minutes of outdoor light soon after waking.'],
      ['Steady wake time','BEGINNER &middot; 14 DAYS','The same wake time every day, weekends included.'],
      ['Digital sunset','BEGINNER &middot; 14 DAYS','Screens off and lights down before bed.'],
      ['Caffeine cutoff','INTERMEDIATE &middot; 14 DAYS','No caffeine after early afternoon.'],
      ['Dim evening light','INTERMEDIATE &middot; 14 DAYS','Low, warm light in the last hours of the day.'],
      ['Add a custom protocol','CUSTOM','Describe what you are already doing and we will track it against your baseline.']
    ],
    interests:['Falling asleep','Staying asleep','Morning energy','Anxiety and mood','Focus','Shift or travel'],
    wishChips:['Does morning light really change my sleep?','Is a screen curfew worth it?','Will this lower my anxiety?','How fast should I notice a difference?'],
    consent:'This study is for education and information only. Talk to your clinician first if you have a diagnosed sleep disorder, bipolar disorder, or take related medication, since changing light timing can affect mood and sleep. It is not medical advice, a diagnosis, or treatment. You can withdraw at any time.',
    payHook:'A first look at the circadian data.',
    payCaption:'These are early reads from the research and the field, the kind of signal this study is built to confirm at scale. Your own verdict and the full library open up the moment you join, and the cost is on us.',
    dataCards:[
      {tag:'Expected effects', viz:'trend', title:'What morning light appears to do.', rows:[['Peak morning cortisol','Up 20 to 40%'],['Per 30 min of AM sun','23 min earlier sleep'],['Felt as','Energy, earlier sleep']], note:'Light-exposure studies.'},
      {tag:'The evening half', viz:'bars', title:'Screens push your sleep later.', rows:[['Night blue light','Suppresses melatonin'],['Sleep onset','Delayed'],['Screen curfew','Earlier sleep for many']], note:'Trial evidence, varies by person.'},
      {tag:'What people are after', viz:'split', title:'The reasons people reset.', rows:[['Mood','Less anxiety'],['Sleep','Falling asleep faster'],['Mornings','More energy']], note:'Self-reported across cohorts.'}
    ],
    finalH:'Find out what resetting your clock actually does for you.',
    finalP:'Join the study at no cost, measure your days against where you started, and help answer a question that has never been settled on this scale.'
  }
};

const ORDER = ['peptide','fasting','circadian'];

/* shooting star overlay for the hero */
function shootSVG(pal){
  const c = pal.shoot, op = pal.shootOp;
  return `<svg class="shoot" viewBox="0 0 600 380" preserveAspectRatio="xMaxYMin meet" aria-hidden="true" style="opacity:${op}"><defs><linearGradient id="ss" x1="0" y1="0" x2="1" y2="0.62"><stop offset="0" stop-color="${c}" stop-opacity="0"/><stop offset=".8" stop-color="${c}" stop-opacity=".85"/><stop offset="1" stop-color="${c}" stop-opacity="1"/></linearGradient></defs><line x1="70" y1="18" x2="498" y2="248" stroke="url(#ss)" stroke-width="2.4" stroke-linecap="round"/><circle cx="498" cy="248" r="5.4" fill="${c}"/><circle cx="498" cy="248" r="13" fill="${c}" opacity=".22"/></svg>`;
}
/* teal wave band at the base of a dark cta */
const WAVES = `<svg class="waves" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0,52 C240,94 480,18 720,46 C960,74 1200,28 1440,54 L1440,120 L0,120Z" fill="#2a8585" opacity=".5"/><path d="M0,70 C240,110 480,36 720,62 C960,88 1200,44 1440,70 L1440,120 L0,120Z" fill="#3f9b91" opacity=".7"/><path d="M0,88 C240,126 480,54 720,78 C960,100 1200,60 1440,88 L1440,120 L0,120Z" fill="#5cbcae"/></svg>`;

/* small original pictograms for the data cards, kept compact so they never blow up on mobile */
function viz(name){
  const o='<svg class="dc-viz" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
  if(name==='trend') return o+'<path d="M3 17l5-5 4 3 7-8"/><path d="M16 4h5v5"/></svg>';
  if(name==='gauge') return o+'<path d="M4 18.5a8 8 0 1 1 16 0"/><path d="M12 18.5l4.5-5.5"/><circle cx="12" cy="18.5" r="1.5" fill="currentColor" stroke="none"/></svg>';
  if(name==='bars') return o+'<line x1="5" y1="20" x2="5" y2="13"/><line x1="12" y1="20" x2="12" y2="9"/><line x1="19" y1="20" x2="19" y2="5"/></svg>';
  if(name==='split') return o+'<circle cx="12" cy="12" r="8.5"/><path d="M12 12V3.5a8.5 8.5 0 0 1 7.4 4.3z" fill="currentColor" stroke="none"/></svg>';
  return '';
}

function rootVars(pal){
  return ':root{' + Object.entries(pal).filter(([k])=>k.startsWith('--')).map(([k,v])=>`${k}:${v}`).join(';') + '}';
}

function head(title, pal){
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gelasio:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}
${rootVars(pal)}
:root{--serif:Georgia,'Gelasio','Times New Roman',serif;--sans:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}
html{scroll-behavior:smooth}
body{font-family:var(--sans);background:var(--bg);color:var(--fg);-webkit-font-smoothing:antialiased;line-height:1.6}
.wrap{max-width:1120px;margin:0 auto;padding:0 26px}.col{max-width:760px}
a{color:inherit}
.label{font-family:var(--sans);font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--sans);font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:6px;cursor:pointer;border:1px solid transparent;transition:filter .15s,background .15s,color .15s,border-color .15s}
.btn-primary{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}.btn-primary:hover{filter:brightness(1.07)}
.btn-primary[aria-disabled=true]{opacity:.45;pointer-events:none}
h1,h2,h3,.vc-title,.brand,.kn,.qi h3,.tile h3,.card h3,.lockcard h4{font-family:var(--serif)}
/* nav over hero, no study tabs */
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 0 4px;position:relative;z-index:2}
.brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:18px;letter-spacing:.01em;color:var(--hero-fg);text-decoration:none}
.brand svg{width:21px;height:21px;color:var(--accent)}.brand sup{font-size:.5em;vertical-align:super;opacity:.6}
.nav .btn{padding:10px 19px;font-size:13.5px}
/* hero */
.hero{position:relative;overflow:hidden;color:var(--hero-fg);background:var(--hero-base)}
.shoot{position:absolute;top:0;right:0;width:64%;max-width:640px;height:78%;pointer-events:none;z-index:0}
.herogrid{display:grid;grid-template-columns:1fr;gap:40px;align-items:center;padding:38px 0 74px;position:relative;z-index:1}
.herogrid.areas{gap:26px;align-items:start;grid-template-areas:"top" "card" "copy"}
.herogrid.areas .h-top{grid-area:top}.herogrid.areas .h-card{grid-area:card}.herogrid.areas .h-copy{grid-area:copy}
.herogrid.areas .h-top .sub,.herogrid.areas .h-copy .sub{margin-top:0}
.h-kicker{color:var(--eyebrow);margin-bottom:20px}
.hero h1{font-weight:700;font-size:clamp(36px,5.6vw,58px);line-height:1.08;letter-spacing:-.012em;max-width:15ch;color:var(--hero-fg)}
.hero h1 em{font-style:normal;color:var(--hook)}
.hero .tagline{font-family:var(--serif);font-weight:400;font-size:clamp(22px,3.4vw,33px);line-height:1.2;color:var(--hero-fg);opacity:.95;margin-top:16px;max-width:20ch}
.hero .sub{font-size:17px;line-height:1.66;color:var(--hero-dim);max-width:54ch;margin-top:20px}
.hero .cta-row{margin-top:30px}
.micro{font-size:13.5px;color:var(--hero-dim);margin-top:14px;max-width:44ch}.micro b{color:var(--hero-fg);font-weight:700}
/* validated card */
.vcard{background:var(--card);color:var(--card-fg);border-radius:7px;padding:24px;max-width:440px;box-shadow:var(--card-shadow);border:1px solid var(--card-line)}
.vc-top{display:flex;align-items:center;gap:9px;margin-bottom:16px}
.vc-badge{width:19px;height:19px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;flex:none}.vc-badge svg{width:11px;height:11px;color:var(--on-accent)}
.vc-name{font-size:13px;font-weight:600}.vc-tag{margin-left:auto;font-size:9.5px;font-weight:700;letter-spacing:.15em;color:var(--card-dim);border:1px solid var(--card-line);border-radius:4px;padding:3px 8px}
.vc-title{font-weight:700;font-size:21px;line-height:1.28;margin-bottom:18px}
.vc-barlab{display:flex;justify-content:space-between;font-size:11px;font-weight:600;color:var(--card-dim);margin-bottom:7px}
.vc-bar{height:8px;border-radius:5px;overflow:hidden;background:rgba(120,120,120,.16)}.vc-bar i{display:block;height:100%;background:var(--accent)}
.vc-code{font-size:11px;letter-spacing:.02em;color:var(--card-dim);margin-top:18px;border-top:1px solid var(--card-line);padding-top:13px}
.vc-cap{font-size:12.5px;color:var(--card-dim);margin-top:11px;line-height:1.5}
/* sections */
.sec{padding:74px 0 18px}.sec .label{color:var(--eyebrow);margin-bottom:15px}
.sec h2{font-weight:700;font-size:clamp(27px,3.9vw,37px);line-height:1.16;letter-spacing:-.01em;max-width:22ch;color:var(--fg)}
.sec .lede{font-size:16.5px;line-height:1.62;color:var(--fg-dim);max-width:62ch;margin-top:15px}
.cards{display:grid;grid-template-columns:1fr;gap:18px;margin-top:40px}
.card{background:var(--card);color:var(--card-fg);border-radius:6px;padding:28px 26px 30px;border:1px solid var(--card-line)}
.card .ic{color:var(--accent);margin-bottom:18px}.card .ic svg{width:30px;height:30px}
.card.step{border-top:2px solid var(--accent)}
.card h3{font-weight:700;font-size:19px;line-height:1.3;margin-bottom:10px}.card p{font-size:14.5px;line-height:1.62;color:var(--card-dim)}
/* editorial points (brand-correct: hairline-separated, no boxes) */
.points{max-width:760px;margin-top:30px}
.point{padding:36px 0;border-top:1px solid var(--line)}.point:first-child{border-top:0;padding-top:6px}
.p-lead{font-family:var(--serif);font-weight:700;font-size:clamp(21px,3.1vw,27px);line-height:1.2;letter-spacing:-.01em;margin-bottom:12px;color:var(--fg)}
.p-sub{font-size:16.5px;line-height:1.64;color:var(--fg-dim);max-width:56ch}
/* faq static */
.qa{max-width:780px;margin-top:34px;display:grid;gap:2px}
.qi{border-top:1px solid var(--line);padding:24px 0}.qi:last-child{border-bottom:1px solid var(--line)}
.qi h3{font-weight:700;font-size:19px;line-height:1.34;margin-bottom:10px;color:var(--fg)}.qi p{font-size:15px;line-height:1.68;color:var(--fg-dim);max-width:68ch}
/* protocols + form */
.proto{display:flex;gap:15px;align-items:flex-start;padding:21px 0;border-top:1px solid var(--line);cursor:pointer}.proto:first-of-type{border-top:0}
.pbox{flex:none;width:20px;height:20px;border:1.5px solid var(--fg-dim);border-radius:4px;margin-top:3px;position:relative;transition:.15s}
.proto.sel .pbox{background:var(--accent);border-color:var(--accent)}.proto.sel .pbox::after{content:"";position:absolute;left:6px;top:2px;width:5px;height:9px;border:solid var(--on-accent);border-width:0 2px 2px 0;transform:rotate(45deg)}
.proto .pn{font-family:var(--serif);font-weight:700;font-size:18px;color:var(--fg)}.proto .pm{font-size:11.5px;font-weight:700;letter-spacing:.05em;color:var(--accent);margin:4px 0 6px}.proto .pd{font-size:14.5px;line-height:1.55;color:var(--fg-dim);max-width:62ch}
.form{max-width:660px}.field{margin:26px 0}.field>label{display:block;font-family:var(--serif);font-weight:700;font-size:18px;margin-bottom:6px;color:var(--fg)}.hint{font-size:13.5px;color:var(--fg-dim);margin-bottom:12px}.req{color:var(--accent)}
input[type=text],input[type=email],textarea,select{width:100%;font-family:var(--sans);font-size:16px;color:var(--fg);background:color-mix(in srgb,var(--card) 16%,var(--bg));border:1px solid var(--line);border-radius:6px;padding:13px 14px}
input:focus,textarea:focus,select:focus{outline:none;border-color:var(--accent)}textarea{min-height:92px;resize:vertical;line-height:1.5}
.sso{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:6px 0 4px}
.sso a{display:flex;align-items:center;justify-content:center;gap:10px;padding:13px;border-radius:6px;border:1px solid var(--line);background:color-mix(in srgb,var(--card) 16%,var(--bg));color:var(--fg);text-decoration:none;font-size:14.5px;font-weight:600}
.sso a:hover{border-color:var(--accent)}
.divider{display:flex;align-items:center;gap:14px;color:var(--fg-dim);font-size:13px;margin:22px 0 4px}.divider::before,.divider::after{content:"";flex:1;height:1px;background:var(--line)}
.chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:4px}.chip{font-family:var(--sans);font-size:14px;border:1px solid var(--line);background:color-mix(in srgb,var(--card) 16%,var(--bg));color:var(--fg);border-radius:100px;padding:8px 14px;cursor:pointer;transition:.15s}.chip.on{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.grid2{display:grid;grid-template-columns:1fr;gap:16px}.fl{display:block;font-size:13px;color:var(--fg-dim);margin-bottom:6px}
.privacy{background:color-mix(in srgb,var(--accent) 10%,var(--bg));border:1px solid color-mix(in srgb,var(--accent) 32%,transparent);border-radius:6px;padding:20px 22px;font-size:14px;color:var(--fg-dim);line-height:1.6;display:flex;gap:14px;align-items:flex-start}
.privacy svg{width:22px;height:22px;color:var(--accent);flex:none;margin-top:1px}.privacy b{color:var(--fg);font-weight:700}
.consent{background:var(--bg2);border:1px solid var(--line);border-radius:6px;padding:22px;margin-top:18px;font-size:13.5px;color:var(--fg-dim);line-height:1.6}.consent b{color:var(--fg)}
.check{display:flex;gap:11px;align-items:flex-start;margin-top:15px;cursor:pointer;font-size:14px;color:var(--fg)}.check input{margin-top:3px;width:17px;height:17px;accent-color:var(--accent);flex:none}
.form-note{font-size:14px;color:var(--accent);margin-top:14px;display:none}
/* payoff */
.tiles{display:grid;grid-template-columns:1fr;gap:18px;margin-top:40px}
.tile{background:var(--card);color:var(--card-fg);border-radius:6px;padding:26px;border:1px solid var(--card-line)}
.tile .n{font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--accent-deep);margin-bottom:14px}
.tile h3{font-weight:700;font-size:19px;line-height:1.28;margin-bottom:11px}.tile p{font-size:14.5px;line-height:1.64;color:var(--card-dim)}
.dcard{background:var(--card);color:var(--card-fg);border:1px solid var(--card-line);border-radius:6px;padding:22px 22px 16px;display:flex;flex-direction:column}
.dc-tag{font-family:var(--sans);font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent-deep);margin-bottom:14px}
.dc-viz{color:var(--accent);width:30px;height:30px;display:block;margin-bottom:14px}
.dc-title{font-family:var(--serif);font-weight:700;font-size:18px;line-height:1.26;margin-bottom:12px}
.dc-rows{display:grid;margin-top:auto}
.dc-row{display:flex;justify-content:space-between;gap:14px;align-items:baseline;padding:9px 0;border-top:1px solid var(--card-line)}
.dc-l{font-family:var(--sans);font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--card-dim);flex:none;max-width:52%}
.dc-v{font-family:var(--sans);font-size:13.5px;font-weight:600;color:var(--card-fg);text-align:right}
.dc-note{font-family:var(--sans);font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--card-dim);margin-top:14px;padding-top:11px;border-top:1px solid var(--card-line);opacity:.8}
.locks{display:grid;grid-template-columns:1fr;gap:16px;margin-top:24px}
.lockcard{position:relative;background:var(--card);border:1px dashed var(--card-line);border-radius:6px;padding:26px;color:var(--card-fg);overflow:hidden}
.lockcard .blur{filter:blur(5px);opacity:.5;user-select:none}
.lockcard .blur .bn{font-family:var(--sans);font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--accent-deep);margin-bottom:12px}
.lockcard .blur h4{font-weight:700;font-size:17px;margin-bottom:9px}.lockcard .blur p{font-size:14px;line-height:1.6;color:var(--card-dim)}
.lockcard .over{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center}
.lockcard .over svg{width:24px;height:24px;color:var(--accent)}.lockcard .over span{font-size:13px;font-weight:700;letter-spacing:.05em;color:var(--card-fg)}
.kgrid{max-width:780px;margin-top:30px}.krow{display:flex;justify-content:space-between;align-items:baseline;gap:18px;padding:21px 0;border-top:1px solid var(--line)}.krow:first-of-type{border-top:0}
.kn{font-weight:700;font-size:18px;color:var(--fg)}.ks{font-size:14px;color:var(--fg-dim);margin-top:3px}.ka{font-size:11.5px;font-weight:700;letter-spacing:.05em;color:var(--accent);white-space:nowrap;text-transform:uppercase}
/* final cta with celestial waves */
.cta{position:relative;overflow:hidden;text-align:center;padding:82px 26px 132px;background:var(--cta-base);color:var(--cta-fg)}
.cta .inner{position:relative;z-index:1}
.cta h2{font-weight:700;font-size:clamp(28px,4.4vw,42px);line-height:1.18;max-width:19ch;margin:0 auto;color:var(--cta-fg)}
.cta p{font-size:16px;color:color-mix(in srgb,var(--cta-fg) 72%,transparent);max-width:50ch;margin:17px auto 0;line-height:1.6}.cta .btn{margin-top:28px}
.waves{position:absolute;left:0;right:0;bottom:0;width:100%;height:120px;display:block;z-index:0}
/* footer */
footer{background:var(--foot-bg);color:var(--foot-fg);padding:34px 26px 40px}
.foot-in{max-width:1120px;margin:0 auto;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}
.foot-in .fm{display:flex;align-items:center;gap:8px;font-family:var(--serif);font-weight:700;font-size:16px}.foot-in .fm svg{width:18px;height:18px;color:var(--accent)}
.foot-links{display:flex;flex-wrap:wrap;gap:16px}.foot-links a{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--foot-fg);text-decoration:none;opacity:.62}.foot-links a:hover{opacity:1}
.foot-sw{margin-top:14px;border-top:1px solid var(--foot-line);padding-top:14px;font-size:11.5px;letter-spacing:.06em;opacity:.7}.foot-sw a{color:var(--foot-fg);text-decoration:none;border-bottom:1px solid var(--foot-line)}.foot-sw a.cur{color:var(--accent);border-bottom-color:var(--accent)}
/* slim banner (join + payoff; the big celestial header is landing-only) */
.banner{background:var(--foot-bg);color:var(--foot-fg);border-bottom:1px solid var(--foot-line);position:sticky;top:0;z-index:20}
.bnr{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px 0}
.bnr .brand{color:var(--foot-fg)}.bnr .brand svg{color:var(--accent)}
.bnr-x{display:flex;align-items:center;gap:16px}
.bnr-study{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;opacity:.7}
.bnr .btn{padding:9px 17px;font-size:13px}
.jointop{padding:46px 0 8px}.join-h{font-family:var(--serif);font-weight:700;font-size:clamp(28px,4.4vw,40px);line-height:1.12;letter-spacing:-.012em;max-width:18ch}
/* signup block (the prominent join, with real account) */
.signup{background:var(--card);color:var(--card-fg);border:1px solid var(--card-line);border-radius:8px;padding:24px 22px;max-width:440px;box-shadow:var(--card-shadow)}
.signup .sso{display:grid;gap:10px;margin-bottom:4px}
.signup .ssoBtn{display:flex;align-items:center;justify-content:center;gap:10px;padding:13px;border-radius:6px;border:1px solid var(--card-line);background:transparent;color:var(--card-fg);text-decoration:none;font-size:14.5px;font-weight:600}
.signup .ssoBtn:hover{border-color:var(--accent)}
.signup .divider{display:flex;align-items:center;gap:12px;color:var(--card-dim);font-size:12.5px;margin:16px 0 6px}.signup .divider::before,.signup .divider::after{content:"";flex:1;height:1px;background:var(--card-line)}
.sfield{margin:13px 0}.sfield label{display:block;font-size:12px;font-weight:700;letter-spacing:.04em;color:var(--card-dim);margin-bottom:6px}
.sfield input{width:100%;font-family:var(--sans);font-size:16px;color:var(--card-fg);background:color-mix(in srgb,var(--card-fg) 4%,var(--card));border:1px solid var(--card-line);border-radius:6px;padding:12px 13px}
.sfield input:focus{outline:none;border-color:var(--accent)}
.signup .check{color:var(--card-fg)}.signup .su-btn{width:100%;justify-content:center;margin-top:16px}
.su-note{font-size:13px;color:var(--accent);margin-top:11px;display:none}
.su-fine{font-size:12px;color:var(--card-dim);margin-top:11px;line-height:1.5}
/* library glimpse strip */
.libstrip{display:grid;grid-template-columns:1fr;gap:18px;margin-top:30px}
.libshot{border:1px solid var(--card-line);border-radius:8px;overflow:hidden;background:#070c18}
.libshot img{display:block;width:100%;height:auto}
.libshot figcaption{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--fg-dim);padding:12px 14px}
/* dark celestial mid-page break */
.brk{position:relative;overflow:hidden;color:#F6FAFE;padding:clamp(58px,9vw,94px) 26px;text-align:center;background:${STAR},radial-gradient(120% 90% at 78% 0%,rgba(201,154,46,.16),transparent 60%),linear-gradient(180deg,#0a1426 0%,#04070d 52%,#0a1426 100%)}
.brk-in{position:relative;z-index:1;max-width:740px;margin:0 auto}
.brk-eye{font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#C99A2E;margin-bottom:16px}
.brk-line{font-family:var(--serif);font-weight:500;font-size:clamp(22px,3.5vw,33px);line-height:1.3;letter-spacing:-.01em;max-width:25ch;margin:0 auto;color:#F6FAFE}
.brk-shoot{position:absolute;top:0;right:0;width:52%;max-width:480px;height:82%;pointer-events:none;z-index:0}
/* hero background photo with a contrast scrim so text stays readable */
.hero.has-img::before{content:"";position:absolute;inset:0;background-image:var(--heroimg);background-size:cover;background-position:center right;opacity:.5;z-index:0}
.hero-scrim{position:absolute;inset:0;z-index:0;background:linear-gradient(90deg,var(--scrim) 0%,var(--scrim) 36%,color-mix(in srgb,var(--scrim) 62%,transparent) 64%,color-mix(in srgb,var(--scrim) 14%,transparent) 100%),linear-gradient(0deg,var(--scrim),transparent 46%)}
/* why us, small bullets */
.whylist{list-style:none;max-width:760px;margin-top:26px}
.whylist li{padding:22px 0 22px 28px;border-top:1px solid var(--line);position:relative;font-size:16px;line-height:1.6;color:var(--fg-dim)}
.whylist li:first-child{border-top:0}
.whylist li::before{content:"";position:absolute;left:2px;top:30px;width:8px;height:8px;border-radius:50%;background:var(--accent)}
.whylist li b{color:var(--fg);font-weight:700}
.join-lead{font-family:var(--serif);font-weight:500;font-size:clamp(20px,3vw,27px);line-height:1.3;max-width:30ch;color:var(--fg);margin-top:6px}
.signup.wide{max-width:760px;margin-top:18px}
.su-side-h{font-size:12px;font-weight:700;letter-spacing:.04em;color:var(--card-dim);margin-bottom:10px}
.su-side{margin-top:18px}
/* library thumbnail grid (all 13, linking to gated library landing pages) */
.libgrid{display:grid;grid-template-columns:1fr;gap:14px;margin-top:30px}
.libcard{display:block;text-decoration:none;color:var(--card-fg);background:var(--card);border:1px solid var(--card-line);border-radius:8px;overflow:hidden;transition:border-color .15s,transform .15s}
.libcard:hover{border-color:var(--accent);transform:translateY(-2px)}
.lc-vis{position:relative;height:74px;background:radial-gradient(120% 130% at 80% 0%,color-mix(in srgb,var(--accent) 30%,transparent),transparent 60%),linear-gradient(180deg,#0a1426,#070c18);display:flex;align-items:center;padding:0 16px;gap:12px}
.lc-mark svg{width:20px;height:20px;color:var(--accent)}
.lc-bars{flex:1;display:flex;flex-direction:column;gap:5px;max-width:130px}.lc-bars i{display:block;height:4px;border-radius:3px;background:var(--accent);opacity:.85}
.lc-body{padding:14px 16px 16px}
.lc-name{font-family:var(--serif);font-weight:700;font-size:17px;margin-bottom:5px}
.lc-desc{font-size:13.5px;line-height:1.5;color:var(--card-dim)}
.lc-go{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-deep);margin-top:12px}
.lc-shot{display:block;width:100%;height:150px;object-fit:cover;object-position:top;border-bottom:1px solid var(--card-line);background:#0a1530}
.gate-shot-wrap{position:relative;max-height:560px;overflow:hidden}
.gate-shot{display:block;width:100%;height:auto;object-position:top}
/* gated library landing */
.gatewrap{padding:14px 0 70px}.gate{position:relative;max-width:680px;border:1px solid rgba(234,241,248,.14);border-radius:10px;overflow:hidden;background:#0a1530;color:#EAF1F8}
.gate-peek{padding:24px 26px 30px}
.gp-crumb{font-size:12px;font-weight:600;letter-spacing:.03em;color:#8b9cb0;margin-bottom:16px}
.gp-entry{border:1px solid rgba(234,241,248,.12);border-radius:10px;padding:22px;background:rgba(255,255,255,.02)}
.gp-entry-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:16px}
.gp-name{font-family:var(--serif);font-weight:700;font-size:25px;color:#F6FAFE}
.gp-pill{font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5DCAA5;border:1px solid rgba(93,202,165,.45);border-radius:100px;padding:4px 11px;white-space:nowrap}
.gp-metric{margin-bottom:14px}
.gp-mlab{display:flex;justify-content:space-between;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px}
.gp-mlab span:first-child{color:#8b9cb0}.gp-mlab span:last-child{color:#5DCAA5}
.gp-bar{height:8px;border-radius:5px;background:rgba(234,241,248,.1);overflow:hidden}.gp-bar i{display:block;height:100%;background:#5DCAA5}.gp-bar.gold i{background:#C99A2E}
.gp-intel{margin-top:18px;padding-top:16px;border-top:1px solid rgba(234,241,248,.12)}
.gp-intel-h{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#8b9cb0;margin-bottom:11px}
.gp-ir{display:flex;align-items:center;gap:9px;font-size:14.5px;color:#EAF1F8;margin-bottom:7px}.gp-ir .dot{width:8px;height:8px;border-radius:50%;flex:none}.gp-ir .dot.teal{background:#5DCAA5}.gp-ir .dot.gold{background:#C99A2E}
.gp-fine{font-size:12px;color:#8b9cb0;margin-top:4px}
.gp-sections{margin-top:14px}
.gp-sections div{padding:15px 2px;border-top:1px solid rgba(234,241,248,.1);font-size:15px;color:#cdd8e6;display:flex;justify-content:space-between}
.gp-sections div::after{content:"+";color:#5DCAA5}
.gate-fade{position:absolute;left:0;right:0;bottom:176px;height:150px;background:linear-gradient(180deg,rgba(10,21,48,0),#0a1530);pointer-events:none;z-index:1}
.gatewall{position:relative;padding:24px 28px 30px;border-top:1px solid rgba(234,241,248,.14);text-align:center;background:#0a1530}
.gw-eye{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#C99A2E;margin-bottom:12px}
.gw-h{font-family:var(--serif);font-weight:700;font-size:clamp(20px,3vw,26px);line-height:1.22;max-width:24ch;margin:0 auto 12px;color:#F6FAFE}
.gw-p{font-size:14.5px;line-height:1.6;color:#8b9cb0;max-width:54ch;margin:0 auto 20px}
@media(min-width:880px){
  .herogrid{grid-template-columns:1.05fr .95fr;gap:54px;padding:46px 0 92px}
  .herogrid.areas{grid-template-columns:1.05fr .95fr;gap:0 54px;align-items:center;grid-template-areas:"top card" "copy card"}
  .cards{grid-template-columns:1fr 1fr 1fr}.tiles{grid-template-columns:1fr 1fr 1fr}.locks{grid-template-columns:1fr 1fr 1fr}.grid2{grid-template-columns:1fr 1fr}
  .libstrip{grid-template-columns:1fr 1fr 1fr;gap:20px}
  .libgrid{grid-template-columns:1fr 1fr 1fr;gap:16px}
  .signup.wide{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:start}
  .signup.wide .su-side{margin-top:0;border-left:1px solid var(--card-line);padding-left:26px}
}
</style></head><body>`;
}

function heroOpen(s, pal, gridmod){
  return `<section class="hero${s.heroImg?' has-img':''}" id="top"${s.heroImg?` style="--heroimg:url('../assets/${s.heroImg}')"`:''}>${s.heroImg?'<span class="hero-scrim"></span>':''}${shootSVG(pal)}<div class="wrap"><nav class="nav"><a class="brand" href="${s.key}_landing.html">${ICON.enel}Ēnel Health<sup>&reg;</sup></a><a class="btn btn-primary" href="${s.key}_join.html">Join the study</a></nav><div class="herogrid${gridmod?(' '+gridmod):''}">`;
}
function footer(s, palName, page){
  const sw = PALETTES.map(([p])=>`<a class="${p===palName?'cur':''}" href="../${p}/${s.key}_${page}.html">${p}</a>`).join(' &middot; ');
  const studyLinks = ORDER.map(k=>`<a href="${k}_landing.html">${STUDIES[k].label}</a>`).join('');
  return `<footer><div class="foot-in"><span class="fm">${ICON.enel}Ēnel Health<sup style="font-size:.5em;vertical-align:super;opacity:.6">&reg;</sup></span>
<span class="foot-links">${studyLinks}<a href="${s.key}_landing.html">Overview</a><a href="${s.key}_join.html">Join</a><a href="${s.key}_payoff.html">Result</a></span></div>
<div class="foot-in"><div class="foot-sw">Palette &middot; ${sw}</div></div></footer></body></html>`;
}
function vcardHTML(s){
  return `<div class="vcard"><div class="vc-top"><span class="vc-badge">${ICON.check}</span><span class="vc-name">Ēnel Validated</span><span class="vc-tag">SAMPLE</span></div>
<div class="vc-title">${s.vc.label}</div><div class="vc-barlab"><span>${s.vc.a}</span><span>${s.vc.b}</span></div>
<div class="vc-bar"><i style="width:${s.vc.pct}%"></i></div><div class="vc-code">${s.vc.code}</div>
<div class="vc-cap">An illustrative example of the verdict you would see, or not. We publish the null results too.</div></div>`;
}
function ctaBlock(s){
  return `<section class="cta"><div class="inner"><h2>${s.finalH}</h2><p>${s.finalP}</p><a class="btn btn-primary" href="${s.key}_join.html">Join the study</a></div>${WAVES}</section>`;
}
/* slim banner for join + payoff (no big header on those pages) */
function banner(s, ctaHref, ctaText){
  return `<header class="banner"><div class="wrap bnr"><a class="brand" href="${s.key}_landing.html">${ICON.enel}Ēnel Health<sup>&reg;</sup></a><span class="bnr-x"><span class="bnr-study">${s.label} study</span><a class="btn btn-primary" href="${ctaHref}">${ctaText}</a></span></div></header>`;
}
/* the prominent signup, with a real account (username, email, password) plus SSO */
function signupBlock(s){
  return `<div class="signup wide" id="signup">
    <div class="su-main">
      <div class="sfield"><label>Username</label><input type="text" class="su-req" placeholder="Pick a username"></div>
      <div class="sfield"><label>Email</label><input type="email" class="su-req" placeholder="you@example.com"></div>
      <div class="sfield"><label>Password</label><input type="password" class="su-req" placeholder="Create a password"></div>
      <label class="check"><input type="checkbox" class="su-consent"><span>I agree to the consent and the terms of using Ēnel Health.</span></label>
      <button class="btn btn-primary su-btn" aria-disabled="true">Create my account and join</button>
      <p class="su-note">Demo only. Nothing was submitted.</p>
      <p class="su-fine">We email a confirmation link to verify your account, then your result opens. Your data stays yours and is never sold.</p>
    </div>
    <div class="su-side">
      <p class="su-side-h">Or sign up in one tap</p>
      <div class="sso"><a href="#" class="ssoBtn">${ICON.google}Google</a><a href="#" class="ssoBtn">${ICON.apple}Apple</a><a href="#" class="ssoBtn">${ICON.instagram}Instagram</a><a href="#" class="ssoBtn">${ICON.tiktok}TikTok</a><a href="#" class="ssoBtn">${ICON.meta}Meta</a></div>
    </div>
  </div>`;
}
/* a glimpse of the real libraries (named ones the user asked for) */
function libStrip(){
  const shots=[['lib-peptide.png','Peptide library'],['lib-natural.png','Natural medicine library'],['lib-fasting.png','Fasting library']];
  return `<div class="libstrip">${shots.map(([f,alt])=>`<figure class="libshot"><img src="../assets/${f}" alt="${alt}" loading="lazy"><figcaption>${alt}</figcaption></figure>`).join('')}</div>`;
}
/* dark medium celestial break */
function breakBlock(s){
  return `<section class="brk"><svg class="brk-shoot" viewBox="0 0 600 360" preserveAspectRatio="xMaxYMin meet" aria-hidden="true"><defs><linearGradient id="bs" x1="0" y1="0" x2="1" y2="0.6"><stop offset="0" stop-color="#C99A2E" stop-opacity="0"/><stop offset=".82" stop-color="#C99A2E" stop-opacity=".82"/><stop offset="1" stop-color="#C99A2E"/></linearGradient></defs><line x1="84" y1="22" x2="486" y2="232" stroke="url(#bs)" stroke-width="2.2" stroke-linecap="round"/><circle cx="486" cy="232" r="5" fill="#C99A2E"/><circle cx="486" cy="232" r="12" fill="#C99A2E" opacity=".2"/></svg><div class="brk-in"><p class="brk-eye">Real-world evidence, in the open</p><p class="brk-line">${s.brkLine}</p></div></section>`;
}
const SIGNUP_SCRIPT = `<script>(function(){document.querySelectorAll('.signup').forEach(function(box){var reqs=box.querySelectorAll('.su-req'),c=box.querySelector('.su-consent'),b=box.querySelector('.su-btn'),n=box.querySelector('.su-note');function g(){var ok=c.checked;reqs.forEach(function(i){if(!i.value.trim())ok=false});b.setAttribute('aria-disabled',ok?'false':'true')}reqs.forEach(function(i){i.addEventListener('input',g)});c.addEventListener('change',g);b.addEventListener('click',function(e){e.preventDefault();if(b.getAttribute('aria-disabled')==='true')return;n.style.display='block'});g()});document.querySelectorAll('[data-chipset] .chip').forEach(function(c){c.addEventListener('click',function(){c.classList.toggle('on')})});document.querySelectorAll('.proto').forEach(function(x){x.addEventListener('click',function(){x.classList.toggle('sel')})});})();</script>`;

/* the 13 libraries, shown as a thumbnail grid that links out to gated library landing pages */
const LIBRARIES = [
  ['Peptides','peptides','Every compound, with the evidence and the influence behind it.','BPC-157'],
  ['Supplements','supplements','What the label promises against what the trials show.','Creatine'],
  ['Healing Traditions','healing-traditions','Remedies and their real evidence, side by side.','Ashwagandha'],
  ['Circadian Rhythm','circadian','Light, sleep, and the clock that sets them.','Morning light'],
  ['Fasting','fasting','Every protocol, compared without the hype.','16:8 eating'],
  ['Mental Health','mental-health','What actually moves anxiety, mood, and focus.','L-theanine'],
  ['Probiotics','probiotics','Strains, claims, and what the gut data says.','L. rhamnosus'],
  ['Kids Vitamins','kids','What is worth giving children, and what is not.','Vitamin D drops'],
  ['Prenatal and Maternal','maternal','Evidence for the months that matter most.','Folate'],
  ['Devices','devices','Wearables and protocols, measured honestly.','Red light therapy'],
  ['Touch Healing','touch','Hands-on and analog modalities, examined.','Acupressure'],
  ['Regulatory Atlas','regulatory','The world atlas of what is allowed, and where.','Compounded peptides'],
  ['Cost of Care','cost','What care really costs, and why.','An MRI scan']
];
function libGrid(){
  return `<div class="libgrid">${LIBRARIES.map(([name,slug,desc])=>`<a class="libcard" href="../libraries/${slug}.html"><img class="lc-shot" src="../assets/libshot-${slug}.png" alt="${name} library" loading="lazy"><div class="lc-body"><div class="lc-name">${name}</div><div class="lc-desc">${desc}</div><div class="lc-go">Preview, gated &rarr;</div></div></a>`).join('')}</div>`;
}
/* a gated library landing page (preview, then a paywall like a subscriber site) */
function gatePage(name, slug, desc, sample){
  const pal = PALETTES[0][1]; // Navy celestial for every library gate
  return head(`Ēnel Health · ${name} library`, pal) +
  `<header class="banner"><div class="wrap bnr"><a class="brand" href="../Navy/index.html">${ICON.enel}Ēnel Health<sup>&reg;</sup></a><span class="bnr-x"><span class="bnr-study">Library</span><a class="btn btn-primary" href="../Navy/peptide_landing.html">Join for access</a></span></div></header>
  <section class="hero" id="top">${shootSVG(pal)}<div class="wrap"><div class="herogrid"><div>
    <p class="label h-kicker" style="color:var(--eyebrow)">Ēnel Library &middot; Early access</p>
    <h1>The ${name} library.</h1>
    <p class="sub">${desc} Here is a real entry from inside. Join to open the rest.</p>
  </div><div></div></div></div></section>
  <section class="gatewrap"><div class="wrap col">
    <div class="gate">
      <div class="gate-shot-wrap"><img class="gate-shot" src="../assets/libshot-${slug}.png" alt="${name} library"></div>
      <div class="gate-fade"></div>
      <div class="gatewall">
        <p class="gw-eye">Early access</p>
        <h2 class="gw-h">The rest of this library unlocks when you join.</h2>
        <p class="gw-p">Founding members get early access to all thirteen libraries. Join with Google, Apple, or your email, answer a few questions, and the full library opens.</p>
        <a class="btn btn-primary" href="../Navy/peptide_landing.html">Join for early access</a>
      </div>
    </div>
  </div></section>
  <footer><div class="foot-in"><span class="fm">${ICON.enel}Ēnel Health<sup style="font-size:.5em;vertical-align:super;opacity:.6">&reg;</sup></span><span class="foot-links"><a href="../Navy/peptide_landing.html">Join a study</a></span></div></footer></body></html>`;
}

function landing(s, pal, palName){
  const faqs = s.faqs.map(([q,a])=>`<div class="qi"><h3>${q}</h3><p>${a}</p></div>`).join('');
  return head(`Ēnel Health · ${s.name}`, pal) + heroOpen(s, pal, 'areas') +
  `<div class="h-top"><p class="label h-kicker">${KICKER}</p><h1>${s.hook}</h1>${s.tagline?`<p class="tagline">${s.tagline}</p>`:''}</div>
  <div class="h-card">${vcardHTML(s)}<div class="cta-row" style="margin-top:18px"><a class="btn btn-primary" href="${s.key}_join.html">Join the study</a></div></div>
  <div class="h-copy"><p class="sub">${s.caption}</p><p class="micro">${s.ctaMicro}</p></div>
  </div></div></section>` +
  breakBlock(s) +
  `<section class="sec"><div class="wrap col"><p class="label">Why Ēnel Health</p><h2>Why join us.</h2>
    <ul class="whylist">
      <li><b>Evidence, not marketing.</b> We measure what people actually do and publish all of it, including the results that show nothing.</li>
      <li><b>Built with the experts.</b> A growing advisory board of clinicians and researchers, with contributors from across medicine, stands behind every study.</li>
      <li><b>A library unlike anything online.</b> Thirteen evidence libraries and a full pipeline of studies, in one place and in the open.</li>
    </ul></div></section>
  <section class="sec"><div class="wrap col"><p class="label">FAQ</p><h2>Common questions before you join.</h2><div class="qa">${faqs}</div></div></section>` +
  ctaBlock(s) + footer(s, palName, 'landing');
}

function join(s, pal, palName){
  const interests = s.interests.map(t=>`<button type="button" class="chip">${t}</button>`).join('');
  const communities = ['Marathon training','Gut health','Longevity','Sleep','Metabolic health','Mental wellbeing'].map(t=>`<button type="button" class="chip">${t}</button>`).join('');
  return head(`Ēnel Health · ${s.name} · Join`, pal) + banner(s, '#enroll', 'Sign up') +
  `<section class="sec jointop" id="enroll"><div class="wrap col"><p class="label">${s.label} study &middot; Sign up</p>
    <h1 class="join-h">Create your account, and unlock it all.</h1>
    <p class="lede">It takes a minute. You get your own result, early access to all thirteen libraries, and a place among people doing the same.</p>
    <div class="form" style="margin-top:10px">
      <div class="field"><label>What are you hoping to change?</label><div class="hint">Tap any that apply.</div><div class="chips" data-chipset>${interests}</div></div>
      <div class="field"><label>Would you join our communities?</label><div class="hint">Marathon training, gut health, and more are coming online. Tap any you would join.</div><div class="chips" data-chipset>${communities}</div></div>
      ${signupBlock(s)}
    </div></div></section>
  <section class="sec"><div class="wrap"><p class="label">What joining unlocks</p><h2>Thirteen libraries, yours the moment you join.</h2>
    <p class="lede">Open any one now for a preview; the full library stays gated, like a subscriber site, until you join.</p>
    ${libGrid()}</div></section>` +
  footer(s, palName, 'join') + SIGNUP_SCRIPT;
}

function payoff(s, pal, palName){
  const tiles = s.dataCards.map(c=>`<div class="dcard"><div class="dc-tag">${c.tag}</div>${viz(c.viz)}<div class="dc-title">${c.title}</div><div class="dc-rows">${c.rows.map(([l,v])=>`<div class="dc-row"><span class="dc-l">${l}</span><span class="dc-v">${v}</span></div>`).join('')}</div><div class="dc-note">${c.note}</div></div>`).join('');
  const locked = [
    ['YOUR DASHBOARD','Your performance dashboard','Your numbers against your baseline, tracked over time, in one place.'],
    ['CURATED FOR YOU','Curated results and more','Findings, protocols, and libraries matched to your goals as the data grows.'],
    ['THE COMMUNITY','Professionals and health leaders','A community of people sharing more, building the evidence together.']
  ].map(([bn,h,p])=>`<div class="lockcard"><div class="blur"><div class="bn">${bn}</div><h4>${h}</h4><p>${p}</p></div><div class="over">${ICON.lock}<span>Unlock by joining</span></div></div>`).join('');
  return head(`Ēnel Health · ${s.name} · Result`, pal) + banner(s, `${s.key}_join.html`, 'Join the study') +
  `<section class="sec" style="padding-top:46px"><div class="wrap"><div class="tiles">${tiles}</div></div></section>
  <section class="sec"><div class="wrap"><p class="label">Build your profile</p><h2>What opens up once you join.</h2>
    <p class="lede">Build your profile and you unlock your performance dashboard, curated results, and a community of professionals and health leaders, all for sharing more.</p><div class="locks">${locked}</div></div></section>
  <section class="sec"><div class="wrap col"><p class="label">Founding members</p><h2>The top tier, for the people who show up first.</h2>
    <p class="lede">Founding membership is the premium level, and it stays that way. You keep your own data, and you unlock exclusive access, VIP programs, and a real hand in the work itself.</p>
    <div class="kgrid">
      <div class="krow"><div><div class="kn">Exclusive access</div><div class="ks">First into every new study and the findings the moment they land.</div></div><span class="ka">Founding tier</span></div>
      <div class="krow"><div><div class="kn">VIP programs and benefits</div><div class="ks">Member-only features, perks, and priority across the platform.</div></div><span class="ka">Founding tier</span></div>
      <div class="krow"><div><div class="kn">Collaborate and be featured</div><div class="ks">Chances to help shape the studies, share your story, and be featured.</div></div><span class="ka">Founding tier</span></div>
      <div class="krow"><div><div class="kn">Your data, yours to keep</div><div class="ks">Your full dataset and the cohort report, downloadable anytime.</div></div><span class="ka">CSV &middot; PDF</span></div>
    </div></div></section>` +
  ctaBlock(s) + footer(s, palName, 'payoff');
}

let count = 0;
PALETTES.forEach(([palName, pal])=>{
  const dir = path.join(OUT, palName);
  fs.mkdirSync(dir, {recursive:true});
  ORDER.forEach(key=>{
    const s = Object.assign({key}, STUDIES[key]);
    fs.writeFileSync(path.join(dir, `${key}_landing.html`), landing(s, pal, palName));
    fs.writeFileSync(path.join(dir, `${key}_join.html`), join(s, pal, palName));
    fs.writeFileSync(path.join(dir, `${key}_payoff.html`), payoff(s, pal, palName));
    count += 3;
  });
  const idx = `${head('Ēnel Health · Landing Pages · '+palName, pal)}
  <section class="sec" style="padding-top:54px"><div class="wrap"><p class="label">${palName} palette</p><h2>Ēnel Health landing pages.</h2>
  <div class="cards">${ORDER.map(k=>{const st=STUDIES[k];return `<div class="card"><div class="ic">${ICON[st.glyph]}</div><h3>The ${k} study is open.</h3><p style="margin:12px 0 16px">${st.label}</p><p style="font-size:13px"><a href="${k}_landing.html" style="color:var(--accent);font-weight:700">Landing</a> &middot; <a href="${k}_join.html" style="color:var(--accent);font-weight:700">Join</a> &middot; <a href="${k}_payoff.html" style="color:var(--accent);font-weight:700">Result</a></p></div>`}).join('')}</div>
  <div class="foot-sw" style="margin-top:30px;border:0">Palette &middot; ${PALETTES.map(([p])=>`<a class="${p===palName?'cur':''}" style="text-decoration:none" href="../${p}/index.html">${p}</a>`).join(' &middot; ')}</div>
  </div></section></body></html>`;
  fs.writeFileSync(path.join(dir,'index.html'), idx);
});
// gated library landing pages (one per library, shared across palettes)
const libDir = path.join(OUT, 'libraries');
fs.mkdirSync(libDir, {recursive:true});
LIBRARIES.forEach(([name, slug, desc, sample])=>{
  fs.writeFileSync(path.join(libDir, `${slug}.html`), gatePage(name, slug, desc, sample));
});
// top-level hub index linking the three palettes and nine studies
const hubPal = Object.assign({key:'peptide'}, STUDIES.peptide);
const hub = `${head('Ēnel Health · Landing Pages', PALETTES[0][1])}
<section class="sec" style="padding-top:54px"><div class="wrap"><p class="label" style="color:var(--eyebrow)">Ēnel Health · Landing pages</p><h2>Three studies, three palettes, nine pages each.</h2>
<p class="lede">Each study has a landing page, a join page, and a result page, in three palettes for A/B testing. Open any landing to walk the funnel.</p>
${['Navy','Petrol','Mint'].map(p=>`<div style="margin-top:34px"><h3 style="font-family:var(--serif);font-size:21px;margin-bottom:14px">${p}</h3><div class="cards">${ORDER.map(k=>{const st=STUDIES[k];return `<div class="card"><div class="ic">${ICON[st.glyph]}</div><h3>${st.label}</h3><p style="font-size:13px;margin-top:10px"><a href="${p}/${k}_landing.html" style="color:var(--accent);font-weight:700">Landing</a> &middot; <a href="${p}/${k}_join.html" style="color:var(--accent);font-weight:700">Join</a> &middot; <a href="${p}/${k}_payoff.html" style="color:var(--accent);font-weight:700">Result</a></p></div>`}).join('')}</div></div>`).join('')}
</div></section></body></html>`;
fs.writeFileSync(path.join(OUT,'index.html'), hub);
console.log('Wrote '+count+' pages, '+PALETTES.length+' indexes, '+LIBRARIES.length+' gated library pages to '+OUT);
