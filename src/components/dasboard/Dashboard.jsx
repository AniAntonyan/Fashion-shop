// import api  from '../../services/api';
import {getOrders,authoriseUser} from "../../services/api";
import {useAuth0} from "@auth0/auth0-react";

function Dashboard(){
     const { error, isAuthenticated, isLoading, user, getAccessTokenSilently } =
        useAuth0();
      (async function () {
        try {
          const token = await getAccessTokenSilently();
          const data = await getOrders(user.sub, token);
          debugger;
          if (data && Array.isArray(data)) {
            console.log("data", data);
            //render anel orderner@
          } else if (data && data.status === 401) {
            //   stugel inch enq stacel
            const authorised = await authoriseUser(user, token);
            console.log("authorised", authorised);
          }else{
            console.log("hajox")
          }
        } catch (error) {
          console.log("user not authorised");
        }
      })();
return
    <div className="dashboard ui container">it's dashboard</div>;
            
    
    
}
export default Dashboard;