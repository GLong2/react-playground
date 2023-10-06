"use client";
import { memo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSignInPost } from "@/api/auth";
import Cookies from "js-cookie";
import axios from "axios";
import Input from "./ui/Input";
import { Validation } from "@/utils/validation";

const SignInForm = () => {
  const router = useRouter();
  const useSignInPostMutation = useSignInPost();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<SignInInputs> = (data) => {
    useSignInPostMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          //쿠키 저장
          Cookies.set("hong_access_token", data.token, {
            expires: data.expiresDate, //Date
          });
          //페이지 이동
          router.push("/home");
        },
        onError: (error) => {
          axios.isAxiosError(error)
            ? alert(error?.response?.data?.message)
            : alert("로그인 실패");
        },
      },
    );
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="E-mail"
          error={errors.email?.message}
          success={!!(watch("email") && !errors.email?.message)}
          {...register("email", {
            ...Validation.email,
          })}
        />
        <Input
          placeholder="Password"
          type="password"
          success={!!(watch("password") && !errors.password?.message)}
          error={errors.password?.message}
          {...register("password", {
            ...Validation.password,
          })}
        />
        <button
          className="btn-auth disabled:bg-gray-300"
          type="submit"
          disabled={
            !(watch("email") && !errors.email?.message) ||
            !(watch("password") && !errors.password?.message)
          }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default memo(SignInForm);
