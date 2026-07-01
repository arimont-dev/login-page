"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header/page"

export default function PaginaInicial() {

    // utilizado para redirecionamento de rotas
    const router = useRouter()

    // utilizado para fazer o carregamento de tela
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        // pega o token que esta no localStorage
        const token = localStorage.getItem("token")

        if (!token) {
            router.push("/")
        }

        // se tiver o token ele tira o carregamento da tela
        setCarregando(false)
    },)


    if (carregando) {
        return <p>carregando...</p>
    } else {
        return <Header/>
    }
}   