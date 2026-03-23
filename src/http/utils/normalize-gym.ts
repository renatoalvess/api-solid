export function normalizeGym(gym: any) {
  return {
    ...gym,
    latitude: Number(gym.latitude),
    longitude: Number(gym.longitude),
  }
}