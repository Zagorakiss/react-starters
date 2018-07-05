import styled from 'styled-components'

export const FormTemplate = styled.form`
  display: flex;
${props => props.row ? 'align-items: flex-end'
: `flex-direction: column;
  align-items: center`};
  justify-content: space-between;
  width: 100%;
`
