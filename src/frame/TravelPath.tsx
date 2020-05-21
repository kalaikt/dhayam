const setValue = (location: string, index: number, positions: any) => {
  let cell = TravelPath.playars.map((path: any, index: number) => {
    if (path.location === location && path.position === index)
      return { ...path, layout: positions };
  });

  //console.log(TravelPath);
};

const coins = [
  {
    layout: {},
    position: 0,
  },
  {
    layout: {},
    position: 1,
  },
  {
    layout: {},
    position: 2,
  },
  {
    layout: {},
    position: 3,
  },
  {
    layout: {},
    position: 4,
  },
];

export const PlayersHome = {
  topLeftHome: [],
  topRightHome: [],
  bottomLeftHome: [],
  bottomRightHome: [],
};

export const getPaths = () => {
  return [
    {
      location: "begin",
    },
    { location: "bottomLeft", position: 0, layout: {} },
    { location: "bottomLeft", position: 1, layout: {} },
    { location: "bottomLeft", position: 2, layout: {} },
    { location: "bottomLeft", position: 3, layout: {} },
    { location: "bottom", position: 20, layout: {} },
    { location: "bottom", position: 21, layout: {} },
    { location: "bottom", position: 16, layout: {} },
    { location: "bottom", position: 11, layout: {} },
    { location: "bottom", position: 6, layout: {} },
    { location: "bottom", position: 1, layout: {} },
    { location: "bottom", position: 0, layout: {} },
    { location: "left", position: 14, layout: {} },
    { location: "left", position: 13, layout: {} },
    { location: "left", position: 12, layout: {} },
    { location: "left", position: 11, layout: {} },
    { location: "left", position: 10, layout: {} },
    { location: "left", position: 5, layout: {} },
    { location: "left", position: 0, layout: {} },
    { location: "left", position: 1, layout: {} },
    { location: "left", position: 2, layout: {} },
    { location: "left", position: 3, layout: {} },
    { location: "left", position: 4, layout: {} },
    { location: "top", position: 20, layout: {} },
    { location: "top", position: 21, layout: {} },
    { location: "top", position: 16, layout: {} },
    { location: "top", position: 11, layout: {} },
    { location: "top", position: 6, layout: {} },
    { location: "top", position: 1, layout: {} },
    { location: "top", position: 2, layout: {} },
    { location: "top", position: 3, layout: {} },
    { location: "top", position: 8, layout: {} },
    { location: "top", position: 13, layout: {} },
    { location: "top", position: 18, layout: {} },
    { location: "top", position: 23, layout: {} },
    { location: "top", position: 24, layout: {} },
    { location: "right", position: 0, layout: {} },
    { location: "right", position: 1, layout: {} },
    { location: "right", position: 2, layout: {} },
    { location: "right", position: 3, layout: {} },
    { location: "right", position: 4, layout: {} },
    { location: "right", position: 9, layout: {} },
    { location: "right", position: 14, layout: {} },
    { location: "right", position: 13, layout: {} },
    { location: "right", position: 12, layout: {} },
    { location: "right", position: 11, layout: {} },
    { location: "right", position: 10, layout: {} },
    { location: "bottom", position: 4, layout: {} },
    { location: "bottom", position: 3, layout: {} },
    { location: "bottom", position: 8, layout: {} },
    { location: "bottom", position: 13, layout: {} },
    { location: "bottom", position: 18, layout: {} },
    { location: "bottom", position: 23, layout: {} },
    { location: "bottom", position: 22, layout: {} },
    { location: "bottom", position: 17, layout: {} },
    { location: "bottom", position: 12, layout: {} },
    { location: "bottom", position: 7, layout: {} },
    { location: "bottom", position: 2, layout: {} },
    { location: "home", position: 0, layout: {} },
  ];
};

export const TravelPath = {
  playars: [getPaths()],
};
