import { useState, useEffect, useContext, createContext } from "react";

const dataContext = createContext(null);

export function Parent() {
  const [data, setData] = useState();
  useEffect(() => {
    //fetch("https://restcountries.com/v3.1/all")
    fetch("https://baby-island.herokuapp.com/homeproduct")
      .then((data) => {
        console.log("data....");
        return data.json();
      })
      .then((response) => {
        console.log("response=", response);
        setData(response);
      });
  }, []);

  return (
    <dataContext.Provider value={data}>
      <Child key="child" />
      <div>
        <h4>Parent component</h4>
      </div>
    </dataContext.Provider>
  );
}

function Child() {
  return (
    <div>
      <SubChild key="subchild" />
      <h4>Child component</h4>
    </div>
  );
}

function SubChild() {
  const newContext = useContext(dataContext);

  console.log("getContext.lenghth===", newContext ? newContext.length : 0);

  const [allData, setAllData] = useState([{ name: "test" }]);

  useEffect(() => {
    setAllData(newContext ? newContext : "loading 2...");
  }, [newContext]);

  return (
    <div>
      <div> allData: {allData[0].name}</div>
      <h2>
        Data :
        {newContext && newContext.length > 0 ? (
          newContext.map((data, index) => {
            return <div key={`${data.id}${index}`}>{data.name}</div>;
          })
        ) : (
          <div key="loading">{"loading..."}</div>
        )}
      </h2>
      <h4>SubChild component</h4>
    </div>
  );
}
