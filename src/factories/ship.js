const Ship = (length) => {
  const data = Array(length).fill(false);

  return {
    hit: (index) => {
      if (index < 0 || index >= data.length) {
        throw new Error('Invalid index');
      }

      return (data[index] = true)
    },
    isSunk: () => data.every((value) => value === true),
  };
};

export default Ship;