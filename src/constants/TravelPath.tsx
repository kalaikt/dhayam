const setValue = (location: string, index: number, indexs: any) => {
  let cell = TravelPath.playars.map((path: any, index: number) => {
    if (path.location === location && path.index === index)
      return { ...path, layout: indexs };
  });
};

const coins = [
  {
    layout: {},
    index: 0,
  },
  {
    layout: {},
    index: 1,
  },
  {
    layout: {},
    index: 2,
  },
  {
    layout: {},
    index: 3,
  },
  {
    layout: {},
    index: 4,
  },
];

export const PlayersHome = {
  topLeftHome: [],
  topRightHome: [],
  bottomLeftHome: [],
  bottomRightHome: [],
};

export const getPlayer1Paths = () => {
  return [
    {
      location: "begin",
    },
    { location: "bottomLeft", index: 0, layout: {} },
    { location: "bottomLeft", index: 1, layout: {} },
    { location: "bottomLeft", index: 2, layout: {} },
    { location: "bottomLeft", index: 3, layout: {} },
    { location: "bottom", index: 20, layout: {} },
    { location: "bottom", index: 21, layout: {} },
    { location: "bottom", index: 16, layout: {} },
    { location: "bottom", index: 11, layout: {} },
    { location: "bottom", index: 6, layout: {} },
    { location: "bottom", index: 1, layout: {} },
    { location: "bottom", index: 0, layout: {} },
    { location: "left", index: 14, layout: {} },
    { location: "left", index: 13, layout: {} },
    { location: "left", index: 12, layout: {} },
    { location: "left", index: 11, layout: {} },
    { location: "left", index: 10, layout: {} },
    { location: "left", index: 5, layout: {} },
    { location: "left", index: 0, layout: {} },
    { location: "left", index: 1, layout: {} },
    { location: "left", index: 2, layout: {} },
    { location: "left", index: 3, layout: {} },
    { location: "left", index: 4, layout: {} },
    { location: "top", index: 20, layout: {} },
    { location: "top", index: 21, layout: {} },
    { location: "top", index: 16, layout: {} },
    { location: "top", index: 11, layout: {} },
    { location: "top", index: 6, layout: {} },
    { location: "top", index: 1, layout: {} },
    { location: "top", index: 2, layout: {} },
    { location: "top", index: 3, layout: {} },
    { location: "top", index: 8, layout: {} },
    { location: "top", index: 13, layout: {} },
    { location: "top", index: 18, layout: {} },
    { location: "top", index: 23, layout: {} },
    { location: "top", index: 24, layout: {} },
    { location: "right", index: 0, layout: {} },
    { location: "right", index: 1, layout: {} },
    { location: "right", index: 2, layout: {} },
    { location: "right", index: 3, layout: {} },
    { location: "right", index: 4, layout: {} },
    { location: "right", index: 9, layout: {} },
    { location: "right", index: 14, layout: {} },
    { location: "right", index: 13, layout: {} },
    { location: "right", index: 12, layout: {} },
    { location: "right", index: 11, layout: {} },
    { location: "right", index: 10, layout: {} },
    { location: "bottom", index: 4, layout: {} },
    { location: "bottom", index: 3, layout: {} },
    { location: "bottom", index: 8, layout: {} },
    { location: "bottom", index: 13, layout: {} },
    { location: "bottom", index: 18, layout: {} },
    { location: "bottom", index: 23, layout: {} },
    { location: "bottom", index: 22, layout: {} },
    { location: "bottom", index: 17, layout: {} },
    { location: "bottom", index: 12, layout: {} },
    { location: "bottom", index: 7, layout: {} },
    { location: "bottom", index: 2, layout: {} },
    { location: "home", index: 0, layout: {} },
  ];
};

export const TravelPath = {
  playars: [
    { path: getPlayer1Paths(), home: PlayersHome.bottomLeftHome },
    /*  { path: getPlayer1Paths(), home: PlayersHome.topLeftHome },
    { path: getPlayer1Paths(), home: PlayersHome.topRightHome },
    { path: getPlayer1Paths(), home: PlayersHome.bottomRightHome }, */
  ],
};
