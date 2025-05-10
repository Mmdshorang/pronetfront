import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button> ثبت
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
   border: none;
   color: #fff;
   background-image: linear-gradient(30deg, #045b0b, #2e9811);
   border-radius: 10px;
   background-size: 100% auto;
   font-family: inherit;
   font-size: 17px;
   padding: 0.7em 1.8em;
  }

  button:hover {
   background-position: right center;
   background-size: 200% auto;
   -webkit-animation: pulse 2s infinite;
   animation: pulse512 1.5s infinite;
  }

  @keyframes pulse512 {
   0% {
    box-shadow: 0 0 0 0 #05bada66;
   }

   70% {
    box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
   }

   100% {
    box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
   }
  }`;

export default Button;
