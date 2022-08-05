import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { loginToggle, menuToggle } from '../../../redux/slice/toggleSlice';

const MobileNavBox = styled.section`
  width: 45vw;
  height: 100vh;
  position: fixed;
  top: 6%;
  right: 0;
  z-index: 999;
  background-color: white;
  display: none;
  @media ${({ theme }) => theme.device.ipad} {
    display: block;
    box-shadow: rgb(0 0 0 / 50%) -16px 0px 16px -16px;
  }

  @media screen and (max-height: 796px) {
    top: 10%;
  }
`;

const MobileLists = styled.ul`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const MobileList = styled.li`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const MobileLink = styled(Link)`
  font-size: 26px;
  text-decoration: none;
  color: ${({ theme }) => theme.color.gray};
  cursor: pointer;
  @media ${({ theme }) => theme.device.iphoneSE} {
    font-size: 18px;
  }
  @media ${({ theme }) => theme.device.fold} {
    font-size: 17px;
  }
`;

const MobileSignBox = styled.div`
  width: 90%;
  @media ${({ theme }) => theme.device.iphoneSE} {
    width: 95%;
  }
  @media ${({ theme }) => theme.device.fold} {
    width: 100%;
  }
`;

const MobileSignIn = styled.h2`
  font-size: 18px;
  margin: 10px 0;
  cursor: pointer;
  @media ${({ theme }) => theme.device.iphoneSE} {
    font-size: 15px;
    margin: 5px 0;
  }
  @media ${({ theme }) => theme.device.fold} {
    font-size: 14px;
    margin: 5px 0;
  }
`;

const MobileSignUpTitle = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray};
  font-weight: 500;

  @media ${({ theme }) => theme.device.iphoneSE} {
    display: block;
    font-size: 11px;
    margin-bottom: 5px;
  }
  @media ${({ theme }) => theme.device.fold} {
    font-size: 10px;
    display: block;
    margin-bottom: 5px;
  }
`;

const MobileSignUp = styled(Link)`
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  font-size: 15px;
  padding-left: 5px;

  @media ${({ theme }) => theme.device.iphoneSE} {
    font-size: 13px;
    padding-left: 0;
  }

  @media ${({ theme }) => theme.device.fold} {
    font-size: 12px;
    padding-left: 0;
  }
`;

function MobileNavBar ({ onLogoutClick }) {
  const { authenticated } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(menuToggle());
    dispatch(loginToggle());
  };

  const handleMenuClick = () => {
    dispatch(menuToggle());
  }

  return (
    <MobileNavBox>
      <MobileLists>
        <MobileList>
          {!authenticated ? (
            <MobileSignBox>
              <MobileSignIn onClick={handleLoginClick}> 로그인 하기 </MobileSignIn>
              <MobileSignUpTitle> 아직 회원이 아니신가요? </MobileSignUpTitle>
              <MobileSignUp to='/signup' onClick={handleMenuClick}> 회원가입 </MobileSignUp>
            </MobileSignBox>
          ) : (
            <MobileLink to='/my' onClick={handleMenuClick}> 마이페이지 </MobileLink>
          )}
        </MobileList>
        <MobileList>
          <MobileLink to='generation?age=10' onClick={handleMenuClick}> 10대에게 </MobileLink>
        </MobileList>
        <MobileList>
          <MobileLink to='generation?age=20' onClick={handleMenuClick}> 20대에게 </MobileLink>
        </MobileList>
        <MobileList>
          <MobileLink to='generation?age=30' onClick={handleMenuClick}> 30대에게 </MobileLink>
        </MobileList>
        <MobileList>
          <MobileLink to='generation?age=40' onClick={handleMenuClick}> 40대에게 </MobileLink>
        </MobileList>
        <MobileList>
          <MobileLink to='generation?age=50' onClick={handleMenuClick}> 50대에게 </MobileLink>
        </MobileList>
        {authenticated && (
          <MobileList>
            <MobileLink to='/' onClick={onLogoutClick}>
              로그아웃
            </MobileLink>
          </MobileList>
        )}
      </MobileLists>
    </MobileNavBox>
  );
}

export default MobileNavBar;
