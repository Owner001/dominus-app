# Patches de API para o DOMINUS WEB

## 1. Endpoint mobile OAuth

Copie `auth/mobile/token/route.ts` para:

`src/app/api/auth/mobile/token/route.ts`

No Discord Developer Portal adicione redirect:

`dominusapp://auth/callback`

## 2. Bearer JWT

No requireSession, aceitar `Authorization: Bearer` alem do cookie.
Audience: `dominus-mobile`.
