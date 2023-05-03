import React, { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, message } from "antd";
import { getAccessToken, login } from "../../api/Login.api";
import { useNavigate } from "react-router-dom";
import one from "../../assets/microsoft.svg";
import GithubICon from "../../assets/images/githubWhite.svg";
import { Content } from "antd/es/layout/layout";
import RoleUtils from "../../utils/RoleUtils";
import { useQuery } from "@tanstack/react-query";
const clientId = "c9fbc5df04a588cff8c0";
const clientSecret = "51be5d31435559ad542ebfab3cea54018fe29bb2";

const Loginpage = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setloading] = useState(false);
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("checkbox") !== null ? true : false
  );

  const onFinish = async (values) => {
    setErr("");
    setloading(true);
    try {
      const response = await login(values);

      let userPrev = response?.userInfo?.role?.rolePrivilege;
      userPrev = userPrev ? JSON.parse(JSON.parse(userPrev)) : null;
      if (userPrev) {
        RoleUtils.set(userPrev);
        localStorage.setItem("privilage", JSON.stringify(userPrev));
      }
      localStorage.setItem("name", response?.userInfo?.name);

      if (isChecked) {
        localStorage.setItem("email", values?.email);
      }
      setloading(false);
      const obj = response;
      setErr(obj.message);
      // localStorage.setItem("name", response.userInfo.name);
      // navigate("/voluntaryGroups");
    } catch (error) {
      setloading(false);
      setErr(error?.response?.data?.message);
      console.log("error----->", error?.response?.data?.message);
    }
    if (isChecked && localStorage.token !== "") {
      localStorage.checkbox = isChecked;
    }
  };
  const login = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo%20read:org%20admin:org%20user:email`,
      "GitHub OAuth",
      "width=600,height=600"
    );
  };
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");

  const { data: accessToken, refetch } = useQuery(
    ["accessToken", codeParam],
    () => getAccessToken(codeParam),
    {
      enabled: false,
      retry: false,
    }
  );
  useEffect(() => {
    refetch();
    console.log("accessToken", accessToken);
  }, [codeParam]);

  useEffect(() => {
    const token = localStorage.getItem("token") != null;
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="w-screen min-h-screen  flex justify-center items-center ">
      <div className=" bg-white flex flex-col justify-center  items-center relative ">
        <div className="px-24">
          <img src={one} alt="gihthub" className="w-[200px]" />
          <button
            style={{
              backgroundColor: "#333333",
              color: "#ffffff",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "20px",
              display: "flex",
            }}
            onClick={login}
          >
            <img
              src={GithubICon}
              alt="GitHub Logo"
              width="20"
              height="20"
              style={{ verticalAlign: "middle", marginRight: "10px" }}
            />
            Login With Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
