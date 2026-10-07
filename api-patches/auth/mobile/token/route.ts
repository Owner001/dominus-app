import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const DISCORD_API = "https://discord.com/api/v10";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      code?: string;
      redirectUri?: string;
      codeVerifier?: string;
    };
    if (!body.code || !body.redirectUri) {
      return NextResponse.json({ error: "code e redirectUri obrigatórios." }, { status: 400 });
    }
    const clientId = process.env.DISCORD_CLIENT_ID || process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;
    const jwtSecret = process.env.JWT_SECRET;
    if (!clientId || !clientSecret || !jwtSecret) {
      return NextResponse.json({ error: "OAuth não configurado no servidor." }, { status: 500 });
    }
    const form = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code: body.code,
      redirect_uri: body.redirectUri,
    });
    if (body.codeVerifier) form.set("code_verifier", body.codeVerifier);
    const tokenRes = await fetch(`${DISCORD_API}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
    });
    if (!tokenRes.ok) {
      return NextResponse.json({ error: "Falha ao trocar code Discord." }, { status: 401 });
    }
    const tokenJson = (await tokenRes.json()) as { access_token: string };
    const meRes = await fetch(`${DISCORD_API}/users/@me`, {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
    });
    if (!meRes.ok) {
      return NextResponse.json({ error: "Falha ao obter usuário Discord." }, { status: 401 });
    }
    const me = await meRes.json();
    const user = {
      id: me.id,
      username: me.username,
      globalName: me.global_name ?? null,
      avatar: me.avatar,
      email: me.email ?? null,
      discriminator: me.discriminator,
    };
    const token = await new SignJWT({ user, accessToken: tokenJson.access_token, mobile: true })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("dominus-web")
      .setAudience("dominus-mobile")
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(jwtSecret));
    return NextResponse.json({
      token,
      user,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro" }, { status: 500 });
  }
}
