import { useEffect, useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../constants/colors';
import fetchedData from '../../data.json';
import {
  TemplateSubTitle,
  TemplateTitle,
  TemplateSelectButton,
} from './Components';
import { PrevIcon } from '../../constants/icons';

const TemplatePage = ({ getBlockFromTemplate, getAllBlockFromTemplate }) => {
  // setBlock used when user select template from sidebar
  // const [fetchedData, setFetchedData] = useState(fetchedData);
  const [blocks, setBlocks] = useState(fetchedData.content);
  // const [blocks, setBlocks] = useState({});
  const [parsedBlocks, setParsedBlocks] = useState([]);

  useEffect(() => {
    const updatedBlocks = [...blocks];
    blocks.forEach((element, index) => {
      const temp = element.html.replace(/<div>/gi, '\n');
      const newString = temp.replace(/<\/div>/gi, '');
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        html: newString,
      };
    });
    setParsedBlocks(updatedBlocks);
  }, [blocks]);

  const onClickHandler = (e) => {
    const { id } = e.target;
    getBlockFromTemplate(blocks[id]);
  };
  const handleAllTemplate = () => {
    getAllBlockFromTemplate(blocks);
  };

  return (
    <>
      <div>
        <RowContainer style={{ marginTop: '42px', marginLeft: '36px' }}>
          <PrevIcon src="img/prevIcon.png" width="32px" height="32px" />
        </RowContainer>
        <div style={{ marginLeft: '40px', marginRight: '40px' }}>
          <Container style={{ marginTop: '24px' }}>
            <RowContainer>
              <TemplateTitle>{fetchedData.title}</TemplateTitle>
            </RowContainer>
            <RowContainer style={{ justifyContent: 'space-between' }}>
              <TemplateSubTitle>{fetchedData.subtitle}</TemplateSubTitle>
              <TemplateSelectButton onClick={handleAllTemplate}>
                템플릿 쓰기
              </TemplateSelectButton>
            </RowContainer>
          </Container>
          <Container style={{ marginTop: '20px' }}>
            {parsedBlocks.map(({ id, tag, html, flag }, index) => (
              <Block id={index} key={id} onClick={onClickHandler}>
                {html}
              </Block>
            ))}
          </Container>
        </div>
      </div>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  padding-right: 24px;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: 'row';
  align-items: 'center';
  margin-bottom: 8px;
`;
const Block = styled.div`
  white-space: pre-wrap;
  border: 1px solid ${COLORS.blockBorder};
  background: ${COLORS.blockBackground};
  border-radius: 2px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  line-height: 24px;
  font-size: 16px;
`;

export default TemplatePage;
