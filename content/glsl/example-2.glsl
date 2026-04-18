#version 300 es
precision highp float;

in vec2 v_uv;
uniform float u_time;
out vec4 outColor;

void main() {
    vec2 p = (v_uv - 0.5) * 2.0;
    float t = u_time * 0.6;
    vec3 c = vec3(0.0);
    for (int i = 0; i < 10; ++i) {
        c = vec3(
            sin(c.r + cos(c.g + t * 1.139 + p.x * 2.0) + tan(c.b * 0.15 + p.y)),
            cos(c.g + sin(c.b + t * 1.003 + p.y * 2.0) + tan(c.r * 0.15 + p.x)),
            sin(c.b + cos(c.r + t * 0.7831 + p.x - p.y) + tan(c.g * 0.15 + p.x * p.y))
        );
    }
    vec3 color = 0.5 + 0.5 * sin(c);
    float l = dot(p, p);
    l *= l;
    l *= l;
    float alpha = 1.0 - l;
    outColor = vec4(color * alpha, alpha);
}
