export interface WithId {
  id: number;
}

export function findById<T>(type: WithId[], value: T) {
  return type.find(x => x.id === value) ?? null;
}

export function getIncrement(elementsWithId: WithId[]): number {
  return elementsWithId.length > 0 ? Math.max(...elementsWithId.map(x => x.id)) + 1 : 1;
}
