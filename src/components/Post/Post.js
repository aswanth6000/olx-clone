import React, { useContext, useEffect, useState } from "react";
import { firebaseContext } from "../../store/firebaseContext";
import Heart from "../../assets/Heart";
import "./post.scss";
import { PostContext } from "../../store/postConstext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const { firebase } = useContext(firebaseContext);
  const navigation = useNavigate()
  const {setPostDetails} = useContext(PostContext)
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = firebase.query(firebase.collection(firebase.db, "products"));
        const querySnapshot = await firebase.getDocs(q);
        const productsData = [];
        querySnapshot.forEach((doc) => {
          // Create an object containing both doc.id and doc.data()
          const product = {
            id: doc.id,
            data: doc.data(),
          };

          // Push the product object into the productsData array
          productsData.push(product);
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchData();
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
  <div className="cards">
        {products.map((product) => (
    <div className="card" onClick={()=>{
      setPostDetails(product)
      navigation('/view')
    }} key={product.id}>
      <div className="favorite">
        <Heart></Heart>
      </div>
      <div className="image">
        <img src={product.data.url} alt="" />
      </div>
      <div className="content">
        <p className="rate">&#x20B9; {product.data.price}</p>
        <span className="kilometer">{product.data.category}</span>
        <p className="name"> {product.data.name}</p>
      </div>
      <div className="date">
        <span>{product.data.createdDate}</span>
      </div>
    </div>
))}
  </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
