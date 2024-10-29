
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[360px] rounded-lg overflow-hidden sm:w-[370px] mb-1 transition-all">
       <Link to={`/post/${post?.slug}`}>
          <img src={post?.image} alt="post-photo" className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 "/>
       </Link>
       <div className="p-3 flex flex-col gap-2 ">
         <h2 className="text-lg font-semibold line-clamp-2"> {post?.title} </h2>
         <span className="italic text-sm"> {post?.category}</span>
         <Link to={`/post/${post?.slug}`} className="z-10 group-hover:bottom-0 absolute bottom-[-280px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md rounded-tl-none mb-2 mx-2 mt-0"> Read Article </Link>
       </div>
    </div>

  )
}

export default PostCard



