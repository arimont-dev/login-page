"use client"

import { useState} from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Load from "@/components/Loading/page"


export default function Login({ title }) {


    // rota
    const router = useRouter()

    // essas constantes abaixo serve para pegar o valor do email e senha para ser utilizado futuramente
    const [inputEmail, setInputEmail] = useState("")
    const [inputSenha, setInputSenha] = useState("")

    // essas constantes abaixo serve para verificar se o input do email ou senha esta selecionado, para poder colocar um efeito ao selecionar o input
    const [isFocusEmail, setIsFocusEmail] = useState(false)
    const [isFocusSenha, setIsFocusSenha] = useState(false)

    // essa constante serve para verificar se a senha esta visivel ou não
    const [isSenhaVisivel, setIsSenhaVisivel] = useState(false)

    // essa constante serve para verificar se a tela esta carregando ou não, para poder mostrar o spinner de carregamento
    const [carregando, setCarregando] = useState(false)

    // apaga a mensagem de erro ao clicar em qualquer um dos inputs
    if (isFocusEmail) {
        const emailError = document.getElementById("emailError")
        emailError.innerHTML = ""
    }

    if (isFocusSenha) {
        const senhaError = document.getElementById("senhaError")
        senhaError.innerHTML = ""
    }


    // uma constante que é chamada assim que aperta o botao de logar
    const logar = (async (e) => {
        
        // previne que o formulário faça suas ações padrões 
        e.preventDefault()

        setCarregando(true)

        // apaga as mensagens de erro que estão na tela
        const emailError = document.getElementById("emailError")
        emailError.innerHTML = ""

        const senhaError = document.getElementById("senhaError")
        senhaError.innerHTML = ""



        // cria um objeto com os dados do email e senha que foram digitados nos inputs
        const dados = {
            email: inputEmail,
            senha: inputSenha
        }


        // manda uma informação a API para poder verificar se os dados são válidos 
        await fetch(`${process.env.NEXT_PUBLIC_URL_API}/auth/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })
            .then(res => res.json())
            .then(data => {
                if (data.sucesso === true) {
                    if (data.token) {
                        // adiciona o token ao localStorage para poder ser utilizado em demais abas
                        localStorage.setItem("token", data.token)
                    }

                    setCarregando(false)
                    router.push("/home")
                }


                // caso de erro, ele vai verificar se o erro é do email ou da senha e vai mostrar a mensagem de erro na tela
                if (data.sucesso === false) {

                    setCarregando(false)

                    // caso o erro seja do email
                    if (data.tipo === "email") {

                        // pega o input de email
                        const emailInput = document.getElementById("emailInput")

                        // pega a div onde mostrará a mensagem de erro do email
                        const emailError = document.getElementById("emailError")


                        // adiciona uma classe ao input de email para sinalizar que está incorreto
                        emailInput.classList.add("inputError")
                        // faz a animação de tremer
                        emailInput.classList.add("tremer")

                        // adiciona a mensagem de erro do email
                        emailError.innerHTML = data.mensagem
                        // faz a animação de tremer na mensagem de erro do email
                        emailError.classList.add("tremer")

                        // esse setTimeout serve para tirar a animação de tremer depois de 500ms
                        setTimeout(() => {
                            emailInput.classList.remove("tremer")
                            emailError.classList.remove("tremer")

                        }, 500)

                    }

                    // caso o erro seja da senha
                    if (data.tipo === "senha") {

                        // pega o input de email
                        const emailInput = document.getElementById("emailInput")

                        // pega o input da senha
                        const senhaInput = document.getElementById("senhaInput")

                        // mostra a mensagem de erro da senha
                        const senhaError = document.getElementById("senhaError")

                        // adiciona uma classe ao input de email para sinalizar que está correto
                        emailInput.classList.add("inputCorrect")

                        // adiciona uma classe ao input de senha para sinalizar que está incorreta
                        senhaInput.classList.add("inputError")
                        // faz a animação de tremer
                        senhaInput.classList.add("tremer")

                        // adiciona a mensagem de erro da senha
                        senhaError.innerHTML = data.mensagem
                        // faz a animação de tremer na mensagem de erro da senha
                        senhaError.classList.add("tremer")

                        // esse setTimeout serve para tirar a animação de tremer depois de 500ms
                        setTimeout(() => {
                            senhaInput.classList.remove("tremer")
                            senhaError.classList.remove("tremer")

                        }, 500)
                    }

                }
            })


    })



    return (

        // div que centraliza o card na tela
        <div className="flex justify-center items-center text-center h-dvh">

            {carregando ? <Load /> : null}




            {/* card de login */}
            <div className="border m-2 border-gray-200 shadow-lg hover:shadow-blue-500/50 w-100 flex flex-col p-5 gap-10 rounded-2xl hover:-translate-y-1 transition-all duration-200">

                {/* titulo do card */}
                <div className="h-10 flex justify-center w-full mt-5 items-center text-[25px] font-bold text-blue-500">
                    <h1>{title}</h1>
                </div>

                {/* formulario onde é puxado as informações (leva a função que está na constante "logar") */}
                <form onSubmit={logar}>
                    {/* inputs */}
                    <div className="flex flex-col gap-5 ">

                        {/* EMAIL */}
                        <div>
                            {/* titulo e input do email */}
                            <div id="emailInput" className={`flex flex-col items-start bg-gray-200 p-2 pl-4 rounded-2xl  border-gray-200 ${isFocusEmail ? "inputSelecionado" : ""} `}>
                                <h1 className="text-[15px]">Email</h1>
                                <input type="email" placeholder="Digite seu email" className="w-full focus:outline-none" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} onFocus={() => setIsFocusEmail(true)} onBlur={() => setIsFocusEmail(false)} />
                            </div>

                            {/* mensagem de erro do email */}
                            <div className="flex text-red-500 text-[12px] h-7 items-center">
                                <h1 className={`p-2`} id="emailError"></h1>
                            </div>

                        </div>


                        {/* SENHA */}
                        <div>
                            {/* input de senha com titulo */}
                            <div id="senhaInput" className={`flex flex-col items-start  bg-gray-200 border-gray-200 p-2 pl-4 rounded-2xl ${isFocusSenha ? "inputSelecionado" : ""} `}>
                                <h1 className="text-[15px]">Senha</h1>
                                <div className="flex items-center w-full">
                                    <input type={isSenhaVisivel ? "text" : "password"} placeholder="Digite sua senha" className="w-full focus:outline-none" value={inputSenha} onChange={(e) => setInputSenha(e.target.value)} onFocus={() => setIsFocusSenha(true)} onBlur={() => setIsFocusSenha(false)} />
                                    <button type="button" onClick={() => setIsSenhaVisivel(!isSenhaVisivel)}>
                                        {isSenhaVisivel ? <EyeOff id="senhaOlho" className={`w-5 h-5 text-gray-500`} /> : <Eye id="senhaOlho" className={`w-5 h-5  text-gray-500`} />}
                                    </button>
                                </div>
                            </div>
                            {/* mensagem de erro da senha */}
                            <div className="flex text-red-500 text-[12px] h-7 items-center">
                                <h1 className={`p-2`} id="senhaError"></h1>
                            </div>
                        </div>
                    </div>

                    {/* botão de enviar */}
                    <button className="p-2 rounded-2xl from-blue-600 to-blue-500 shadow-lg  bg-linear-to-r text-white hover:cursor-pointer hover:scale-98 transition-all duration-300 mt-10 w-60" type="submit" >Entrar</button>
                </form>
            </div>
        </div>

    )

}