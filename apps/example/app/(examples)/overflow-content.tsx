import { Code } from '@/components/Code';
import { ExamplePage } from '@/components/ExamplePage';
import { styles } from '@/styles/common';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-native-resizable-panels';

const description =
  'Panels clip their content by default, to avoid showing scrollbars while resizing. Content can still be configured to overflow within a panel though. This example shows how.';

const code = `<PanelGroup direction="horizontal">
  <Panel>
    <ScrollView>
      {/* Content */}
    </ScrollView>
  </Panel>
  <PanelResizeHandle />
  <Panel>
    <ScrollView>
      {/* Content */}
    </ScrollView>
  </Panel>
</PanelGroup>`;

export default function OverflowContentScreen() {
  const { width } = useWindowDimensions();
  const verticalLayout = width < 800;

  return (
    <ExamplePage description={description} code={code}>
      <PanelGroup style={styles.PanelGroup} direction={verticalLayout ? 'vertical' : 'horizontal'}>
        <Panel style={styles.PanelColumn} defaultSize={50} minSize={25}>
          <ScrollView>
            <Code language="javascript" showLineNumbers>
              {TUTORIAL_CODE_LEFT.trim()}
            </Code>
          </ScrollView>
        </Panel>
        <PanelResizeHandle style={styles.ResizeHandle} />
        <Panel style={styles.PanelColumn} defaultSize={50} minSize={25}>
          <ScrollView>
            <Code language="javascript" showLineNumbers>
              {TUTORIAL_CODE_RIGHT.trim()}
            </Code>
          </ScrollView>
        </Panel>
      </PanelGroup>
    </ExamplePage>
  );
}

const TUTORIAL_CODE_LEFT = `// https://reactjs.org/tutorial/tutorial.html#completing-the-game
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}`;

const TUTORIAL_CODE_RIGHT = `function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}`;
