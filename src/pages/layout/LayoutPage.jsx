import React, { useEffect, useState } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { avtarSvg } from "../../utils/constants";
import {
  RadarChartOutlined,
  PlayCircleOutlined,
  FullscreenOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Popover,
  Button,
  Breadcrumb,
  Card,
  Divider,
} from "antd";
import "./layout2.css";
import { useQuery } from "@tanstack/react-query";
import usePageInfo from "../../hooks/usePageInfo";
import PageTitle from "../../components/pagetitle/PageTitle";

import RoleUtils from "../../utils/RoleUtils";
import { getOrgs, getRepo, userByToken } from "../../api/Login.api";
import one from "../../assets/microsoft.svg";
const { Header, Content, Footer, Sider } = Layout;

const LayoutPage = () => {
  const {
    setBreadCrumbList,
    breadCrumbList,
    setUserName,
    setOrgName,
    orgName,
    userRepo,
    RepoRefetch,
    userRepoName,
    setUserRepoName,
  } = usePageInfo();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    data: userData,
    isFetching,
    refetch,
    isLoading,
  } = useQuery(["userData"], () => userByToken(), {
    enabled: true,
    retry: true,
    onSuccess: () => {
      orgsFetch();
    },
  });
  const {
    data: OrgsData,
    refetch: orgsFetch,
    isLoading: orgsLoading,
  } = useQuery(["orgData", orgName], () => getOrgs(), {
    enabled: true,
    retry: true,
    onSuccess: (OrgsData) => {
      if (OrgsData && !orgName && userRepoName) {
        setUserRepoName(OrgsData[1]?.login);
        RepoRefetch();
      }
    },
  });
  useEffect(() => {
    refetch();
    console.log("userData", userData);
    userData && setUserName(userData?.name);
  }, [userData, orgName]);
  useEffect(() => {
    const breadCrumbList = [
      {
        key: "1",
        label: "My Apps",
        link: "/home",
      },
    ];
    setBreadCrumbList(breadCrumbList);
    return () => {
      setBreadCrumbList([]);
    };
    refetch();
  }, []);

  const items = [
    {
      key: "1",
      icon: <RadarChartOutlined style={{ fontSize: "24px" }} />,
      label: "Overview",
      // link: "/",
      disabled: false,
    },
    {
      key: "2",
      icon: <PlayCircleOutlined style={{ fontSize: "23px" }} />,
      label: <NavLink to="/home">Build</NavLink>,
      link: "/home",
    },
    {
      key: "3",
      icon: <CheckCircleOutlined style={{ fontSize: "24px" }} />,
      label: "Test",
      link: "/Test",
      disabled: false,
    },
    {
      key: "4",
      icon: <FullscreenOutlined style={{ fontSize: "24px" }} />,
      label: "Distribute",
      link: "/user",
      disabled: false,
    },
    {
      key: "5",
      icon: <BarChartOutlined style={{ fontSize: "24px" }} />,
      label: "Analytics",
      link: "/Analytics",
      disabled: false,
    },
    {
      key: "6",
      icon: <SettingOutlined style={{ fontSize: "24px" }} />,
      label: "Settings",
      link: "/Settings",
      disabled: false,
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { pageTitle } = usePageInfo() || {};
  const profileName = localStorage.getItem("name");
  useEffect(() => {
    setSelectedMenu(items.find((f) => pathname.includes(f.link))?.key);
  }, [pathname]);

  return (
    <div>
      <nav
        className="bg-white flex justify-between items-center h-30 shadow-xl  "
        style={{
          boxShadow: "0px 0px 13px rgba(0, 0, 0, 0.13)",
          height: "55px",
        }}
      >
        <div className="layout_header_container">
          <div className="flex justify-between items-center">
            <div className="flex mx-5">
              <img
                src={one}
                style={{ width: "30px", height: "30px", fontSize: "30px" }}
                alt="img"
                className=" h-screen w-full object-cover mr-3 "
              />
              <h1
                style={{
                  color: "#CB2E63",
                  fontWeight: "1000",
                  fontSize: "18px",
                }}
              >
                App Center
              </h1>
            </div>
            <Breadcrumb style={{ marginLeft: "20px" }}>
              {breadCrumbList.map((bread) => (
                <Breadcrumb.Item key={bread?.key}>
                  {bread.link ? (
                    <NavLink to={bread.link}>{bread.label}</NavLink>
                  ) : (
                    bread?.label
                  )}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
          <div className="flex ">
            <Popover
              className=""
              placement="bottomRight"
              content={
                <div
                  style={{ width: "100%", height: "100%" }}
                  className="flex justify-center items-center flex-col "
                >
                  <Card
                    title={
                      <div className="flex items-center justify-start ">
                        <img
                          src={userData?.avatar_url}
                          gi
                          className="h-[40px] w-[40px] rounded-full mr-4"
                          alt="profile"
                          style={{
                            borderColor: "black",
                            alignContent: "center",
                          }}
                        />

                        <h1 style={{ fontWeight: 600, fontSize: "18px" }}>
                          {" "}
                          {userData?.name}{" "}
                        </h1>
                      </div>
                    }
                    bordered={false}
                    style={{ width: "100%", boxShadow: "none" }}
                  >
                    <Divider style={{ marginTop: "100px", width: "100%" }} />
                    <div
                      className="flex justify-center items-center hover:cursor-pointer"
                      onClick={() => {
                        localStorage.clear();
                        RoleUtils.reset();
                        navigate("/login");
                      }}
                    >
                      <LogoutOutlined
                        color="black"
                        style={{ fontSize: "19px" }}
                      />
                      <p
                        type="primary"
                        htmlType="submit"
                        className=" text-black  ml-3"
                      >
                        Log out
                      </p>
                    </div>
                  </Card>
                </div>
              }
              trigger="hover"
            >
              <div className="flex justify-center items-center gap-2">
                <h1 className="text-base">
                  {profileName ? profileName : null}
                </h1>
                <div className="image_wrapper">
                  <img
                    src={userData?.avatar_url}
                    gi
                    className="profile_image_header"
                    alt="profile"
                    style={{ borderColor: "black", alignContent: "center" }}
                  />
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </nav>

      <Layout
        theme="light"
        style={{
          minHeight: "100%",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            className=""
            style={{
              height: 18,
            }}
          />
          {console.log("bad cdred", OrgsData?.documentation_url)}
          {OrgsData
            ? OrgsData.map((obj) => (
                <div
                  key={obj?.login}
                  className="flex items-center justify-start ml-5 mb-2 cursor-pointer"
                  onClick={() => {
                    {
                      if (obj?.typeOrg) {
                        setOrgName(obj?.login);
                        setUserRepoName("");
                        // RepoRefetch();
                      } else {
                        setOrgName("");
                        setUserRepoName(obj?.login);
                        // RepoRefetch();
                      }
                    }
                    navigate("/home");
                  }}
                >
                  <img
                    src={obj?.typeOrg ? avtarSvg : obj?.avatar_url}
                    gi
                    className="h-[27px] w-[27px] rounded-full mr-4"
                    alt="profile"
                    style={{ borderColor: "black", alignContent: "center" }}
                  />
                  <h1
                    style={{
                      fontWeight: 400,
                      fontSize: "16px",
                      color: "black",
                    }}
                    onClick={() => {
                      setOrgName(obj?.login);
                      navigate("/home");
                      // RepoRefetch();
                    }}
                  >
                    {obj?.login}
                  </h1>
                </div>
              ))
            : null}

          <Menu
            style={{ marginTop: "100px" }}
            theme="light"
            selectedKeys={[selectedMenu]}
            mode="inline"
            items={items}
          />
        </Sider>

        <Layout className="main_layout_container">
          <Content
            // style={{
            //   margin: "0 16px",
            // }}
            className="layout_content"
          >
            {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          > */}
            <Outlet />
            {/* </div> */}
          </Content>
          {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          
        </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutPage;
