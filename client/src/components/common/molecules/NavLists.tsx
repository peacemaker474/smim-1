import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GNLink from '../atoms/GNLink';
import UserLink from '../atoms/UserLink';

function NavLists () {
  const { pathname } = useLocation();

  return (
    <Lists>
      <List>
        <GNLink url='/generation/10' current={pathname === '/generation/10'}> 
          10대에게
        </GNLink>
      </List>
      <List>
        <GNLink url='/generation/20' current={pathname === '/generation/20'}> 
          20대에게
        </GNLink>
      </List>
      <List>
        <GNLink url='/generation/30' current={pathname === '/generation/30'}> 
          30대에게
        </GNLink>
      </List>
      <List>
        <GNLink url='/generation/40' current={pathname === '/generation/40'}> 
          40대에게
        </GNLink>
      </List>
      <List>
        <GNLink url='/generation/50' current={pathname === '/generation/50'}> 
          50대에게
        </GNLink>
      </List>
      <List>
        <UserLink />
      </List>
    </Lists>
  );
}

export default NavLists;

const Lists = styled.ul`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(6, 5em);
  grid-gap: 1.5em;
  justify-content: center;
  align-items: center;
  position: relative;
  @media ${({ theme }) => theme.device.ipad} {
    display: none;
  }
`;

const List = styled.li`
  &:nth-child(6) {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;