"use client"

import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {

    // pega o token do localStorage
    const token = localStorage.getItem("token")

    const router = useRouter()

    function Logout() {
        if (token) {
            localStorage.removeItem("token")
            alert("Você foi deslogado com sucesso, redirecionando ao login....")
            router.push("/")
        }

    }

    const [usuario, setUsuario] = useState(null)

    useEffect(() => {
        if (token) {
            // decodifica o token para poder pegar as informações do usuario
            const data = jwtDecode(token)
            setUsuario(data)
        }
    }, [])


    if(!usuario){
        return <div><h1>carregando dados do usuario...</h1></div>
    }

    return (<>

        {/* div principal onde vai centralizar todos os itens da tela */}
        <div className="flex w-full border-b-1 border-gray-300 justify-between">
            <div className="flex items-center">
                <h1 className="text-[30px] ml-10">
                    Login-Page
                </h1>
            </div>

            <div className=" p-2 gap-3 h-20 flex justify-around items-center mr-10">
                <h1 className="">{usuario.nome}</h1>
                <h1 className={`border-2 p-2 rounded-2xl text-[13px] font-bold text-[] ${usuario.tipo === "adm" ? "text-blue-500" : "text-green-400"}`} >{usuario.tipo}</h1>
            </div>


        </div>
        <div className=" p-2 gap-5 h-20 flex justify-around items-center absolute bottom-0 right-10">
            <h1 className={`border-2 p-2 rounded-2xl text-[13px] font-bold shadow-2xs text-[#ca3333]  duration-300 cursor-pointer hover:scale-98 `} onClick={Logout} >Logout</h1>
        </div>
    </>)

}
