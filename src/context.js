import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [allUserData, setAllUserData] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [multipleDelete, setMultipleDelete] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setAllUserData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        allUserData,
        setAllUserData,
        setPaginatedList,
        paginatedList,
        page,
        setPage,
        setInput,
        input,
        getUserData,
        loading,
        error,
        setError,
        multipleDelete,
        setMultipleDelete,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
