// src/emits.js
import mitt from 'mitt';

const emitter = mitt();

export function useEmitter() {
  return {
    emit: emitter.emit,
    on: emitter.on,
  };
}
