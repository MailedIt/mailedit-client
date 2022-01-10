import styled from "styled-components";
import { useState } from "react";

import logo from "../../../constants/icons/logo.svg";
import search from "../../../constants/icons/search.svg";
import star from "../../../constants/icons/star.svg";

import COLORS from "../../../constants/colors";

const SidebarPresenter = ({ contents, item, button }) => {
  // dummy data
  const [groups, setGroups] = useState([
    {
      userId: 5,
      id: 1,
      name: "학교",
      color: "#3138FF",
    },
    {
      userId: 5,
      id: 2,
      name: "회사",
      color: "#E64980",
    },
    {
      userId: 5,
      id: 3,
      name: "그룹2",
      color: "#38D9A9",
    },
    {
      userId: 5,
      id: 4,
      name: "그룹3",
      color: "#FAB005",
    },
  ]);

  return (
    <Wrapper>
      <Logo src={logo} />
      <SearchingField>
        <SearchIcon src={search} />
        <Input placeholder="템플릿을 검색하세요" spellCheck={false} />
      </SearchingField>
      <MyTemplate>마이템플릿</MyTemplate>
      <Group>
        <StarIcon src={star} />
        <GroupName>즐겨찾기</GroupName>
      </Group>
      <Border />
      {item}
      <>
        {groups ? (
          groups.map((group) => (
            <Group key={group.id}>
              <GroupIndex color={group.color} />
              <GroupName>{group.name}</GroupName>
              {button}
            </Group>
          ))
        ) : (
          <NoTemplates>
            마이템플릿이 아직 없네요!
            <br />첫 템플릿을 만들어 보는 것은 어떨까요?
          </NoTemplates>
        )}
      </>
      {contents}
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  width: 328px;
  height: 1080px;

  background: ${COLORS.primary};
`;

const Logo = styled.img`
  width: 220px;
  height: 44px;

  margin: 36px 68px 0 40px;
`;

const SearchingField = styled.section`
  width: 252px;
  height: 38px;

  display: flex;
  flex-direction: row;
  align-items: center;

  background: #748ffc;

  border-radius: 2px;
  margin: 48px 36px 0px 40px;
`;

const Input = styled.input`
  margin-left: 12px;

  background: none;
  border: none;
  color: white;

  &::placeholder {
    color: ${COLORS.indigo1};
    font-size: 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
  }
`;

const SearchIcon = styled.img`
  width: 18px;
  heigt: 18px;

  margin: 10px 0px 10px 12px;
`;

const MyTemplate = styled.span`
  width: 96px;
  height: 26px;
  margin: 42px 192px 24px 40px;

  font-weight: 600;
  font-size: 22px;
  line-height: 26px;

  display: flex;
  align-items: center;

  color: ${COLORS.UIWhite};
`;

const Group = styled.section`
  width: 252px;
  height: 24px;

  margin: 12px 40px 0 36px;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const StarIcon = styled.img`
  width: 18px;
  height: 18px;
  margin: 3px 0px 3px 4px;
`;

const GroupName = styled.span`
  width: 160px;
  height: 20px;
  margin: 2px 52px 0px 8px;

  font-size: 16px;
  line-height: 19px;

  color: ${COLORS.UIWhite};
`;

const Border = styled.hr`
  width: 246px;
  height: 0.5px;
  margin: 16px 46px 22px 36px;
  border: none;
  background-color: rgba(255, 255, 255, 0.25);
`;

const GroupIndex = styled.div`
  width: 4px;
  height: 16px;
  margin: 4px 0px 4px 4px;

  border-radius: 1px;
  background: ${(props) => props.color};
`;

const NoTemplates = styled.div`
  width: 249px;
  height: 44px;

  margin: 24px 39px 0px 40px;

  color: #ffffff;
  font-size: 16px;
  font-weight: 300;
  line-height: 22px;
`;

export default SidebarPresenter;
