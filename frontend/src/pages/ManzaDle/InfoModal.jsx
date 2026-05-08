import { IoClose } from "react-icons/io5"

const InfoModal = ( { onClose } ) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-zinc-950/80 bg-zinc-100 backdrop-blur-sm">
      
      <div className="relative dark:bg-zinc-900 bg-zinc-50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-orange-500 transition-colors"
          aria-label="Cerrar"
        >
          <IoClose size={22} />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold dark:text-white text-orange-600 mb-4 text-center tracking-wide">
          ¿Cómo jugar?
        </h2>

        {/* Contenido */}
        <p className="text-zinc-300 text-sm leading-relaxed text-center mb-6">
          Intenta adivinar la palabra secreta en un número limitado de intentos.
          Cada vez que ingreses una palabra, recibirás pistas que te indicarán
          qué letras son correctas y si están en la posición adecuada.
          Usa esta información para acercarte a la solución antes de quedarte sin intentos.
        </p>

        {/* Opcional: ejemplos visuales */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-400 mb-6">
          <p className="mb-2">
            🟩 Letra correcta en la posición correcta
          </p>
          <p className="mb-2">
            🟨 Letra correcta en posición incorrecta
          </p>
          <p>
            ⬛ Letra que no está en la palabra
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={onClose}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
        >
          Entendido
        </button>

      </div>
    </div>
  )
}

export default InfoModal
