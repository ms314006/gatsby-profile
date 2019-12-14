import { graphql } from 'gatsby';
import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from '@emotion/core';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from './post';
import { PostFullContent } from '../components/PostContent';
import PortfolioCard from '../components/PortfolioCard';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background: #fff;
    padding-bottom: 4vw;
  }
  .portfoloiContaner {
    display: flex;
    flex-wrap: wrap;
  }
`;

export interface PortfolioProps {
  data: {
    allPortfolioYaml: {
      edges: Array<{
        node: {
          id: string;
          name: string;
        };
      }>;
    };
  };
}

const Portfolio: React.FC<PortfolioProps> = props => (
  <IndexLayout>
    <Helmet>
      <title>Portfolio</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header css={[outer, SiteHeader]}>
        <div css={inner}>
          <SiteNav />
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <article className="post page" css={[PostFull, NoImage]}>
          <PostFullHeader>
            <PostFullTitle>Portfolio</PostFullTitle>
          </PostFullHeader>
          <PostFullContent className="post-full-content">
            <div className="portfoloiContaner">
              {
                props.data.allPortfolioYaml.edges.map(portfolio => (
                  <PortfolioCard
                    key={portfolio.node.id}
                    portfolio={portfolio.node}
                  />
                ))
              }
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default Portfolio;

export const query = graphql`
  query {
    allPortfolioYaml{
      edges {
        node {
          id
          name
          source
          demo
          unitTest
          cover {
            childImageSharp {
              fluid {
                src
              }
            }
          }
          js
          css
        }
      }
    }
  }
`;
