import { useQuery } from "@tanstack/react-query";
import React, { createContext, useState } from "react";
import { getRepo } from "../api/Login.api";
export const PageInfoContext = createContext();

export default function PageInfoProvider(props) {
  const [pageTitle, setPageTitle] = useState("");
  const [breadCrumbList, setBreadCrumbList] = useState([]);
  const [transactionName, setTransactionName] = useState("");
  const [transactionLink, setTransactionLink] = useState("");
  const [branch, setBranch] = useState("");
  const [userName, setUserName] = useState("");
  const [reponame, setrepoName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [userRepoName, setUserRepoName] = useState("");
  const {
    data: userRepo,
    isFetching: isRepoFetching,
    refetch: RepoRefetch,
  } = useQuery(
    ["orgsRepo", orgName, userRepoName],
    () => getRepo(orgName, userRepoName),
    {
      enabled: false,
      retry: false,
      onError: (RepoRefetch) => {
        RepoRefetch();
      },
    }
  );
  return (
    <PageInfoContext.Provider
      value={{
        pageTitle,
        breadCrumbList,
        transactionLink,
        transactionName,
        setPageTitle,
        setBreadCrumbList,
        setTransactionLink,
        setTransactionName,
        branch,
        setBranch,
        reponame,
        setrepoName,
        userName,
        setUserName,
        orgName,
        setOrgName,
        userRepo,
        RepoRefetch,
        isRepoFetching,
        userRepoName,
        setUserRepoName,
      }}
    >
      {props.children}
    </PageInfoContext.Provider>
  );
}
