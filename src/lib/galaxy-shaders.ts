export const TRAIL_COUNT = 16

export const vertexShader = /* glsl */ `
  attribute vec4 aSeed;
  attribute vec3 aColor;
  attribute float aSize;
  uniform float uTime, uAspect, uDpr, uScale, uMobile;
  uniform vec2 uCenter;
  uniform vec3 uPointer;
  uniform vec4 uTrails[${TRAIL_COUNT}];
  uniform vec4 uTrailMotion[${TRAIL_COUNT}];
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float angle = aSeed.y + uTime * .018 / (.8 + aSeed.x * .32);
    float radius = aSeed.x + .025 * sin(angle * 5. + uTime * .12 + aSeed.w * 10.);
    vec3 p = vec3(cos(angle) * radius, sin(angle) * radius, aSeed.z);
    p.z += .035 * sin(angle * 6. + aSeed.x * 3. + uTime * .1);
    float tilt = mix(mix(1.03, .45, smoothstep(1.15, 1.9, uAspect)), 1.23, uMobile);
    p = vec3(p.x, p.y * cos(tilt) - p.z * sin(tilt), p.y * sin(tilt) + p.z * cos(tilt));
    float turn = mix(1.05, 1.54, uMobile);
    p.xy = mat2(cos(turn), sin(turn), -sin(turn), cos(turn)) * p.xy;
    p *= uScale;
    p.xy += uCenter;

    vec4 view = modelViewMatrix * vec4(p, 1.);
    vec4 clip = projectionMatrix * view;
    vec2 screen = clip.xy / clip.w;
    vec2 plane = vec2(screen.x * uAspect, screen.y);
    vec2 delta = plane - uPointer.xy;
    float distanceToPointer = length(delta);
    vec2 direction = delta / max(distanceToPointer, .0001);
    float core = pow(max(0., 1. - distanceToPointer / .48), 2.);
    float mobility = .3 + 1.55 * aSeed.w * aSeed.w;
    vec2 tangent = vec2(-direction.y, direction.x);
    vec2 offset = (direction * .68 + tangent * .1 * sin(aSeed.w * 16. + uTime * .35))
      * core * mobility * uPointer.z * 1.35;
    float curlSin = sin(aSeed.w * 6.);
    float curlCos = cos(aSeed.w * 6.);

    for (int i = 0; i < ${TRAIL_COUNT}; i++) {
      // Each envelope is shared by every star and calculated once on the CPU.
      if (uTrails[i].z > 0.) {
        vec2 difference = plane - uTrails[i].xy;
        float distanceSquared = dot(difference, difference);
        float influence = exp(-distanceSquared / .095);
        vec2 radial = difference * inversesqrt(max(distanceSquared, .000001));
        vec2 curl = vec2(-radial.y, radial.x);
        float amplitude = influence * uTrails[i].z;
        float rotation = uTrailMotion[i].z * curlCos + uTrailMotion[i].w * curlSin;
        offset += (radial * uTrails[i].w * (.65 + aSeed.w * .7)
          + curl * rotation + uTrailMotion[i].xy) * amplitude;
      }
    }

    offset /= 1. + length(offset) * .65;
    clip.xy += vec2(offset.x / uAspect, offset.y) * clip.w;
    clip.z -= min(length(offset) * .025, .03) * clip.w;
    gl_Position = clip;

    float copyVeil = mix(
      smoothstep(.24, .57, screen.x * .5 + .5),
      1. - smoothstep(-.42, .22, screen.y),
      uMobile
    );
    // Fixed star brightness: movement should feel like drift, without twinkling.
    vAlpha = (.55 + aSeed.w * .4) * copyVeil;
    vColor = aColor;
    gl_PointSize = clamp(aSize * uDpr * (7.7 / -view.z), 1.2, 5.);
  }
`

export const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 point = gl_PointCoord - .5;
    float radiusSquared = dot(point, point);
    if (radiusSquared > .25) discard;
    float coverage = 1. - smoothstep(.18, .5, sqrt(radiusSquared));
    gl_FragColor = vec4(vColor * 1.1, coverage * vAlpha);
    #include <colorspace_fragment>
  }
`
