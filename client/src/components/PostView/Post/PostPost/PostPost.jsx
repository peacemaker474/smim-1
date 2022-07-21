import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostView, getReadPostDetail } from '../../../../network/post/http';
import LoadingPage from '../../../../pages/LoadingPage';
import NotFound from '../../../../pages/NotFound';
import PostPostPresenter from './PostPost.style';
import { getPinnedCommentData } from '../../../../redux/services/comment';
import { pinnedInitCommentId } from '../../../../redux/slice/commentSlice';
import { getPostData } from '../../../../redux/slice/postSlice';

function PostPost() {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const user = useSelector((state) => state.user);
  const { id: postId } = useParams();
  const [view, setView] = useState(0);
  const dispatch = useDispatch();

  const fetchAPI = async ({ queryKey }) => {
    const [{ postId }] = queryKey;
    let post;
    try {
      if (tkn) {
        const response = await getReadPostDetail(postId, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        post = response.data;
      } else {
        const response = await getReadPostDetail(postId);
        post = response.data;
      }
      const view = await getPostView(postId);
      setView(view.data.data);
      if (post.meta.pinnedCmnt) {
        dispatch(getPinnedCommentData({ pinnedId: post.meta.pinnedCmnt, tkn }));
      } else {
        dispatch(pinnedInitCommentId());
      }

      dispatch(getPostData(post._id, post.owner.nickname));

      return post;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const { data: postDetail, isLoading, isError } = useQuery([('postDetail', { postId })], fetchAPI);

  console.log('PostPost render');

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <NotFound />;
  }

  const date = new Date(postDetail.createAt);

  return (
    <PostPostPresenter
      postDetail={postDetail}
      postId={postId}
      date={date}
      user={user}
      view={view}
    />
  );
}

export default PostPost;
