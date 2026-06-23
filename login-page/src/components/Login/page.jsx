"use client"
import AnimatedTypingMotion from "../shadcn-space/animated-text/animated-text-02";
import { useState } from "react"


export default function Login({ title }) {


    // essas constantes abaixo serve para pegar o valor do email e senha para ser utilizado futuramente
    const [inputEmail, setInputEmail] = useState("")
    const [inputSenha, setInputSenha] = useState("")




    // uma constante que é chamada assim que aperta o botao de logar
    const logar = (async (e) => {

        // previne que o formulário faça suas ações padrões 
        e.preventDefault()

        // manda uma informação a API para poder verificar se os dados são válidos 
        const res = await fetch("", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(dados)
        })

    })






    return (

        // div que centraliza o card na tela
        <div className="flex justify-center items-center text-center h-dvh">


            {/* card de login */}
            <div className="border border-gray-200 shadow-lg hover:shadow-blue-500/50 w-100 flex flex-col p-5 gap-10 rounded-2xl hover:-translate-y-1 transition-all duration-200">

                {/* titulo do card */}
                <div className="h-10 flex justify-center w-full mt-5 items-center">
                    <h1><AnimatedTypingMotion title={title} /></h1>
                </div>

                {/* formulario onde é puxado as informações (leva a função que está na constante "logar") */}
                <form onSubmit={logar}>
                    {/* inputs */}
                    <div className="flex flex-col gap-5 ">
                        {/* input de email com titulo */}
                        <div className="flex flex-col items-start bg-gray-200 p-2 pl-4 rounded-2xl">
                            <h1 className="text-[15px]">Email</h1>
                            <input type="email" placeholder="Digite seu email" className="w-full focus:outline-none" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                        </div>

                        {/* input de senha com titulo */}
                        <div className="flex flex-col items-start  bg-gray-200 p-2 pl-4 rounded-2xl ">
                            <h1 className="text-[15px]">Senha</h1>
                            <input type="password" placeholder="Digite sua senha" className="w-full focus:outline-none" required value={inputSenha} onChange={(e) => setInputSenha(e.target.value)} />
                        </div>
                    </div>

                    {/* botão de enviar */}
                    <button className="p-2 rounded-2xl from-blue-600 to-blue-500 shadow-lg  bg-gradient-to-r text-white hover:cursor-pointer hover:scale-98 transition-all duration-300 mt-10 w-60" type="submit" >Entrar</button>
                </form>
            </div>
        </div>
    )
}