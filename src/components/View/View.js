import React, { useContext, useEffect, useState } from 'react';

import './view.scss';
import { firebaseContext } from '../../store/firebaseContext';
import { PostContext } from '../../store/postConstext';
function View() {
  const [userDetails, setUserDetails] = useState();
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(firebaseContext)
  useEffect(()=>{
    const  fetchData = async () =>{
      try{
        const q = firebase.query(
          firebase.collection(firebase.db, 'users'),
          console.log("jjjjjjjjjjjj",postDetails),
          firebase.where('id', '==', postDetails.data.userId )
        );
        const querySnapshot = await firebase.getDocs(q);
      await querySnapshot.forEach(async (doc) => {
        await  setUserDetails(doc.data());
        console.log("llllllllllllllll",userDetails);
      })
    }catch(err){
      console.log(err);
    }
  }
  fetchData()
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.data.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.data.price} </p>
          <span>{postDetails.data.name}</span>
          <p>{postDetails.data.category}</p>
          <span>{postDetails.data.createdDate}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;