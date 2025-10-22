#!/usr/bin/env node
/*
  Script para iniciar Expo (npx expo start) con la configuración de un negocio.
  Uso:
    node scripts/start-by-business.js <slug>
  Ejemplo:
    node scripts/start-by-business.js taqueria-el-buen-taco

  El script modifica temporalmente `app.json` y lo restaura al salir.
*/
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const repoRoot = path.resolve(__dirname, '..');
const businessesPath = path.join(repoRoot, 'businesses.json');

if (!fs.existsSync(businessesPath)) {
  console.error('No se encontró businesses.json en', businessesPath);
  process.exit(1);
}

const businesses = JSON.parse(fs.readFileSync(businessesPath, 'utf8'));
const slug = process.argv[2];

if (!slug) {
  console.error('Uso: node scripts/start-by-business.js <slug>');
  console.error('Slugs disponibles:');
  businesses.forEach(b => console.log(' -', b.slug));
  process.exit(1);
}

const biz = businesses.find(b => b.slug === slug);
if (!biz) {
  console.error('No se encontró negocio con slug:', slug);
  process.exit(1);
}

const appJsonPath = path.join(repoRoot, 'app.json');
const backupPath = appJsonPath + '.bak';
fs.copyFileSync(appJsonPath, backupPath);

try {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  appJson.expo.name = biz.name;
  appJson.expo.slug = biz.slug;
  if (biz.icon) appJson.expo.icon = biz.icon;
  if (biz.splash) appJson.expo.splash = biz.splash;
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

  console.log('Iniciando Expo para', biz.name);
  // Usar shell:true para compatibilidad en Windows (evita ENOENT al buscar 'npx')
  // Evitar que el "doctor" de Expo haga llamadas en línea que pueden fallar en redes
  // problemáticas: establecemos EXPO_NO_DOCTOR=1 en el entorno.
  const env = Object.assign({}, process.env, { EXPO_NO_DOCTOR: '1' });

  const res = spawnSync('npx expo start', {
    shell: true,
    stdio: 'inherit',
    cwd: repoRoot,
    env,
  });

  if (res.error) console.error('Error al iniciar Expo:', res.error);
  if (res.status !== 0) {
    console.error('expo start finalizó con código', res.status);
  }
} finally {
  // Restaurar app.json original
  fs.copyFileSync(backupPath, appJsonPath);
  fs.unlinkSync(backupPath);
}
