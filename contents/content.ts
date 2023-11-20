import type { PlasmoCSConfig } from 'plasmo'
import { teleportPoints } from '~constants/teleport-points'
import { areArraysEqual } from '~utils/are-arrays-equal'

export const config: PlasmoCSConfig = {
  matches: ['https://app.gather.town/*'],
  all_frames: true,
  world: "MAIN",
}

let pressedKeys: string[] = []

const onKeydown = (event: KeyboardEvent) => {
  const { key } = event
  if (!pressedKeys.includes(key)) {
    pressedKeys.push(key)
  }

  const teleportPoint = teleportPoints
    .find(({ hotkey }) => areArraysEqual(hotkey, pressedKeys))
  if (!teleportPoint) return false

  if (!('game' in window)) return false
  const mapId = window.game.getMyPlayer().map
  const { position: { x, y } } = teleportPoint
  window.game.teleport(mapId, x, y)

  console.info(pressedKeys)
  return false
}

const onKeyup = (event: KeyboardEvent) => {
  const { key } = event
  pressedKeys = pressedKeys
    .filter(k => k !== key)

  console.info(pressedKeys)
  return false
}

window.addEventListener('keydown', onKeydown)
window.addEventListener('keyup', onKeyup)
