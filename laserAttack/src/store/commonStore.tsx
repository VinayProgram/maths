import { Object3D, Vector3 } from 'three'
import { create } from 'zustand'

type Store = {
  bulletRef: null | Object3D
  setBulletRef: (bulletRef:Object3D) => void

  directionOfThrowingBall:Vector3|null
  setDirectionOfThrowingBall:(set:Vector3)=>void

  attackEvent:boolean,
  setAttackEvent:(next:boolean)=>void

  directionRef:Vector3,
  setDirectionRef:(next:Vector3)=>void
}

export const useCommonStore = create<Store>()((set) => ({
    bulletRef:null,
    setBulletRef:(next:Object3D)=>set({bulletRef:next}),

    directionOfThrowingBall:null,
    setDirectionOfThrowingBall:(next:Vector3)=>set({directionOfThrowingBall:next}),

    attackEvent:false,
    setAttackEvent:(next)=>set({attackEvent:next}),

    directionRef:new Vector3(0,0,0),
    setDirectionRef:(next)=>set({directionRef:next})
}))

