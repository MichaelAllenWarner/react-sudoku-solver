// "static getDerivedStateFromProps()" equivalent
export const deriveStateFromProps = ({
  status,
  prevStatus,
  board,
  setValue,
  setPrevStatus
}) => {
  if (status !== prevStatus) {
    if (status === 'cleared') {
      setValue('');
    }
    if (status === 'solving') {
      setValue(board.join(''));
    }
    setPrevStatus(status);
  }
};

export const _handleChange = ({ status, setValue, replaceBoard }) => {
  if (status === 'solving') {
    return;
  }

  // convert non-number characters to 0
  const formattedString = event.target.value.replace(/[^0-9]/gi, '0');
  setValue(formattedString);

  if (formattedString.length === 81) {
    replaceBoard(formattedString.split(''));
  }
};

export const _handleKeyDown = ({ event, solve }) => {
  if (event.key === 'Enter') {
    solve();
  }
};