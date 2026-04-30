import { Link } from 'react-router-dom'

const RecentListCard = ({ Classname, Title, Data, Type }) => {
  return (
    <div className={`${Classname} h-64 bg-[#fffbf8] dark:bg-[#0d0d0f] border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-xl px-2 py-3 flex flex-col gap-2.5`}>
        <p className="text-xl px-3">{Title}</p>

        {/* Tabla */}
        <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full table-fixed text-left rounded overflow-hidden">
                <thead className="bg-zinc-100 dark:bg-zinc-950 text-neutral-600 dark:text-neutral-200">
                    <tr>
                        <th className="px-3 py-1.5">{Type === "Post" ? 'Titulo' : 'Usuario'}</th>
                        <th className="px-3 py-1.5">{Type === "Post" ? 'Autor' : 'Email'}</th>
                        {
                            Type === "Post" && (
                                <th className="px-3 py-1.5">Estado</th>
                            )
                        }
                        <th className="px-3 py-1.5">Acciones</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {
                        Data?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="px-3 py-1.5 truncate">{Type === "Post" ? item.title : item.username}</td>
                                    <td className="px-3 py-1.5 truncate">{Type === "Post" ? item.author_name : item.email}</td>
                                    {
                                        Type === "Post" && (
                                            <td className="px-3 py-1.5 text-green-500 dark:text-green-700">{Type === "Post" ? item.status : "..."}</td>
                                        )
                                    }
                                    <td className="px-3 py-1.5">
                                        <Link
                                            to={Type === "Post" ? `/blog/${item.slug}` : `/blog/profile/${item.username}`}
                                            className='flex justify-center items-center rounded-full w-full mx-auto bg-blue-100 hover:bg-blue-200 text-blue-400 dark:bg-blue-900 dark:hover:bg-blue-950 dark:text-blue-500 transition-all duration-200 ease-in-out'>
                                            <span>Vista</span>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>

    </div>
  );
};

export default RecentListCard;
