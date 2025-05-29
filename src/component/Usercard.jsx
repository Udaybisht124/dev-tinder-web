import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState, useRef, useEffect } from "react";

const SWIPE_THRESHOLD = 120; // px

const UserCard = ({ user, hideActions }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  // Card status
  const [requestStatus, setRequestStatus] = useState(null);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  // Animation/drag state
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const startX = useRef(0);

  // Reset state on user change
  useEffect(() => {
    setRequestStatus(null);
    setShowAccepted(false);
    setShowRejected(false);
    setDragX(0);
    setIsDragging(false);
  }, [_id]);

  // Accept/reject logic
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      if (status === "interested") {
        setRequestStatus("accepted");
        setShowAccepted(true);
        setTimeout(() => {
          setShowAccepted(false);
          dispatch(removeUserFromFeed(userId));
        }, 700);
      } else if (status === "ignored") {
        setRequestStatus("rejected");
        setShowRejected(true);
        setTimeout(() => {
          setShowRejected(false);
          dispatch(removeUserFromFeed(userId));
        }, 700);
      }
    } catch (err) {}
  };

  // Drag Handlers
  const onDragStart = (clientX) => {
    startX.current = clientX;
    setIsDragging(true);
  };
  const onDragMove = (clientX) => {
    if (!isDragging) return;
    setDragX(clientX - startX.current);
  };
  const onDragEnd = () => {
    setIsDragging(false);
    if (dragX > SWIPE_THRESHOLD) {
      // Swipe right: Accept
      setDragX(500);
      handleSendRequest("interested", _id);
    } else if (dragX < -SWIPE_THRESHOLD) {
      // Swipe left: Reject
      setDragX(-500);
      handleSendRequest("ignored", _id);
    } else {
      setDragX(0); // Snap back
    }
  };
  // Mouse Events
  const handleMouseDown = (e) => onDragStart(e.clientX);
  const handleMouseMove = (e) => isDragging && onDragMove(e.clientX);
  const handleMouseUp = () => onDragEnd();
  // Touch Events
  const handleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => isDragging && onDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => onDragEnd();

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }
    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line
  }, [isDragging, dragX]);

  // Animation
  let cardBg = "bg-gray-900";
  if (requestStatus === "accepted" && showAccepted)
    cardBg = "bg-green-800/90 animate-pulse";
  else if (requestStatus === "rejected" && showRejected)
    cardBg = "bg-red-800/90 animate-pulse";
  // While dragging, add shadow/scale
  let dynamicStyles = {
    transform: `translateX(${dragX}px) rotate(${dragX / 18}deg)`,
    transition: isDragging
      ? "none"
      : "transform 0.35s cubic-bezier(.23,1.09,.43,1.01)",
    boxShadow: isDragging
      ? "0 8px 32px 0 rgba(0,0,0,0.38), 0 0 0 8px rgba(100,100,255,0.07)"
      : "",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    touchAction: "pan-y",
  };

  // Show green/red border and Accept/Rejected text while swiping
  let swipePreview = null;
  if (isDragging && dragX > 40)
    swipePreview = (
      <div className="absolute left-6 top-10 text-green-400 text-3xl font-bold opacity-80 select-none pointer-events-none animate-pulse">
        ACCEPT
      </div>
    );
  if (isDragging && dragX < -40)
    swipePreview = (
      <div className="absolute right-6 top-10 text-red-400 text-3xl font-bold opacity-80 select-none pointer-events-none animate-pulse">
        REJECT
      </div>
    );

  return (
    <div
      className={`${cardBg} w-96 rounded-2xl shadow-2xl border border-gray-800 mx-4 my-8 flex flex-col items-center transition-all duration-300 hover:shadow-blue-900 relative select-none`}
      style={dynamicStyles}
      ref={dragRef}
      onMouseDown={hideActions ? undefined : handleMouseDown}
      onTouchStart={hideActions ? undefined : handleTouchStart}
    >
      {swipePreview}
      {/* Status Light and Text */}
      {requestStatus === "accepted" && showAccepted && (
        <span className="absolute top-6 right-6 flex items-center">
          <span className="h-4 w-4 bg-green-500 rounded-full shadow-green-400 shadow"></span>
          <span className="ml-2 text-green-400 text-sm font-semibold">
            Accepted
          </span>
        </span>
      )}
      {requestStatus === "rejected" && showRejected && (
        <span className="absolute top-6 right-6 flex items-center">
          <span className="h-4 w-4 bg-red-500 rounded-full shadow-red-400 shadow"></span>
          <span className="ml-2 text-red-400 text-sm font-semibold">
            Rejected
          </span>
        </span>
      )}
      <figure className="w-full flex justify-center pt-8 px-8">
        <img
          className="rounded-full object-cover w-40 h-40 border-4 border-gray-700 shadow-lg mb-4"
          src={photoUrl}
          alt="User photo"
        />
      </figure>
      <div className="w-full px-8 pb-8 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-gray-100 mt-2">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-gray-300 text-sm mt-1">
            {age + " years, " + gender}
          </p>
        )}
        {about && <p className="text-gray-400 text-base mt-4 mb-2">{about}</p>}
        {!hideActions && (
          <div className="flex gap-4 justify-center my-4 w-full">
            <button
              className="bg-gray-700 hover:bg-gray-800 text-gray-200 py-2 px-6 rounded-full font-semibold transition-colors"
              onClick={() => handleSendRequest("ignored", _id)}
              disabled={requestStatus !== null || isDragging}
            >
              Ignore
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full font-semibold transition-colors"
              onClick={() => handleSendRequest("interested", _id)}
              disabled={requestStatus !== null || isDragging}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserCard;
