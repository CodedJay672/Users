import React, { useRef, useLayoutEffect } from "react";

export default function Edit({ user, open, onClose }){
  const ref = useRef(null);

  useLayoutEffect(() => {
    const dialogRef = ref.current;
    if (open && !dialogRef?.open) {
      dialogRef.showModal();
    } else if (!open && ref.current?.open) {
      dialogRef.close();
    }
  }, [open]);

  return (
    <>
    <dialog ref={ref} className="mx-auto my-auto bg-white rounded-lg shadow-lg px-4 sm:pd-8 pt-4 sm:pt-8 pb-0 m-4 max-w-lg w-5/6">
      <div className="flex items-center mb-4">
        <h2 className=" w-full text-center text-xl font-semibold text-secondary">Edit <span className="font-bold">{user.name}</span></h2>
      </div>
      <form className="flex flex-col gap-4">
        <label htmlFor="name" className="text-sm text-secondary-50">Name</label>
        <input type="text" id="name" value={user.name} readOnly={true} className="border rounded-lg px-4 py-2 focus:outline-0" />
        <label htmlFor="username" className="text-sm text-secondary-50">Username</label>
        <input type="text" id="username" value={user.username} readOnly={true} className="border rounded-lg px-4 py-2 focus:outline-0" />
        <label htmlFor="email" className="text-sm text-secondary-50">Email</label>
        <input type="email" id="email" value={user.email} readOnly={true} className="border rounded-lg px-4 py-2 focus:outline-0" />
        <label htmlFor="phone" className="text-sm text-secondary-50">Phone</label>
        <input type="text" id="phone" value={user.phone} readOnly={true} className="border rounded-lg px-4 py-2 focus:outline-0" />
        <label htmlFor="website" className="text-sm text-secondary-50">Website</label>
        <input type="text" value={user.website} id="website" className="border rounded-lg px-4 py-2 focus:outline-0" readOnly={true} />
        <div className="flex justify-end gap-4 mt-8 mb-4">
          <button value="cancel" formMethod="dialog" className='px-4 py-2 rounded-lg border bg-primary color-tertiary-50' onClick={onClose}>Save</button>
          <button value="save" formMethod="dialog" className='px-4 py-2 rounded-lg border bg-red-700 text-white' onClick={onClose}>Cancel</button>
        </div>
      </form>
    </dialog>
    </>
  )
}