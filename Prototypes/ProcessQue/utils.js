import { isClass, hasProto } from '../../src'

/**
 * Check if either Model is compatible with our ProcessTree
 * @param {*} ins 
 * @param {*} ClassA 
 * @param {*} ClassB 
 */
export const asInstanceOf = (ins, ClassA, ClassB) => {
    try {
        let check
        if (isClass(ClassA) && hasProto(ins)) {
            check = ins instanceof ClassA && ins.entity === 'ProcessModel'
        }
        if (isClass(ClassB) && hasProto(ins)) {
            check = ins instanceof ClassB && ins.entity === 'ProcessModel'
        }
        return check
    } catch (err) {
        return false
    }
}
