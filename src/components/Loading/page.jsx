import { Spinner } from "@/components/ui/spinner"


export default function Loading() {

    return (
        <div className=" flex flex-col items-center justify-center items-center w-full h-svh backdrop-blur absolute z-50">
            <Spinner className="text-blue-500 w-10 h-10"/>
        </div>
    )

}