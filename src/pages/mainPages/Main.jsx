import {
  Card,
  Divider,
  Button,
  Table,
  Drawer,
  Input,
  Space,
  DatePicker,
  Tag,
  Breadcrumb,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import "../../components/page.css";
import usePageInfo from "../../hooks/usePageInfo";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import PageTitle from "../../components/pagetitle/PageTitle";

function Main() {
  const {
    setBreadCrumbList,
    breadCrumbList,
    userName,
    orgName,
    userRepo,
    RepoRefetch,
    isRepoFetching,
  } = usePageInfo();

  const navigate = useNavigate();
  const { setPageTitle, setBranch, setrepoName } = usePageInfo();

  useEffect(() => {
    // RepoRefetch();
  }, [userRepo]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        {
          if (text) {
            return text;
          }
        }
        return <h4>-</h4>;
      },
    },

    {
      title: "Tag ",
      dataIndex: "visibility",
      key: "visibility",
      render: (number) => {
        {
          if (number) {
            return number;
          }
        }
        return <h4>-</h4>;
      },
    },
    {
      title: "Language ",
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
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (text) => {
        {
          if (text) {
            return text;
          }
        }
        return <h4>-</h4>;
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "description",
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
    ];
    setBreadCrumbList(breadCrumbList);
    return () => {
      setBreadCrumbList([]);
    };
    // refetch();
  }, [userRepo]);

  useEffect(() => {
    setPageTitle("Voluntary Groups");
    return () => {
      setPageTitle("");
    };
  }, []);
  const finalData = userRepo?.map((obj) => {
    return { ...obj, owner: obj?.owner?.login };
  });
  {
    if (finalData == undefined) {
      RepoRefetch();
    }
  }
  console.log("finalData", finalData);
  return (
    <div>
      <div className="site-card-border-less-wrapper">
        <div className="layout_header_container w-12/12">
          <PageTitle title={`Hello ${userName}`} />
        </div>
        <Card title="My Apps">
          <div className="flex items-center justify-end mb-4"></div>
          <Table
            rowKey="id"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setBranch(record?.full_name);
                  setrepoName(record?.name);
                  navigate(`/home/branches`);
                }, // click row
              };
            }}
            columns={columns}
            loading={isRepoFetching}
            dataSource={finalData}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </div>
  );
}

export default Main;
