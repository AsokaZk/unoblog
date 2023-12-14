'use client'
import { User } from '@/lib/definitions';
import Link from '@/node_modules/next/link';
import React, { useState } from 'react'

import { useSession } from "next-auth/react";

const Dropdown = (props: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = useSession();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleSignOut = () => {
        props.signOut();
        setIsOpen(false);
    }

    return (
        <div className='w-full py-6 pb-8 mt-3'>
            <div className="relative inline-block">

                <button type="button" onClick={toggleDropdown} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={session.user.image} alt="" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" onClick={closeDropdown} tabIndex={-1} id="user-menu-item-0">{session?.user.name}</Link>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" onClick={closeDropdown} tabIndex={-1} id="user-menu-item-1">Settings</Link>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" onClick={handleSignOut} tabIndex={-1} id="user-menu-item-2">Sign out</Link>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Dropdown;