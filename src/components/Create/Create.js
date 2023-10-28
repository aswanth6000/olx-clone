import React, { Fragment, useContext, useState } from 'react';
import './create.scss';
import Header from '../Header/Header';
import { AuthContext, firebaseContext } from '../../store/firebaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const {firebase} = useContext(firebaseContext)
  const {userd} = useContext(AuthContext)
  const [proname, setproname] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const storage = firebase.getStorage();
  const navigate = useNavigate()
  const handleSubmit = () =>{
    const fileRef = firebase.ref(storage, `/productImages/${image.name}`);
    const file = image;
    firebase.uploadBytes(fileRef, file).then((snapshot) => {
      console.log('File uploaded successfully.',snapshot);
      return firebase.getDownloadURL(fileRef);
    })
    .then(async (downloadURL) => {
      const docRef = await firebase.addDoc(firebase.collection(firebase.db, "products"), {
        name : proname,
        category,
        price,
        url : downloadURL,
        userId : userd.id
      });
      console.log("Document written with ID: ", docRef.id);
      navigate('/home')
    })
    .catch((error) => {
      console.error('Error uploading file: ', error);
    });
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Product Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={proname}
              onChange={(e)=>setproname(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <br />
          
          <br />
          {image &&<img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>}
          
            <br />
            <input type="file" onChange={(e)=>{
              setImage(e.target.files[0])
            }} />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;