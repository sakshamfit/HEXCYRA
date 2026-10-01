import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/** Full-viewport, transparent aurora shader adapted from the supplied demo. */
export default function AnimatedShaderBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      })
    } catch {
      // Keep the CSS atmosphere visible on devices without WebGL support.
      container.dataset.webgl = 'unavailable'
      return
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.domElement.setAttribute('aria-hidden', 'true')
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u*u*(3.0-2.0*u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 35.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
            vec4 auroraColors = vec4(
              0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
              0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
              0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
              1.0
            );
            vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
            float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
            o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          vec3 aurora = o.rgb * 1.5;
          // The original sample was mounted over an opaque black demo panel.
          // Derive alpha from the glow so it can sit cleanly over the live site.
          float glow = max(max(aurora.r, aurora.g), aurora.b);
          gl_FragColor = vec4(aurora, clamp(glow * 0.72, 0.0, 0.58));
        }
      `,
      transparent: true,
      depthWrite: false,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    scene.add(new THREE.Mesh(geometry, material))

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (width <= 0 || height <= 0) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.setSize(width, height, false)
      material.uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }

    resize()
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    resizeObserver?.observe(container)
    window.addEventListener('resize', resize, { passive: true })

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startedAt = performance.now()
    let frameId = 0
    let disposed = false

    const renderFrame = (now: number) => {
      if (disposed || document.visibilityState === 'hidden') return
      material.uniforms.iTime.value = reducedMotion ? 0.6 : (now - startedAt) / 1000
      renderer.render(scene, camera)
      if (!reducedMotion) frameId = window.requestAnimationFrame(renderFrame)
    }

    const requestFrame = () => {
      window.cancelAnimationFrame(frameId)
      if (document.visibilityState !== 'hidden') {
        frameId = window.requestAnimationFrame(renderFrame)
      }
    }

    document.addEventListener('visibilitychange', requestFrame)
    requestFrame()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('visibilitychange', requestFrame)
      window.removeEventListener('resize', resize)
      resizeObserver?.disconnect()
      scene.clear()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} aria-hidden="true" className="animated-shader-background" />
}
