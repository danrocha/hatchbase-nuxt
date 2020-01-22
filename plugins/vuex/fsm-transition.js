export function transition(
  machine,
  { commit, state, dispatch },
  { type, params, extState }
) {
  // debugger
  const nextState = machine.transition(state.state, { type, params }, extState)

  commit(`UPDATE_${machine.config.id.toUpperCase()}_STATE`, nextState.value)

  nextState.actions.forEach((actionKey) => {
    dispatch(actionKey.type, {
      type,
      params,
      history: nextState.history
    })
  })
}
