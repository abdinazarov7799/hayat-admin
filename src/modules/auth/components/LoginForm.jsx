import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
export default function LoginForm({ loginRequest = () => {}, ...rest }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const {t} = useTranslation();
  const onSubmit = ({login,password}) => {
    loginRequest({username: login,password});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mt={2} isInvalid={errors.login}>
        <FormLabel htmlFor="login">{t('Login')}</FormLabel>
        <InputGroup>
          <Input
            id="login"
            {...register("login", {
              required: t("Login is required"),
            })}
            type="text"
            placeholder={t("Login")}
          />
        </InputGroup>

        <FormErrorMessage>
          {errors.login && errors.login.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt={5} isInvalid={errors.password}>
        <FormLabel htmlFor={"password"}>{t('Password')}</FormLabel>
        <Input
          id={"password"}
          type="password"
          placeholder={t("Password")}
          {...register("password", {
            required: t("Password  is required"),
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Stack spacing={6} color={"white"}>
        <Button
          mt={8}
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
        >
          <Text color="white">{t('Login')}</Text>
        </Button>
      </Stack>
    </form>
  );
}
