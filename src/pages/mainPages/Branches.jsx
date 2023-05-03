import { Space, Table, Tag, Input, Breadcrumb } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Card, Divider, Button } from "antd";
import "../../components/page.css";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import usePageInfo from "../../hooks/usePageInfo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBranch, getCommits } from "../../api/Login.api";
import { avtarSvg } from "../../utils/constants";
import moment from "moment/moment";

export default function Branches() {
  const navigate = useNavigate();
  const { setPageTitle, setBreadCrumbList, breadCrumbList, branch, reponame } =
    usePageInfo();
  const [sha, setSha] = useState("");
  const [lastCommit, setLastCommit] = useState("Select the Branch");

  const { data, refetch } = useQuery(
    ["branch", branch],
    () => getBranch(branch),
    {
      enabled: false,
      retry: false,
      onSuccess: (data) => {
        if (data && !sha) {
          setSha(data[0]?.name);
          setLastCommit(data[0]?.name);
          commitFetch();
        }
      },
    }
  );
  const list = data;
  const {
    data: commitData,
    isLoading,
    refetch: commitFetch,
  } = useQuery(["commit", branch, sha], () => getCommits(branch, sha), {
    enabled: false,
    retry: false,
    onSuccess: () => {
      if (!branch && !sha) {
        navigate("/home");
      }
    },
    onError: (commitFetch) => {
      if (!branch && !sha) {
        commitFetch();
      }
      navigate("/home");
    },
  });
  const date = commitData
    ? moment(commitData[0]?.commit?.author?.date)
    : moment();
  const now = moment();
  const daysAgo = now.diff(date, "days");

  const columns = [
    {
      title: "Commit",
      dataIndex: "name",
      key: "name",
      render: (i, record) => {
        console.log(" record-------------->", i);
        return (
          <div className="flex items-center ">
            <img
              src={record?.author?.avatar_url}
              gi
              className="h-[40px] w-[40px] rounded-full mr-4"
              alt="profile"
              style={{ borderColor: "black", alignContent: "center" }}
            />
            <div>
              <h1> {record?.commit?.message} </h1>
              <h5>{record?.author?.login}</h5>
            </div>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "created_at",
      key: "description",
      render: (number) => {
        {
          if (number) {
            return number;
          }
        }
        return (
          <p
            style={{ color: "black", fontWeight: "600", fontSize: "10x" }}
            className="flex items-center cursor-pointer mb-2"
          >
            <CheckCircleFilled
              className="branchIcon"
              style={{
                fontSize: "18px",
                color: "#4D7A15",
                marginRight: "6px",
              }}
            />
            BUILT
          </p>
        );
      },
    },
    {
      title: "Build ",
      dataIndex: "visibility",
      key: "visibility",
      render: (number) => {
        {
          if (number) {
            return number;
          }
        }
        return <h4>340</h4>;
      },
    },
    {
      title: "Date ",
      dataIndex: "language",
      key: "language",
      render: (number) => {
        {
          if (number) {
            return number;
          }
        }
        return <h4>-</h4>;
      },
    },
  ];

  useEffect(() => {
    const breadCrumbList = [
      {
        key: "1",
        label: "My Apps",
        link: "/home",
      },
      {
        key: "2",
        label: reponame,
        link: "/home",
      },
      {
        key: "3",
        label: "branches",
        link: "/home/branches",
      },
    ];
    setBreadCrumbList(breadCrumbList);
    return () => {
      setBreadCrumbList([]);
    };
    // commitFetch();
  }, [data, branch, sha]);

  useEffect(() => {
    refetch();
    commitFetch();
    return () => {
      setPageTitle("");
    };
  }, [data, branch, sha]);

  return (
    <div className="site-card-border-less-wrapper">
      <div className="flex h-[80vh]">
        <div>
          <Card
            title="Branches"
            bordered={false}
            style={{
              width: 250,
              background: "#F2F2F2",
              height: "116%",
            }}
          >
            {list?.map((obj) => {
              return (
                <p
                  style={{
                    color: "black",
                    fontWeight: "600",
                    fontSize: "10x",
                    marginTop: "10px",
                  }}
                  className="flex items-center cursor-pointer mb-2  px-5"
                  onClick={() => {
                    setSha(obj?.name);
                    setLastCommit(obj?.name);
                    console.log(obj?.commit?.sha);
                  }}
                >
                  <CheckCircleFilled
                    className="branchIcon"
                    style={{
                      fontSize: "18px",
                      color: "#4D7A15",
                      marginRight: "6px",
                    }}
                  />
                  {obj?.name}
                </p>
              );
            })}
          </Card>
        </div>
        <div
          style={{ height: "100%", width: "100%" }}
          className="flex flex-col"
        >
          <div className="ant-card-bordered mb-5">
            <p
              style={{ color: "black", fontWeight: "600", fontSize: "30x" }}
              className="flex items-center cursor-pointer mb-3 pt-4"
            >
              <CheckCircleFilled
                className="branchIcon"
                style={{
                  fontSize: "20px",
                  color: "#4D7A15",
                  marginRight: "8px",
                }}
              />
              {lastCommit}
            </p>
            <h1 className="ml-1">Manual</h1>
          </div>
          <Card className="mb-5" title="LAST COMMIT">
            <div className=" flex justify-between items-center p-5">
              {commitData ? (
                <div className="flex items-center">
                  <img
                    src={commitData[0]?.author?.avatar_url}
                    className="h-[40px] w-[40px] rounded-full mr-4"
                    alt="profile"
                    style={{ borderColor: "black", alignContent: "center" }}
                  />
                  <div>
                    <h1> {commitData[0]?.commit?.message} </h1>
                    <h5>{commitData[0]?.author?.login}</h5>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <img
                    src={avtarSvg}
                    className="h-[40px] w-[40px] rounded-full mr-4"
                    alt="profile"
                    style={{ borderColor: "black", alignContent: "center" }}
                  />
                  <div>
                    <h1> PR Details</h1>
                    <h5>Name</h5>
                  </div>
                </div>
              )}
              <div className="flex items-center ">
                <p>{daysAgo} days ago</p>
                <Button type="primary" htmlType="submit" className="ml-5">
                  Build now
                </Button>
              </div>
            </div>
          </Card>
          <Card title="Builds">
            <Table
              // rowKey={(record) => record.id}
              rowKey="iduser"
              s
              columns={columns}
              loading={isLoading}
              dataSource={commitData || []}
              pagination={{ pageSize: 6 }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
