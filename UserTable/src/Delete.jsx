import React, { forwardRef } from "react";

const Delete = forwardRef(function Delete({user}, ref) {
  return (
    <dialog ref={ref} className="mx-auto my-auto bg-white rounded-lg shadow-lg px-4 sm:pd-8 pt-4 sm:pt-8 pb-0 m-4 max-w-lg w-5/6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold w-full text-center text-secondary">Delete <span className="font-bold">{user.name}</span></h2>
      </div>
      <form>
        <div className="flex justify-end gap-4 mt-8 mb-4">
            <button value="cancel" formMethod="dialog" className='px-4 py-2 rounded-lg border bg-primary color-tertiary-50'>Delete</button>
           <button value="save" formMethod="dialog" className='px-4 py-2 rounded-lg border bg-red-700 text-white'>Cancel</button>
        </div>
      </form>
    </dialog>
  )
})

export default Delete;