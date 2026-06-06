import Manza from "../../../imgs/Manza.jpeg"

export const HistoryPage = () => {

    return (
        <div className="relative overflow-hidden mt-10 dark:bg-zinc-900 bg-zinc-50 rounded-2xl p-10 max-h-[85vh] shadow-2xl transition-all">
            <div className="p-5 overflow-y-auto h-full max-h-[85vh]">
                <h1 className="text-4xl font-bold">Historia de Manzanillo</h1>
                <h2 className="text-zinc-500">Crónica de un puerto con historia.</h2>
                <p className="text-justify dark:text-zinc-300 mt-5">
                    Los orígenes de Manzanillo se entrelazan con la historia de la exploración marítima en América. 
                    Si bien se estima que las costas de Colima estuvieron habitadas desde épocas prehispánicas 
                    por grupos sedentarios dedicados a la agricultura y la pesca, fue a partir del siglo XVI 
                    cuando el territorio cobró relevancia para la Corona Española.
                </p>
                <img src={Manza} className="my-6 max-h-100 w-full object-cover object-top rounded-2xl border border-orange-500/60"/>
                <p className="text-justify dark:text-zinc-300 mt-5">
                    En 1522, las expediciones enviadas por Hernán Cortés avistaron por primera vez la bahía. 
                    Poco después, Gonzalo de Sandoval fundó el asentamiento originalmente llamado Tzalahua. 
                    El lugar destacó rápidamente por su posición estratégica, convirtiéndose en un importante 
                    astillero y centro de operaciones para las expediciones hacia el Pacífico. Se dice que el 
                    nombre actual, "Manzanillo", deriva de la abundancia de la planta de manzanilla en la zona, 
                    la cual era utilizada por los colonizadores.
                </p><br />
                <p className="text-justify dark:text-zinc-300">
                    Uno de los hitos más emblemáticos de este periodo es el primer contacto con los nativos 
                    en la actual Playa La Audiencia, sitio que recibe este nombre precisamente en memoria 
                    de aquellos encuentros. Debido a su ubicación privilegiada, Manzanillo fue un nodo clave 
                    en el comercio con el Oriente, lo que lo llevó a enfrentar constantes desafíos, 
                    incluyendo el asedio de piratas que buscaban controlar estas rutas marítimas.         
                </p><br />
                <p className="text-justify dark:text-zinc-300">
                    El desarrollo moderno del municipio inició en 1825, cuando el gobierno trasladó el puerto 
                    de Salahua a Manzanillo. En 1873, recibió formalmente la categoría de municipio y, 
                    finalmente, en 1948, fue elevado al rango de ciudad. Desde entonces, Manzanillo ha 
                    evolucionado hasta consolidarse como uno de los puertos comerciales más vitales de 
                    México y un referente turístico de talla internacional.
                </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-zinc-50 dark:from-zinc-900 to-transparent pointer-events-none rounded-b-2xl"></div>
        </div>
    )
}