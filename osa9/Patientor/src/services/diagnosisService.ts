import data from '../../data/diagnoses'
import { Diagnosis } from '../types'

const getDiagnoses = (): Diagnosis[] => {
    return data.map(({code, name, latin}) => ({
        code,
        name,
        latin
    }))
}

export default { getDiagnoses };