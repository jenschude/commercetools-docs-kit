import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import css from '@emotion/css';
import { designSystem } from '@commercetools-docs/ui-kit';
import markdownFragmentToReact from '../utils/markdown-fragment-to-react';
import Link from './link';

const flatStyle = css`
  border: 1px solid ${designSystem.colors.light.borderSecondary};
`;
const clickableStyle = css`
  cursor: pointer;
  box-shadow: ${designSystem.tokens.shadowForClickableCard};
  :hover {
    box-shadow: ${designSystem.tokens.shadowForClickableCardOnHover};
  }
  transition: box-shadow 0.1s ease-in-out;
`;
const Container = styled.li`
  ${(props) => (props.clickable ? clickableStyle : flatStyle)};
  background-color: ${designSystem.colors.light.surfacePrimary};
  padding: ${designSystem.dimensions.spacings.m};
  border-radius: ${designSystem.tokens.borderRadiusForCard};
`;
const Icon = styled.div`
  width: ${designSystem.dimensions.spacings.big};
  min-width: ${designSystem.dimensions.spacings.big};
  height: ${designSystem.dimensions.spacings.big};

  svg {
    width: 100%;
    height: 100%;
  }
`;
const InlineContainer = styled.div`
  display: flex;
  height: 100%;
  > * + * {
    margin-left: ${designSystem.dimensions.spacings.m};
  }
`;
const StackContainer = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  > * + * {
    margin-top: ${designSystem.dimensions.spacings.m};
  }
`;
const normalTitle = css`
  font-size: ${designSystem.typography.fontSizes.h3};
  line-height: ${designSystem.typography.lineHeights.cardNormalTitle};
`;
const smallTitle = css`
  font-size: ${designSystem.typography.fontSizes.h4};
  line-height: ${designSystem.typography.lineHeights.cardSmallTitle};
`;
const Title = styled.h6`
  ${(props) => (props.smallTitle ? smallTitle : normalTitle)};
  color: ${designSystem.colors.light.textPrimary};
  font-weight: ${designSystem.typography.fontWeights.medium};
  letter-spacing: 0;
`;
const Body = styled.div`
  color: ${designSystem.colors.light.textPrimary};
`;
const ReamMoreContainer = styled.div`
  margin-top: auto;
`;
const ReadMore = styled.div`
  border-top: 1px solid ${designSystem.colors.light.borderSecondary};
  padding-top: ${designSystem.dimensions.spacings.m};
  margin-top: ${designSystem.dimensions.spacings.m};
`;

const Card = (props) => {
  return (
    <Container {...props}>
      {props.clickable && props.href ? (
        <Link href={props.href} noUnderline>
          {renderNarrowOrWideCard()}
        </Link>
      ) : (
        renderNarrowOrWideCard()
      )}
    </Container>
  );

  function renderNarrowOrWideCard() {
    return props.narrow ? (
      <StackContainer>{renderCardContent()}</StackContainer>
    ) : (
      <InlineContainer>{renderCardContent()}</InlineContainer>
    );
  }

  function renderCardContent() {
    return (
      <>
        {props.icon && <Icon>{props.icon}</Icon>}

        <StackContainer
          css={css`
            > * + * {
              margin-top: ${designSystem.dimensions.spacings.s};
            }
          `}
        >
          {props.title && (
            <Title smallTitle={props.smallTitle}>{props.title}</Title>
          )}
          {props.children && <Body>{renderBodyContent()}</Body>}
          {props.href && props.textLink && (
            <ReamMoreContainer>
              <ReadMore>
                {props.clickable ? (
                  props.textLink
                ) : (
                  <Link href={props.href} noUnderline>
                    {props.textLink}
                  </Link>
                )}
              </ReadMore>
            </ReamMoreContainer>
          )}
        </StackContainer>
      </>
    );
  }

  function renderBodyContent() {
    if (typeof props.children === 'string') {
      return props.clickable
        ? markdownFragmentToReact(props.children, { a: styled.span`` })
        : markdownFragmentToReact(props.children);
    }

    return props.children;
  }
};

Card.propTypes = {
  clickable: PropTypes.bool,
  narrow: PropTypes.bool,
  smallTitle: PropTypes.bool,
  title: PropTypes.string,
  href: PropTypes.string,
  textLink: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.node.isRequired,
};

export default Card;