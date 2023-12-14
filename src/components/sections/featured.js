import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import { Link } from 'gatsby';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`;

const StyledProject = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;

  ${media.thone`
    margin-bottom: 70px;
  `};
`;

const StyledContent = styled.div`
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;

  ${media.thone`
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
  `};

  ${media.phablet`
    padding: 30px 25px 20px;
  `};
`;

const StyledLabel = styled.h4`
  font-size: ${fontSizes.smish};
  font-weight: normal;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  margin-top: 10px;
  padding-top: 0;
`;

const StyledProjectName = styled.h5`
  font-size: 28px;
  margin: 0 0 20px;
  color: ${colors.lightestSlate};

  ${media.tablet`
    font-size: 24px;
  `};

  ${media.thone`
    color: ${colors.white};
  `};

  a {
    ${media.tablet`
      display: block;
    `};
  }
`;

const StyledDescription = styled.div`
  ${mixins.boxShadow};
  position: relative;
  z-index: 2;
  padding: 25px;
  background-color: ${colors.lightNavy};
  color: ${colors.lightSlate};
  font-size: ${fontSizes.lg};
  border-radius: ${theme.borderRadius};

  ${media.thone`
    background-color: transparent;
    padding: 20px 0;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  `};

  p {
    margin: 0;
  }

  a {
    ${mixins.inlineLink};
  }
`;

const StyledTechList = styled.ul`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 25px 0 10px;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.green};
    margin-right: ${theme.margin};
    margin-bottom: 7px;
    white-space: nowrap;

    &:last-of-type {
      margin-right: 0;
    }

    ${media.thone`
      color: ${colors.green};
      margin-right: 10px;
    `};
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: ${colors.lightestSlate};

  a {
    padding: 10px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const StyledFeaturedImg = styled(Img)`
  width: 100%;
  max-width: 80%;
  vertical-align: middle;
  border-radius: ${theme.borderRadius};
  position: relative;
  mix-blend-mode: multiply;
  margin-left: auto;
  margin-right: auto;

  ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
    
  `};

  ${media.thone`
    max-width: 100%; /* Set the maximum width for small screens */
  `};
`;

const StyledImgContainer = styled.a`
  grid-column: 6 / -1;
  grid-row: 1 / -1;
  position: relative;
  z-index: 1;
  border-radius: ${theme.radius + 1}px;
  transition: ${theme.transition};

  ${media.tablet`
    height: 100%;
  `};

  ${media.thone`
    grid-column: 1 / -1;
    margin-top: 20px;
  `};
`;

const Featured = ({ data }) => {
  const featuredProjects = data.filter(({ node }) => node);

  const revealTitle = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledContainer id="projects">
      <Heading ref={revealTitle}>Some Things I&apos;ve Worked On</Heading>

      <div>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover } = frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <StyledContent>
                  <StyledLabel>Featured Project</StyledLabel>
                  <StyledProjectName>
                    {external ? (
                      <a
                        href={external}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        aria-label="External Link">
                        {title}
                      </a>
                    ) : (
                      title
                    )}
                  </StyledProjectName>
                  <StyledDescription dangerouslySetInnerHTML={{ __html: html }} />

                  {tech && (
                    <StyledTechList>
                      {tech.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </StyledTechList>
                  )}

                  <StyledLinkWrapper>
                    <Link to="/404">
                      {' '}
                      {/* Change "/404" to the actual path of your 404 page */}
                      <FormattedIcon name="External" />
                    </Link>
                  </StyledLinkWrapper>
                </StyledContent>

                <StyledImgContainer
                  href={external ? external : github ? github : '#'}
                  target="_blank"
                  rel="nofollow noopener noreferrer">
                  <StyledFeaturedImg fluid={cover.childImageSharp.fluid} alt={title} />
                </StyledImgContainer>
              </StyledProject>
            );
          })}
      </div>
    </StyledContainer>
  );
};

Featured.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Featured;
