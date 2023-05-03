import { useContext } from "react";
import { PageInfoContext } from "../contexts/PageInfoProvider";

const usePageInfo = () => {
  return useContext(PageInfoContext);
};

export default usePageInfo;
