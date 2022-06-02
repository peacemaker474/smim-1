import React from 'react';
// import { useSelector } from 'react-redux';
import useDropdown from '../../../hooks/useDropdown';
import styled from 'styled-components';
import { CommentDropdown } from './CommentDropdown';
import { DropdownBtn } from '../../../styles/common/dropdown';
import heartFill from '../../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../../asset/icon/icon-heart-line.svg';
import CommentInput from './CommentInput';
import useVisible from '../../../hooks/useVisible';

export default function CommentItem({ cmntData }) {
  const [isDropdownVisible, dropdownRef, btnRef, handleDropdownShow] = useDropdown();
  const [isTargetVisible, handleClickShow] = useVisible(false);
  //   const loginState = useSelector((state) => state.loginReducer);

  return (
    <CommentItemInner>
      <ProfileImg />
      <CommentContent>
        <CommentText>
          <CommentStrongName>{cmntData.writer.nickname}</CommentStrongName> {cmntData.text}
        </CommentText>
        <CommentEtc>
          <CommentDate>{cmntData.createAt}</CommentDate>
          <CommentReBtn onClick={handleClickShow}>답글 달기</CommentReBtn>
          <CommentLike>{cmntData.like_count}</CommentLike>
        </CommentEtc>
        {isTargetVisible && <CommentInput postId={cmntData.post_id} parentId={cmntData._id} />}
      </CommentContent>
      <CommentDropdownBtn ref={btnRef} onClick={handleDropdownShow}>
        {isDropdownVisible && <CommentDropdown ref={dropdownRef} />}
      </CommentDropdownBtn>
    </CommentItemInner>
  );
}

const CommentItemInner = styled.div`
  margin-bottom: 15px;
  display: flex;
  position: relative;
  //   margin-left: ${(props) => (props.extend === 'reply' ? '49px' : '0')};
`;

const ProfileImg = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #091d3e;
  margin-right: 11px;
`;

const CommentDropdownBtn = styled(DropdownBtn)``;

const CommentContent = styled.div`
  width: 709px;
`;

const CommentText = styled.span`
  display: block;
  margin: 0;
  margin-bottom: 12px;
  line-height: 23px;
`;

const CommentEtc = styled.div`
  display: flex;
  align-items: center;
`;

const CommentDate = styled.span`
  margin-right: 12px;
  font-size: 14px;
`;

const CommentReBtn = styled.button`
  margin-right: 12px;
  font-size: 14px;
  font-weight: 600;
`;

const CommentLike = styled.button`
  display: flex;
  align-items: center;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: url(${(props) => (props.like ? `${heartFill}` : `${heartLine}`)});
    background-position: center;
    background-size: contain;
    margin-right: 4px;
  }
`;

const CommentStrongName = styled.strong`
  font-weight: 600;
`;
