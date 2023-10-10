import React, { useRef, useLayoutEffect } from "react";

function Delete({users, user, open, setUsers, onClose}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const dialogRef = ref.current;

    if (open && !dialogRef?.open) {
      dialogRef.showModal();
    } else if (!open && ref.current?.open) {
      dialogRef.close();
    }
  }, [open])

  return (
    <dialog ref={ref} className="mx-auto my-auto bg-white rounded-lg shadow-lg px-4 sm:pd-8 pt-4 sm:pt-8 pb-0 m-4 max-w-lg w-5/6">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold w-full text-center text-secondary">Delete <span className="font-bold">{user.name}</span></h2>
      </div>
      <div className="flex justify-end gap-4 mt-8 mb-4">
          <button value="cancel" formMethod="dialog" className='px-4 py-2 rounded-lg border bg-primary color-tertiary-50' onClick={() => {
            setUsers(users.filter((data) => user.id !== data.id));
            onClose();
          }}>Delete</button>
        <button value="save" formMethod="dialog" className='px-4 py-2 rounded-lg border bg-red-700 text-white' onClick={onClose}>Cancel</button>
      </div>
    </dialog>
  )
}

export default Delete;