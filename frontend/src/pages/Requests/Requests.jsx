import { useState } from "react";
import RequestsGrid from "../../components/Blog/BlogRequests/RequestsGrid";
import { useLanguage } from "../../context/LanguageContext";
import RequestModal from "../../components/Modals/RequestModal";
import { FaPlus } from "react-icons/fa";

const Requests = () => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const [requests, setRequests] = useState([]);

    const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <div className="mt-4">
        <div className="flex items-center justify-between">
            <h3 className="text-2xl">
                {isEnglish ? 'Requests center' : 'Centro de solicitudes'}
            </h3>

            <button
                onClick={() => setShowRequestModal(true)}
                className="hover:text-orange-600 bg-[#fffbf8] dark:bg-[#0d0d0f] border border-neutral-800/20 dark:border-neutral-800 flex justify-center items-center gap-2 px-6 py-2 rounded-xl cursor-pointer transition-colors ease-in-out duration-200 shadow-md shrink-0">
                <FaPlus/>
                <span>
                    {isEnglish ? 'Send request' : 'Enviar solicitud'}
                </span>
            </button>
        </div>

        <RequestsGrid
            Requests={requests}/>

        {
            showRequestModal && (
                <RequestModal
                    setShowModal={setShowRequestModal}
                    setRequests={setRequests}/>
            )
        }
    </div>
  );
};

export default Requests;
