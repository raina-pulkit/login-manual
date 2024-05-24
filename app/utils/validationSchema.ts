import { z } from "zod";

export const userRegistrationSchema = z
  .object({
    name: z
      .string()
      .min(2, "Minimum length of 2 needed")
      .max(30, "Maximum length can be 30"),
    nickname: z
      .string()
      .min(2, "Minimum length of 2 needed")
      .max(10, "Maximum length can be only 10"),
    password: z
      .string()
      .min(8, "Password must be atleast 8 characters long")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z.string(),
    email: z.string().email(),
    phNo: z
      .string()
      .min(10, "Phone number must be length 10")
      .max(10, "Phone number must be length 10"),
  })
  .superRefine(({ confirmPassword, password }, context) => {
    if (confirmPassword !== password) {
      context.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    const isUpper = (ch: string) => /[A-Z]/.test(ch);
    const isLower = (ch: string) => /[a-z]/.test(ch);
    const isSpecial = (ch: string) =>
      /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

    let cntUpper = 0,
      cntLower = 0,
      cntSpec = 0,
      cntNum = 0;
    for (let i = 0; i < password.length; i++) {
      let c = password[i];
      if (!isNaN(+c)) cntNum++;
      else if (isUpper(c)) cntUpper++;
      else if (isLower(c)) cntLower++;
      else if (isSpecial(c)) cntSpec++;
    }

    if (!(cntUpper && cntLower && cntNum && cntSpec)) {
      context.addIssue({
        code: "custom",
        message:
          "Password must contain aleast 1 upper-case, 1 lower-case, 1 number and 1 special charater!",
      });
    }
  });

  export const userLoginSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be atleast 8 characters long")
      .max(32, "Password must be less than 32 characters"),
    email: z.string().email(),
  });