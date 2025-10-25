'use client'
import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1; /* Queda detrás del contenido */
  width: 100%;
  height: 100%;
  overflow: hidden;

  .container {
    width: 100%;
    height: 100%;
    --color: #faa7d8;
    background: linear-gradient(45deg, var(--color) 25%, transparent 25%) -50px 0,
      linear-gradient(-45deg, var(--color) 25%, transparent 25%) -50px 0,
      linear-gradient(45deg, transparent 75%, var(--color) 75%) -50px 0,
      linear-gradient(-45deg, transparent 75%, var(--color) 75%) -50px 0;
    background-color: #ffe4ef; /* tono base rosado claro */
    background-size: 40px 40px; /* patrón más visible */
    opacity: 0.4; /* suave y moderno */
  }
`;

export default Pattern;
