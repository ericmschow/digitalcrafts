export function handleClick (id, data) {
  console.log('handleClick log: ',id, data)
  return {
    type: 'GAME_CLICK',
    id: id,
    data: data
  }
}

export function startUp(id, data) {
  return {
    type: "START_UP",
    id: id,
    data: data
  }
}

// placeholder
export function jumpTo (id, data) {
  return {
    type: "JUMP_TO",
    id: id,
    data: data
  }
}
