"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSession, myLogin } from "../utils/lib";
import DialogueBox from "../_components/dialogue";
import { useRouter } from "next/navigation";

const AuthPage = ({ login }: { login: boolean }) => {
  const router = useRouter();

  const alreadyLogged = async () => {
    const user = await getSession();
    if (user) router.replace("/");
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const a = async () => {
      await alreadyLogged();
      setLoading(false);
    };

    a();
  }, []);

  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const choice = login ? userLoginSchema : userRegistrationSchema;
  const form = useForm<z.infer<typeof choice>>({
    resolver: zodResolver(choice),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      nickname: "",
      confirmPassword: "",
      phNo: "",
    },
  });

  const handleSubmit = async (body: z.infer<typeof choice>) => {
    const data = JSON.stringify(body);
    const res = await fetch(`api/auth/${login ? "login" : "register"}/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    if (res.status === 200) {
      await myLogin(body);
      router.replace("/users");
    } else setShowAlert(true);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-3 bg-black">
      {!loading ? (
        <>
        {showAlert && (
          <DialogueBox
            title={"Error in login!"}
            onClose={() => {
              setShowAlert(false);
            }}
          >
            <p>Invalid username or password</p>
          </DialogueBox>
        )}
        
        <h1 className="text-4xl mb-3 text-amber-200">
          {login ? "Login" : "Register"}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3 w-96"
          >
            {!login && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* Render allows for an error message to be shown everytime there's an error on this particular input field */}
                    <FormLabel className="text-white">User Name</FormLabel>
                    {/* Form Control allows to share the context to display errors */}
                    <FormControl>
                      <Input placeholder="User Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
        
            {!login && (
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    {/* Render allows for an error message to be shown everytime there's an error on this particular input field */}
                    <FormLabel className="text-white">Nickname</FormLabel>
                    {/* Form Control allows to share the context to display errors */}
                    <FormControl>
                      <Input placeholder="Nickname" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
        
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* Render allows for an error message to be shown everytime there's an error on this particular input field */}
                  <FormLabel className="text-white">Email Address</FormLabel>
                  {/* Form Control allows to share the context to display errors */}
                  <FormControl>
                    <Input placeholder="Email" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
            {!login && (
              <FormField
                control={form.control}
                name="phNo"
                render={({ field }) => (
                  <FormItem>
                    {/* Render allows for an error message to be shown everytime there's an error on this particular input field */}
                    <FormLabel className="text-white">Phone Number</FormLabel>
                    {/* Form Control allows to share the context to display errors */}
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
        
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* Render allows for an error message to be shown everytime there's an error on this particular input field */}
                  <FormLabel className="text-white">Password</FormLabel>
                  {/* Form Control allows to share the context to display errors */}
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        type={eye1 ? "text" : "password"}
                        {...field}
                      />
                      {eye1 ? (
                        <EyeOff
                          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:scale-90 transition-all duration-150 active:scale-75"
                          onClick={() => setEye1((prev) => !prev)}
                        />
                      ) : (
                        <Eye
                          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:scale-90 transition-all duration-150 active:scale-75"
                          onClick={() => setEye1((prev) => !prev)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        
            {!login && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    {/* Render allows for an error message to be shown everytime there's an error on this particular input field */}
                    <FormLabel className="text-white">Confirm Password</FormLabel>
                    {/* Form Control allows to share the context to display errors */}
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Confirm Password"
                          type={eye2 ? "text" : "password"}
                          {...field}
                        />
                        {eye2 ? (
                          <EyeOff
                            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:scale-90 transition-all duration-150 active:scale-75"
                            onClick={() => setEye2((prev) => !prev)}
                          />
                        ) : (
                          <Eye
                            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:scale-90 transition-all duration-150 active:scale-75"
                            onClick={() => setEye2((prev) => !prev)}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
        
            <Button type="submit">{login ? "Login" : "Register"}</Button>
          </form>
        </Form>
        </>
      ) : (
        <span className="loading loading-ring loading-lg bg-white"></span>
      )}
    </div>
  );
};

export default AuthPage;
