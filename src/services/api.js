import {
    apiURL
} from "../config";
console.log("apiURL",apiURL);

export async function getProducts() {
    try {
        const response = await fetch(`${apiURL}product`)
        console.log("productData", response)
        const data = await response.json();
        console.log("productData", data)
        return data;
    } catch (error) {
        console.log("wrong", error);
    }
}

//for user
export async function getOrders(user_id, token) {
    try {
        console.log(user_id);
        const response = await fetch(`${apiURL}order/user-order`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: user_id
            }
        })
        return await response.json();
    } catch (error) {
        console.log("wrong", error);
    }
}

//for admin
export async function getAllOrders(user_id, token) {
    try {
        const response = await fetch(`${apiURL}order/get-all`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                userId: user_id
            }
        })
        return await response.json();
    } catch (error) {
        console.log("wrong", error);
    }
}

export async function getOrderByStatus(user_id, token, status) {
    try {
        console.log( user_id, status);
        const response = await fetch(`${apiURL}order/order-status`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: user_id,
                status: status
            }
        })
        return await response.json();
    } catch (error) {
        console.log("wrong", error);
    }
}

export async function changeOrderStatus(user_id, token, order_id, status) {
    console.log("order_id", order_id);
    console.log("status", status);
    try {
      const response = await fetch(`${apiURL}order/change-status/${order_id}/${status}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          user_id: user_id
        },
      });
      console.log("response" , response);
      return await response.json();
    } catch (error) {
      console.log("wrong", error);
    }
  }
  
export async function authoriseUser(user, token) {
    const {
        sub: id,
        name,
        email,
        picture
    } = user;
    try {
        const response = await fetch(`${apiURL}login/signup`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                id,
                name,
                email,
                picture,
            }),
        })
        return response.json();
    } catch (error) {
        console.log("wrong post", error);
    }
}

export async function confirmOrder(user, product, token, option) {
    const {sub: id,name,email,picture} = user;
    const {address,paymentMethod,phone} = option;

    const body = {
        date: new Date().valueOf(),
        user: user,
        product: product,
        count: 1,

        orderStatus: paymentMethod === "cash" ? "UNPAID" : "PAID",
        address: address,
        phone: phone,

    };
    try {
        const response = await fetch(`${apiURL}order`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                userId: id,
            },
            body: JSON.stringify(body),
        });
        return response.json();
    } catch (error) {
        console.log("sxalPost", error);
    }
}

export async function confirmAddProduct(productObj, userId, token) {

    try {
        const response = await fetch(`${apiURL}product`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json;charset=utf-8",
                userId: userId
            },
            body: JSON.stringify(productObj),
        });
        return response.json();
    } catch (error) {
        console.log("sxalPost", error);
    }
}

export async function imgUpdate(productId, file, token, userId) {
    console.log("imgUpdatefile", file);
  const formData = new FormData();
    formData.append("image", file);

  for (var key of formData.entries()) {
    console.log(key[0] + ", " + key[1]);
  }
  try {
    const response = await fetch(`${apiURL}image/add/${productId}`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
        userId: userId,
      },

      body: formData,
    });
    return response.json();
  } catch (error) {
    console.log("sxalPost", error);
  }
}
