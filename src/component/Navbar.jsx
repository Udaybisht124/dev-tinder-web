import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar bg-neutral">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">🧑‍💻devTinder</a>
    </div>
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-8">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://tse2.mm.bing.net/th?id=OIP.DRlolMwLu2ravERF91UrBQHaEK&pid=Api&P=0&h=180" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Navbar