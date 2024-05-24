import { NextRequest } from "next/server";
import { updateSession } from "./app/utils/lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const middleware = async (req: NextRequest) => {
	return await updateSession(req);
}