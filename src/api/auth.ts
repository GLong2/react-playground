import api from "./api";
import { useMutation } from "@tanstack/react-query";

const postSignIn = async (params: SignInParam) => {
  const response = await api.post(`/api/auth/login`, params);
  return response.data;
};

export const useSignInPost = () => {
  return useMutation((params: SignInParam) => postSignIn(params));
};

const postSignUp = async (params: SignUpParam) => {
  const response = await api.post(`/api/auth/signup`, params);
  return response.data;
};

export const useSignUpPost = () => {
  return useMutation((params: SignUpParam) => postSignUp(params));
};

const postEmailDupCheck = async (params: EmailDupCheckParam) => {
  const response = await api.post(`/api/user/checkEmail`, params);
  return response.data;
};

export const useEmailDupCheckPost = () => {
  return useMutation((params: EmailDupCheckParam) => postEmailDupCheck(params));
};
