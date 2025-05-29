import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "../component/Usercard.jsx";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line
  }, []);

  if (!feed) return null;

  if (feed.length <= 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl font-semibold text-center text-gray-200 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          No new users found!
        </h1>
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center my-10">
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800 transition-all duration-300 hover:shadow-blue-900">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};
export default Feed;
