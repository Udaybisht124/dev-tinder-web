import React from 'react'


const UserCard = ({user}) => {
    const {_id,firstName,lastName,about,photoUrl} = user;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName}</h2>
    <p>{about}</p>
   
<div className='flex justify-center gap-6'>
<div className="card-actions justify-end">
      <button className="btn btn-primary">Ignore</button>
    </div>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Send Request</button>
    </div>
</div>

  </div>
</div>
    </div>
  )
}

export default UserCard
