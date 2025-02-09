import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";


const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

 
  
  
  // get single 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        
        if (!res.ok) {
           setError(true);
           setLoading(false);
        }else{
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
         
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error.message);
        
      }
    }

    fetchPost();
  }, [postSlug]); 


  // fetch recent post 
  useEffect(() => {
     const fetchRecentPosts = async() => {
       const res = await fetch(`/api/post/getposts?limit=3`);
       const data = await res.json();

       if (res.ok) {
        setRecentPosts(data.posts); 
       }
     }
     fetchRecentPosts();

  }, []);


  // loading 
  if(loading) return <div className="flex justify-center items-center min-h-screen"> 
    <Spinner size="xl"/>
  </div>

  return (
    <div className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen">
        <h2 className="text-3xl mt-10 p-3 font-serif text-center max-w-4xl mx-auto lg:text-4xl"> {post && post?.title} </h2>
        <Link to={`/search?category=${post && post?.category}`} className="self-center mt-5"> 
           <Button color="gray" pill size="md" > {post && post?.category} </Button>
        </Link>
        <img src={post && post?.image} alt={post && post?.title} className="mt-10 p-3 max-h-[600px] object-cover w-full "/>
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-md"> 
          <span> {post && new Date(post.createdAt).toLocaleDateString()} </span>
          <span className="italic"> {post && (post.content.length / 1000).toFixed(0)} mins read </span>
        </div>
        <div className="p-3 max-w-3xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html : post && post.content}}>
        </div>
       
       <div className="max-w-5xl mx-auto w-full">
         <CallToAction />
       </div>
        <CommentSection postId={post._id} />

        <div className="flex flex-col justify-center items-center mb-5 ">
          <h2 className="text-xl mt-5"> Recent Articles </h2>
          <div className="flex flex-wrap gap-5 mt-5 justify-center">
             {
              recentPosts?.length !== 0 && recentPosts?.map((post) => {
                return <PostCard key={post._id} post={post} />
              })
             }
          </div>
        </div>
    </div>

  )
}

export default PostPage
