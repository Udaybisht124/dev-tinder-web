import axios from 'axios';
import React, { useEffect } from 'react'
import BASE_URL from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestSlice';

const Request = () => {

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const fetchRequests = async () => {
    if (requests) return;
    try {
      const res = await axios.get(BASE_URL + "/user/request/receive", { withCredentials: true });
      dispatch(addRequests(res.data.data))
    } catch (error) {
      console.log(error);
    }
  }


  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(BASE_URL + "/request/review" + "/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequests(_id))
    } catch (error) {
      console.error(error);
    }
  }



  useEffect(() => {
    fetchRequests();
  })




  if (!requests) return;

  if (requests.length === 0) return <h1 className='flex justify-center my-10 text-white font-extrabold'> No Connection Request Founded</h1>

  return (
    <div className="text-center items my-10 ">
      <h1 className="font-bold text-white text-3xl">Connections Request</h1>

      {requests.map((requests) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          requests.fromUserId;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 mx-10 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-2">
              <h2 className="font-bold text-xl my-2">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>


            <div>
              <button className="btn btn-active btn-primary mx-4 my-4" onClick={() => reviewRequest("rejected", requests._id)}>Reject</button>
              <button className="btn btn-active btn-secondary" onClick={() => reviewRequest("accepted", requests._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Request