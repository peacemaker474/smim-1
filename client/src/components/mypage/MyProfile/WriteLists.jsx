import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ListsUl, Listli, Title, ListContent, Writer } from '../../../styles/mypage/writeList';
import { myWriteLists } from '../../../network/mypage/http';

const Wrapper = styled.div`
  width: 50vw;
  height: 60vh;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const WritePage = styled.p`
  font-size: 20px;
`;

function WriteLists ({userId}) {
  const [writeList, setWriteList] = useState();

  useEffect(() => {
    myWriteLists(userId).then((res) => {
      setWriteList(res.writeLists);
    })
  }, [userId]);

  return (
    <Wrapper>
      <ListsUl>
        {writeList && writeList.map(item => 
          <Listli key={item.createAt}>
            <Title> {item.title} </Title>
            <ListContent> {item.content} </ListContent>
            <Writer> {item.owner} </Writer>
        </Listli>
        )}
      </ListsUl>
      <WritePage> 1 </WritePage>
    </Wrapper>
  );
}

export default WriteLists;