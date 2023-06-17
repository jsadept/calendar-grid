import styled, {css} from "styled-components";

export const FormWrapper = styled.div`
  position: absolute;
  left: 0;
  top: -40px;
  height: 390px;
  width: 100%;
  background-color: #FFFFFF;
  border: 3px solid var(--ds-border, #091e4221);
  border-radius: 0 0 15px 15px;
  box-sizing: border-box;
  color: var(--ds-text-subtle, #5e6c84);
  display: block;
  line-height: 40px;
  margin: 0;
  padding: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 1;
`;

export const FormBlock = styled.div`
  margin-bottom: 5px;
`;

export const FormLabel = styled.label`
  margin: 0;
  font-size: 18px;
  line-height: 32px;
  display: block;
`;
export const FormInput = styled.input`
    width: 95%;
    height: 40px;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #DCDFE4;
    border-radius: 3px;
    box-sizing: border-box;
    color: #172B4D;
    font-size: 14px;
    line-height: 20px;
    outline: none;
`;

export const FormTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FormHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-bottom: 1px solid #DCDFE4;
`;

export const FormContent = styled.div`
  flex: 1;
  overflow: auto;
  max-height: 240px;
  padding-top: 20px;
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const TagInput = styled.input<{ color: string }>`
  flex: 60%;
  height: 25px;
  padding: 5px;
  margin-right: 3%;
  border-radius: 8px;
  border: 0;
  background-color: ${({ color }) => color};
  color: #FFFFFF;
`;

export const TagCheckbox = styled.input`
  flex: 20%;
  height: 25px;
  margin-right: 5%;
`;

export const TagColorBtn = styled.div`
  flex: 20%;
  height: 25px;
  margin-right: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
// button if has bgcolor variable set to backgound color

export const Button = styled.button<{ color?: string; backgroundColor?: string; disabled?: boolean; }>`
    align-items: center;
    background-color: ${({ backgroundColor }) => backgroundColor || '#E9EBEE'};
    border: none;
    border-radius: 3px;
    box-shadow: none;
    box-sizing: border-box;
    color: ${({ color }) => color || '#172b4d'};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    display: inline-flex;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 14px;
    font-weight: 400;
    justify-content: center;
    line-height: 20px;
    padding: 6px 12px;
    text-decoration: none;
    transition-duration: 85ms;
    transition-property: background-color, border-color, box-shadow;
    transition-timing-function: ease;
    white-space: normal;
    width: 48%;
    margin-top: 10px;

    ${({ disabled }) => disabled && css`
        opacity: 0.5;
        pointer-events: none;
    `}
`;
