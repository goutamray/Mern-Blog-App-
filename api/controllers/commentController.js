
import asyncHandler from "express-async-handler"; 
import Comment from "../models/Comment.js";

/**
 * @DESC CREATE COMMENT 
 * @METHOD POST
 * @ROUTE /api/comment/create
 * @ACCESS PUBLIC 
 * 
 */
export const createComment = asyncHandler(async(req, res) => {
  try {
    const { content, userId, postId } = req.body;

    // validation 
    if (userId !== req.user.id) {
      return res.status(400).json({ message : "You are not allow to comment"});
    }

    // create comment 
   const newComment = new Comment({
    content,
    userId,
    postId
   });

   await newComment.save();

   // response
   return res.status(201).json(newComment); 

  } catch (error) {
     console.log(error.message);  
  }
});


/**
 * @DESC GET COMMENT 
 * @METHOD GET
 * @ROUTE /api/comment/getPostComments
 * @ACCESS PUBLIC 
 * 
 */
export const getPostComments = asyncHandler(async(req, res) => {
  try {
    const comments = await Comment.find({ postId : req.params.postId }).sort({ createdAt : -1 })
    
    return res.status(200).json(comments);
    
  } catch (error) {
    console.log(error.message);
  }
})


/**
 * @DESC UPDATE COMMENT 
 * @METHOD PATCH 
 * @ROUTE /api/comment/likeComment/:commentId 
 * @ACCESS PUBLIC 
 * 
 */
export const likeComment = asyncHandler(async(req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId );

    if (!comment) {
      return res.status(400).json({ message : "Comments Not Found"});
    }

    const userIndex = comment.likes.indexOf(req.user.id);

    if (userIndex === -1) {
      comment.numberOfLikes += 1; 
      comment.likes.push(req.user.id);
    }else{
      comment.numberOfLikes -= 1; 
      comment.likes.splice( userIndex, 1);
    }

    await comment.save(); 

    return res.status(200).json(comment);

  } catch (error) {
    console.log(error.message);
  }
});


/**
 * @DESC UPDATE COMMENT 
 * @METHOD PATCH 
 * @ROUTE /api/comment/editComment/:commentId 
 * @ACCESS PUBLIC 
 * 
 */
export const editComment = asyncHandler(async(req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId );

    if (!comment) {
      return res.status(400).json({ message : "Comments Not Found"});
    }

    if (comment.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(400).json({ message : "You are not allow edit this comment"});
    }

    const editComment = await Comment.findByIdAndUpdate(
      req.params.commentId, 
      {
         content : req.body.content,
      },
      {new : true},
    );

    return res.status(200).json(editComment);

  } catch (error) {
    console.log(error.message);
  }
});

