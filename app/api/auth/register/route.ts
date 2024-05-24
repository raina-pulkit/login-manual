import prisma from "@/app/utils/db";
import { userRegistrationSchema } from "@/app/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();

  const { name, email, password, confirmPassword, nickname, phNo } = data;
  const phNumber = Number.parseInt(phNo, 10);
  const hashedPassword = await bcrypt.hash(password, 10);
  const formData = {
    name,
    email,
    password,
    confirmPassword,
    nickname,
    phNo,
  };

  try {
    userRegistrationSchema.parse(formData);

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          nickname,
          phNo: phNumber,
        },
      });

      return NextResponse.json(
        {
          message: "Data added successfully!",
        },
        {
          status: 200,
        }
      );
    } catch (e: any) {
      console.log(e.message);
      return NextResponse.json(
        {
          message: e.message,
        },
        {
          status: 401,
        }
      );
    }
  } catch (e: any) {
    console.log(e);

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
