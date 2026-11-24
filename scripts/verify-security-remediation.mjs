/**
 * Security Remediation Verification Suite
 * Tests 401, 413, PIN bypass prevention, and authenticated flows
 */

import assert from "node:assert/strict";

const BASE_URL = process.env.BASE_URL || "http://localhost:3003";
const ADMIN_KEY = process.env.ADMIN_SECRET_KEY || "iva_sanctuary_master_bayridge_2026";

console.log(`\n🛡️  INICIANDO BATERÍA DE PRUEBAS DE CIBERSEGURIDAD`);
console.log(`Target: ${BASE_URL}\n`);

let passedCount = 0;
let totalCount = 0;

async function test(name, fn) {
  totalCount++;
  try {
    await fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedCount++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    throw err;
  }
}

// -------------------------------------------------------------
// PRIORIDAD 1 & 3: Endpoints Admin y Upload
// -------------------------------------------------------------

await test("SEC-P1.1: GET /api/admin/content sin auth rechaza con 401 Unauthorized", async () => {
  const res = await fetch(`${BASE_URL}/api/admin/content`);
  assert.equal(res.status, 401, `Status esperado 401, recibido ${res.status}`);
  const json = await res.json();
  assert.ok(json.error, "Debe contener mensaje de error");
});

await test("SEC-P1.2: POST /api/admin/content sin auth rechaza con 401 Unauthorized", async () => {
  const res = await fetch(`${BASE_URL}/api/admin/content`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ businessName: "Hacked Name" }),
  });
  assert.equal(res.status, 401, `Status esperado 401, recibido ${res.status}`);
});

await test("SEC-P3.1: POST /api/admin/upload sin auth rechaza con 401 Unauthorized", async () => {
  const res = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dataUrl: "data:image/jpeg;base64,dGVzdA==", name: "test.jpg" }),
  });
  assert.equal(res.status, 401, `Status esperado 401, recibido ${res.status}`);
});

let adminSessionToken = "";
let adminCookie = "";

await test("SEC-P1.3: POST /api/admin/login con clave incorrecta rechaza con 401", async () => {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: "wrong-password-xyz" }),
  });
  assert.equal(res.status, 401, `Status esperado 401, recibido ${res.status}`);
});

await test("SEC-P1.4: POST /api/admin/login con clave correcta autentica con 200 y emite sesión", async () => {
  const res = await fetch(`${BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: ADMIN_KEY }),
  });
  assert.equal(res.status, 200, `Status esperado 200, recibido ${res.status}`);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.ok(json.token, "Debe emitir token de sesión");
  adminSessionToken = json.token;

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    adminCookie = setCookie.split(";")[0];
  }
});

await test("SEC-P1.5: GET /api/admin/content con token Bearer responde 200 OK", async () => {
  const res = await fetch(`${BASE_URL}/api/admin/content`, {
    headers: { Authorization: `Bearer ${adminSessionToken}` },
  });
  assert.equal(res.status, 200, `Status esperado 200, recibido ${res.status}`);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.ok(json.content, "Debe retornar content");
});

await test("SEC-P3.2: POST /api/admin/upload con archivo > 5 MB rechaza con 413 Payload Too Large", async () => {
  // Generate a payload exceeding 5 MB (6 MB)
  const hugePayload = "A".repeat(6 * 1024 * 1024);
  const dataUrl = `data:image/jpeg;base64,${Buffer.from(hugePayload).toString("base64")}`;

  const res = await fetch(`${BASE_URL}/api/admin/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminSessionToken}`,
    },
    body: JSON.stringify({ dataUrl, name: "huge.jpg" }),
  });

  assert.equal(res.status, 413, `Status esperado 413, recibido ${res.status}`);
  const json = await res.json();
  assert.ok(json.error.includes("supera el límite máximo permitido de 5 MB"));
});

// -------------------------------------------------------------
// PRIORIDAD 2: Portal de Clientas & PII Protection
// -------------------------------------------------------------

await test("SEC-P2.1: POST /api/clients/portal login con PIN vacío rechaza con 401 Unauthorized", async () => {
  const res = await fetch(`${BASE_URL}/api/clients/portal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", phone: "9295550182", pin: "" }),
  });
  assert.equal(res.status, 401, `Status esperado 401, recibido ${res.status}`);
  const json = await res.json();
  assert.ok(json.error.includes("PIN"));
});

await test("SEC-P2.2: POST /api/clients/portal login con PIN incorrecto rechaza con 401 Unauthorized", async () => {
  const res = await fetch(`${BASE_URL}/api/clients/portal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", phone: "9295550182", pin: "0000" }),
  });
  assert.equal(res.status, 401, `Status esperado 401, recibido ${res.status}`);
});

await test("SEC-P2.3: GET /api/clients/portal?phone=... sin auth rechaza con 401 Unauthorized (No PII leak)", async () => {
  const res = await fetch(`${BASE_URL}/api/clients/portal?phone=9295550182`);
  assert.equal(res.status, 401, `Status esperado 401, recibido ${res.status}`);
  const json = await res.json();
  assert.ok(json.error, "Debe exigir autenticación");
  assert.equal(json.client, undefined, "No debe filtrar datos de la clienta");
});

let clientToken = "";

await test("SEC-P2.4: POST /api/clients/portal login con PIN correcto (1234) responde 200 y emite token", async () => {
  const res = await fetch(`${BASE_URL}/api/clients/portal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", phone: "9295550182", pin: "1234" }),
  });
  assert.equal(res.status, 200, `Status esperado 200, recibido ${res.status}`);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.client.name, "Camila Ramos");
  assert.ok(json.token, "Debe emitir token de sesión");
  clientToken = json.token;
});

await test("SEC-P2.5: GET /api/clients/portal?phone=... con token de sesión responde 200 OK", async () => {
  const res = await fetch(`${BASE_URL}/api/clients/portal?phone=9295550182`, {
    headers: { "x-client-session": clientToken },
  });
  assert.equal(res.status, 200, `Status esperado 200, recibido ${res.status}`);
  const json = await res.json();
  assert.equal(json.success, true);
  assert.equal(json.client.name, "Camila Ramos");
});

console.log(`\n========================================`);
console.log(`RESULTADO FINAL: ${passedCount} / ${totalCount} PRUEBAS APROBADAS (100%)`);
console.log(`========================================\n`);
