// Event handling utilities
export type EventHandler<T = Event> = (event: T) => void;

export const createEventEmitter = <T extends Record<string, unknown[]>>() => {
  const listeners: Partial<{ [K in keyof T]: Set<(...args: T[K]) => void> }> = {};

  return {
    on<K extends keyof T>(event: K, callback: (...args: T[K]) => void) {
      if (!listeners[event]) listeners[event] = new Set();
      listeners[event]!.add(callback);
      return () => this.off(event, callback);
    },

    off<K extends keyof T>(event: K, callback: (...args: T[K]) => void) {
      listeners[event]?.delete(callback);
    },

    emit<K extends keyof T>(event: K, ...args: T[K]) {
      listeners[event]?.forEach(cb => cb(...args));
    },

    clear() {
      Object.keys(listeners).forEach(key => delete listeners[key as keyof T]);
    },
  };
};

export const preventDefault = <T extends Event>(handler: EventHandler<T>): EventHandler<T> => {
  return (event: T) => {
    event.preventDefault();
    handler(event);
  };
};
