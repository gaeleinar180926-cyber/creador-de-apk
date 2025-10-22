#!/usr/bin/env node
/*
  Script simple para iterar sobre `businesses.json` y lanzar builds EAS por cada negocio.
  Requiere que en el entorno esté disponible `EAS_BUILD_TOKEN` o que se haga `eas login` previamente.
  Uso: node scripts/build-by-business.js
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

for (const biz of businesses) {
  console.log('\n==== Iniciando build para:', biz.name, '====');

  // Generar un app.config temporario (si se necesita) — aquí simplemente cambiamos app.json
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

    // Llamar a EAS build (usar shell para compatibilidad en Windows)
    console.log('Lanzando: eas build -p android --profile production');
    const cmd =
      'npx eas build -p android --profile production --non-interactive';
    const res = spawnSync(cmd, {
      shell: true,
      stdio: 'inherit',
      cwd: repoRoot,
      env: Object.assign({}, process.env),
    });

    if (res.error) {
      console.error('Error al lanzar EAS:', res.error);
    }
    if (res.status !== 0) {
      console.error('Build falló para', biz.name, 'con código', res.status);
    } else {
      console.log('Build finalizado para', biz.name);
    }
  } finally {
    // Restaurar app.json original
    fs.copyFileSync(backupPath, appJsonPath);
    fs.unlinkSync(backupPath);
  }
}
