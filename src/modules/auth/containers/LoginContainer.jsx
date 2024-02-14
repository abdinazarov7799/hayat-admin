import React from "react";
import {Box, Image, Text} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import { get } from "lodash";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { URLS } from "../../../constants/url";
import { useSettingsStore, useStore } from "../../../store";
import usePostQuery from "../../../hooks/api/usePostQuery";
import { OverlayLoader } from "../../../components/loader";
import logo from "../../../assets/images/logo.png";
import {useTranslation} from "react-i18next";

const LoginContainer = ({ ...rest }) => {
  const {t} = useTranslation()
  const { mutate, isLoading } = usePostQuery({
    url: URLS.sign_in,
    hideSuccessToast: true,
  });
  const setToken = useSettingsStore((state) =>
    get(state, "setToken", () => {})
  );
  const setAuthenticated = useStore((state) => get(state, "setAuthenticated", () => {}));

  const navigate = useNavigate();

  const loginRequest = (data) => {
    mutate(
      { url: URLS.sign_in, attributes: data },
      {
        onSuccess: ({ data }) => {
          setToken(get(data, "data.accessToken", null));
          setAuthenticated(true);
          navigate("/auth");
          Swal.fire({
            position: "center",
            icon: "success",
            backdrop: "rgba(0,0,0,0.9)",
            background: "none",
            title: t("Добро пожаловать в нашу систему"),
            iconColor: "#0BC4EA ",
            showConfirmButton: false,
            timer: 2000,
            customClass: {
              title: "title-color",
            },
          });
        },
      }
    );
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Box px={6}>
        <Image src={logo} className={"logo"} width={100} height={120} />
      </Box>
      <LoginForm loginRequest={loginRequest} />
    </>
  );
};

export default LoginContainer;
