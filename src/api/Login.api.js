import axios from "axios";

export const login = async (values) => {
  const response = await axios.post("/login", values);
  const token = await response.data?.token?.access?.token;
  localStorage.setItem("token", token);
  return response.data;
};

export const userDetailsByToken = async () => {
  const response = await axios.get("/users/token");
  return response.data;
};

export const userByToken = async () => {
  const response = await axios.get("/getUser");
  return response.data;
};
export const getOrgs = async () => {
  const response = await axios.get("/getOrg");
  console.log("ORGANIZATION DATA---->", response.data);
  return response.data;
};

export const getAccessToken = async (code) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/accessToken",
      headers: {
        Accept: "application/json",
      },
      params: {
        code: code,
      },
    });

    const accessToken = response.data.access_token;
    console.log("accessTokenFromAPI", accessToken);

    accessToken && localStorage.setItem("token", accessToken);
    return accessToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get access token from GitHub");
  }
};
export const getRepo = async (orgName, userRepoName) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/getRepo",
      headers: {
        Accept: "application/json",
      },
      params: { orgName, userRepoName },
    });

    const Res = response.data;
    console.log("ResFromAPI --> UserRepo", Res);
    return Res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Response from GitHub Api");
  }
};
export const getBranch = async (fullName) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/branches",
      headers: {
        Accept: "application/json",
      },
      params: {
        full_name: fullName,
      },
    });

    const Res = response.data;
    console.log("ResFromAPI --> RepoBranches", Res);
    return Res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Response from GitHub Api");
  }
};
export const getCommits = async (fullName, sha) => {
  try {
    const response = await axios({
      method: "GET",
      url: "/commits",
      headers: {
        Accept: "application/json",
      },
      params: {
        full_name: fullName,
        sha,
      },
    });

    const Res = response.data;
    console.log("ResFromAPI --> RepoCommits", Res[0]?.author?.avatar_url);
    return Res;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Response from GitHub Api");
  }
};
