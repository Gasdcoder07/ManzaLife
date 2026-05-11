import { IoClose } from "react-icons/io5"
import { useLanguage } from "../../context/LanguageContext"

const InfoModal = ( { onClose } ) => {

  const { textos } = useLanguage()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-zinc-950/80 bg-zinc-100 backdrop-blur-sm">
      
      <div className="relative dark:bg-zinc-900 bg-zinc-50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">

        <h2 className="text-2xl font-bold dark:text-white text-orange-600 mb-4 text-center tracking-wide">
          {textos.manzadle.how}
        </h2>

        <p className="dark:text-zinc-300 text-zinc-600 text-sm leading-relaxed text-justify mb-6">
          {textos.manzadle.desc}
        </p>

        <div className="dark:bg-zinc-950 bg-zinc-100 dark:border dark:border-zinc-800 rounded-xl p-4 text-xs dark:text-zinc-400 text-zinc-600 mb-6">
          <p className="mb-2">
            {textos.manzadle.green}
          </p>
          <p className="mb-2">
            {textos.manzadle.yellow}
          </p>
          <p>
            {textos.manzadle.black}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
        >
          {textos.manzadle.btn}
        </button>

      </div>
    </div>
  )
}

export default InfoModal
