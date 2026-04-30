import { Link } from 'react-router-dom'

const RecentListCard = ({ Title, Posts = null, Comments = null }) => {
  return (
    <div className="h-64 bg-[#fffbf8] dark:bg-[#0d0d0f] border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-xl px-2 py-3 flex flex-col gap-2.5">
        <p className="text-xl px-3">{Title}</p>

        {/* Tabla */}
        <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full table-fixed text-left rounded overflow-hidden">
                <thead className="bg-zinc-100 dark:bg-zinc-950 text-neutral-600 dark:text-neutral-200">
                    <tr>
                        <th className="px-3 py-1.5">Titulo</th>
                        <th className="px-3 py-1.5">Autor</th>
                        <th className="px-3 py-1.5">Estado</th>
                        <th className="px-3 py-1.5">Acciones</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {
                        Posts && (
                            Posts.map((post, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-3 py-1.5 truncate">{post.title}</td>
                                        <td className="px-3 py-1.5 truncate">{post.author_name}</td>
                                        <td className="px-3 py-1.5 text-green-500 dark:text-green-700">{post.status}</td>
                                        <td className="px-3 py-1.5">
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className='flex justify-center items-center rounded-full w-2/3 mx-auto bg-blue-100 dark:bg-blue-900 text-blue-500 hover:text-blue-400'>
                                                <span>Vista</span>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>
            </table>
        </div>

    </div>
  );
};

export default RecentListCard;
