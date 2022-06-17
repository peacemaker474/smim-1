import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../../../network/post/http';
import { getCookie } from '../../../../utils/cookie';
import PostDropdownPresenter from './PostDropdown.style';

function Dropdown({ postId }, ref) {
  const tkn = getCookie('users');
  let navigate = useNavigate();

  const handlePostEdit = (e) => {
    e.preventDefault();
    console.log('hey');
    navigate(`/posts/edit/${postId}`);
  };
  const handlePostDel = async (e) => {
    e.preventDefault();
    const response = await deletePost(postId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });
    console.log(response);
  };
  return (
    <PostDropdownPresenter
      handlePostEdit={handlePostEdit}
      handlePostDel={handlePostDel}
      forwardRef={ref}
    />
  );
}

export const PostDropdown = React.forwardRef(Dropdown);
