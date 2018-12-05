import { questions } from './questions'

describe('The questions reducers', () => {
    it('should not modify state for unknown actiobn', () => {
        console.log('Testing questions')
        const state = ['one','bar']
        const stateClone = ['one','bar']
        const newState = questions(state, {type: 'UNKNOWN_ACTION'})
        expect(newState).toEqual(stateClone)
        expect(newState).toBe(state)

    });

    it('should add new question', () => {
        const state = [{question_id:"foo"},{question_id:"bar"}]
        const newQuestion = { question_id:"baz"}
        const newState = questions(state,{type: "FETCHED_QUESTION", question: newQuestion})
        console.log(newState);
    });
});