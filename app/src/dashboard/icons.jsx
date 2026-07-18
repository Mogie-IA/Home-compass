/* Flat line icons for the dashboard. Inherit currentColor + strokeWidth. */
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const Icon = {
  overview: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>),
  estate: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 21h18" /><path d="M5 21V8l7-4 7 4v13" /><path d="M9 21v-5h6v5" /><path d="M9 11h.01M15 11h.01" /></svg>),
  plots: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg>),
  doc: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></svg>),
  handover: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M12 3a9 9 0 1 0 9 9" /><path d="M21 3v6h-6" /><path d="m12 8 3 3-3 3" /></svg>),
  wrench: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3z" /></svg>),
  people: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  reports: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" rx="1" /><rect x="12" y="7" width="3" height="10" rx="1" /><rect x="17" y="13" width="3" height="4" rx="1" /></svg>),
  settings: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M20 6 9 17l-5-5" /></svg>),
  bell: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>),
  search: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
  plus: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M12 5v14M5 12h14" /></svg>),
  upload: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M12 15V3" /><path d="m7 8 5-5 5 5" /></svg>),
  chevronRight: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="m9 18 6-6-6-6" /></svg>),
  chevronDown: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="m6 9 6 6 6-6" /></svg>),
  logout: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>),
  filter: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M22 3H2l8 9.5V19l4 2v-8.5z" /></svg>),
  dots: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></svg>),
  clock: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>),
  shield: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><path d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5C8 19.2 5 15.5 5 11V6z" /><path d="M9 12l2 2 4-4" /></svg>),
  mail: (p) => (<svg viewBox="0 0 24 24" {...s} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6 8.5-6" /></svg>),
}

export default Icon
