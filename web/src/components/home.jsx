
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/Context';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import './home.css'

import { FaThumbsUp, FaCommentAlt, FaShare } from "react-icons/fa";




function Home() {

  let { state } = useContext(GlobalContext);


  const [tweets, settweets] = useState([])
  const [loadtweet, setloadtweet] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingTweet, seteditingTweet] = useState(null)

  const [eof, setEof] = useState(false)
  const [preview, setPreview] = useState(null)



  const getAlltweets = async () => {
    if (eof) return;
    try {
      const response = await axios.get(`${state.baseUrl}/tweetFeed?page=${tweets.length}`)
      console.log("response: ", response.data);

      if (response.data.data.length === 0) setEof(true)

      settweets((prev) => {
        return [...prev, ...response.data.data]
      })

    } catch (error) {
      console.log("error in getting all tweets", error);
    }
  }

  const deleteTweet = async (id) => {
    try {
      const response = await axios.delete(`${state.baseUrl}/tweet/${id}`)
      console.log("response: ", response.data);

      setloadtweet(!loadtweet)

    } catch (error) {
      console.log("error in getting all tweets", error);
    }
  }

  const editMode = (tweet) => {
    setIsEditMode(!isEditMode)
    seteditingTweet(tweet)

    editFormik.setFieldValue("tweetsText", tweet.name)
    editFormik.setFieldValue("tweetsPrice", tweet.price)
    editFormik.setFieldValue("tweetsDescription", tweet.description)

  }

  useEffect(() => {

    getAlltweets()

  }, [loadtweet])


  const tweetsValidatonSchema = yup.object({
    tweetsText: yup
      .string('Enter your tweets name')
      .required('tweets name is required')
      .min(3, "please enter more then 3 characters ")
      .max(140, "please enter within 140 characters ")
  })

  const myFormik = useFormik({
    initialValues: {
      tweetsText: ''
    },

    validationSchema: tweetsValidatonSchema,
    onSubmit: (values) => {
      console.log("values: ", values);

      let fileInput = document.getElementById("picture")
      console.log("fileInput: ", fileInput.files[0]);

      let formData = new FormData();
      formData.append("myFile", fileInput.files[0]);
      formData.append("text", values.tweetsText);

      axios({
        method: 'post',
        url: `${state.baseUrl}/tweet`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(res => {
          setloadtweet(!loadtweet)
          console.log(`upload Success` + res.data);
        })
        .catch(err => {
          console.log("error: ", err);
        })


      axios.post(`${state.baseUrl}/tweet`, {
        text: values.tweetsText
      })
        .then(response => {
          console.log("response: ", response.data);
          setloadtweet(!loadtweet)
        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });

  const editFormik = useFormik({
    initialValues: {
      tweetsText: ''
    },
    validationSchema: tweetsValidatonSchema,
    onSubmit: (values) => {
      console.log("values: ", values);

      axios.put(`${state.baseUrl}/tweet/${editingTweet._id}`, {
        text: values.tweetsText,

      })
        .then(response => {
          console.log("response: ", response.data);
          setloadtweet(!loadtweet)

        })
        .catch(err => {
          console.log("error: ", err);
        })
    },
  });


  return (
    <div className='homeMain'>

      <span className='allPostBox'>
        <InfiniteScroll
          className='InfiniteDiv'
          pageStart={0}
          loadMore={getAlltweets}
          hasMore={!eof}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          { tweets.map((eachProduct, i) => ( 
            <span className='post' key={i} style={{ display: 'inline-block' , border: "1px solid black", padding: 10,  borderRadius: 15,  backgroundColor: "#f0f1f1f0" }}>
              <h2>{eachProduct?.owner?.firstName}</h2>
              <div>{moment(eachProduct?.createdOn).fromNow()} </div>
              <p>{eachProduct?.text}</p>

              <img className='imageUpload' src={eachProduct?.imageUrl} alt="tweetimage" />

              <br />
              <hr />
              <button className='cartButton'>ADD TO CART</button>
              <hr />


            </span>
          ))}
        </InfiniteScroll>
      </span>






    </div >

  );
}

export default Home;