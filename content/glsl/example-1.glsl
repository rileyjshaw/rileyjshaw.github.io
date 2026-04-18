#version 300 es
precision highp float;

in vec2 v_uv;
uniform float u_time;
uniform vec2 u_cursor;
uniform vec2 u_resolution;

out vec4 outColor;

void main() {
  vec2 cursor = u_cursor * 2.0 - 1.0;
  vec2 uv = v_uv * 2.0 - 1.0 - cursor;
  uv.x *= u_resolution.x / u_resolution.y;
  float r = length(uv);
  float glow = 0.25 / max(r, 0.001);
  vec3 color = 0.5 + 0.5 * cos(u_time + r + vec3(0.0, 2.0, 4.0));
  outColor = vec4(color * glow, 1.0);
}
