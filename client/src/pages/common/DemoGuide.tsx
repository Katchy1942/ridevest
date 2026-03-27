import Screen1 from "@/components/demo/Screen1"

const DemoGuide = () => {
   return (
      <div className="flex flex-col justify-center items-center min-h-screen">
         <div className="flex flex-col justify-center items-center border-b border-zinc-700 pb-4">
            <h1 className='font-serif text-4xl tracking-tighter font-extralight text-emerald-600 mb-2'>ridevest<span className='font-black'>.</span></h1>
            <p className="text-xs text-zinc-200">A simple and easy way to manage your rides.</p>
         </div>
         <Screen1 />
      </div>
   )
}

export default DemoGuide