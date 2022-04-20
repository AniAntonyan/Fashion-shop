import { Tab } from "semantic-ui-react";
import { render } from '@testing-library/react';
import UserOrdersTable from "../dataTable/UserOrdersTable";
import { useState, useEffect } from "react";
import Paginations from "../pagination/Pagination";

function UserOrderTabs({orderList}){
const [result, setResult] = useState([]);
const [userData, setUserData] = useState({});
const {pendingsOrders, unpaidOrders, sentOrders, paidOrders, doneOrders } = userData;

    function userPendingsOrders(orderList){
        return orderList.filter(item => item.orderStatus === "PENDING").sort((a,b) => b.date - a.date);
    }
    function userUnpaidOrders(orderList){
        return orderList.filter(item => item.orderStatus === "UNPAID").sort((a,b) => b.date - a.date);
    }
    function userSentOrders(orderList){
        return orderList.filter(item => item.orderStatus === "SENT").sort((a,b) => b.date - a.date);
    }
    function userPaidOrders(orderList){
        return orderList.filter(item => item.orderStatus === "PAID").sort((a,b) => b.date - a.date);
    }
    function userDoneOrders(orderList){
        return orderList.filter(item => item.orderStatus === "DONE").sort((a,b) => b.date - a.date);
    }

    useEffect(()=>{
        setUserData((userData) => ({
            ...userData,
            pendingsOrders: userPendingsOrders(orderList),
            unpaidOrders: userUnpaidOrders(orderList),
            sentOrders: userSentOrders(orderList),
            paidOrders: userPaidOrders(orderList),
            doneOrders: userDoneOrders(orderList)
        }));
    }, [result])

    console.log("userData " ,userData);

    const [productsByPage, setProductsByPage] = useState([]);
  
    function getProductsByPage(productsByPage){
        console.log("funkciai meji log" , productsByPage);
      setProductsByPage(productsByPage)
    }

    useEffect(() =>{
      if (orderList && orderList.length > 0) setResult(orderList)
    }, [ orderList])

    const panes = [
        {
            menuItem: "Pending",
            render: () => (
              <>
                <Tab.Pane>
                <UserOrdersTable list={productsByPage}/>
                <Paginations result={pendingsOrders} getProductsByPage={getProductsByPage}/>
                </Tab.Pane>
              </>
            )
        },
        {
            menuItem: "Unpaid",
            render: () => (
                <>
                <Tab.Pane>
                    <UserOrdersTable list={productsByPage}/>
                </Tab.Pane>
                <Paginations result={unpaidOrders} getProductsByPage={getProductsByPage}/>
                </>
            )
        },
        {
            menuItem: "Sent",
            render: () => (
             <>
                <Tab.Pane>
                    <UserOrdersTable list={productsByPage}/>
                </Tab.Pane>
                 <Paginations result={sentOrders} getProductsByPage={getProductsByPage}/>
             </>
            )
        },
        {
            menuItem: "Paid",
            render: () => (
                <>                
                <Tab.Pane>
                    <UserOrdersTable list={productsByPage} />
                </Tab.Pane>
                <Paginations result={paidOrders} getProductsByPage={getProductsByPage}/>
                </>
            )
        },
        {
            menuItem: "Done",
            render: () => (
                <>                
                <Tab.Pane>
                    <UserOrdersTable list={productsByPage} />
                </Tab.Pane>
                <Paginations result={doneOrders} getProductsByPage={getProductsByPage}/>
                </>
            )
        },
    ]
    return (
        <Tab panes={panes}/>
    )
}
export default UserOrderTabs;