import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function Testing() {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    const getdata = async () => {
    
        const res = await axios
          .get("https://fakestoreapi.com/products")
          .catch((error) => console.log("error", error));

        
        setProducts(res.data);
        console.log(res.data);
    }
    getdata();
  }, []);

  return (
    <div>
      {products?.map((e) => {
        return (
          <div key={e?.id} style={{ textAlign: "center" }}>
            <h1>Name: {e?.title}</h1>
            <img src={e?.image} alt="img" width={200} />
            <h3>Price = {e?.price}</h3>
            <h2>category : {e?.category}</h2>
            <p>description : {e?.description}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Testing;
