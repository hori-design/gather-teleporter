// Gather Teleporter - Browser Console Version
// Paste this entire script into the browser console on https://app.gather.town/

(function() {
  // Utility function
  const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    const sortedArrStr1 = [...arr1].sort().toString();
    const sortedArrStr2 = [...arr2].sort().toString();
    return sortedArrStr1 === sortedArrStr2;
  };

  // Teleport points configuration
  const teleportPoints = [
    { // Party
      hotkey: ['Shift', 'P'],
      position: {x: 26, y: 18},
    },
    { // Event
      hotkey: ['Shift', 'E'],
      position: {x: 46, y: 38},
    },
    { // Pair Programming 1
      hotkey: ['Shift', 'P', '!'],
      position: {x: 54, y: 13},
    },
    { // Pair Programming 2
      hotkey: ['Shift', 'P', '@'],
      position: {x: 64, y: 13},
    },
    { // Meeting 1
      hotkey: ['Shift', 'N', '!'],
      position: {x: 53, y: 19},
    },
    { // Meeting 2
      hotkey: ['Shift', 'N', '@'],
      position: {x: 58, y: 19},
    },
    { // Meeting 3
      hotkey: ['Shift', 'N', '#'],
      position: {x: 63, y: 19},
    },
    { // Meeting 4
      hotkey: ['Shift', 'N', '$'],
      position: {x: 68, y: 19},
    },
    { // Center
      hotkey: ['Shift', 'C'],
      position: {x: 59, y: 30},
    },
    { // Center Meeting 1
      hotkey: ['Shift', 'C', '!'],
      position: {x: 56, y: 29},
    },
    { // Center Meeting 2
      hotkey: ['Shift', 'C', '@'],
      position: {x: 62, y: 29},
    },
    { // 1on1 1
      hotkey: ['Shift', 'O', '!'],
      position: {x: 76, y: 37},
    },
    { // 1on1 2
      hotkey: ['Shift', 'O', '@'],
      position: {x: 72, y: 37},
    },
    { // 1on1 3
      hotkey: ['Shift', 'O', '#'],
      position: {x: 78, y: 28},
    },
    { // 1on1 4
      hotkey: ['Shift', 'O', '$'],
      position: {x: 74, y: 28},
    },
    { // 1on1 5
      hotkey: ['Shift', 'O', '%'],
      position: {x: 76, y: 26},
    },
    { // 1on1 6
      hotkey: ['Shift', 'O', '^'],
      position: {x: 72, y: 26},
    },
    { // My Home
      hotkey: ['Shift', 'H'],
      position: {x: 57, y: 44},
    },
  ];

  // Main logic
  let pressedKeys = [];
  let timer = null;

  const onKeydown = (event) => {
    const { key } = event;
    if (!pressedKeys.includes(key)) {
      pressedKeys.push(key);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      pressedKeys = [];
    }, 3000);

    const teleportPoint = teleportPoints
      .find(({ hotkey }) => areArraysEqual(hotkey, pressedKeys));
    if (!teleportPoint) return false;

    if (!('game' in window)) return false;
    const mapId = window.game.getMyPlayer().map;
    const { position: { x, y } } = teleportPoint;
    window.game.teleport(mapId, x, y);

    console.info(pressedKeys);
    return false;
  };

  const onKeyup = (event) => {
    const { key } = event;
    pressedKeys = pressedKeys
      .filter(k => k !== key);

    console.info(pressedKeys);
    return false;
  };

  window.addEventListener('keydown', onKeydown);
  window.addEventListener('keyup', onKeyup);

  console.log('Gather Teleporter loaded! Hotkeys:');
  console.log('  Shift+P: Party');
  console.log('  Shift+E: Event');
  console.log('  Shift+C: Center');
  console.log('  Shift+H: My Home');
  console.log('  Shift+P+!/@: Pair Programming 1/2');
  console.log('  Shift+N+!/@/#/$: Meeting 1/2/3/4');
  console.log('  Shift+C+!/@: Center Meeting 1/2');
  console.log('  Shift+O+!/@/#/$/%/^: 1on1 1-6');
})();
