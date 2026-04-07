import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/profileService';
import toast from 'react-hot-toast';
import ModalLayout from '../../layouts/ModalLayout';

const EditProfileModal = ({ setShowModal }) => {
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useAuth();

    const [modalData, setModalData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        bio: user.bio  
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData((prev) => ({ ...prev, [name] : value }));
    }

    const handleUpdate = async () => {
        setLoading(true);

        try {
            const updated = await updateProfile(modalData);
            
            setUser(prev => ({
                ...prev,
                ...updated
            }));

            toast.success("¡Perfil actualizado!");
            setShowModal(false);
        } catch (error) {
            toast.error("Error al actualizar perfil...")
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    console.log(user);

  return (
    <ModalLayout>
        <div className="bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-300">
            <div className="space-y-2">
                <h2 className='text-center tracking-wider italic'>Editar perfil</h2>
                <hr className='text-white/10'/>
            </div>

            <div className='flex flex-col gap-2'>
                <input
                    name='first_name'
                    onChange={handleChange}
                    className='px-3 py-2 rounded-sm border border-white/10 outline-none focus:border-white/20'
                    value={modalData.first_name}
                    type="text"/>

                <input
                    name='last_name'
                    onChange={handleChange}
                    className='px-3 py-2 rounded-sm border border-white/10 outline-none focus:border-white/20'
                    value={modalData.last_name}
                    type="text"/>
                
                <input
                    name='username'
                    onChange={handleChange}
                    className='px-3 py-2 rounded-sm border border-white/10 outline-none focus:border-white/20'
                    value={modalData.username}
                    type="text"/>

                <textarea
                    name='bio'
                    onChange={handleChange}
                    className='custom-scrollbar resize-none px-3 py-2 rounded-sm border border-white/10 outline-none focus:border-white/20'
                    rows={3}
                    value={modalData.bio}/>
            </div>

            <div className='mt-2 flex justify-end items-center gap-4'>
                <button
                    onClick={() => setShowModal(false)}
                    className='text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'>
                    Cancelar
                </button>

                <button
                    disabled={loading}
                    onClick={handleUpdate}
                    className={`${loading ? 'bg-zinc-700 text-zinc-500' : 'text-white bg-orange-600 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'} px-4 py-2 rounded`}>
                    Actualizar
                </button>
            </div>
        </div>
    </ModalLayout>
  );    
};

export default EditProfileModal;
