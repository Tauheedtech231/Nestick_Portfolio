"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Stats() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  // Always Light Theme with TEAL color
  const theme = 'light';
  const isDark = false;
  const PRIMARY_COLOR = '#0D9488'; // Teal-600
  const PRIMARY_LIGHT = '#14B8A6'; // Teal-500
  const PRIMARY_DARK = '#0F766E'; // Teal-700
  const PRIMARY_GLOW = 'rgba(13, 148, 136, 0.3)';

  // Hardcoded stats values
  const stats = [
    { id: 0, value: "25+", label: "Years", subLabel: "of Excellence" },
    { id: 1, value: "40+", label: "Faculty", subLabel: "Members" },
    { id: 2, value: "15+", label: "Programs", subLabel: "Academic" },
    { id: 3, value: "97%", label: "Success", subLabel: "Rate" },
  ];

  // Main drawing function
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const context = ctx;
    
    const container = canvas.parentElement;
    const containerWidth = container ? container.clientWidth : 1200;
    
    const aspectRatio = 1200 / 520;
    const W = containerWidth;
    const H = W / aspectRatio;
    
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";

    // ── BACKGROUND ──
    context.fillStyle = '#F8FAFF';
    context.fillRect(0, 0, W, H);

    // ── SCALE FACTOR ──
    const scale = W / 1200;
    
    // ── CENTER OFFSET ──
    const centerOffset = (W - 1200 * scale) / 2 - 25;

    // ── HEADING ──
    context.save();
    context.textAlign = "center";
    context.fillStyle = '#1E293B';
    context.font = `bold ${32 * scale}px Arial,sans-serif`;
    context.fillText("Why Choose Aspire College?", 600 * scale + centerOffset, 50 * scale);
    
    context.fillStyle = '#64748B';
    context.font = `${16 * scale}px Arial,sans-serif`;
    context.fillText("Excellence in education, innovation, and student success", 600 * scale + centerOffset, 80 * scale);
    context.restore();

    // ── HELPERS ──
    function hexPts(cx: number, cy: number, r: number) {
      const p: [number, number][] = [];
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        p.push([
          cx * scale + r * scale * Math.cos(a) + centerOffset,
          cy * scale + r * scale * Math.sin(a)
        ]);
      }
      return p;
    }

    function octPts(cx: number, cy: number, r: number) {
      const p: [number, number][] = [];
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4 - Math.PI / 8;
        p.push([
          cx * scale + r * scale * Math.cos(a) + centerOffset,
          cy * scale + r * scale * Math.sin(a)
        ]);
      }
      return p;
    }

    function mid(a: [number, number], b: [number, number]): [number, number] {
      return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    }

    function roundPolygon(ctxParam: CanvasRenderingContext2D, pts: [number, number][], radius: number) {
      if (pts.length < 3) return;
      ctxParam.beginPath();
      for (let i = 0; i < pts.length; i++) {
        const p1 = pts[i];
        const p2 = pts[(i + 1) % pts.length];
        const p0 = pts[(i - 1 + pts.length) % pts.length];
        
        const dx1 = p1[0] - p0[0], dy1 = p1[1] - p0[1];
        const dx2 = p2[0] - p1[0], dy2 = p2[1] - p1[1];
        const len1 = Math.sqrt(dx1*dx1 + dy1*dy1);
        const len2 = Math.sqrt(dx2*dx2 + dy2*dy2);
        
        if (len1 === 0 || len2 === 0) continue;
        
        const r1 = Math.min(radius * scale, len1/2);
        const r2 = Math.min(radius * scale, len2/2);
        
        const cx1 = p1[0] - (dx1/len1) * r1;
        const cy1 = p1[1] - (dy1/len1) * r1;
        const cx2 = p1[0] + (dx2/len2) * r2;
        const cy2 = p1[1] + (dy2/len2) * r2;
        
        if (i === 0) {
          ctxParam.moveTo(cx1, cy1);
        }
        ctxParam.lineTo(cx1, cy1);
        ctxParam.quadraticCurveTo(p1[0], p1[1], cx2, cy2);
      }
      ctxParam.closePath();
    }

    function polyRounded(
      pts: [number, number][],
      fill: string | null,
      sc: string | null,
      sw: number,
      gc: string | null,
      gb: number,
      radius: number = 10
    ) {
      context.save();
      if (gc) {
        context.shadowColor = gc;
        context.shadowBlur = gb * scale || 22 * scale;
      }
      roundPolygon(context, pts, radius);
      if (fill) {
        context.fillStyle = fill;
        context.fill();
      }
      if (sc) {
        context.strokeStyle = sc;
        context.lineWidth = sw * scale;
        context.stroke();
      }
      context.restore();
    }

    // ── GLOW CURVE LINE ──
    function gCurve(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      cp1x: number,
      cp1y: number,
      cp2x: number,
      cp2y: number
    ) {
      const steps = 80;
      const colors = [
        `rgba(13,148,136,`,
        `rgba(20,184,166,`,
        `rgba(153,246,228,`
      ];
      const shadowColor = PRIMARY_COLOR;
      const glowIntensity = [8, 4, 2];
      const alphaMultiplier = 0.6;
      
      for (let pass = 0; pass < 3; pass++) {
        const width = [9 * scale, 3.5 * scale, 1.6 * scale][pass];
        context.save();
        context.shadowColor = shadowColor;
        context.shadowBlur = glowIntensity[pass] * scale;
        context.lineCap = "round";
        for (let i = 0; i < steps; i++) {
          const t0 = i / steps,
            t1 = (i + 1) / steps;
          const tm = (t0 + t1) / 2;
          const fade = Math.sin(tm * Math.PI);
          const alpha = [0.07, 0.3, 1.0][pass] * fade * alphaMultiplier;
          context.strokeStyle = colors[pass] + alpha + ")";
          context.lineWidth = width;
          function bp(t: number) {
            const mt = 1 - t;
            return [
              mt * mt * mt * x1 + 3 * mt * mt * t * cp1x + 3 * mt * t * t * cp2x + t * t * t * x2,
              mt * mt * mt * y1 + 3 * mt * mt * t * cp1y + 3 * mt * t * t * cp2y + t * t * t * y2,
            ];
          }
          const p0 = bp(t0),
            p1 = bp(t1);
          context.beginPath();
          context.moveTo(p0[0], p0[1]);
          context.lineTo(p1[0], p1[1]);
          context.stroke();
        }
        context.restore();
      }
    }

    function drawHexRounded(
      cx: number,
      cy: number,
      R: number,
      Ri: number,
      label: string,
      val: string,
      subLabel: string,
      boxIndex: number | null = null
    ) {
      const fillColor = '#FFFFFF';
      const strokeColor = PRIMARY_COLOR;
      const innerStroke = `rgba(13,148,136,0.7)`;
      const labelColor = '#64748B';
      const valColor = '#1E293B';
      const shadowColor = PRIMARY_COLOR;
      
      const isHovered = hoveredBox === boxIndex;
      const glowIntensity = isHovered ? 50 : 6;
      const shadowOpacity = 0.5;
      
      const op = hexPts(cx, cy, R);
      const ip = hexPts(cx, cy, Ri);
      
      polyRounded(op, fillColor, strokeColor, 1, shadowColor, glowIntensity * shadowOpacity, 12);
      
      // Light shadow
      context.save();
      context.shadowColor = 'rgba(0,0,0,0.06)';
      context.shadowBlur = 16 * scale;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 4 * scale;
      roundPolygon(context, op, 12);
      context.fillStyle = 'transparent';
      context.fill();
      context.strokeStyle = 'rgba(0,0,0,0.06)';
      context.lineWidth = 1 * scale;
      context.stroke();
      context.restore();
      
      polyRounded(ip, null, innerStroke, 2.5, null, 0, 8);
      
      // Label
      context.save();
      context.textAlign = "center";
      context.fillStyle = labelColor;
      context.font = `${13 * scale}px Arial,sans-serif`;
      context.fillText(label, cx * scale + centerOffset, cy * scale - 28 * scale);
      
      // Value - Hardcoded
      context.fillStyle = valColor;
      context.font = `bold ${34 * scale}px Arial,sans-serif`;
      context.shadowColor = 'transparent';
      context.shadowBlur = 0;
      context.fillText(val, cx * scale + centerOffset, cy * scale + 12 * scale);
      
      // Sub label
      context.fillStyle = labelColor;
      context.font = `${12 * scale}px Arial,sans-serif`;
      context.fillText(subLabel, cx * scale + centerOffset, cy * scale + 34 * scale);
      context.restore();
    }

    // ══════════════════════════════════
    //  LAYOUT (shifted down for heading)
    // ══════════════════════════════════

    const R = 72;
    const Ri = 60;
    const offsetX = 120;
    const BOTTOM_PUSH = 40;

    // CENTER OCTAGON
    const TW = { cx: 510 + offsetX, cy: 230 + BOTTOM_PUSH };
    const TWr = 125, TWri = 108;
    
    const twP = octPts(TW.cx, TW.cy, TWr);
    const twPi = octPts(TW.cx, TW.cy, TWri);
    
    const twLMOriginal = mid(twP[4], twP[5]);
    const twLM: [number, number] = [
      twLMOriginal[0],
      twLMOriginal[1] + 30 * scale
    ];
    
    const twUpperEdge = mid(twP[6], twP[7]);
    
    const twActiveUsersPoint: [number, number] = [
      twUpperEdge[0] + 20 * scale,
      twUpperEdge[1] + 40 * scale
    ];
    
    const twTemplatesPoint: [number, number] = [
      twUpperEdge[0] - 20 * scale,
      twUpperEdge[1] + 155 * scale
    ];

    // YEARS - Box 0
    const CL = { cx: 100 + offsetX, cy: 218 + BOTTOM_PUSH };
    const clP = hexPts(CL.cx, CL.cy, R);
    const clRight = clP[0];

    // FACULTY - Box 1
    const TP = { cx: 240 + offsetX, cy: 318 + BOTTOM_PUSH };
    const tpP = hexPts(TP.cx, TP.cy, R);
    const tpTopLeft = tpP[5];
    const tpTopRight = tpP[0];
    const tpTopOffset = mid(tpTopLeft, tpTopRight);
    const tpStartPoint: [number, number] = [
      tpTopOffset[0],
      tpTopOffset[1] + 32 * scale
    ];

    // PROGRAMS - Box 2
    const AU = { cx: 780 + offsetX, cy: 142 + BOTTOM_PUSH };
    const auP = hexPts(AU.cx, AU.cy, R);
    const auLeft = auP[3];

    // SUCCESS - Box 3
    const SR = { cx: 920 + offsetX, cy: 245 + BOTTOM_PUSH };
    const srP = hexPts(SR.cx, SR.cy, R);
    const srLeft = srP[3];

    // ── CONNECTIONS ──
    {
      const x1 = clRight[0], y1 = clRight[1];
      const x2 = srLeft[0], y2 = srLeft[1];
      const cx = twLM[0], cy = twLM[1];
      gCurve(x1, y1, x2, y2, cx - 30 * scale, y1 + 10 * scale, cx + 30 * scale, y2 - 10 * scale);
    }

    {
      const x1 = tpStartPoint[0], y1 = tpStartPoint[1];
      const x2 = twTemplatesPoint[0], y2 = twTemplatesPoint[1];
      gCurve(x1, y1, x2, y2, x1 + 40 * scale, y1 - 10 * scale, x2 - 30 * scale, y2 + 15 * scale);
    }

    {
      const x1 = twActiveUsersPoint[0], y1 = twActiveUsersPoint[1];
      const x2 = auLeft[0], y2 = auLeft[1];
      gCurve(x1, y1, x2, y2, x1 + 50 * scale, y1 - 20 * scale, x2 - 60 * scale, y2 - 10 * scale);
    }

    // ── DRAW BOXES ──

    // 1. YEARS (Box 0)
    drawHexRounded(
      CL.cx, CL.cy, R, Ri, 
      stats[0].label, stats[0].value, 
      stats[0].subLabel, 0
    );

    // 2. FACULTY (Box 1)
    drawHexRounded(
      TP.cx, TP.cy, R, Ri, 
      stats[1].label, stats[1].value, 
      stats[1].subLabel, 1
    );

    // CENTER OCTAGON
    {
      const fillColor = '#FFFFFF';
      const strokeColor = PRIMARY_COLOR;
      const innerStroke = `rgba(13,148,136,0.7)`;
      const textColor = '#1E293B';
      
      const twP_rounded = octPts(TW.cx, TW.cy, TWr);
      const twPi_rounded = octPts(TW.cx, TW.cy, TWri);
      
      polyRounded(twP_rounded, fillColor, strokeColor, 1, PRIMARY_COLOR, 12, 14);
      
      context.save();
      context.shadowColor = 'rgba(0,0,0,0.06)';
      context.shadowBlur = 20 * scale;
      context.shadowOffsetY = 4 * scale;
      roundPolygon(context, twP_rounded, 14);
      context.strokeStyle = 'rgba(0,0,0,0.06)';
      context.lineWidth = 1 * scale;
      context.stroke();
      context.restore();
      
      polyRounded(twPi_rounded, null, innerStroke, 2.5, null, 0, 10);
      
      context.save();
      context.textAlign = "center";
      context.fillStyle = textColor;
      context.font = `bold ${22 * scale}px Arial,sans-serif`;
      context.shadowColor = 'transparent';
      context.shadowBlur = 0;
      context.fillText("ASPIRE", TW.cx * scale + centerOffset, TW.cy * scale - 8 * scale);
      context.font = `bold ${18 * scale}px Arial,sans-serif`;
      context.fillStyle = PRIMARY_COLOR;
      context.fillText("COLLEGE", TW.cx * scale + centerOffset, TW.cy * scale + 32 * scale);
      context.restore();
    }

    // 3. PROGRAMS (Box 2)
    drawHexRounded(
      AU.cx, AU.cy, R, Ri, 
      stats[2].label, stats[2].value, 
      stats[2].subLabel, 2
    );

    // 4. SUCCESS (Box 3)
    drawHexRounded(
      SR.cx, SR.cy, R, Ri, 
      stats[3].label, stats[3].value, 
      stats[3].subLabel, 3
    );
  };

  // Redraw when dependencies change
  useEffect(() => {
    drawCanvas();
  }, [isInView, hoveredBox]);

  // Resize handler with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        drawCanvas();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Mouse event handlers
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      
      const mouseX = (e.clientX - rect.left) * scaleX;
      const mouseY = (e.clientY - rect.top) * scaleY;
      
      const scale = canvas.width / 1200;
      const offsetX = 120;
      const BOTTOM_PUSH = 40;
      const centerOffset = (canvas.width - 1200 * scale) / 2 - 25;
      const boxes = [
        { cx: (100 + offsetX) * scale + centerOffset, cy: (218 + BOTTOM_PUSH) * scale, R: 72 * scale, index: 0 },
        { cx: (240 + offsetX) * scale + centerOffset, cy: (318 + BOTTOM_PUSH) * scale, R: 72 * scale, index: 1 },
        { cx: (780 + offsetX) * scale + centerOffset, cy: (142 + BOTTOM_PUSH) * scale, R: 72 * scale, index: 2 },
        { cx: (920 + offsetX) * scale + centerOffset, cy: (245 + BOTTOM_PUSH) * scale, R: 72 * scale, index: 3 },
      ];
      
      let foundIndex: number | null = null;
      for (const box of boxes) {
        const dist = Math.sqrt((mouseX - box.cx) ** 2 + (mouseY - box.cy) ** 2);
        if (dist < box.R * 1.2) {
          foundIndex = box.index;
          break;
        }
      }
      
      setHoveredBox(foundIndex);
      canvas.style.cursor = foundIndex !== null ? 'pointer' : 'default';
    };

    const handleMouseLeave = () => {
      setHoveredBox(null);
      canvas.style.cursor = 'default';
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      className="relative w-full overflow-hidden py-4"
      style={{ 
        backgroundColor: '#F8FAFF',
        width: '100%',
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full flex justify-center">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            cursor: "default",
          }}
        />
      </div>
    </motion.div>
  );
}