import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import CommentPinnedPresenter from './CommentPinned.style';

export default function CommentPinned() {
  const { pinnedData, pinnedId } = useSelector(
    (state) => ({
      pinnedData: state.comment.pinnedData,
      pinnedId: state.comment.pinnedId,
    }),
    shallowEqual
  );

  return <CommentPinnedPresenter pinnedComment={pinnedData} pinnedId={pinnedId} />;
}
