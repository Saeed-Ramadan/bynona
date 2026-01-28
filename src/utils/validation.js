import * as yup from "yup";

export const getLoginSchema = (t) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email_invalid"))
      .required(t("validation.required")),
    password: yup
      .string()
      .min(6, t("validation.min_length", { count: 6 }))
      .required(t("validation.required")),
    rememberMe: yup.boolean().oneOf([true], t("validation.required")),
  });
};

export const getRegisterSchema = (t) => {
  return yup.object().shape({
    first_name: yup.string().required(t("validation.required")),
    last_name: yup.string().required(t("validation.required")),
    email: yup
      .string()
      .email(t("validation.email_invalid"))
      .required(t("validation.required")),
    phone: yup
      .string()
      .matches(
        /^[0-9]+$/,
        t("validation.phone_invalid", "Invalid phone number"),
      )
      .min(10, t("validation.min_length", { count: 10 }))
      .required(t("validation.required")),
    password: yup
      .string()
      .min(6, t("validation.min_length", { count: 6 }))
      .required(t("validation.required")),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], t("validation.password_match"))
      .required(t("validation.required")),
    terms: yup.boolean().oneOf([true], t("validation.required")),
  });
};

export const getSubscriptionSchema = (t) => {
  return yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email_invalid"))
      .required(t("validation.required")),
  });
};

export const getResetPasswordSchema = (t) => {
  return yup.object().shape({
    password: yup
      .string()
      .min(6, t("validation.min_length", { count: 6 }))
      .required(t("validation.required")),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], t("validation.password_match"))
      .required(t("validation.required")),
  });
};
