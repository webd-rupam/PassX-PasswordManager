import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const ref = useRef()
    const passwordRef = useRef()


    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])


    const copyText = (text) => {

        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        navigator.clipboard.writeText(text)
    }




    const showPassword = () => {

        passwordRef.current.type = "password"




        if (ref.current.src.includes("icons/eyecross.png")) {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eye.png"
        }
        else {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eyecross.png"
        }
    }



    const savePassword = () => {
        if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));
            setform({ site: "", username: "", password: "" });

            // Show success toast
            toast('Password Saved Successfully!', {
                position: "top-right",
                autoClose: 2000, // Automatically close after 5 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            // Show error toast
            toast('Please fill all the Details!', {
                position: "top-center",
                autoClose: 800, // Automatically close after 800ms
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: { color: 'red' },
            });
        }
    };


    const deletePassword = (id) => {
        console.log("Deleting password with id", id)

        let c = confirm("Are you sure that you want to Delete it?")

        if (c) {

            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast('Successfully Deleted!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }



    }
    const editPassword = (id) => {
        console.log("Editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }


    // to open links
    const ensureUrlScheme = (url) => {
        if (!/^https?:\/\//i.test(url)) {
            return `https://${url}`;
        }
        return url;
    };



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="px-2 pt-1 md:mycontainer">

                <h1 className='text-4xl font-bold text-center'> <span className='text-green-500'> &lt;</span>

                    <span>Pass</span><span className='text-green-500'>X/&gt;</span>
                </h1>

                <p className='text-green-900 text-lg text-center font-mono'>Your own Password Manager</p>


                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input onChange={handleChange} value={form.site} placeholder='Enter Website URL' className='rounded-full w-full border border-green-500 p-4 py-1' type="text" name='site' id='site' />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='rounded-full w-full border border-green-500 p-4 py-1' type="text" name='username' id='username' />

                        <div className="relative">
                            <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder='Enter Password' className='rounded-full w-full border border-green-500 p-4 py-1' type="password" name='password' id='password' />

                            <span className='absolute right-[4px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eyecross.png" alt="" />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-8 py-1 w-fit hover:bg-green-300 gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>

                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}

                    {passwordArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Website</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='border border-white py-2 text-center '>

                                        <div className='flex items-center justify-center'>

                                            <a className='hover:underline text-blue-600' href={ensureUrlScheme(item.site)} target='_blank' rel='noopener noreferrer'>{item.site}</a>

                                            <div className='lordiconcopy cursor-pointer size-7' onClick={() => { copyText(item.site) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xpgofwru.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }}>
                                                </lord-icon>
                                            </div>

                                        </div>

                                    </td>
                                    <td className='border border-white py-2 text-center'>

                                        <div className='flex items-center justify-center'>

                                            <span>{item.username}</span>

                                            <div className='lordiconcopy cursor-pointer size-7' onClick={() => { copyText(item.username) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xpgofwru.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }}>
                                                </lord-icon>
                                            </div>

                                        </div>

                                    </td>

                                    <td className='border border-white py-2 text-center'>

                                        <div className='flex justify-center items-center'>

                                            <span>{item.password}</span>

                                            <div className='lordiconcopy cursor-pointer size-7' onClick={() => { copyText(item.password) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xpgofwru.json"
                                                    trigger="hover"
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px" }}>
                                                </lord-icon>
                                            </div>

                                        </div>

                                    </td>
                                    <td className='border border-white py-2 text-center'>
                                        <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>

                                    </td>
                                </tr>

                            })}

                        </tbody>
                    </table>}

                </div>


            </div>
        </>
    )
}

export default Manager
