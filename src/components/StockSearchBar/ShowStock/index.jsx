import React from 'react';
import styled from 'styled-components';

const StockContainer = styled.div`
  width: 100%;
  min-height: 3em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

const Symbol = styled.h3`
  font-size: 15px;
  font-weight: bold;
  color: textColor;
  margin-left: 10px;
  flex: 1;
  display: flex;
`;

const Name = styled.h3`
  font-size: 15px;
  color: textColor;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const ShowStock = (props) => {
    const {symbol, name} = props;

    return (
        <StockContainer>
            <Symbol>{symbol}</Symbol>
            <Name>{name}</Name>
        </StockContainer>
    );
};

export default ShowStock;
