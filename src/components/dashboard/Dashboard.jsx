import "./dashboard.css";
// import "./BuyProduct.css";
import { domainName } from "../../config";
import {
  getOrders,
  authoriseUser,
  getAllOrders,
  getOrderByStatus,
  getProducts,
  changeOrderStatus,
  imgUpdate,
} from "../../Services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";
import {
  USER,
  ADMIN,
  PAID,
  UNPAID,
  PENDING,
  SENT,
  DONE,
} from "../../Services/constants";
import AddProduct from "../products/AddProduct";
import Tabs from "../Tabs/Tabs";
import UserOrdersTabs from "../Tabs/UserOrdersTabs";


function Dashboard() {
  const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const [orderList, setOrderList] = useState([]);

  const [adminData, setAdminData] = useState({});

  const [responseInfo, setResponseInfo] = useState("");

  const { allProducts, pendingOrders, unpaidOrders,  sentOrders, paidOrders, allDoneOrders , allOrders  } = adminData;

  
  async function orderShow() {
    try {
      const token = await getAccessTokenSilently();
      let data = null;

      if (user && user[`${domainName}roles`].includes(ADMIN)) {
        const dataResult = await Promise.all([
          getProducts(),
          getOrderByStatus(user.sub, token, PENDING),
          getOrderByStatus(user.sub, token, UNPAID),
          getOrderByStatus(user.sub, token, SENT),
          getOrderByStatus(user.sub, token, PAID),
          getOrderByStatus(user.sub, token, DONE),
          getAllOrders(user.sub, token),
        ]);
        if (dataResult && dataResult[1] && dataResult[1].status === 401) {
          const authorised = await authoriseUser(user, token);
        } else {
          setAdminData((adminData) => ({
            ...adminData,
            allProducts: dataResult[0],
            pendingOrders: dataResult[1],
            unpaidOrders: dataResult[2],
            sentOrders:dataResult[3],
            paidOrders:dataResult[4],
            allDoneOrders: dataResult[5],
            allOrders: dataResult[6],
          }));
          if (adminData) console.log("adminData", adminData);
        }
      } else {
        data = await getOrders(user.sub, token);

        if (data && Array.isArray(data)) {
          if (data.length !== 0) setOrderList(data);
        } else if (data && data.status === 401) {
          const authorised = await authoriseUser(user, token);
        } else {
          console.log("hajox");
        }
        
      }
    } catch (error) {
      console.log("user not authorised");
    }
  }

  useEffect(() => {
    if (user || responseInfo.length > 0) orderShow();
  }, [user, responseInfo]);

  async function changeStatus(status, order_id) {
    try {
      const token = await getAccessTokenSilently();
      const changeResult = await changeOrderStatus(
        user.sub,
        token,
        order_id,
        status
      );
      console.log("changeResult", changeResult);
      orderShow();
    } catch (error) {
      console.log("sxal es arel");
    }
  }

  async function uploadImg(file, productId) {
    try {
      const token = await getAccessTokenSilently();
      const responseImg = await imgUpdate(productId, file, token, user.sub);
      console.log(responseImg);

      if (responseImg.httpStatus && responseImg.httpStatus === "OK") {
        setResponseInfo(responseImg.message);
      }
    } catch (error) {
      setResponseInfo("something went wrong");
    }

    console.log("file", file);
  }

  function handleDismiss() {
    setResponseInfo("");
  }

  console.log(adminData);
  console.log("unpaidOrders ", unpaidOrders);
  console.log("allDoneOrders ", allDoneOrders);
  console.log("allOrder ", allOrders);
  console.log("orderList", orderList);
  return (
      <div className="dashboard ui container">
      {responseInfo.length > 0 && responseInfo === "something went wrong" ? (
        <Message negative onDismiss={handleDismiss} content={responseInfo} />
      ) : responseInfo.length > 0 && responseInfo !== "something went wrong" ? (
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
            pendingOrders={pendingOrders}
            unpaidOrders={unpaidOrders}
            sentOrders={sentOrders}
            paidOrders={paidOrders}
            allOrders={allOrders}
            allDoneOrders={allDoneOrders}
            allProducts={allProducts}
            changeStatus={changeStatus}
          />
        </>
      ) : (
        <>
          <UserOrdersTabs orderList={orderList} />
        </>
      )}
    </div>
    
  );
}
export default Dashboard;
