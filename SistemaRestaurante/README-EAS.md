# Automatizar builds EAS por negocio

Este directorio contiene utilidades para lanzar builds de Expo EAS por cada negocio definido en `businesses.json`.

Requisitos:

- Node.js y npm instalados.
- Cuenta en Expo y token (recomendado). Puedes obtenerlo con `eas login` o exportando `EAS_BUILD_TOKEN`/`EXPO_TOKEN`.

Pasos rápidos (PowerShell):

1. Instalar dependencias (solo una vez):

```powershell
cd 'C:\Users\jovan\repos\creador-de-apk\SistemaRestaurante'
npm install
```

2. Opcional: iniciar sesión en Expo (interactivo):

```powershell
npx eas login
```

3. Lanzar builds para todos los negocios en `businesses.json`:

```powershell
node scripts/build-by-business.js
```

Notas:

- El script modifica temporalmente `app.json` para cambiar `name` y `slug` por cada negocio y lo restaura después.
- Los builds se ejecutan en la nube (EAS) y los artefactos estarán disponibles desde el panel de EAS o desde el enlace que EAS proporcione.
- Para uso en CI debes exportar `EXPO_TOKEN` o `EAS_BUILD_TOKEN` como secret para que `npx eas build` funcione sin interacción.

## Secrets para CI y FCM

Para que el workflow de GitHub Actions pueda usar Firebase (FCM) y ejecutar builds no interactivos en runners, crea estos secrets en GitHub:

- `EXPO_TOKEN` — token generado en https://expo.dev/accounts/<tu-usuario>/settings/tokens
- `FIREBASE_SERVICE_ACCOUNT_BASE64` — el JSON de la cuenta de servicio de Firebase codificado en base64. El workflow decodifica esto y escribe `SistemaRestaurante/credentials/google-service-account.json` en el runner.

Cómo generar `FIREBASE_SERVICE_ACCOUNT_BASE64` en PowerShell (local):

```powershell
# Desde la raíz del proyecto
cd 'C:\Users\jovan\repos\creador-de-apk\SistemaRestaurante'
$bytes = [System.IO.File]::ReadAllBytes('.\credentials\google-service-account.json')
[Convert]::ToBase64String($bytes) | Out-File -Encoding ascii encoded.txt
Get-Content encoded.txt  # copia el contenido en el secret de GitHub
```

Después de crear ambos secrets, ve a Actions → selecciona el workflow `EAS builds for businesses` y ejecútalo manualmente o haz push a la rama `feature/add-creador-de-apk`.

## Iniciar localmente una app (sin cambiar ramas)

Si quieres ejecutar Expo local para una de las apps listadas en `businesses.json` (por ejemplo para probar la UI sin construir APKs), usa el script `start-by-business.js`.

Ejemplo (PowerShell):

```powershell
cd 'C:\Users\jovan\repos\creador-de-apk\SistemaRestaurante'
npm install
# Listar slugs disponibles (manual): abrir businesses.json
node scripts/start-by-business.js taqueria-el-buen-taco
```

El script modifica temporalmente `app.json` para usar el `name` y `slug` del negocio seleccionado y lo restaura cuando cierras Expo.

Slugs disponibles (según `businesses.json`):

- taqueria-el-buen-taco
- gorditas-quesadillas-la-sabrosa
- polleria-el-pollo-feliz
- botanero-la-botana
- cemiteras-servicios
- carniceria-la-carne
- verduleria-el-huerto
- heladeria-delicias
