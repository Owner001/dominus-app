# Dominus App

Aplicativo **mobile nativo** (React Native + Expo) para gerenciar o **Dominus Safer**.

> **Nao e WebView.** UI propria, autenticacao Discord via OAuth + API Dominus, isolamento por guildId.

## Stack

- Expo SDK 52 + Expo Router
- TypeScript
- TanStack Query
- Zustand
- Expo SecureStore (JWT)
- Axios

## Pre-requisitos

1. DOMINUS WEB com:
   - `POST /api/auth/mobile/token` (pasta `api-patches/`)
   - Rotas `/api/guilds*` aceitando `Authorization: Bearer`
2. Discord OAuth Redirect: `dominusapp://auth/callback`
3. Node 20+

## Setup

```bash
cp .env.example .env
npm install
npx expo start
```

## Variaveis

| Var | Descricao |
|-----|-----------|
| `EXPO_PUBLIC_API_URL` | URL do Dominus Web |
| `EXPO_PUBLIC_DISCORD_CLIENT_ID` | Client ID publico Discord |
| `EXPO_PUBLIC_DISCORD_REDIRECT_URI` | `dominusapp://auth/callback` |
| `EXPO_PUBLIC_BOT_INVITE_URL` | Invite do bot |

**Nunca** coloque client secret ou BOT_API_SECRET no app.

## Build EAS

```bash
npm i -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
eas build -p ios --profile production
```

## Seguranca

- Segredos so no backend
- Guild isolada + validacao server-side
- Logout limpa SecureStore

© Dominus Safer
