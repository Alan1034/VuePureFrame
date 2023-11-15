import { createApiAction } from "@/utils";
import { api } from "@/api";

// 获取验证码（及其key）
export const captchaList = createApiAction(api.captchaList);
export const smscodeCreate = createApiAction(api.smscodeCreate);