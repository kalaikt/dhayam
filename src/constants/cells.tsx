export const getAllCells: any = () => {
    const left = [];
    const top = [];
    const bottom = [];
    const right = [];
    const topLeft = [];
    const topRight = [];
    const bottomLeft = [];
    const bottomRight = [];
    const coins = [];
  
    for (let i = 0; i < 25; i++) top.push({ location: false, cellIndex: i });
    for (let i = 0; i < 25; i++) bottom.push({ location: false, cellIndex: i });
    for (let i = 0; i < 15; i++) left.push({ location: false, cellIndex: i });
    for (let i = 0; i < 15; i++) right.push({ location: false, cellIndex: i });
    for (let i = 0; i < 5; i++) {
      topLeft.push({ location: false, cellIndex: i });
      coins.push({ location: false, cellIndex: i });
    }
    for (let i = 0; i < 4; i++) topRight.push({ location: false, cellIndex: i });
    for (let i = 0; i < 4; i++)
      bottomLeft.push({ location: false, cellIndex: i });
    for (let i = 0; i < 5; i++)
      bottomRight.push({ location: false, cellIndex: i });
  
    return {
      top,
      left,
      bottom,
      right,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      coins,
    };
  };