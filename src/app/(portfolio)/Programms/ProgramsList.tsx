'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type ColorKey = 'blue' | 'green' | 'purple' | 'orange' | 'teal';

interface Program {
  name: string;
  full: string;
  duration: string;
}

interface LevelData {
  id: string;
  color: ColorKey;
  label: string;
  countLabel: string;
  programs: Program[];
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const CAT_META: Record<ColorKey, { color: string; bg: string }> = {
  blue: { color: '#2f56fb', bg: '#dce3f5' },
  green: { color: '#0D9488', bg: '#e6f7f5' },
  purple: { color: '#7c3aed', bg: '#ede7fe' },
  orange: { color: '#f59e0b', bg: '#fef3e2' },
  teal: { color: '#0ea5e9', bg: '#e0f2fe' },
};

const ELIGIBILITY = [
  'Open to all applicants',
  'Prior qualification required',
  'Entry test and interview based',
  'Merit-based admission',
  'Open enrollment',
];

const SHORT_DESCRIPTIONS = [
  'Build strong foundational knowledge and practical skills.',
  'Industry-focused curriculum for real-world challenges.',
  'Career-oriented program with hands-on training.',
  'Innovative learning with practical application.',
  'Skill-based program for modern industry demands.',
];

const LEVELS: LevelData[] = [
  {
    id: 'school',
    color: 'blue',
    label: 'School Level',
    countLabel: '06 Programs',
    programs: [
      { name: 'Primary School', full: 'Primary Education (Grade 1–5)', duration: '5 Years' },
      { name: 'Middle School', full: 'Middle School Education (Grade 6–8)', duration: '3 Years' },
      { name: 'Matriculation', full: 'Matric (Science Group)', duration: '2 Years' },
      { name: 'Matriculation (Arts)', full: 'Matric (Arts Group)', duration: '2 Years' },
      { name: 'Matriculation (Commerce)', full: 'Matric (Commerce Group)', duration: '2 Years' },
      { name: 'Islamic Studies (Foundation)', full: 'Dars-e-Nizami / Islamic Foundation Course', duration: '2 Years' },
    ],
  },
  {
    id: 'olevel',
    color: 'green',
    label: 'O-Level',
    countLabel: '08 Programs',
    programs: [
      { name: 'English Language', full: 'Cambridge O-Level English', duration: '2 Years' },
      { name: 'Mathematics', full: 'Cambridge O-Level Mathematics', duration: '2 Years' },
      { name: 'Physics', full: 'Cambridge O-Level Physics', duration: '2 Years' },
      { name: 'Chemistry', full: 'Cambridge O-Level Chemistry', duration: '2 Years' },
      { name: 'Biology', full: 'Cambridge O-Level Biology', duration: '2 Years' },
      { name: 'Accounting', full: 'Cambridge O-Level Accounting', duration: '2 Years' },
      { name: 'Business Studies', full: 'Cambridge O-Level Business Studies', duration: '2 Years' },
      { name: 'Computer Science', full: 'Cambridge O-Level Computer Science', duration: '2 Years' },
    ],
  },
  {
    id: 'alevel',
    color: 'purple',
    label: 'A-Level',
    countLabel: '07 Programs',
    programs: [
      { name: 'Physics', full: 'Cambridge A-Level Physics', duration: '2 Years' },
      { name: 'Chemistry', full: 'Cambridge A-Level Chemistry', duration: '2 Years' },
      { name: 'Biology', full: 'Cambridge A-Level Biology', duration: '2 Years' },
      { name: 'Mathematics', full: 'Cambridge A-Level Mathematics', duration: '2 Years' },
      { name: 'Economics', full: 'Cambridge A-Level Economics', duration: '2 Years' },
      { name: 'Computer Science', full: 'Cambridge A-Level Computer Science', duration: '2 Years' },
      { name: 'Business Studies', full: 'Cambridge A-Level Business Studies', duration: '2 Years' },
    ],
  },
  {
    id: 'college',
    color: 'orange',
    label: 'College Level',
    countLabel: '10 Programs',
    programs: [
      { name: 'BA', full: 'Bachelor of Arts', duration: '4 Years' },
      { name: 'B.Sc', full: 'Bachelor of Science', duration: '4 Years' },
      { name: 'B.Com', full: 'Bachelor of Commerce', duration: '4 Years' },
      { name: 'BS (CS)', full: 'Bachelor of Science in Computer Science', duration: '4 Years' },
      { name: 'BS (IT)', full: 'Bachelor of Science in Information Technology', duration: '4 Years' },
      { name: 'BBA', full: 'Bachelor of Business Administration', duration: '4 Years' },
      { name: 'B.Ed', full: 'Bachelor of Education', duration: '4 Years' },
      { name: 'LLB', full: 'Bachelor of Laws', duration: '5 Years' },
      { name: 'DPT', full: 'Doctor of Physical Therapy', duration: '5 Years' },
      { name: 'ADP', full: 'Associate Degree Program', duration: '2 Years' },
    ],
  },
  {
    id: 'tech',
    color: 'teal',
    label: 'Technical Level',
    countLabel: '09 Programs',
    programs: [
      { name: 'Diploma in IT', full: 'Diploma in Information Technology', duration: '2 Years' },
      { name: 'Diploma in Civil', full: 'Diploma in Civil Engineering', duration: '3 Years' },
      { name: 'Diploma in Electrical', full: 'Diploma in Electrical Engineering', duration: '3 Years' },
      { name: 'Diploma in Mechanical', full: 'Diploma in Mechanical Engineering', duration: '3 Years' },
      { name: 'Graphic Design', full: 'Diploma in Graphic Design', duration: '1 Year' },
      { name: 'Web Development', full: 'Diploma in Web Development', duration: '1 Year' },
      { name: 'AutoCAD', full: 'Diploma in AutoCAD', duration: '6 Months' },
      { name: 'Spoken English', full: 'Spoken English Certification', duration: '6 Months' },
      { name: 'Short Courses', full: 'Various Short Technical Courses', duration: '3–6 Months' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function programKey(levelId: string, idx: number) {
  return `${levelId}:${idx}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProgramList() {
  const [activeLevel, setActiveLevel] = useState<string>('school');
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});
  const [detailGen, setDetailGen] = useState<Record<string, number>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const redrawTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get all programs for search/filter
  const allPrograms = LEVELS.flatMap(lvl => 
    lvl.programs.map(p => ({ ...p, levelId: lvl.id, levelLabel: lvl.label, color: lvl.color }))
  );

  // Filter programs based on search and filter
  const filteredPrograms = allPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          program.full.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || program.levelId === filterLevel;
    return matchesSearch && matchesFilter;
  });

  // Get unique level IDs for filter
  const levelOptions = LEVELS.map(lvl => ({ id: lvl.id, label: lvl.label }));

  /* ---------------- connector line drawing ---------------- */

  const drawLines = useCallback(() => {
    const canvas = canvasRef.current;
    const svg = svgRef.current;
    const root = rootRef.current;
    if (!canvas || !svg || !root) return;

    const cRect = canvas.getBoundingClientRect();
    svg.setAttribute('width', String(cRect.width));
    svg.setAttribute('height', String(cRect.height));
    svg.innerHTML = '';

    const rootRect = root.getBoundingClientRect();
    const rootX = rootRect.right - cRect.left;
    const rootY = rootRect.top + rootRect.height / 2 - cRect.top;

    const spineX = rootX + 34;

    const points = LEVELS.map((lvl) => {
      const el = nodeRefs.current[lvl.id];
      const r = el
        ? el.getBoundingClientRect()
        : ({ left: 0, top: 0, height: 0 } as DOMRect);
      return {
        id: lvl.id,
        active: activeLevel === lvl.id,
        color: CAT_META[lvl.color].color,
        x: r.left - cRect.left,
        y: r.top + r.height / 2 - cRect.top,
      };
    });

    if (points.length === 0) return;

    const topY = points[0].y;
    const bottomY = points[points.length - 1].y;

    const svgNS = 'http://www.w3.org/2000/svg';

    const defs = document.createElementNS(svgNS, 'defs');
    const grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', 'spineGrad');
    grad.setAttribute('x1', '0');
    grad.setAttribute('y1', String(topY));
    grad.setAttribute('x2', '0');
    grad.setAttribute('y2', String(bottomY));
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    points.forEach((p) => {
      const off = ((p.y - topY) / (bottomY - topY || 1)) * 100;
      const stop = document.createElementNS(svgNS, 'stop');
      stop.setAttribute('offset', off + '%');
      stop.setAttribute('stop-color', p.color);
      grad.appendChild(stop);
    });
    defs.appendChild(grad);
    svg.appendChild(defs);

    const spine = document.createElementNS(svgNS, 'line');
    spine.setAttribute('x1', String(spineX));
    spine.setAttribute('y1', String(topY));
    spine.setAttribute('x2', String(spineX));
    spine.setAttribute('y2', String(bottomY));
    spine.setAttribute('stroke', 'url(#spineGrad)');
    spine.setAttribute('stroke-width', '2');
    spine.setAttribute('stroke-linecap', 'round');
    spine.setAttribute('opacity', '0.55');
    svg.appendChild(spine);

    const rootPath = document.createElementNS(svgNS, 'path');
    const rMidX = (rootX + spineX) / 2;
    rootPath.setAttribute(
      'd',
      `M ${rootX} ${rootY} C ${rMidX} ${rootY}, ${rMidX} ${rootY}, ${spineX} ${rootY}`
    );
    rootPath.setAttribute('fill', 'none');
    rootPath.setAttribute('stroke', '#a78bfa');
    rootPath.setAttribute('stroke-width', '2');
    rootPath.setAttribute('opacity', '0.4');
    svg.appendChild(rootPath);

    points.forEach((p) => {
      const midX = (spineX + p.x) / 2;
      const stub = document.createElementNS(svgNS, 'path');
      const d = `M ${spineX} ${p.y} C ${midX} ${p.y}, ${midX} ${p.y}, ${p.x} ${p.y}`;
      stub.setAttribute('d', d);
      stub.setAttribute('fill', 'none');
      stub.setAttribute('stroke', p.color);
      stub.setAttribute('stroke-width', p.active ? '2.5' : '1.5');
      stub.setAttribute('stroke-linecap', 'round');
      stub.setAttribute('opacity', p.active ? '0.9' : '0.4');
      svg.appendChild(stub);

      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', String(spineX));
      dot.setAttribute('cy', String(p.y));
      dot.setAttribute('r', p.active ? '4.5' : '3.5');
      dot.setAttribute('fill', p.color);
      dot.setAttribute('opacity', p.active ? '1' : '0.6');
      svg.appendChild(dot);
    });
  }, [activeLevel]);

  const runRedrawLoop = useCallback(() => {
    if (redrawTimer.current) clearInterval(redrawTimer.current);
    let frames = 0;
    redrawTimer.current = setInterval(() => {
      drawLines();
      frames++;
      if (frames > 34 && redrawTimer.current) {
        clearInterval(redrawTimer.current);
        redrawTimer.current = null;
      }
    }, 16);
  }, [drawLines]);

  useEffect(() => {
    drawLines();
    window.addEventListener('resize', drawLines);
    return () => {
      window.removeEventListener('resize', drawLines);
      if (redrawTimer.current) clearInterval(redrawTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runRedrawLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLevel]);

  /* ---------------- interaction handlers ---------------- */

  const toggleLevel = (target: string) => {
    setActiveLevel((prev) => (prev === target ? '' : target));
  };

  const toggleDetail = (key: string) => {
    setOpenDetails((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
    setDetailGen((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    runRedrawLoop();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilterLevel('all');
  };

  /* ---------------- detail content ---------------- */

  function renderDetailContent(program: Program, color: ColorKey, gen: number) {
    const meta = CAT_META[color];
    const seed = hashStr(program.name + program.full);
    const eligibility = ELIGIBILITY[seed % ELIGIBILITY.length];
    const desc = SHORT_DESCRIPTIONS[seed % SHORT_DESCRIPTIONS.length];

    return (
      <div
        className="detail-card"
        style={{ ['--dc' as string]: meta.color, ['--dbg' as string]: meta.bg }}
      >
        <div className="detail-info" key={gen}>
          <div className="item prereq" style={{ animationDelay: '.05s' }}>
            <label>Prerequisites</label>
            <strong>{eligibility}</strong>
          </div>
          <div className="item desc" style={{ animationDelay: '.1s' }}>
            <label>About This Program</label>
            <p>{desc}</p>
          </div>
          <div className="apply-row" style={{ animationDelay: '.15s' }}>
            <Link href="/Admission">
              <button type="button" className="apply-btn">
                Apply Now →
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- render ---------------- */

  return (
    <div className="pl-root">
      <style>{CSS}</style>

      {/* Search & Filter Bar */}
      <div className="search-filter-wrapper">
        <div className="search-filter-container">
          <div className="search-box">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="clear-btn">✕</button>
            )}
          </div>
          <div className="filter-box">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Levels</option>
              {levelOptions.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>{lvl.label}</option>
              ))}
            </select>
          </div>
        </div>
        {filteredPrograms.length > 0 && (
          <div className="results-count">
            Showing {filteredPrograms.length} program{filteredPrograms.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="canvas" ref={canvasRef}>
        <svg className="connectors" ref={svgRef} />

        <div className="root-node" ref={rootRef}>
          <svg className="root-ring" viewBox="0 0 132 132">
            <circle cx="66" cy="66" r="63" fill="none" stroke="#2f56fb" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="68 328" strokeDashoffset="0" />
            <circle cx="66" cy="66" r="63" fill="none" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="68 328" strokeDashoffset="-79.2" />
            <circle cx="66" cy="66" r="63" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="68 328" strokeDashoffset="-158.4" />
            <circle cx="66" cy="66" r="63" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="68 328" strokeDashoffset="-237.6" />
            <circle cx="66" cy="66" r="63" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="68 328" strokeDashoffset="-316.8" />
          </svg>
          <div className="root-inner">
            <div className="cap">🎓</div>
            <div className="label">All Programs</div>
            <div className="count">40+</div>
          </div>
        </div>

        <div className="rows">
          {LEVELS.map((lvl) => {
            const isActive = activeLevel === lvl.id;
            // Check if any program in this level matches search
            const hasMatchingPrograms = filteredPrograms.some(p => p.levelId === lvl.id);
            
            // If search is active and no matches in this level, hide the level
            if (searchTerm && !hasMatchingPrograms) {
              return null;
            }

            return (
              <div className="row" key={lvl.id}>
                <div
                  className={`cat-node ${lvl.color}${isActive ? ' active' : ''}`}
                  ref={(el) => {
                    nodeRefs.current[lvl.id] = el;
                  }}
                  onClick={() => toggleLevel(lvl.id)}
                >
                  <div className="dot-marker" />
                  <div className="avatar">{lvl.label.charAt(0)}</div>
                  <div className="txt">
                    <strong>{lvl.label}</strong>
                    <span>{lvl.countLabel}</span>
                  </div>
                  <div className="chevron">&#10148;</div>
                </div>

                <div className={`table-wrap${isActive ? ' open' : ''}`}>
                  <div className="table-wrap-inner">
                    <div className={`table-card ${lvl.color}`}>
                      <table>
                        <thead>
                          <tr>
                            <th>Program Name</th>
                            <th>Full Name</th>
                            <th>Duration</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {lvl.programs.map((program, idx) => {
                            // Check if this program matches search
                            const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                  program.full.toLowerCase().includes(searchTerm.toLowerCase());
                            
                            // If search is active and program doesn't match, hide it
                            if (searchTerm && !matchesSearch) {
                              return null;
                            }

                            const key = programKey(lvl.id, idx);
                            const isOpen = !!openDetails[key];
                            const gen = detailGen[key] || 0;
                            return (
                              <React.Fragment key={key}>
                                <tr
                                  style={{
                                    animation: isActive
                                      ? `rowIn .4s ease ${idx * 0.035}s both`
                                      : undefined,
                                  }}
                                >
                                  <td className="name">{program.name}</td>
                                  <td>{program.full}</td>
                                  <td>{program.duration}</td>
                                  <td>
                                    <span
                                      className={`btn${isOpen ? ' is-open' : ''}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDetail(key);
                                      }}
                                    >
                                      {isOpen ? 'Hide Details ˅' : 'View Details ›'}
                                    </span>
                                  </td>
                                </tr>
                                <tr className="detail-row">
                                  <td colSpan={4}>
                                    <div className={`detail-collapse${isOpen ? ' open' : ''}`}>
                                      <div className="detail-collapse-inner">
                                        {renderDetailContent(program, lvl.color, gen)}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Button - Bottom */}
      <div className="cta-wrapper">
        <Link href="/Admission">
          <button className="cta-btn">
            Apply Now →
          </button>
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CSS                                                               */
/* ------------------------------------------------------------------ */

const CSS = `
.pl-root{
  --ink:#0a1240;
  --sub:#3d4566;
  --line:#e8edf8;
  --bg:#f8faff;
  --card:#ffffff;
  --blue:#2f56fb;   --blue-bg:#dce3f5;
  --green:#0D9488;  --green-bg:#e6f7f5;
  --purple:#7c3aed; --purple-bg:#ede7fe;
  --orange:#f59e0b; --orange-bg:#fef3e2;
  --teal:#0ea5e9;   --teal-bg:#e0f2fe;

  background:var(--bg);
  font-family:'Inter',sans-serif;
  color:var(--ink);
  padding:36px 20px 60px;
}
.pl-root *{box-sizing:border-box;}

/* Search & Filter */
.search-filter-wrapper{
  max-width:1180px;
  margin:0 auto 24px;
  padding:0 20px;
}
.search-filter-container{
  display:flex;
  gap:16px;
  flex-wrap:wrap;
  align-items:center;
}
.search-box{
  flex:1;
  min-width:200px;
  position:relative;
  display:flex;
  align-items:center;
  background:#fff;
  border:1.5px solid var(--line);
  border-radius:999px;
  padding:0 16px;
  transition:border-color .3s ease, box-shadow .3s ease;
}
.search-box:focus-within{
  border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(47,86,251,0.1);
}
.search-icon{
  flex-shrink:0;
  color:var(--sub);
  margin-right:10px;
}
.search-input{
  flex:1;
  border:none;
  outline:none;
  background:transparent;
  padding:12px 0;
  font-size:14px;
  font-family:'Inter',sans-serif;
  color:var(--ink);
}
.search-input::placeholder{
  color:var(--sub);
}
.clear-btn{
  background:none;
  border:none;
  color:var(--sub);
  cursor:pointer;
  font-size:16px;
  padding:4px 8px;
  transition:color .2s ease;
}
.clear-btn:hover{
  color:var(--ink);
}
.filter-box{
  flex-shrink:0;
}
.filter-select{
  padding:12px 20px;
  border:1.5px solid var(--line);
  border-radius:999px;
  background:#fff;
  font-size:14px;
  font-family:'Inter',sans-serif;
  color:var(--ink);
  cursor:pointer;
  outline:none;
  transition:border-color .3s ease, box-shadow .3s ease;
  min-width:150px;
}
.filter-select:focus{
  border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(47,86,251,0.1);
}
.results-count{
  margin-top:8px;
  font-size:13px;
  color:var(--sub);
}

/* CTA */
.cta-wrapper{
  max-width:1180px;
  margin:30px auto 10px;
  text-align:center;
  padding:0 20px;
}
.cta-btn{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:14px 40px;
  border-radius:999px;
  border:none;
  font-family:'Inter',sans-serif;
  font-size:16px;
  font-weight:600;
  color:#fff;
  cursor:pointer;
  background:linear-gradient(135deg, #2f56fb, #1530b0);
  box-shadow:0 12px 28px -8px rgba(47,86,251,0.5);
  transition:all .3s ease;
}
.cta-btn:hover{
  transform:scale(1.02);
  box-shadow:0 20px 40px -12px rgba(47,86,251,0.7);
}

.pl-root .header{text-align:center;margin-bottom:20px;}

.pl-root .canvas{position:relative;max-width:1180px;margin:0 auto;}
.pl-root svg.connectors{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;}

.pl-root .root-node{position:absolute;left:0;top:50%;transform:translateY(-50%);width:132px;height:132px;z-index:3;}
.pl-root .root-ring{position:absolute;top:0;left:0;width:132px;height:132px;animation:spin 26s linear infinite;}
@keyframes rowIn{from{opacity:0;transform:translateY(6px);} to{opacity:1;transform:translateY(0);}}
@keyframes spin{from{transform:rotate(0deg);} to{transform:rotate(360deg);}}
.pl-root .root-inner{
  position:absolute;top:8px;left:8px;width:116px;height:116px;border-radius:50%;background:#fff;
  display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;
  box-shadow:0 8px 24px rgba(47,86,251,.12), inset 0 0 0 1px #e8edf8;
  animation:breathe 3.6s ease-in-out infinite;
}
@keyframes breathe{
  0%,100%{box-shadow:0 8px 24px rgba(47,86,251,.12), inset 0 0 0 1px #e8edf8;}
  50%{box-shadow:0 10px 30px rgba(47,86,251,.2), inset 0 0 0 1px #dce3f5;}
}
.pl-root .root-node .cap{font-size:26px;margin-bottom:4px;}
.pl-root .root-node .label{font-size:11.5px;color:var(--sub);font-weight:600;}
.pl-root .root-node .count{font-family:'Poppins',sans-serif;font-weight:700;font-size:15px;color:var(--ink);}

.pl-root .rows{display:flex;flex-direction:column;gap:14px;margin-left:210px;}
@media (max-width:900px){
  .pl-root .rows{margin-left:0;margin-top:0;}
  .pl-root .root-node{display:none;}
  .pl-root .row{flex-direction:column;align-items:stretch;}
  .pl-root .cat-node{flex:none;}
  .pl-root .cat-node.active{transform:scale(1.01);}
  .pl-root .cat-node:hover{transform:none;}
  .pl-root .table-wrap{margin-top:0;}
  .pl-root .table-wrap.open{margin-top:12px;}
  .pl-root svg.connectors{display:none;}
  .pl-root td, .pl-root th{white-space:normal;}
  .pl-root .search-filter-container{flex-direction:column;}
  .pl-root .search-box{width:100%;}
  .pl-root .filter-box{width:100%;}
  .pl-root .filter-select{width:100%;}
}
.pl-root .row{display:flex;align-items:flex-start;gap:22px;position:relative;transition:gap .35s ease;}

.pl-root .cat-node{
  position:relative;z-index:3;flex:0 0 190px;background:#fff;border-radius:999px;padding:8px 20px 8px 8px;
  display:flex;align-items:center;gap:10px;box-shadow:0 6px 18px rgba(20,27,51,.06);
  border:1.5px solid var(--line);cursor:pointer;user-select:none;
  transition:transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease, border-color .3s ease, background .3s ease;
}
@media (max-width:900px){
  .pl-root .cat-node{flex:1 1 auto;border-radius:999px;padding:10px 16px;}
}
.pl-root .cat-node:hover{transform:translateY(-2px);box-shadow:0 10px 22px rgba(20,27,51,.1);}
.pl-root .cat-node .avatar{
  width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:16px;font-weight:700;flex-shrink:0;color:#fff;
  transition:transform .3s ease;box-shadow:0 4px 10px rgba(20,27,51,.14);
}
.pl-root .cat-node .txt{flex:1;min-width:0;}
.pl-root .cat-node .txt strong{display:block;font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;}
.pl-root .cat-node .txt span{font-size:10.5px;color:var(--sub);font-weight:500;}
.pl-root .cat-node .chevron{font-size:11px;color:var(--sub);transition:transform .35s cubic-bezier(.2,.8,.2,1), color .3s ease;flex-shrink:0;}

.pl-root .cat-node.blue .avatar{background:var(--blue);}
.pl-root .cat-node.green .avatar{background:var(--green);}
.pl-root .cat-node.purple .avatar{background:var(--purple);}
.pl-root .cat-node.orange .avatar{background:var(--orange);}
.pl-root .cat-node.teal .avatar{background:var(--teal);}
.pl-root .cat-node.blue .txt strong{color:var(--blue);}
.pl-root .cat-node.green .txt strong{color:var(--green);}
.pl-root .cat-node.purple .txt strong{color:var(--purple);}
.pl-root .cat-node.orange .txt strong{color:var(--orange);}
.pl-root .cat-node.teal .txt strong{color:var(--teal);}

.pl-root .cat-node.active{transform:translateY(-2px) scale(1.05);}
.pl-root .cat-node.active .avatar{transform:scale(1.08);}
.pl-root .cat-node.active.blue{border-color:var(--blue);background:linear-gradient(180deg,#fff, var(--blue-bg) 220%);box-shadow:0 10px 26px rgba(47,86,251,.22);}
.pl-root .cat-node.active.green{border-color:var(--green);background:linear-gradient(180deg,#fff, var(--green-bg) 220%);box-shadow:0 10px 26px rgba(13,148,136,.22);}
.pl-root .cat-node.active.purple{border-color:var(--purple);background:linear-gradient(180deg,#fff, var(--purple-bg) 220%);box-shadow:0 10px 26px rgba(124,79,224,.22);}
.pl-root .cat-node.active.orange{border-color:var(--orange);background:linear-gradient(180deg,#fff, var(--orange-bg) 220%);box-shadow:0 10px 26px rgba(245,158,11,.22);}
.pl-root .cat-node.active.teal{border-color:var(--teal);background:linear-gradient(180deg,#fff, var(--teal-bg) 220%);box-shadow:0 10px 26px rgba(14,165,233,.22);}
.pl-root .cat-node.active .chevron{transform:rotate(90deg);}
.pl-root .cat-node.active.blue .chevron{color:var(--blue);}
.pl-root .cat-node.active.green .chevron{color:var(--green);}
.pl-root .cat-node.active.purple .chevron{color:var(--purple);}
.pl-root .cat-node.active.orange .chevron{color:var(--orange);}
.pl-root .cat-node.active.teal .chevron{color:var(--teal);}

.pl-root .dot-marker{
  position:absolute;left:-9px;top:50%;transform:translateY(-50%);width:8px;height:8px;border-radius:50%;
  background:#fff;border:2.5px solid;z-index:4;transition:box-shadow .3s ease, background .3s ease;
}
.pl-root .blue .dot-marker{border-color:var(--blue);}
.pl-root .green .dot-marker{border-color:var(--green);}
.pl-root .purple .dot-marker{border-color:var(--purple);}
.pl-root .orange .dot-marker{border-color:var(--orange);}
.pl-root .teal .dot-marker{border-color:var(--teal);}
.pl-root .cat-node.active .dot-marker{background:currentColor;}
.pl-root .cat-node.active.blue .dot-marker{background:var(--blue);box-shadow:0 0 0 4px var(--blue-bg);}
.pl-root .cat-node.active.green .dot-marker{background:var(--green);box-shadow:0 0 0 4px var(--green-bg);}
.pl-root .cat-node.active.purple .dot-marker{background:var(--purple);box-shadow:0 0 0 4px var(--purple-bg);}
.pl-root .cat-node.active.orange .dot-marker{background:var(--orange);box-shadow:0 0 0 4px var(--orange-bg);}
.pl-root .cat-node.active.teal .dot-marker{background:var(--teal);box-shadow:0 0 0 4px var(--teal-bg);}

.pl-root .table-wrap{
  flex:1;display:grid;grid-template-rows:0fr;opacity:0;min-width:0;
  transition:grid-template-rows .45s cubic-bezier(.2,.8,.2,1), opacity .35s ease .05s, margin .45s ease;
}
.pl-root .table-wrap.open{grid-template-rows:1fr;opacity:1;}
.pl-root .table-wrap-inner{overflow:hidden;min-height:0;}
.pl-root .table-card{
  flex:1;background:var(--card);border-radius:14px;border:1px solid var(--line);
  box-shadow:0 4px 14px rgba(20,27,51,.05);overflow:hidden;transform:translateY(-6px);
  transition:transform .45s cubic-bezier(.2,.8,.2,1);
}
.pl-root .table-wrap.open .table-card{transform:translateY(0);}
.pl-root table{width:100%;border-collapse:collapse;}
.pl-root thead tr{background:#fff;}
.pl-root th{text-align:left;font-size:11px;font-weight:700;padding:10px 16px;color:var(--ink);border-bottom:1px solid var(--line);}
.pl-root td{font-size:12px;padding:8px 16px;border-bottom:1px solid #f0f1f5;color:var(--sub);white-space:nowrap;}
.pl-root tbody tr:last-child td{border-bottom:none;}
.pl-root td.name{display:flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);}
.pl-root td.name::before{content:'';width:6px;height:6px;border-radius:50%;flex-shrink:0;}
.pl-root .blue td.name::before{background:var(--blue);}
.pl-root .green td.name::before{background:var(--green);}
.pl-root .purple td.name::before{background:var(--purple);}
.pl-root .orange td.name::before{background:var(--orange);}
.pl-root .teal td.name::before{background:var(--teal);}

.pl-root .btn{
  display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:600;padding:5px 10px;
  border-radius:20px;white-space:nowrap;cursor:pointer;border:none;font-family:'Inter',sans-serif;
  transition:transform .2s ease, box-shadow .2s ease;
}
.pl-root .btn:hover{transform:translateY(-1px);}
.pl-root .btn:active{transform:translateY(0);}
.pl-root .blue .btn{background:var(--blue-bg);color:var(--blue);}
.pl-root .green .btn{background:var(--green-bg);color:var(--green);}
.pl-root .purple .btn{background:var(--purple-bg);color:var(--purple);}
.pl-root .orange .btn{background:var(--orange-bg);color:var(--orange);}
.pl-root .teal .btn{background:var(--teal-bg);color:var(--teal);}

.pl-root th:nth-child(1){width:26%;}
.pl-root th:nth-child(2){width:34%;}
.pl-root th:nth-child(3){width:16%;}
.pl-root th:nth-child(4){width:24%;}

.pl-root .detail-row td{padding:0;border-bottom:1px solid #f0f1f5;}
.pl-root tr.detail-row:last-child td{border-bottom:none;}
.pl-root .detail-collapse{
  display:grid;grid-template-rows:0fr;opacity:0;
  transition:grid-template-rows .5s cubic-bezier(.22,.9,.32,1), opacity .35s ease;
}
.pl-root .detail-collapse.open{
  grid-template-rows:1fr;opacity:1;
  transition:grid-template-rows .5s cubic-bezier(.22,.9,.32,1), opacity .4s ease .05s;
}
.pl-root .detail-collapse-inner{overflow:hidden;min-height:0;}

.pl-root .detail-card{
  position:relative;margin:12px 16px 16px;padding:20px 24px;border-radius:16px;
  overflow:hidden;border:1px solid var(--line);
  background:radial-gradient(120% 160% at 0% 0%, var(--dbg,#eef1fb) 0%, #fff 55%);
}
@media (max-width:700px){
  .pl-root .detail-card{padding:16px;}
}

.pl-root .detail-info{
  flex:1;min-width:0;display:grid;grid-template-columns:1fr;gap:12px 0;
}
.pl-root .detail-info .item{opacity:0;animation:rowIn .45s ease forwards;}
.pl-root .detail-info .item label{
  display:block;font-size:11px;font-weight:700;color:var(--sub);margin-bottom:4px;
}
.pl-root .detail-info .item strong{font-size:14px;font-weight:600;color:var(--ink);word-break:break-word;}
.pl-root .detail-info .desc p{
  font-size:14px;line-height:1.6;color:var(--sub);margin:0;
  word-wrap:break-word;
  word-break:break-word;
  max-width:100%;
}
@media (max-width:700px){
  .pl-root .detail-info .desc p{font-size:13px;}
}
.pl-root .apply-row{
  display:flex;justify-content:center;margin-top:6px;
}
.pl-root .apply-btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:10px 28px;border-radius:999px;border:none;
  font-family:'Inter',sans-serif;font-size:14px;font-weight:600;
  color:#fff;cursor:pointer;
  background:linear-gradient(135deg, #2f56fb, #1530b0);
  box-shadow:0 12px 28px -8px rgba(47,86,251,0.5);
  transition:all .3s ease;
}
.pl-root .apply-btn:hover{
  transform:scale(1.02);
  box-shadow:0 20px 40px -12px rgba(47,86,251,0.7);
}
.pl-root .btn.is-open{box-shadow:0 0 0 2px rgba(0,0,0,.05) inset;}

@media (max-width:700px){
  .pl-root .detail-card{flex-direction:column;align-items:flex-start;}
  .pl-root .detail-info{grid-template-columns:1fr;}
}
@media (max-width:900px){
  .pl-root .header h1{font-size:24px;}
  .pl-root .header p{font-size:14px;}
}
`;