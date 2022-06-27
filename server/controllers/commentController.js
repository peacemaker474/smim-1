import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

// 댓글 생성(Comment Create)
export const postCommentCreate = async (req, res) => {
  const { post_id: postId, content, parent_id: parentId } = req.body;
  const {
    user: { _id },
  } = req.body;

  try {
    const userExist = await User.exists({ _id: _id });
    const postExist = await Post.exists({ _id: postId, being: true });

    if (parentId != null) {
      if (parentId === undefined) {
        return res.status(400).send({
          success: false,
          message: 'parentId가 undefined입니다.',
        });
      }

      const commentExist = await Comment.exists({ _id: parentId, being: true });

      if (!commentExist) {
        return res.status(400).send({
          success: false,
          message: '존재하지 않는 댓글입니다.',
        });
      }
    }

    if (!postExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!userExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }

    if (!postId) {
      return res.status(400).send({
        success: false,
        message: 'postId가 undefined입니다.',
      });
    } else if (!content) {
      return res.status(400).send({
        success: false,
        message: 'content가 undefined입니다.',
      });
    } else {
      const comment = await Comment.create({
        text: content,
        writer: _id,
        post_id: postId,
        parent_id: parentId,
      });

      if (parentId != null) {
        const parentComment = await Comment.findOne({ _id: parentId });
        parentComment.children.push(comment._id);
        await parentComment.save();
      }

      return res.status(200).send({
        success: true,
        comment_id: comment._id,
        message: '댓글 작성 성공했습니다.',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// 댓글 리스트 가져오기
export const getCommentList = async (req, res) => {
  const { id: postId } = req.params;

  try {
    const postExist = await Post.exists({ _id: postId, being: true });

    if (!postExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!postId) {
      return res.status(400).send({
        success: false,
        message: 'postId가 undefined입니다.',
      });
    } else {
      const commentList = await Comment.find({
        postId,
        parentId: null,
      });

      const DATA = [];

      async function repeat(comment, check) {
        if (comment.length === 0) {
          return;
        }
        const commentDataList = await Promise.all(
          comment.map(async (el) => {
            const children = await Comment.find({ parent_id: el._id, post_id: el.postId });
            const writer = await User.findOne({ _id: el.writer });

            return {
              ...el._doc,
              children,
              writer: {
                userId: writer.userId,
                _id: writer._id,
                nickname: writer.nickname,
              },
              // like : el._doc.like_users.includes()
            };
          })
        );

        for (let i = 0; i < commentDataList.length; i++) {
          if (commentDataList[i].parentId == null) {
            check = i;
            DATA[check] = [];
          }
          DATA[check].push(commentDataList[i]);
          await repeat(commentDataList[i].children, check);
        }
      }

      await repeat(commentList, 0);

      return res.status(200).send({
        success: true,
        data: DATA,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// 댓글 고정하기
export const getCommentPinned = async (req, res) => {
  const { id: commentId } = req.params;

  const {
    user: { _id },
  } = req.body;

  try {
    if (!commentId) {
      return res.status(400).send({
        success: false,
        message: 'commentId가 undefined입니다.',
      });
    }

    const userExist = await User.exists({ _id: _id });
    const comment = await Comment.exists({
      state: true,
      _id: commentId,
      parent_id: null,
    });

    const post = await Post.findOne({ _id: comment.postId, being: true, owner: _id });

    if (!comment) {
      return res.status(400).send({
        success: false,
        message: '고정할 수 없는 댓글입니다.',
      });
    }

    if (!post) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!userExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }
    post.meta.pinnedCmnt = commentId;
    await post.save();

    return res.status(201).send({
      success: true,
      message: '댓글 고정을 성공했습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// 댓글 좋아요
export const getCommentLike = async (req, res) => {
  const {
    user: { _id },
  } = req.body;
  const { id: commentId } = req.params;
  try {
    const user = await User.findOne({ id: _id });
    console.log(user);

    // if (like.user_array.includes(_id)) {
    //   return res.status(404).send({
    //     success: false,
    //     message: '이미 좋아요한 게시물입니다.',
    //   });
    // }

    // post.meta.likes += 1;
    // await post.save();

    // like.user_array.push(_id);
    // await like.save();

    // return res.status(200).send({
    //   success: true,
    //   message: '좋아요를 눌렀습니다.',
    //   data: {
    //     likes: post.meta.likes,
    //   },
    // });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 댓글 좋아요 취소
export const getCommentUnlike = () => {};

// 댓글 수정하기
export const putCommentEdit = () => {};

// 댓글 삭제하기
export const deleteComment = () => {};
