import { Object3D } from 'three'
import { create } from 'zustand'

type Store = {
  bulletRef: null | Object3D
  setBulletRef: (bulletRef:Object3D) => void
}

export const useCommonStore = create<Store>()((set) => ({
    bulletRef:null,
    setBulletRef:(next:Object3D)=>set({bulletRef:next})
}))

