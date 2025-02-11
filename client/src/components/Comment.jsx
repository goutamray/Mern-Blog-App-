import { useEffect, useState } from "react"
import moment from 'moment'; 
import { FaThumbsUp } from "react-icons/fa6"; 
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react"


const Comment = ({ item, onLike, onEdit, onDelete }) => {
   const [user, setUser] = useState({});
   const [isEditing, setIsEditing] = useState(false);
   const [editedContent, setEditedContent] = useState(item?.content);

   const { currentUser } = useSelector((state) => state.user)


  // get user 
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${item?.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser(); 
  }, [item]);


  // comment edit 
  const handleComentEdit = async () => {
    setIsEditing(true);
    setEditedContent(item?.content)
  }

  // handle update comment 
  const handleSaveComment = async () => {
    try {
       const res = await fetch(`/api/comment/editComment/${item?._id}`, {
        method : "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content : editedContent
        }),
       });

       if (res.ok) {
        setIsEditing(false);
        onEdit(item, editedContent)
       }


    } catch (error) {
      console.log(error.message);
      
    }
  }




  return (
    <div className="flex p-4 border-b dark:border-gray-600 ">
       <div className="flex-shrink-0 mr-3">
        <img className="h-10 w-10 rounded-full bg-gray-200" src={user?.photo} alt={user?.name} />
       </div>
       <div className="flex-1">
        <div className="flex items-center gap-1">
          <span className="font-bold mr-1 text-sm truncate "> {user ? `@${user?.name}` : "anonymous user"}</span>
          <span className="text-gray-500 text-xs"> {moment(item?.createdAt).fromNow()} </span>
        </div>
        {
          isEditing ? (
            <>
            <Textarea
              className='mb-2'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                 onClick={handleSaveComment}
              >
                Save
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
          ) : (
            <> 
            <p className="text-gray-500 pb-2"> {item?.content}</p>

            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button type="button" onClick={() => onLike(item?._id)} className={`text-gray-400 hover:text-blue-500 ${
                currentUser && item?.likes?.includes(currentUser?._id) && '!text-blue-500'
              }`}>
                 <FaThumbsUp className="text-sm"/>
              </button>
              <p>
                { 
                  item?.numberOfLikes > 0 && item?.numberOfLikes + " " + (item?.numberOfLikes === 1 ? "like" : "likes")
                }
              </p>
              {
                currentUser && (currentUser._id === item?.userId || currentUser.isAdmin) && (
                  <> 
                    <button onClick={handleComentEdit} className="text-gray-400 hover:text-blue-500">
                      Edit
                    </button>
                    <button onClick={() => onDelete(item._id)} className="text-gray-400 hover:text-red-500">
                      Delete 
                    </button>
                  </>
                )
              }
            </div>
          </>
          )
        }

       </div>
    </div>
  )
}

export default Comment
