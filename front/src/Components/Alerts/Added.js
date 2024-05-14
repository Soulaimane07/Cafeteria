import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function Added() {
  const added = useSelector(state => state.AddedTo)

  return (
    <div id="alert-border-3" className="fixed left-6 bottom-6 flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50" role="alert">
        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <div className="ms-3 text-sm font-medium mr-6">
            {added.data}
        </div>
        <Link to={added.link} type="button" className=" bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center  "  data-dismiss-target="#alert-border-3" aria-label="Close">
            Visit Now
        </Link>
    </div>
  )
}

export default Added