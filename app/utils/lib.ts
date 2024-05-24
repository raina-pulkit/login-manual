"use server";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface loginProps {
  email: String;
  password: String;
}

const TIMEOUT_PERIOD = 120000;
const key = new TextEncoder().encode(process.env.AUTH_SECRET);

const encrypt = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TIMEOUT_PERIOD} sec from now`)
    .sign(key);
};

const decrypt = async (session: string): Promise<any> => {
	const { payload } = await jwtVerify(session, key, {
		algorithms: ['HS256']
	});

	return payload;
}

export const myLogin = async (formData: loginProps) => {
  const { email, password } = formData;
  const user = {
    email,
    password,
  };

  // Create session
  const expires = new Date(Date.now() + TIMEOUT_PERIOD * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
};

export const myLogout = async () => {
	cookies().set("session", '', { expires: new Date(0) })
}

export const getSession = async () => {
	const session = cookies().get('session')?.value;
	if(!session) return null;
	return await decrypt(session);
}

// To update the expiry of the current session everytime the user uses the account
export const updateSession = async (req: NextRequest) => {
	const session = req.cookies.get('session')?.value;
	if(!session) return;

	const payload = await decrypt(session);
	payload.expires = new Date(Date.now() + TIMEOUT_PERIOD*1000);
	const res = NextResponse.next();
	res.cookies.set({
		name: 'session',
		value: await encrypt(payload),
		httpOnly: true,
		expires: payload.expires
	});

	return res;
}