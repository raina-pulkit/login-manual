import prisma from "@/app/utils/db";
import { userLoginSchema } from "@/app/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const { email, password } = data;

  try {
    userLoginSchema.parse({ email, password });
    const res = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        password: true,
      },
    });
    if (!res)
      return NextResponse.json(
        {
          message: "No such user exists!",
        },
        {
          status: 404,
        }
      );

    if (await bcrypt.compare(password, res.password))
      return NextResponse.json(
        {
          message: "Login Success!",
        },
        {
          status: 200,
        }
      );
    else
      return NextResponse.json(
        {
          message: "Incorrect Credentials!",
        },
        {
          status: 401,
        }
      );
  } catch (e: any) {
    return NextResponse.json(
      {
        message: `Failed to pass all checks! ${e.message}`,
      },
      {
        status: 400,
      }
    );
  }
};
