import styled from 'styled-components';
import { useRef, useState } from 'react';

import expand from '../../constants/icons/expand.svg';
import collapse from '../../constants/icons/collapse.svg';
import API from '../../utils/API';

const Accordion = ({ icon, title, list, handleContents }) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapse = () => {
    if (parentRef.current === null || childRef.current === null) {
      return;
    }
    if (parentRef.current.clientHeight > 0) {
      parentRef.current.style.height = '0px';
    } else if (parentRef.current.clientHeight === 0) {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
    }
    setIsCollapse(!isCollapse);
  };

  const getTemplate = async (templateId) => {
    const { data } = await API.get(`/templates/${templateId}`);
    if (data) return data;
  };

  const handleOnClick = async (templateId) => {
    // call api
    const result = await getTemplate(templateId);
    // put result to template page

    handleContents(result);
  };

  return (
    <Wrapper>
      <GroupWrapper>
        {list.length > 0 ? (
          <ItemWrapper onClick={handleCollapse}>
            <IndexGroup>
              {icon}
              <GroupTitle>{title}</GroupTitle>
            </IndexGroup>
            {isCollapse ? (
              <IconWrapper src={collapse} />
            ) : (
              <IconWrapper src={expand} />
            )}
          </ItemWrapper>
        ) : (
          <ItemWrapper>
            <IndexGroup>
              {icon}
              <GroupTitle>{title}</GroupTitle>
            </IndexGroup>
          </ItemWrapper>
        )}
      </GroupWrapper>
      <ListWrapper ref={parentRef}>
        <ListItem ref={childRef}>
          {list.map(({ templateId, title }, index) => (
            <TemplateTitle
              key={index}
              onClick={() => handleOnClick(templateId)}
            >
              <TemplateName>{title}</TemplateName>
            </TemplateTitle>
          ))}
        </ListItem>
      </ListWrapper>
    </Wrapper>
  );
};

const IconWrapper = styled.img`
  width: 16px;
  height: 12px;

  margin: 6px 8px 6px 0px;
`;

const Wrapper = styled.div`
  width: 252px;

  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;

  margin-left: 40px;
`;

const GroupWrapper = styled.section`
  width: 252px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 12px;
`;

const ItemWrapper = styled.div`
  width: 240px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
`;

const IndexGroup = styled.div`
  width: 172px;
  height: 100%;

  display: flex;
  align-items: center;
`;

const GroupTitle = styled.div`
  width: 160px;
  height: 20px;
  margin-left: 8px;
  line-height: 19px;

  font-size: 16px;
  color: #ffffff;
`;

const ListWrapper = styled.div`
  width: 252px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
  height: 0px;
`;

const ListItem = styled.div`
  padding: 0.1px;
  color: #ffffff;
`;

const TemplateTitle = styled.div`
  width: 252px;
  height: 24px;

  display: flex;
  align-items: center;

  margin: 8px 40px 0px 0px;
`;

const TemplateName = styled.div`
  width: 160px;
  height: 20px;
  margin-left: 16px;

  &:hover {
    cursor: pointer;
  }
`;

export default Accordion;
