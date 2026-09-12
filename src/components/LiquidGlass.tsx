import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

// Domain-warped FBM height field rendered as a liquid glass surface:
// gradient -> pseudo-normal -> refraction offset into a soft procedural
// backdrop, plus specular, fresnel rim, caustic lift and a pointer lens.
const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_dark;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

const mat2 M = mat2(1.6, 1.2, -1.2, 1.6);

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = M * p;
    a *= 0.5;
  }
  return v;
}

float field(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + t * 0.07),
    fbm(p + vec2(5.2, 1.3) - t * 0.05)
  );
  vec2 r = vec2(
    fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * 0.10),
    fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * 0.08)
  );
  return fbm(p + 2.4 * r);
}

vec3 backdrop(vec2 uv, float t) {
  vec2 w = uv + 0.07 * vec2(
    fbm(uv * 3.0 + t * 0.05),
    fbm(uv * 3.0 - t * 0.04 + 4.7)
  );

  vec3 base   = mix(vec3(0.96, 0.97, 1.00), vec3(0.015, 0.016, 0.028), u_dark);
  vec3 indigo = mix(vec3(0.66, 0.71, 0.99), vec3(0.10, 0.11, 0.34),  u_dark);
  vec3 pink   = mix(vec3(0.99, 0.66, 0.87), vec3(0.38, 0.08, 0.42),  u_dark);
  vec3 teal   = mix(vec3(0.60, 0.93, 0.95), vec3(0.04, 0.32, 0.38),  u_dark);
  vec3 amber  = mix(vec3(1.00, 0.85, 0.62), vec3(0.40, 0.20, 0.05),  u_dark);

  vec3 c = base;
  c = mix(c, indigo, smoothstep(0.10, 0.95, w.x + 0.25 * w.y));
  c = mix(c, pink,   smoothstep(0.15, 0.90, 1.0 - w.x + 0.10 * sin(t * 0.15)) * 0.75);
  float blobA = fbm(w * 2.0 + vec2(t * 0.06, -t * 0.05));
  float blobB = fbm(w * 2.4 - vec2(t * 0.05,  t * 0.04) + 7.3);
  c = mix(c, teal,  smoothstep(0.52, 0.82, blobA) * 0.65);
  c = mix(c, amber, smoothstep(0.58, 0.88, blobB) * 0.5);
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  vec2 sp = p * 2.1;
  float t = u_time;
  float e = 0.012;

  float h  = field(sp, t);
  float hx = field(sp + vec2(e, 0.0), t);
  float hy = field(sp + vec2(0.0, e), t);
  vec2 grad = vec2(hx - h, hy - h) / e;

  // pointer lens
  vec2 dm = p - u_mouse;
  float lens = exp(-dot(dm, dm) * 5.0);
  grad += normalize(dm + 1e-4) * lens * 1.4;

  vec3 n = normalize(vec3(-grad * 0.10, 1.0));

  vec2 refr = uv + n.xy * 0.14;

  vec3 col = backdrop(refr, t);
  // chromatic dispersion
  float chroma = 0.014;
  col.r = backdrop(refr + n.xy * chroma, t).r;
  col.b = backdrop(refr - n.xy * chroma, t).b;

  vec3 L = normalize(vec3(-0.45, 0.75, 0.65));
  float spec = pow(max(dot(n, normalize(L + vec3(0.0, 0.0, 1.0))), 0.0), 80.0);
  float fres = pow(1.0 - n.z, 2.0);
  float caustic = pow(max(h - 0.32, 0.0), 3.0) * 2.0;

  vec3 lightTint = mix(vec3(1.0), vec3(0.75, 0.85, 1.15), u_dark);
  col += (spec * 1.0
        + fres * mix(0.30, 0.55, u_dark)
        + caustic * mix(0.22, 0.50, u_dark)
        + lens * mix(0.10, 0.22, u_dark)) * lightTint;

  // gentle vignette keeps edges calm
  col *= 1.0 - 0.22 * dot(p * 0.72, p * 0.72);
  col += (hash(gl_FragCoord.xy) - 0.5) / 255.0;

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

export default function LiquidGlass({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const darkRef = useRef(dark)
  useEffect(() => {
    darkRef.current = dark
  }, [dark])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      powerPreference: 'high-performance',
    })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return
    const prog = gl.createProgram()
    if (!prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uDark = gl.getUniformLocation(prog, 'u_dark')
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let raf = 0
    let running = true
    let visible = true
    const start = performance.now()
    const mouse = { x: 0, y: -0.4, tx: 0, ty: -0.4 }
    let darkVal = darkRef.current ? 1 : 0
    let frameAvg = 16

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const onPointer = (ev: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const m = Math.min(r.width, r.height)
      mouse.tx = (ev.clientX - r.left - r.width / 2) / m
      mouse.ty = (r.height / 2 - (ev.clientY - r.top)) / m
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const frame = () => {
      if (!running) return
      raf = requestAnimationFrame(frame)
      if (!visible) return
      const t0 = performance.now()
      resize()
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      darkVal += ((darkRef.current ? 1 : 0) - darkVal) * 0.08
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (t0 - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uDark, darkVal)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      // adaptive resolution: drop DPR if the GPU can't hold ~60fps
      const dt = performance.now() - t0
      frameAvg = frameAvg * 0.95 + dt * 0.05
      if (frameAvg > 14 && dpr > 1) {
        dpr = 1
        frameAvg = 16
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVis = () => {
      running = document.visibilityState !== 'hidden'
      if (running) raf = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('resize', resize)

    resize()
    if (reduced) {
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, 4.2)
      gl.uniform2f(uMouse, 0, 0)
      gl.uniform1f(uDark, darkVal)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', resize)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
