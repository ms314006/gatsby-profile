import * as React from 'react';
import { css } from '@emotion/core';
import ExternalLink from './icons/externalLink';
import Github from './icons/github';

const PortfolioCardStyles = css`
  position: relative;
  flex: 1 1 350px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 20px 40px;
  min-height: 300px;
  border-radius: 10px;
  box-shadow: rgba(39, 44, 49, 0.06) 8px 14px 38px, rgba(39, 44, 49, 0.03) 1px 3px 8px;
  transition: all 0.5s ease;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;

  :hover {
    box-shadow: rgba(39, 44, 49, 0.07) 8px 28px 50px, rgba(39, 44, 49, 0.04) 1px 6px 12px;
    transition: all 0.4s ease;
    transform: translate3D(0, -1px, 0) scale(1.02);
  }
`;

const blackMask = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000000AA;
`;

const portfolioContent = css`
  padding: 10px 20px;
  color: #FFFFFF;
  z-index: 1;
`;

const socialLink = css`
  align-items: center;
  margin-left: 12px;
  color: #fff;
  opacity: 0.8;
  
  :hover {
    opacity: 1;
  }
  
  svg {
    height: 1.8rem;
    fill: #fff;
  }
`;

const title = css`
  color: #FFFFFF;
`;

const imformation = css`
  padding-left: 12px;
`;

const informationText = css`
  font-size: 20px;
  color: #FFFFFF;
`;

export interface PortfolioCardProps {
  portfolio: {
    id: string;
    name: string;
    source: string;
    demo: string;
    unitTest: boolean;
    cover: {
      childImageSharp: {
        fluid: {
          src: string;
        };
      };
    };
    js: string[];
    css: string[];
  };
}

const PortfolioCard: React.FC<PortfolioCardProps> = props => (
  <article
    css={PortfolioCardStyles}
    style={{
      backgroundImage: `url(${props.portfolio.cover.childImageSharp.fluid.src})`,
    }}
  >
    <div css={blackMask} />
    <div css={portfolioContent}>
      <h2>
        <span css={title}>
          {props.portfolio.name}
          <a
            css={socialLink}
            style={{ boxShadow: 'none' }}
            href={props.portfolio.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
          <a
            css={socialLink}
            style={{ boxShadow: 'none' }}
            href={props.portfolio.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink />
          </a>
        </span>
      </h2>
      <div css={imformation}>
        <h4>
          <span css={informationText}>
            JS: {props.portfolio.js.join(', ')}
          </span>
        </h4>
        <h4>
          <span css={informationText}>
            CSS: {props.portfolio.css.join(', ') || 'None'}
          </span>
        </h4>
        <h4>
          <span css={informationText}>
            Unit Testing: {props.portfolio.unitTest ? 'Yes' : 'None'}
          </span>
        </h4>
      </div>
    </div>
  </article>
);

export default PortfolioCard;
