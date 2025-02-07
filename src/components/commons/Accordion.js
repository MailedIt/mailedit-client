import styled from 'styled-components';
import { useRef, useState, useContext } from 'react';

import expand from '../../constants/icons/expand.svg';
import collapse from '../../constants/icons/collapse.svg';

import API from '../../utils/API';
import { ContentContext } from '../../contexts/ContentContext';

const Accordion = ({ icon, title, list }) => {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const [isCollapse, setIsCollapse] = useState(false);
  const { setContentHandler } = useContext(ContentContext);

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
    const temp = result.subtitle
      .replace(/<div>/gi, '\n')
      .replace(/<\/div>/gi, '')
      .replace(/<br>/gi, '\n');
    const res = { ...result, subtitle: temp };
    setContentHandler(res);
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

const Wrapper = styled.div`
  width: 190px;
  margin-top: 12px;

  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
`;

const GroupWrapper = styled.section`
  width: 190px;
  height: 18px; // 24

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemWrapper = styled.div`
  width: 190px;
  height: 18px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
  }
`;

const IndexGroup = styled.div`
  width: 129px;
  height: 100%;

  display: flex;
  align-items: center;
`;

const GroupTitle = styled.div`
  width: 120px;
  height: 15px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
`;

const IconWrapper = styled.img`
  width: 12px;
  height: 9px;

  margin: 6px 6px 6px 0px;
`;

const ListWrapper = styled.div`
  width: 190px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
  height: 0px;
`;

const ListItem = styled.div`
  padding: 0.1px;
  color: #ffffff;
`;

const TemplateTitle = styled.div`
  width: 190px;
  height: 18px;

  display: flex;
  align-items: center;
`;

const TemplateName = styled.div`
  width: 160px;
  height: 20px;
  margin-left: 18px;

  font-size: 16px;
  font-weight: 200;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    cursor: pointer;
  }
`;

export default Accordion;
