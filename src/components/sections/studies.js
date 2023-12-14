import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import Image from './Smartcycle.png';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;
const StyledContent = styled.div`
  width: 60%;
  max-width: 480px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const SkillsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, minmax(400px, 800px));
  overflow: hidden;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;
`;
const Skill = styled.li`
  position: relative;
  margin-bottom: 10px;
  padding-left: 20px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.green};
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${colors.green};
    font-size: ${fontSizes.sm};
    line-height: 12px;
  }
`;
const StyledPic = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-left: 60px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;

const StyledTitle = styled.h4`
  margin: 0 auto;
  font-size: ${fontSizes.h3};
  ${media.tablet`font-size: 24px;`};
  a {
    display: block;
  }
`;

const Studies = () => {
  const revealContainer = useRef(null);
  const imageStyle = {
    width: '100%', // Adjust this value to make the image wider or narrower
    height: '100%', // Maintain the aspect ratio
  };
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="honorsnawards" ref={revealContainer}>
      <Heading>{'Honors & Awards'}</Heading>
      <StyledFlexContainer>
        <StyledContent>
          <StyledTitle>- Africa Smart City Hackathon</StyledTitle>
          {
            <SkillsContainer>
              <Skill>
                {`${'1st Prize'}: `}
                <span style={{ color: 'white' }}>
                  <ul>
                    <li>
                      {
                        'Designed a waste management solution integrating artificial intelligence, computer vision, and Internet of Things(IoT) to enable real-time advanced sorting and recycling.'
                      }
                    </li>
                  </ul>
                </span>
                <br /> <br /> <br />
              </Skill>
            </SkillsContainer>
          }
          <StyledTitle>- Attijari Startup Game </StyledTitle>
          {
            <SkillsContainer>
              <Skill>
                {`${'3rd Prize'}: `}
                <span style={{ color: 'white' }}>
                  <ul>
                    <li>
                      {
                        'Ranked 3rd out of 45 participants from prestigious business and engineering schools across various European and African countries.'
                      }
                    </li>
                  </ul>
                </span>
                <br />
                <ul>
                  <li style={{ color: 'white' }}>
                    {
                      'Demonstrated strong analytical and strategic thinking skills by developing a compelling business model canvas and engaging in strategic business games.'
                    }
                  </li>
                </ul>
              </Skill>
            </SkillsContainer>
          }
        </StyledContent>
        <StyledPic>
          <img src={Image} alt="." style={imageStyle} />
        </StyledPic>
      </StyledFlexContainer>
    </StyledContainer>
  );
};

Studies.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Studies;
