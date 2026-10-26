import { listHandler } from '../utils';

describe('listHandler', () => {
  it('numbers multiline selections starting at 1', () => {
    const lines = ['apple', 'banana', 'cherry'];
    const replaced: Array<{ text: string; line: number }> = [];

    const doc = {
      somethingSelected: () => true,
      listSelections: () => [{ head: { line: 0, ch: 0 }, anchor: { line: 2, ch: 6 } }],
      getLine: (i: number) => lines[i],
      replaceRange: (text: string, pos: { line: number; ch: number }) => {
        replaced.push({ text, line: pos.line });
      },
    };

    const editor = {
      current: {
        getDoc: () => doc,
        operation: (fn: () => void) => fn(),
        focus: jest.fn(),
      },
    };

    listHandler(
      editor as unknown as React.MutableRefObject<CodeMirror.EditorFromTextArea>,
      'NumberedList'
    );

    expect(replaced).toEqual([
      { text: '1. ', line: 0 },
      { text: '2. ', line: 1 },
      { text: '3. ', line: 2 },
    ]);
  });
});
