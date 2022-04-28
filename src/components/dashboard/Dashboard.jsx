import {
  getOrders,
  authoriseUser,
  getProducts,
  getAllOrders,
  changeOrderStatus,
  imgUpdate,
} from "../../services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { domainName } from "../../config";
import { Message } from "semantic-ui-react";
import { useEffect, useState } from "react";
import AddProduct from "../products/AddProduct";
import Tabs from "../tabs/Tabs";
import { ADMIN, UNPAID } from "../../services/constants";
import DataTableForUsser from "../dataTable/DataTableForUsser"; 
import "./dashboard.css";

function Dashboard() {
  const { user, getAccessTokenSilently } =
    useAuth0();
  const [orderList, setOrderList] = useState([]);
  const [adminData, setAdminData] = useState({});
  const [responseInfo, setResponseInfo] = useState("");
console.log("user", user)
  async function orderShow() {
    try {
      const token = await getAccessTokenSilently();
      let data = null;
 
      if (user && user[`${domainName}roles`].includes(ADMIN)) {
        const dataResult = await Promise.all([
          getProducts(),
          getAllOrders(user.sub, token, UNPAID),
        ]);
  
        if (dataResult && dataResult[1] && dataResult[1].status === 401) {
          const authorised = await authoriseUser(user, token);
        } else {
          setAdminData((adminData) => ({
            ...adminData,
            allProducts: dataResult[0],
            pendingProducts: dataResult[1],
          }));
          
        }
      } else {
        data = await getOrders(user.sub, token);
      
        if (data && Array.isArray(data)) {
          if (data.length !== 0) setOrderList(data);
        } else if (data && data.status === 401) {
          const authorised = await authoriseUser(user, token);
        } else {
          console.log("sxal");
        }
      }
    } catch (error) {
      console.log("user not authorised");
    }
  }

  useEffect(() => {
    if (user || responseInfo.length > 0) orderShow();
  }, [user, responseInfo]);
  const { pendingProducts, allProducts } = adminData;

  async function changeStatus(status, order_id) {
    try {
      const token = await getAccessTokenSilently();
      const changeResult = await changeOrderStatus(
        user.sub,
        token,
        order_id,
        status
      );
      orderShow();
    } catch (error) {
      console.log("sxal es arel");
    }
  }

  async function uploadImg(file, productId) {
    try {
      const token = await getAccessTokenSilently();
      const responseImg = await imgUpdate(productId, file, token, user.sub);

      if (responseImg.httpStatus && responseImg.httpStatus === "OK") {
        setResponseInfo(responseImg.message);
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  }

  function handleDismiss() {
    setResponseInfo("");
  }
  console.log("adminData", adminData);
  return (
    <div className="dashboard ui container">
      {responseInfo.length > 0 ? (
        <Message success onDismiss={handleDismiss} content={responseInfo} />
      ) : (
        ""
      )}
      {user &&
      user[`${domainName}roles`] &&
      user[`${domainName}roles`].includes(ADMIN) ? (
        <>
          <AddProduct setResponseInfo={setResponseInfo} />
          <Tabs
            uploadImg={uploadImg}
            pendingProducts={pendingProducts}
            allProducts={allProducts}
            changeStatus={changeStatus}
            setResponseInfo={setResponseInfo} 
          />
        </>
      ) : (
        <DataTableForUsser list={orderList} />
      )}
    </div>
  );
}
export default Dashboard;