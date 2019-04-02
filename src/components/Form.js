import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  padding: 0px 32px 0 ${p => (p.indent ? '72px' : '32px')};
`;

export default Form;
