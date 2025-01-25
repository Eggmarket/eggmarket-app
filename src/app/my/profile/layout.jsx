'use client'

import { createContext, useCallback, useState } from "react"

export const ToggleShow = createContext()
export const DialogPhone = createContext()

export default function Layout({ children, users, code }) {
    const [toggle, setToggle] = useState('users')
    const [dialogPhone, setDialogPhone] = useState('')

    const onClick = (tabName) => {
        setToggle(tabName)
    }

    return (
        <>
            <DialogPhone.Provider value={[dialogPhone, setDialogPhone]}>
                {children}
            </DialogPhone.Provider>
            <dialog id="phone_id" className="modal modal-bottom max-w-[440px] mx-auto">
                <div className="modal-box p-0">
                    <div className="p-4 flex justify-between">
                        <p className="text-tertiary font-normal text-sm">
                            {dialogPhone === 'change' && 'تغییر شماره اصلی'}
                            {dialogPhone === 'add' && 'افزودن شماره تماس'}
                            {dialogPhone === 'sheba' && 'افزودن شماره شبا'}
                        </p>
                        <div className="modal-action !mt-0">
                            <form method="dialog">
                                <button className="outline-none">
                                    <span className="icon-light-bold-Close text-2xl"></span>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="h-[2px] bg-default-300"></div>
                    <div className="mt-8 mb-4 mx-8">
                        <ToggleShow.Provider value={[toggle, setToggle, dialogPhone, setToggle]}>
                            {toggle === 'users' && users}
                            {toggle === 'code' && code}
                        </ToggleShow.Provider>
                    </div>
                </div>
            </dialog>
        </>

    )
}